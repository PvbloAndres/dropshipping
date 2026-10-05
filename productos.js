// ============================================================
//  CONFIGURACIÓN DE TU TIENDA — edita solo este archivo
// ============================================================

const TIENDA = {
  nombre: "Casa en Orden",
  eslogan: "Más espacio y menos desorden en tu clóset, cocina y baño",
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
  sugerenciasCarrito: ["ganchos-adhesivos", "cepillo-rendijas"],
};

const CATEGORIAS = [
  { id: "todos", nombre: "Todo" },
  { id: "closet", nombre: "Clóset" },
  { id: "cocina", nombre: "Cocina" },
  { id: "bano", nombre: "Baño" },
  { id: "limpieza", nombre: "Limpieza" },
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
    id: "bolsas-vacio",
    categoria: "closet",
    nombre: "Bolsas al vacío para ropa con bomba manual",
    precio: 19990,
    emoji: "🧳",
    imagen: "",
    etiqueta: "Cambio de temporada",
    descripcion: "Guarda la ropa de invierno, los plumones y las frazadas ocupando mucho menos espacio.",
    beneficios: [
      "Bomba manual incluida: no necesitas aspiradora",
      "Protegen la ropa del polvo, la humedad y las polillas",
      "Sirven también para la maleta de viaje",
    ],
    tituloOpciones: "Pack",
    opciones: ["8 bolsas (tamaños mixtos)", "12 bolsas (tamaños mixtos)"],
    costo: 10000,
    buscar: "bolsas al vacío ropa bomba manual",
    linkPago: "",
  },
  {
    id: "organizador-cajones",
    categoria: "closet",
    nombre: "Organizador de cajones plegable (set 4)",
    precio: 14990,
    emoji: "🗂️",
    imagen: "",
    etiqueta: "",
    descripcion: "Separa calcetines, ropa interior y poleras para encontrar todo de una mirada.",
    beneficios: [
      "4 organizadores de distintos tamaños",
      "Se pliegan cuando no los usas",
      "Sirven en cajones, clóset y repisas",
    ],
    tituloOpciones: "Color",
    opciones: ["Gris", "Beige"],
    costo: 7000,
    buscar: "organizador cajones plegable set ropa interior",
    linkPago: "",
  },
  {
    id: "organizador-refrigerador",
    categoria: "cocina",
    nombre: "Organizadores transparentes para refrigerador (set 4)",
    precio: 16990,
    emoji: "🧊",
    imagen: "",
    etiqueta: "",
    descripcion: "Ordena el refrigerador por tipo de alimento y ve lo que tienes sin sacar todo.",
    beneficios: [
      "Transparentes: ves qué hay en cada uno",
      "Se apilan para aprovechar la altura",
      "Fáciles de lavar",
    ],
    costo: 8500,
    buscar: "organizador refrigerador transparente apilable set",
    linkPago: "",
  },
  {
    id: "picador-manual",
    categoria: "cocina",
    nombre: "Picador de verduras manual de cuerda",
    precio: 12990,
    emoji: "🥕",
    imagen: "",
    etiqueta: "",
    descripcion: "Pica cebolla, ajo y verduras en segundos tirando de la cuerda. Sin enchufe y sin llorar con la cebolla.",
    beneficios: [
      "Funciona tirando de una cuerda: no necesita electricidad",
      "Eliges qué tan fino queda según cuántas veces tiras",
      "Se desarma para lavarlo",
    ],
    costo: 5500,
    buscar: "picador verduras manual cuerda",
    linkPago: "",
  },
  {
    id: "repisa-ducha",
    categoria: "bano",
    nombre: "Repisa esquinera de ducha adhesiva (set 2)",
    precio: 13990,
    emoji: "🚿",
    imagen: "",
    etiqueta: "",
    descripcion: "Shampoo, jabón y esponjas en orden, sin perforar los azulejos.",
    beneficios: [
      "Se pega con adhesivo: sin taladro ni tarugos",
      "Drena el agua para que no se junte humedad",
      "2 repisas para aprovechar la esquina",
    ],
    costo: 6500,
    buscar: "repisa esquinera ducha adhesiva sin perforar",
    linkPago: "",
  },
  {
    id: "colgador-puerta",
    categoria: "closet",
    nombre: "Organizador colgante para puerta",
    precio: 12990,
    emoji: "🚪",
    imagen: "",
    etiqueta: "",
    descripcion: "Bolsillos transparentes para zapatos, accesorios o productos de limpieza detrás de cualquier puerta.",
    beneficios: [
      "Se cuelga de la puerta sin perforar",
      "Bolsillos transparentes para ver qué hay en cada uno",
      "Libera espacio en el suelo y en el clóset",
    ],
    costo: 6000,
    buscar: "organizador colgante puerta bolsillos transparentes",
    linkPago: "",
  },
  {
    id: "cepillo-rendijas",
    categoria: "limpieza",
    nombre: "Cepillo para rieles de ventanas y rendijas",
    precio: 9990,
    emoji: "🧽",
    imagen: "",
    etiqueta: "",
    descripcion: "Limpia el riel de la ventana corredera, las juntas y las esquinas donde no llega ningún paño.",
    beneficios: [
      "Cerdas duras con forma para rieles y esquinas",
      "Sirve para ventanas, puertas correderas y azulejos",
      "Viene con pala para sacar la tierra",
    ],
    costo: 4000,
    buscar: "cepillo limpieza rieles ventana rendijas",
    linkPago: "",
  },
  {
    id: "pack-closet",
    categoria: "packs",
    nombre: "Pack Clóset Ordenado: bolsas al vacío + organizador de cajones",
    precio: 29990,
    emoji: "✨",
    imagen: "",
    etiqueta: "Pack",
    descripcion: "Lo necesario para ordenar el clóset en una tarde, en un solo pedido.",
    beneficios: [
      "8 bolsas al vacío con bomba manual",
      "Set de 4 organizadores de cajones",
      "Un solo despacho",
    ],
    costo: 15500,
    buscar: "mismos productos de arriba, del mismo proveedor para que viajen juntos",
    linkPago: "",
  },
  {
    id: "ganchos-adhesivos",
    complemento: true,
    categoria: "bano",
    nombre: "10 ganchos adhesivos transparentes",
    precio: 3990,
    emoji: "🪝",
    imagen: "",
    etiqueta: "",
    descripcion: "Para toallas, llaves y utensilios, sin perforar.",
    beneficios: [],
    costo: 1500,
    buscar: "ganchos adhesivos transparentes pack 10",
    linkPago: "",
  },
];
