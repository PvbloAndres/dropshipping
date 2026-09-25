const carrito = cargarCarrito();
let categoriaActiva = "todos";

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

function htmlBotones(p) {
  const comprar = p.linkPago
    ? `<a class="boton-principal" href="${p.linkPago}" target="_blank" rel="noopener">Comprar ahora</a>`
    : "";
  const clase = p.linkPago ? "boton-secundario" : "boton-principal";
  return `${comprar}<button class="${clase}" data-agregar="${p.id}">Agregar al carrito</button>`;
}

function pintarFiltros() {
  const nav = document.getElementById("filtros");
  const usadas = new Set(PRODUCTOS.map((p) => p.categoria));
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
    (p) => categoriaActiva === "todos" || p.categoria === categoriaActiva
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
    ${htmlBotones(p)}
    <a class="enlace-pregunta" target="_blank" rel="noopener"
       href="${linkWhatsApp(`Hola, tengo una pregunta sobre: ${p.nombre}`)}">¿Dudas? Pregúntanos por WhatsApp</a>
  `;
  document.getElementById("detalle").showModal();
}

function agregar(id) {
  carrito[id] = (carrito[id] || 0) + 1;
  guardarCarrito();
  pintarCarrito();
  document.getElementById("detalle").close();
  abrirCarrito();
}

function pintarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;
  let unidades = 0;

  for (const [id, cantidad] of Object.entries(carrito)) {
    const p = productoPorId(id);
    if (!p) {
      delete carrito[id];
      continue;
    }
    total += p.precio * cantidad;
    unidades += cantidad;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${p.nombre}</span>
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
}

function abrirCarrito() {
  document.getElementById("carrito").setAttribute("aria-hidden", "false");
  document.getElementById("fondo").hidden = false;
}

function cerrarCarrito() {
  document.getElementById("carrito").setAttribute("aria-hidden", "true");
  document.getElementById("fondo").hidden = true;
}

function enviarPedido(e) {
  e.preventDefault();
  const items = Object.entries(carrito);
  if (items.length === 0) {
    alert("Agrega al menos un producto.");
    return;
  }
  const datos = new FormData(e.target);
  let total = 0;
  const lineas = items.map(([id, cantidad]) => {
    const p = productoPorId(id);
    total += p.precio * cantidad;
    return `• ${cantidad} x ${p.nombre} — ${formatoPrecio(p.precio * cantidad)}`;
  });
  const mensaje = [
    `Hola ${TIENDA.nombre}, quiero hacer este pedido:`,
    ...lineas,
    `Total: ${formatoPrecio(total)} (envío incluido)`,
    "",
    `Nombre: ${datos.get("nombre")}`,
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

  const cortos = TIENDA.metodosPago.map((m) => m.replace(/ \(.*\)/, ""));
  document.getElementById("confianza-pagos").textContent = listaConO(cortos);
  document.getElementById("texto-pagos").textContent =
    `Puedes pagar con ${listaConO(TIENDA.metodosPago.map(minusculaInicial))}. ` +
    "Al confirmar tu pedido por WhatsApp te enviamos los datos.";
  document.getElementById("metodo-pago").innerHTML =
    '<option value="">¿Cómo quieres pagar?</option>' +
    TIENDA.metodosPago.map((m) => `<option>${m}</option>`).join("");

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
  if (agregarBtn) agregar(agregarBtn.dataset.agregar);
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
document.getElementById("lista-carrito").addEventListener("click", (e) => {
  const { accion, id } = e.target.dataset;
  if (!accion) return;
  carrito[id] += accion === "mas" ? 1 : -1;
  if (carrito[id] <= 0) delete carrito[id];
  guardarCarrito();
  pintarCarrito();
});

pintarTextos();
pintarFiltros();
pintarCatalogo();
pintarCarrito();
