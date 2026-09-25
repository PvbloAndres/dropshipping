# Dropshipping sin gastar dinero

Tienda en línea gratuita (HTML + JS, sin servidor) y guía para empezar dropshipping con $0.
Pensada para Chile (precios en CLP). El cliente puede pagar al instante con un link de
Mercado Pago ("Comprar ahora") o enviarte el pedido por WhatsApp. Tú cobras **primero** y
después compras al proveedor con el dinero del cliente. Así nunca pones dinero propio.

## 1. Publica la tienda gratis (GitHub Pages)

1. Edita `productos.js`: nombre de la tienda, tu número de WhatsApp y tus productos.
   Para cada producto crea un **link de pago** en Mercado Pago (gratis de crear; cobran
   una comisión solo cuando vendes) y pégalo en `linkPago`.
2. En GitHub: **Settings → Pages → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. En 1–2 minutos tu tienda estará en `https://<tu-usuario>.github.io/dropshipping/`.

Para probarla en tu computadora basta con abrir `index.html` en el navegador.

## 2. ¿Qué es un nicho?

Es el **tipo de cliente y problema** al que le vendes, en vez de vender "de todo".
Ejemplos: dueños de perros que salen a pasear, gente que trabaja desde casa, mamás
primerizas, amantes del camping. Una tienda de nicho vende más porque el contenido,
las fotos y los productos le hablan a una sola persona, y es más fácil hacer videos.

Un buen nicho para empezar: te gusta o lo entiendes, tiene productos entre $8.000 y
$30.000 CLP que no se encuentran fácil en el retail chileno, y la gente sube videos sobre él.

## 3. ¿Dónde vender en Chile?

| Opción | Costo fijo | Ventaja | Ojo con |
|--------|-----------|---------|---------|
| Esta tienda + links de Mercado Pago | $0 | Sin mensualidad; pagas comisión solo al vender | La creas y mantienes tú |
| Shopify | 3 días gratis, luego ~US$1/mes por 3 meses; después ~US$29/mes con IVA | Tienda profesional, apps para importar productos de AliExpress y mandar pedidos automáticamente | Si a los 3 meses no vendes, cancela antes de que suba el precio |
| Mercado Libre | $0 por publicar; comisión por venta | La gente ya confía y compra rápido | Penaliza entregas lentas; envíos de 3 semanas dañan tu reputación |

## 4. El modelo de $0, paso a paso

| Paso | Qué hacer | Herramienta gratis |
|------|-----------|--------------------|
| Elegir nicho | 1 problema concreto (mascotas, cocina, escritorio, bebés…). Evita electrónica cara y marcas (réplicas = problemas legales). | TikTok, Google Trends |
| Encontrar productos | Margen de al menos 2–3× el costo, que no se vendan en cada tienda local, ligeros (envío barato). | AliExpress, CJ Dropshipping, mayoristas locales |
| Proveedor | Pide fotos/videos reales y tiempos de envío a tu país. Prueba con proveedores con muchas reseñas. | Chat del proveedor |
| Tienda | Este repositorio (o Facebook Marketplace / Instagram Shop directamente). | GitHub Pages |
| Tráfico | Contenido orgánico: 1–3 videos diarios mostrando el producto resolviendo el problema. Sin anuncios pagados al inicio. | TikTok, Reels, Marketplace, grupos de Facebook |
| Cobro | Link de pago o transferencia. **Cobra antes de comprar.** | Mercado Pago, transferencia bancaria |
| Compra al proveedor | Con el dinero del cliente, pon su dirección como destino. | Proveedor |
| Seguimiento | Envía el número de guía al cliente y responde rápido. | WhatsApp Business |

### Alternativa aún más segura: impresión bajo demanda
Printify / Printful tienen planes gratis: diseñas playeras, tazas, etc. (Canva gratis) y ellos
imprimen y envían solo cuando alguien compra. Sin problemas de copias ni de calidad desconocida.

## 5. Lo que sí debes saber

- **"Gratis" no significa sin esfuerzo**: sin anuncios, tu inversión es tiempo creando contenido.
  Cuenta con semanas antes de las primeras ventas.
- **Tiempos de envío**: desde China tarda 1–4 semanas. Dilo claramente antes de cobrar;
  el cliente molesto por la espera es la causa #1 de reembolsos.
- **Reembolsos**: si el producto llega mal, tú respondes ante el cliente, no el proveedor.
  Guarda un pequeño margen para cubrirlos.
- **Impuestos y aduanas**: al vender con regularidad debes iniciar actividades en el SII
  y emitir boletas. Las compras al extranjero pueden pagar IVA al llegar a Chile;
  inclúyelo en tu precio.
- **Ley del Consumidor**: en Chile las compras online tienen derecho a retracto y garantía;
  deja claros los plazos de envío y tu política de cambios en la tienda.
- **Pide una muestra** en cuanto tengas la primera venta (o compra una con esa ganancia)
  para comprobar la calidad.
- Nunca uses fotos o marcas de otras empresas sin permiso.

## Archivos

- `productos.js` — configuración de la tienda y catálogo (el único archivo que necesitas editar).
- `index.html`, `tienda.js`, `estilos.css` — la tienda.
- `assets/` — pon aquí tus propias fotos y úsalas como `imagen: "assets/mi-foto.jpg"`.
