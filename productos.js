// ============================================================
//  CONFIGURACIÓN DE TU TIENDA — edita solo este archivo
// ============================================================

const TIENDA = {
  nombre: "Mi Tienda",
  eslogan: "Productos útiles, envío a todo Chile",
  // Tu número de WhatsApp con código de país, solo dígitos (ej: 56912345678)
  whatsapp: "56900000000",
  moneda: "CLP",
  simboloMoneda: "$",
  // Texto que aparece bajo el carrito
  notaEnvio: "Envío a todo Chile en 10 a 20 días hábiles. Te enviamos el número de seguimiento por WhatsApp.",
};

// Cada producto: id único, nombre, precio de venta, imagen (URL o ruta en assets/),
// descripción corta. "costo" y "proveedor" son solo para ti: no se muestran en la tienda.
// "linkPago" (opcional): link de pago de Mercado Pago del producto. Si lo pones, aparece
// el botón "Comprar ahora" y el cliente paga al instante con tarjeta, débito o transferencia.
const PRODUCTOS = [
  {
    id: "p1",
    nombre: "Organizador de cables magnético",
    precio: 9990,
    imagen: "https://placehold.co/600x600/png?text=Producto+1",
    descripcion: "Mantén tu escritorio ordenado. Pack de 6 piezas.",
    costo: 2500,
    proveedor: "https://es.aliexpress.com/",
    linkPago: "",
  },
  {
    id: "p2",
    nombre: "Lámpara LED de escritorio plegable",
    precio: 14990,
    imagen: "https://placehold.co/600x600/png?text=Producto+2",
    descripcion: "3 tonos de luz, recargable por USB.",
    costo: 5000,
    proveedor: "https://es.aliexpress.com/",
    linkPago: "",
  },
  {
    id: "p3",
    nombre: "Botella térmica 500 ml",
    precio: 12990,
    imagen: "https://placehold.co/600x600/png?text=Producto+3",
    descripcion: "Mantiene frío 24 h y caliente 12 h.",
    costo: 3500,
    proveedor: "https://es.aliexpress.com/",
    linkPago: "",
  },
];
