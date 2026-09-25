const carrito = cargarCarrito();
let categoriaActiva = "todos";
const URL_PAGOS = (TIENDA.urlPagos || "").replace(/\/$/, "");
const PAGO_EN_LINEA = "Pagar en línea (tarjeta, débito, transferencia)";

// Con cobro en línea activo, Mercado Pago se paga en la web y no se ofrece por WhatsApp.
function metodosDePago() {
  if (!URL_PAGOS) return TIENDA.metodosPago;
  return [PAGO_EN_LINEA, ...TIENDA.metodosPago.filter((m) => !m.startsWith("Mercado Pago"))];
}

function cargarCarrito() {
  try {
    return JSON.parse(localStorage.getItem("carrito")) || {};
  } catch {
    return {};
  }
}

function guardarCarrito() {
  try {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } catch {
    // Sin almacenamiento disponible: el carrito vive solo en esta visita.
  }
}

function formatoPrecio(valor) {
  return `${TIENDA.simboloMoneda}${valor.toLocaleString("es-CL")}`;
}

function productoPorId(id) {
  return PRODUCTOS.find((p) => p.id === id);
}

// Las claves del carrito son "id" o "id::opción" (por ejemplo, la talla de un arnés).
function leerClave(clave) {
  const [id, opcion] = clave.split("::");
  const p = productoPorId(id);
  return { p, opcion, nombre: p && opcion ? `${p.nombre}, ${p.tituloOpciones.toLowerCase()} ${opcion}` : p?.nombre };
}

function hayProductoPrincipal() {
  return Object.keys(carrito).some((clave) => !leerClave(clave).p?.complemento);
}

function linkWhatsApp(mensaje) {
  return `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

function htmlFoto(p) {
  const foto = p.imagen
    ? `<img src="${p.imagen}" alt="${p.nombre}" loading="lazy">`
    : `<span class="emoji" aria-hidden="true">${p.emoji}</span>`;
  const etiqueta = p.etiqueta ? `<span class="etiqueta">${p.etiqueta}</span>` : "";
  return `<div class="foto">${foto}${etiqueta}</div>`;
}

function htmlBotones(p, enDetalle = false) {
  if (p.opciones && !enDetalle) {
    return `<button class="boton-principal" data-detalle="${p.id}">Elegir ${p.tituloOpciones.toLowerCase()}</button>`;
  }
  const comprar = p.linkPago
    ? `<a class="boton-principal" href="${p.linkPago}" target="_blank" rel="noopener">Comprar ahora</a>`
    : "";
  const clase = p.linkPago ? "boton-secundario" : "boton-principal";
  return `${comprar}<button class="${clase}" data-agregar="${p.id}">Agregar al carrito</button>`;
}

function pintarFiltros() {
  const nav = document.getElementById("filtros");
  const usadas = new Set(PRODUCTOS.filter((p) => !p.complemento).map((p) => p.categoria));
  nav.innerHTML = CATEGORIAS.filter((c) => c.id === "todos" || usadas.has(c.id))
    .map(
      (c) =>
        `<button data-categoria="${c.id}" aria-pressed="${c.id === categoriaActiva}">${c.nombre}</button>`
    )
    .join("");
}

function pintarCatalogo() {
  const catalogo = document.getElementById("catalogo");
  const visibles = PRODUCTOS.filter(
    (p) => !p.complemento && (categoriaActiva === "todos" || p.categoria === categoriaActiva)
  );
  catalogo.innerHTML = visibles
    .map(
      (p) => `
      <article class="tarjeta">
        <button class="abrir-detalle" data-detalle="${p.id}" aria-label="Ver ${p.nombre}">
          ${htmlFoto(p)}
          <h3>${p.nombre}</h3>
        </button>
        <p class="descripcion">${p.descripcion}</p>
        <p class="precio">${formatoPrecio(p.precio)}</p>
        ${htmlBotones(p)}
      </article>`
    )
    .join("");
}

function abrirDetalle(id) {
  const p = productoPorId(id);
  document.getElementById("detalle-contenido").innerHTML = `
    ${htmlFoto(p)}
    <h2>${p.nombre}</h2>
    <p class="precio">${formatoPrecio(p.precio)} <small>envío incluido</small></p>
    <p>${p.descripcion}</p>
    <ul class="beneficios">${p.beneficios.map((b) => `<li>${b}</li>`).join("")}</ul>
    ${htmlOpciones(p)}
    ${htmlBotones(p, true)}
    <a class="enlace-pregunta" target="_blank" rel="noopener"
       href="${linkWhatsApp(`Hola, tengo una pregunta sobre: ${p.nombre}`)}">¿Dudas? Pregúntanos por WhatsApp</a>
  `;
  document.getElementById("detalle").showModal();
}

function htmlOpciones(p) {
  if (!p.opciones) return "";
  return `
    <label class="opciones">${p.tituloOpciones}
      <select id="opcion-detalle">${p.opciones.map((o) => `<option>${o}</option>`).join("")}</select>
    </label>`;
}

function agregar(id, desdeCarrito = false) {
  const p = productoPorId(id);
  const clave = p.opciones ? `${id}::${document.getElementById("opcion-detalle").value}` : id;
  carrito[clave] = (carrito[clave] || 0) + 1;
  guardarCarrito();
  pintarCarrito();
revisarRetornoPago();
  if (!desdeCarrito) {
    document.getElementById("detalle").close();
    abrirCarrito();
  }
}

function pintarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;
  let unidades = 0;

  for (const [id, cantidad] of Object.entries(carrito)) {
    const { p, nombre } = leerClave(id);
    if (!p) {
      delete carrito[id];
      continue;
    }
    total += p.precio * cantidad;
    unidades += cantidad;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${nombre}</span>
      <span class="cantidad">
        <button data-accion="menos" data-id="${id}" aria-label="Quitar uno">−</button>
        ${cantidad}
        <button data-accion="mas" data-id="${id}" aria-label="Agregar uno">+</button>
      </span>
      <span>${formatoPrecio(p.precio * cantidad)}</span>
    `;
    lista.appendChild(li);
  }

  if (unidades === 0) {
    lista.innerHTML = '<li class="vacio">Tu carrito está vacío</li>';
  }
  document.getElementById("total").textContent = formatoPrecio(total);
  document.getElementById("contador").textContent = unidades;
  pintarSugerencias();
}

// "Llévate también": productos baratos que se suman con un toque cuando ya hay algo en el carrito.
function pintarSugerencias() {
  const caja = document.getElementById("sugerencias");
  const enCarrito = new Set(Object.keys(carrito).map((clave) => clave.split("::")[0]));
  const sugeridos = hayProductoPrincipal()
    ? TIENDA.sugerenciasCarrito.map(productoPorId).filter((p) => p && !p.opciones && !enCarrito.has(p.id))
    : [];
  caja.hidden = sugeridos.length === 0;
  caja.innerHTML = `
    <h3>Llévate también</h3>
    ${sugeridos
      .map(
        (p) => `
        <div class="sugerencia">
          <span class="emoji" aria-hidden="true">${p.emoji}</span>
          <span>${p.nombre}<br><strong>${formatoPrecio(p.precio)}</strong></span>
          <button data-agregar="${p.id}" aria-label="Agregar ${p.nombre}">+ Agregar</button>
        </div>`
      )
      .join("")}`;
}

function abrirCarrito() {
  document.getElementById("carrito").setAttribute("aria-hidden", "false");
  document.getElementById("fondo").hidden = false;
}

function cerrarCarrito() {
  document.getElementById("carrito").setAttribute("aria-hidden", "true");
  document.getElementById("fondo").hidden = true;
}

function actualizarBotonPedido() {
  const enLinea = document.getElementById("metodo-pago").value === PAGO_EN_LINEA;
  document.getElementById("boton-pedido").textContent = enLinea
    ? "Pagar ahora 🔒"
    : "Confirmar pedido por WhatsApp";
  document.getElementById("nota-pedido").textContent = enLinea
    ? "Pagas seguro en Mercado Pago y luego vuelves a la tienda."
    : "Te respondemos por WhatsApp para confirmar tu pedido y enviarte los datos de pago.";
}

async function pagarEnLinea(datos, boton) {
  boton.disabled = true;
  boton.textContent = "Conectando con Mercado Pago…";
  try {
    const respuesta = await fetch(`${URL_PAGOS}/pagar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: Object.entries(carrito).map(([clave, cantidad]) => ({ clave, cantidad })),
        cliente: {
          nombre: datos.get("nombre"),
          telefono: datos.get("telefono"),
          direccion: datos.get("direccion"),
          comuna: datos.get("comuna"),
        },
      }),
    });
    const resultado = await respuesta.json();
    if (!respuesta.ok) throw new Error(resultado.error);
    location.href = resultado.url;
  } catch (error) {
    alert(error.message || "No pudimos conectar con Mercado Pago. Intenta de nuevo.");
    boton.disabled = false;
    actualizarBotonPedido();
  }
}

// Al volver de Mercado Pago la dirección trae ?pago=aprobado|pendiente|rechazado&pedido=CODIGO
function revisarRetornoPago() {
  const params = new URLSearchParams(location.search);
  const estado = params.get("pago");
  if (!estado) return;
  const pedido = params.get("pedido") || "";
  history.replaceState(null, "", location.pathname);

  const mensajes = {
    aprobado: ["¡Pago recibido! 🎉", `Tu pedido <strong>${pedido}</strong> está confirmado. Lo despachamos y te enviamos el número de seguimiento por WhatsApp.`],
    pendiente: ["Pago pendiente ⏳", `Tu pedido <strong>${pedido}</strong> queda reservado. Apenas Mercado Pago confirme el pago lo despachamos.`],
    rechazado: ["El pago no se completó", "No se hizo ningún cobro. Tu carrito sigue guardado para que lo intentes de nuevo."],
  };
  const [titulo, texto] = mensajes[estado] || mensajes.rechazado;
  if (estado === "aprobado" || estado === "pendiente") {
    for (const clave of Object.keys(carrito)) delete carrito[clave];
    guardarCarrito();
    pintarCarrito();
revisarRetornoPago();
  }
  document.getElementById("detalle-contenido").innerHTML = `
    <div class="resultado-pago">
      <h2>${titulo}</h2>
      <p>${texto}</p>
      <a class="boton-principal" target="_blank" rel="noopener"
         href="${linkWhatsApp(`Hola ${TIENDA.nombre}, te escribo por mi pedido ${pedido}`)}">Escríbenos por WhatsApp</a>
    </div>`;
  document.getElementById("detalle").showModal();
}

function enviarPedido(e) {
  e.preventDefault();
  const items = Object.entries(carrito);
  if (items.length === 0) {
    alert("Agrega al menos un producto.");
    return;
  }
  if (!hayProductoPrincipal()) {
    alert("Los complementos se envían junto a otro producto. Agrega un producto de la tienda.");
    return;
  }
  const datos = new FormData(e.target);
  if (datos.get("pago") === PAGO_EN_LINEA) {
    pagarEnLinea(datos, document.getElementById("boton-pedido"));
    return;
  }
  let total = 0;
  const lineas = items.map(([clave, cantidad]) => {
    const { p, nombre } = leerClave(clave);
    total += p.precio * cantidad;
    return `• ${cantidad} x ${nombre} — ${formatoPrecio(p.precio * cantidad)}`;
  });
  const mensaje = [
    `Hola ${TIENDA.nombre}, quiero hacer este pedido:`,
    ...lineas,
    `Total: ${formatoPrecio(total)} (envío incluido)`,
    "",
    `Nombre: ${datos.get("nombre")}`,
    `Teléfono: ${datos.get("telefono")}`,
    `Dirección: ${datos.get("direccion")}, ${datos.get("comuna")}`,
    `Pago: ${datos.get("pago")}`,
  ].join("\n");
  window.open(linkWhatsApp(mensaje), "_blank");
}

function listaConO(items) {
  return items.length > 1 ? `${items.slice(0, -1).join(", ")} o ${items.at(-1)}` : items[0];
}

function minusculaInicial(texto) {
  // "Transferencia bancaria" → "transferencia bancaria", pero respeta nombres propios como "Mercado Pago".
  return texto.startsWith("Mercado") ? texto : texto[0].toLowerCase() + texto.slice(1);
}

function pintarTextos() {
  document.title = `${TIENDA.nombre} | Accesorios para mascotas`;
  document.getElementById("nombre-tienda").textContent = TIENDA.nombre;
  document.getElementById("nombre-pie").textContent = TIENDA.nombre;
  document.getElementById("eslogan").textContent = TIENDA.eslogan;
  document.getElementById("anio").textContent = new Date().getFullYear();
  document.querySelectorAll(".plazo").forEach((el) => (el.textContent = TIENDA.plazoEntrega));

  const metodos = metodosDePago();
  const cortos = metodos.map((m) => (m === PAGO_EN_LINEA ? "Pago en línea con Mercado Pago" : m.replace(/ \(.*\)/, "")));
  document.getElementById("confianza-pagos").textContent = listaConO(cortos);
  const otros = metodos.filter((m) => m !== PAGO_EN_LINEA).map(minusculaInicial);
  document.getElementById("texto-pagos").textContent = URL_PAGOS
    ? "Puedes pagar en línea con Mercado Pago (tarjeta, débito o transferencia)" +
      (otros.length ? `, o elegir ${listaConO(otros)} y coordinar por WhatsApp.` : ".")
    : `Puedes pagar con ${listaConO(metodos.map(minusculaInicial))}. ` +
      "Al confirmar tu pedido por WhatsApp te enviamos los datos.";
  document.getElementById("metodo-pago").innerHTML =
    (URL_PAGOS ? "" : '<option value="">¿Cómo quieres pagar?</option>') +
    metodos.map((m) => `<option>${m}</option>`).join("");
  actualizarBotonPedido();

  document.getElementById("whatsapp-flotante").href = linkWhatsApp(
    `Hola ${TIENDA.nombre}, tengo una consulta`
  );

  const redes = [
    TIENDA.instagram && `<a href="https://instagram.com/${TIENDA.instagram}" target="_blank" rel="noopener">Instagram</a>`,
    TIENDA.tiktok && `<a href="https://tiktok.com/@${TIENDA.tiktok}" target="_blank" rel="noopener">TikTok</a>`,
  ].filter(Boolean);
  document.getElementById("redes").innerHTML = redes.join(" · ");
}

document.getElementById("filtros").addEventListener("click", (e) => {
  const categoria = e.target.dataset.categoria;
  if (!categoria) return;
  categoriaActiva = categoria;
  pintarFiltros();
  pintarCatalogo();
});

document.addEventListener("click", (e) => {
  const detalle = e.target.closest("[data-detalle]");
  if (detalle) abrirDetalle(detalle.dataset.detalle);
  const agregarBtn = e.target.closest("[data-agregar]");
  if (agregarBtn) {
    // Desde las sugerencias del carrito se agrega sin cerrar ni reabrir nada.
    const desdeCarrito = agregarBtn.closest("#sugerencias");
    agregar(agregarBtn.dataset.agregar, desdeCarrito);
  }
  if (e.target.closest("[data-cerrar]")) document.getElementById("detalle").close();
});

document.getElementById("detalle").addEventListener("click", (e) => {
  // Cerrar al tocar fuera del recuadro
  if (e.target.id === "detalle") e.target.close();
});

document.getElementById("abrir-carrito").addEventListener("click", abrirCarrito);
document.getElementById("cerrar-carrito").addEventListener("click", cerrarCarrito);
document.getElementById("fondo").addEventListener("click", cerrarCarrito);
document.getElementById("form-pedido").addEventListener("submit", enviarPedido);
document.getElementById("metodo-pago").addEventListener("change", actualizarBotonPedido);
document.getElementById("lista-carrito").addEventListener("click", (e) => {
  const { accion, id } = e.target.dataset;
  if (!accion) return;
  carrito[id] += accion === "mas" ? 1 : -1;
  if (carrito[id] <= 0) delete carrito[id];
  guardarCarrito();
  pintarCarrito();
revisarRetornoPago();
});

pintarTextos();
pintarFiltros();
pintarCatalogo();
pintarCarrito();
revisarRetornoPago();
