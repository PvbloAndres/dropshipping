// ============================================================
//  CONFIGURACIÓN DE TU TIENDA — edita solo este archivo
// ============================================================

const TIENDA = {
  nombre: "Patas Contentas",
  eslogan: "Todo para el paseo, el verano y la casa de tu perro o gato",
  // Tu número de WhatsApp con código de país, solo dígitos (ej: 56912345678)
  whatsapp: "56935835960",
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
  // Cobro en línea: pega aquí la dirección de tu Worker de Cloudflare (README, "Cobrar en la web").
  // Con esto el cliente paga en la web con Mercado Pago y "Mercado Pago" deja de pedirse por WhatsApp.
  urlPagos: "",
  // "Llévate también": ids de productos baratos que se ofrecen dentro del carrito.
  sugerenciasCarrito: ["rollos-bolsas", "varita-gato"],
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
//   opciones    → (opcional) lista de tallas o variantes; el cliente elige una antes de agregar.
//   complemento → (opcional) true = no aparece en el catálogo, solo como "Llévate también" en el
//                 carrito y siempre junto a otro producto. Su precio NO incluye envío, así que debe
//                 ser del MISMO proveedor que tus productos principales para que viaje en el mismo paquete.
// El cobro en línea lee id, nombre, precio, opciones y complemento de este archivo:
// no les cambies el nombre a esos campos y deja "id" como el primer campo de cada producto.
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
    id: "arnes-antitirones",
    categoria: "paseo",
    nombre: "Arnés antitirones",
    precio: 19990,
    emoji: "🦮",
    imagen: "",
    etiqueta: "Nuevo",
    descripcion: "Tu perro deja de tirar la correa y los paseos vuelven a ser tranquilos.",
    beneficios: [
      "La argolla delantera hace que tu perro gire hacia ti cuando tira",
      "No aprieta el cuello como el collar",
      "Acolchado y ajustable en 4 puntos",
    ],
    // Ajusta los pesos a la tabla de tallas del proveedor.
    tituloOpciones: "Talla",
    opciones: ["S (hasta 8 kg)", "M (8 a 18 kg)", "L (18 a 30 kg)", "XL (más de 30 kg)"],
    costo: 9000,
    buscar: "arnés antitirones perro argolla delantera",
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
    id: "juguete-premios",
    categoria: "juego",
    nombre: "Pelota que suelta premios",
    precio: 14990,
    emoji: "🎾",
    imagen: "",
    etiqueta: "Nuevo",
    descripcion: "La llenas de premios o de su comida y tu perro juega hasta sacarlos. Así no se aburre ni rompe cosas.",
    beneficios: [
      "Rueda de forma impredecible y suelta premios de a poco",
      "La dificultad es regulable",
      "Sin pilas ni carga",
    ],
    costo: 7000,
    buscar: "pelota dispensadora premios perro",
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
  {
    id: "rollos-bolsas",
    complemento: true,
    categoria: "paseo",
    nombre: "8 rollos de bolsas para paseo",
    precio: 3990,
    emoji: "🛍️",
    imagen: "",
    etiqueta: "",
    descripcion: "Repuesto de bolsas para recoger en el paseo.",
    beneficios: [],
    costo: 1500,
    buscar: "rollos bolsas perro repuesto",
    linkPago: "",
  },
];
