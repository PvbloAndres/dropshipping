// ============================================================
//  CONFIGURACIÓN DE TU TIENDA — edita solo este archivo
// ============================================================

const TIENDA = {
  nombre: "Patas Contentas",
  eslogan: "Todo para el paseo, el verano y la casa de tu perro o gato",
  // Tu número de WhatsApp con código de país, solo dígitos (ej: 56912345678)
  whatsapp: "56900000000",
  // Tus redes (déjalas en "" si aún no las tienes)
  instagram: "",
  tiktok: "",
  moneda: "CLP",
  simboloMoneda: "$",
  // Con proveedores Dropi (bodega en Chile) el despacho es de 1 a 3 días hábiles.
  // Si compras en AliExpress, cámbialo a "10 a 20 días hábiles": nunca prometas un plazo que no cumples.
  plazoEntrega: "1 a 3 días hábiles",
  // Métodos que aceptas. "Pago contra entrega" solo si tu proveedor es Dropi.
  metodosPago: ["Transferencia bancaria", "Mercado Pago (tarjeta o débito)", "Pago contra entrega"],
};

const CATEGORIAS = [
  { id: "todos", nombre: "Todo" },
  { id: "paseo", nombre: "Paseo" },
  { id: "verano", nombre: "Verano" },
  { id: "cuidado", nombre: "Cuidado y aseo" },
  { id: "juego", nombre: "Juego" },
  { id: "packs", nombre: "Packs" },
];

// Cada producto:
//   precio      → precio de venta con envío incluido.
//   emoji       → se muestra mientras no tengas foto. Cuando la tengas, pon "imagen": "assets/foto.jpg".
//   etiqueta    → texto corto sobre la foto (déjalo "" si no aplica). No inventes "más vendido".
//   beneficios  → ajústalos a lo que dice la ficha real del proveedor (medidas, materiales).
//   costo       → SOLO PARA TI: precio proveedor + envío estimado. No se muestra en la tienda.
//                 Son estimaciones: confírmalas en Dropi/AliExpress antes de publicar.
//   buscar      → SOLO PARA TI: qué escribir en el buscador del proveedor.
//   linkPago    → link de pago de Mercado Pago del producto (opcional).
const PRODUCTOS = [
  {
    id: "botella-paseo",
    categoria: "paseo",
    nombre: "Botella bebedero portátil para paseo",
    precio: 14990,
    emoji: "💧",
    imagen: "",
    etiqueta: "Para el verano",
    descripcion: "Tu perro toma agua en cualquier parte sin ensuciar. Una mano y listo.",
    beneficios: [
      "Aprieta para llenar el bebedero y suelta para devolver el agua sobrante",
      "Libre de BPA, no gotea en la mochila",
      "Tamaño ideal para llevar en la mochila o el bolso",
    ],
    costo: 7500,
    buscar: "botella agua portátil perro dispensador",
    linkPago: "",
  },
  {
    id: "rodillo-pelos",
    categoria: "cuidado",
    nombre: "Rodillo quita pelos reutilizable",
    precio: 14990,
    emoji: "🧹",
    imagen: "",
    etiqueta: "",
    descripcion: "Saca los pelos del sillón, la cama y la ropa en segundos. Sin repuestos ni pegamento.",
    beneficios: [
      "Se vacía abriendo la tapa: no gastas en repuestos",
      "Funciona en sofá, alfombra, cama y asiento del auto",
      "Sirve para pelo de perro y de gato",
    ],
    costo: 8000,
    buscar: "rodillo quita pelos mascotas reutilizable",
    linkPago: "",
  },
  {
    id: "cepillo-autolimpiante",
    categoria: "cuidado",
    nombre: "Cepillo autolimpiante",
    precio: 13990,
    emoji: "🪮",
    imagen: "",
    etiqueta: "",
    descripcion: "Quita el pelo muerto de la muda de primavera y se limpia con un solo botón.",
    beneficios: [
      "Presiona el botón y el pelo se suelta del cepillo",
      "Cerdas con punta redondeada para no dañar la piel",
      "Menos pelos en la casa durante la muda",
    ],
    costo: 7000,
    buscar: "cepillo autolimpiante mascotas botón",
    linkPago: "",
  },
  {
    id: "tapete-refrescante",
    categoria: "verano",
    nombre: "Tapete refrescante de gel",
    precio: 22990,
    emoji: "❄️",
    imagen: "",
    etiqueta: "Para el verano",
    descripcion: "Se mantiene fresco sin enchufe ni refrigerador para que tu mascota descanse cuando hace calor.",
    beneficios: [
      "Se activa con el peso de tu mascota",
      "No necesita electricidad ni agua",
      "Se limpia con un paño húmedo",
    ],
    costo: 12500,
    buscar: "tapete refrescante gel perro",
    linkPago: "",
  },
  {
    id: "alfombra-olfativa",
    categoria: "juego",
    nombre: "Alfombra olfativa antiestrés",
    precio: 19990,
    emoji: "🐾",
    imagen: "",
    etiqueta: "",
    descripcion: "Esconde premios entre las telas: tu perro se entretiene, come más lento y se relaja.",
    beneficios: [
      "Lo entretiene haciéndolo usar el olfato",
      "Buena opción para perros inquietos o que comen muy rápido",
      "Lavable",
    ],
    costo: 10000,
    buscar: "alfombra olfativa perro snuffle mat",
    linkPago: "",
  },
  {
    id: "plato-lento",
    categoria: "cuidado",
    nombre: "Plato de comida lenta",
    precio: 12990,
    emoji: "🥣",
    imagen: "",
    etiqueta: "",
    descripcion: "Evita que tu perro trague la comida en segundos. Así come más lento y tiene mejor digestión.",
    beneficios: [
      "Los relieves hacen que coma más lento",
      "Base antideslizante",
      "Fácil de lavar",
    ],
    costo: 6000,
    buscar: "plato comedero lento perro antideslizante",
    linkPago: "",
  },
  {
    id: "varita-gato",
    categoria: "juego",
    nombre: "Varita con plumas para gatos (pack 5 repuestos)",
    precio: 9990,
    emoji: "🐱",
    imagen: "",
    etiqueta: "",
    descripcion: "El juguete que ningún gato ignora. Incluye 5 repuestos para que dure meses.",
    beneficios: [
      "Varita flexible y extensible",
      "5 repuestos intercambiables",
      "Ayuda a que tu gato haga ejercicio dentro de la casa",
    ],
    costo: 4500,
    buscar: "varita plumas gato repuestos",
    linkPago: "",
  },
  {
    id: "pack-paseo",
    categoria: "packs",
    nombre: "Pack Paseo: botella + dispensador con 8 rollos de bolsas",
    precio: 19990,
    emoji: "🎒",
    imagen: "",
    etiqueta: "Pack ahorro",
    descripcion: "Lo esencial para salir a pasear en un solo pedido.",
    beneficios: [
      "Botella bebedero portátil",
      "Dispensador que se engancha a la correa",
      "8 rollos de bolsas",
    ],
    costo: 10000,
    buscar: "dispensador bolsas perro correa + botella agua perro",
    linkPago: "",
  },
];
