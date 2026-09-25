// ============================================================
//  Cobro en línea con Mercado Pago (Cloudflare Worker gratuito)
//
//  Qué hace:
//   POST /pagar     → recibe el carrito, calcula el total con los precios REALES de
//                     productos.js (nunca confía en el precio que manda el navegador)
//                     y crea el pago en Mercado Pago. Devuelve el link para pagar.
//   POST /webhook   → Mercado Pago avisa aquí cuando un pago cambia de estado.
//   GET  /pedidos   → tu lista de pedidos con dirección y estado del pago.
//                     Se abre con ?clave=TU_CLAVE_ADMIN
//
//  Configuración en Cloudflare (ver README, sección "Cobrar en la web"):
//   MP_ACCESS_TOKEN  (secreto)   Access Token de producción de Mercado Pago
//   CLAVE_ADMIN      (secreto)   una contraseña que inventes para ver tus pedidos
//   TIENDA_URL       (variable)  https://pvbloandres.github.io/dropshipping/
//   PEDIDOS          (KV)        espacio de almacenamiento para guardar los pedidos
// ============================================================

const MP_API = "https://api.mercadopago.com";
const MAX_ITEMS = 20;
const MAX_CANTIDAD = 20;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = encabezadosCors(env);

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    try {
      if (request.method === "POST" && url.pathname === "/pagar") {
        return json(await crearPago(request, env, url), 200, cors);
      }
      if (request.method === "POST" && url.pathname === "/webhook") {
        await recibirAviso(request, env, url);
        return new Response("ok");
      }
      if (request.method === "GET" && url.pathname === "/pedidos") {
        return await verPedidos(env, url);
      }
      return new Response("No encontrado", { status: 404 });
    } catch (error) {
      if (error instanceof ErrorCliente) return json({ error: error.message }, 400, cors);
      console.error(error);
      return json({ error: "No pudimos procesar el pago. Intenta de nuevo o escríbenos por WhatsApp." }, 500, cors);
    }
  },
};

class ErrorCliente extends Error {}

// ---------- Crear el pago ----------

async function crearPago(request, env, url) {
  const datos = await request.json().catch(() => null);
  if (!datos || !Array.isArray(datos.items) || datos.items.length === 0) {
    throw new ErrorCliente("El carrito está vacío.");
  }
  if (datos.items.length > MAX_ITEMS) throw new ErrorCliente("Demasiados productos en un pedido.");

  const cliente = {
    nombre: texto(datos.cliente?.nombre, 80),
    telefono: texto(datos.cliente?.telefono, 20),
    direccion: texto(datos.cliente?.direccion, 150),
    comuna: texto(datos.cliente?.comuna, 80),
  };
  if (!cliente.nombre || !cliente.telefono || !cliente.direccion || !cliente.comuna) {
    throw new ErrorCliente("Completa nombre, teléfono, dirección y comuna.");
  }

  const catalogo = await leerCatalogo(env);
  const items = datos.items.map(({ clave, cantidad }) => {
    const [id, opcion] = String(clave ?? "").split("::");
    const producto = catalogo.get(id);
    const n = Number(cantidad);
    if (!producto) throw new ErrorCliente("Un producto del carrito ya no existe. Recarga la página.");
    if (!Number.isInteger(n) || n < 1 || n > MAX_CANTIDAD) throw new ErrorCliente("Cantidad no válida.");
    if (producto.opciones.length && !producto.opciones.includes(opcion)) {
      throw new ErrorCliente(`Elige una opción válida para ${producto.nombre}.`);
    }
    return {
      id,
      title: opcion ? `${producto.nombre} - ${opcion}` : producto.nombre,
      quantity: n,
      unit_price: producto.precio,
      currency_id: "CLP",
      complemento: producto.complemento,
    };
  });
  if (items.every((item) => item.complemento)) {
    throw new ErrorCliente("Los complementos se envían junto a otro producto.");
  }

  const total = items.reduce((suma, item) => suma + item.unit_price * item.quantity, 0);
  const codigo = `PC-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  const tienda = env.TIENDA_URL;

  const respuesta = await fetch(`${MP_API}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.MP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: items.map(({ complemento, ...item }) => item),
      external_reference: codigo,
      back_urls: {
        success: `${tienda}?pago=aprobado&pedido=${codigo}`,
        pending: `${tienda}?pago=pendiente&pedido=${codigo}`,
        failure: `${tienda}?pago=rechazado&pedido=${codigo}`,
      },
      auto_return: "approved",
      notification_url: `${url.origin}/webhook`,
      metadata: { pedido: codigo, ...cliente },
    }),
  });
  if (!respuesta.ok) {
    console.error("Mercado Pago respondió", respuesta.status, await respuesta.text());
    throw new Error("Error al crear el pago en Mercado Pago");
  }
  const preferencia = await respuesta.json();

  await guardarPedido(env, {
    codigo,
    fecha: new Date().toISOString(),
    estado: "esperando pago",
    cliente,
    items: items.map(({ title, quantity, unit_price }) => ({ title, quantity, unit_price })),
    total,
  });

  return { url: preferencia.init_point, pedido: codigo };
}

// Lee id, nombre, precio, opciones y complemento de productos.js publicado en la tienda.
async function leerCatalogo(env) {
  const respuesta = await fetch(new URL("productos.js", env.TIENDA_URL), { cf: { cacheTtl: 60 } });
  if (!respuesta.ok) throw new Error("No se pudo leer productos.js");
  return catalogoDesdeTexto(await respuesta.text());
}

function catalogoDesdeTexto(codigo) {
  const inicio = codigo.indexOf("const PRODUCTOS");
  const catalogo = new Map();
  for (const bloque of codigo.slice(inicio).split(/\bid:\s*"/).slice(1)) {
    const id = bloque.slice(0, bloque.indexOf('"'));
    const nombre = bloque.match(/\bnombre:\s*"([^"]*)"/);
    const precio = bloque.match(/\bprecio:\s*(\d+)/);
    if (!nombre || !precio) continue;
    const lista = bloque.match(/\bopciones:\s*\[([^\]]*)\]/);
    catalogo.set(id, {
      nombre: nombre[1],
      precio: Number(precio[1]),
      complemento: /\bcomplemento:\s*true/.test(bloque),
      opciones: lista ? [...lista[1].matchAll(/"([^"]*)"/g)].map((m) => m[1]) : [],
    });
  }
  return catalogo;
}

// ---------- Aviso de Mercado Pago ----------

async function recibirAviso(request, env, url) {
  const cuerpo = await request.json().catch(() => ({}));
  const tipo = cuerpo.type || url.searchParams.get("type") || url.searchParams.get("topic");
  const idPago = cuerpo.data?.id || url.searchParams.get("data.id") || url.searchParams.get("id");
  if (tipo !== "payment" || !idPago) return;

  // Se consulta el pago directo a Mercado Pago: así nadie puede falsificar un "pagado".
  const respuesta = await fetch(`${MP_API}/v1/payments/${encodeURIComponent(idPago)}`, {
    headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}` },
  });
  if (!respuesta.ok) return;
  const pago = await respuesta.json();

  const pedido = await leerPedido(env, pago.external_reference);
  if (!pedido) return;
  pedido.estado = ESTADOS[pago.status] || pago.status;
  pedido.idPago = pago.id;
  pedido.montoPagado = pago.transaction_amount;
  if (pago.status === "approved" && pago.transaction_amount < pedido.total) {
    pedido.estado = "⚠️ pagó menos del total: no despachar";
  }
  await guardarPedido(env, pedido);
}

const ESTADOS = {
  approved: "✅ pagado",
  pending: "pago pendiente",
  in_process: "pago en revisión",
  rejected: "pago rechazado",
  cancelled: "pago cancelado",
  refunded: "reembolsado",
  charged_back: "contracargo",
};

// ---------- Lista de pedidos ----------

async function verPedidos(env, url) {
  if (!env.CLAVE_ADMIN || url.searchParams.get("clave") !== env.CLAVE_ADMIN) {
    return new Response("Clave incorrecta", { status: 401 });
  }
  if (!env.PEDIDOS) return new Response("Falta conectar el espacio KV llamado PEDIDOS", { status: 500 });

  const { keys } = await env.PEDIDOS.list({ prefix: "pedido:" });
  const recientes = keys.map((k) => k.name).sort().reverse().slice(0, 100);
  const pedidos = (await Promise.all(recientes.map((clave) => env.PEDIDOS.get(clave, "json")))).filter(Boolean);

  const filas = pedidos
    .map(
      (p) => `
      <tr class="${p.estado.startsWith("✅") ? "pagado" : ""}">
        <td>${html(new Date(p.fecha).toLocaleString("es-CL", { timeZone: "America/Santiago" }))}<br><small>${html(p.codigo)}</small></td>
        <td><strong>${html(p.estado)}</strong>${p.idPago ? `<br><small>Pago ${html(p.idPago)}</small>` : ""}</td>
        <td>${html(p.cliente.nombre)}<br>
            <a href="https://wa.me/${html(p.cliente.telefono.replace(/\D/g, ""))}">${html(p.cliente.telefono)}</a></td>
        <td>${html(p.cliente.direccion)}<br>${html(p.cliente.comuna)}</td>
        <td>${p.items.map((i) => `${i.quantity} x ${html(i.title)}`).join("<br>")}</td>
        <td>$${p.total.toLocaleString("es-CL")}</td>
      </tr>`
    )
    .join("");

  return new Response(
    `<!doctype html><html lang="es"><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"><title>Pedidos</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1rem; background: #fbf8f3; color: #2a2320; }
      .tabla { overflow-x: auto; }
      table { border-collapse: collapse; width: 100%; min-width: 760px; background: #fff; }
      th, td { border: 1px solid #ece5dc; padding: 0.5rem; text-align: left; vertical-align: top; font-size: 0.9rem; }
      th { background: #2a2320; color: #fff; }
      tr.pagado { background: #eaf7ee; }
    </style></head><body>
    <h1>Pedidos</h1>
    <p>Despacha solo los pedidos <strong>✅ pagado</strong>. Los más nuevos van primero.</p>
    <div class="tabla"><table>
      <tr><th>Fecha</th><th>Estado</th><th>Cliente</th><th>Dirección</th><th>Productos</th><th>Total</th></tr>
      ${filas || '<tr><td colspan="6">Todavía no hay pedidos.</td></tr>'}
    </table></div></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

// ---------- Utilidades ----------

async function guardarPedido(env, pedido) {
  if (env.PEDIDOS) await env.PEDIDOS.put(`pedido:${pedido.codigo}`, JSON.stringify(pedido));
}

async function leerPedido(env, codigo) {
  if (!env.PEDIDOS || !codigo) return null;
  return env.PEDIDOS.get(`pedido:${codigo}`, "json");
}

function texto(valor, largo) {
  return String(valor ?? "").trim().slice(0, largo);
}

function html(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function encabezadosCors(env) {
  return {
    "Access-Control-Allow-Origin": env.TIENDA_URL ? new URL(env.TIENDA_URL).origin : "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(datos, estado, encabezados) {
  return new Response(JSON.stringify(datos), {
    status: estado,
    headers: { ...encabezados, "Content-Type": "application/json" },
  });
}
