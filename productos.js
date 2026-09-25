// ============================================================
//  CONFIGURACIÓN DE TU TIENDA — edita solo este archivo
// ============================================================

const TIENDA = {
  nombre: "Mi Tienda",
  eslogan: "Productos útiles, envío a todo el país",
  // Tu número de WhatsApp con código de país, solo dígitos (ej: 5215512345678)
  whatsapp: "5210000000000",
  moneda: "MXN",
  simboloMoneda: "$",
  // Texto que aparece bajo el carrito
  notaEnvio: "Envío de 7 a 15 días hábiles. Te confirmamos disponibilidad por WhatsApp antes de cobrar.",
};

// Cada producto: id único, nombre, precio de venta, imagen (URL o ruta en assets/),
// descripción corta. "costo" y "proveedor" son solo para ti: no se muestran en la tienda.
const PRODUCTOS = [
  {
    id: "p1",
    nombre: "Organizador de cables magnético",
    precio: 199,
    imagen: "https://placehold.co/600x600/png?text=Producto+1",
    descripcion: "Mantén tu escritorio ordenado. Pack de 6 piezas.",
    costo: 45,
    proveedor: "https://es.aliexpress.com/",
  },
  {
    id: "p2",
    nombre: "Lámpara LED de escritorio plegable",
    precio: 349,
    imagen: "https://placehold.co/600x600/png?text=Producto+2",
    descripcion: "3 tonos de luz, recargable por USB.",
    costo: 110,
    proveedor: "https://es.aliexpress.com/",
  },
  {
    id: "p3",
    nombre: "Botella térmica 500 ml",
    precio: 279,
    imagen: "https://placehold.co/600x600/png?text=Producto+3",
    descripcion: "Mantiene frío 24 h y caliente 12 h.",
    costo: 80,
    proveedor: "https://es.aliexpress.com/",
  },
];
