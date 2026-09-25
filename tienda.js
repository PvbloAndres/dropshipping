const carrito = cargarCarrito();

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
  return `${TIENDA.simboloMoneda}${valor.toLocaleString("es")} ${TIENDA.moneda}`;
}

function productoPorId(id) {
  return PRODUCTOS.find((p) => p.id === id);
}

function pintarCatalogo() {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";
  for (const p of PRODUCTOS) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      <h3>${p.nombre}</h3>
      <p class="descripcion">${p.descripcion}</p>
      <p class="precio">${formatoPrecio(p.precio)}</p>
      <button class="boton-principal" data-id="${p.id}">Agregar al carrito</button>
    `;
    catalogo.appendChild(tarjeta);
  }
  catalogo.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;
    carrito[id] = (carrito[id] || 0) + 1;
    guardarCarrito();
    pintarCarrito();
    abrirCarrito();
  });
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
}

function cerrarCarrito() {
  document.getElementById("carrito").setAttribute("aria-hidden", "true");
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
    `Hola, quiero hacer este pedido en ${TIENDA.nombre}:`,
    ...lineas,
    `Total: ${formatoPrecio(total)}`,
    "",
    `Nombre: ${datos.get("nombre")}`,
    `Ciudad / CP: ${datos.get("ciudad")}`,
  ].join("\n");
  window.open(`https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

document.title = TIENDA.nombre;
document.getElementById("nombre-tienda").textContent = TIENDA.nombre;
document.getElementById("nombre-pie").textContent = TIENDA.nombre;
document.getElementById("eslogan").textContent = TIENDA.eslogan;
document.getElementById("nota-envio").textContent = TIENDA.notaEnvio;
document.getElementById("anio").textContent = new Date().getFullYear();

document.getElementById("abrir-carrito").addEventListener("click", abrirCarrito);
document.getElementById("cerrar-carrito").addEventListener("click", cerrarCarrito);
document.getElementById("form-pedido").addEventListener("submit", enviarPedido);
document.getElementById("lista-carrito").addEventListener("click", (e) => {
  const { accion, id } = e.target.dataset;
  if (!accion) return;
  carrito[id] += accion === "mas" ? 1 : -1;
  if (carrito[id] <= 0) delete carrito[id];
  guardarCarrito();
  pintarCarrito();
});

pintarCatalogo();
pintarCarrito();
