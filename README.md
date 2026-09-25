# Dropshipping sin gastar dinero

Tienda en línea gratuita (HTML + JS, sin servidor) y guía para empezar dropshipping con $0.
Los pedidos llegan a tu WhatsApp con el detalle del carrito; tú cobras **primero** y después
compras al proveedor con el dinero del cliente. Así nunca pones dinero propio.

## 1. Publica la tienda gratis (GitHub Pages)

1. Edita `productos.js`: nombre de la tienda, tu número de WhatsApp y tus productos.
2. En GitHub: **Settings → Pages → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. En 1–2 minutos tu tienda estará en `https://<tu-usuario>.github.io/dropshipping/`.

Para probarla en tu computadora basta con abrir `index.html` en el navegador.

## 2. El modelo de $0, paso a paso

| Paso | Qué hacer | Herramienta gratis |
|------|-----------|--------------------|
| Elegir nicho | 1 problema concreto (mascotas, cocina, escritorio, bebés…). Evita electrónica cara y marcas (réplicas = problemas legales). | TikTok, Google Trends |
| Encontrar productos | Margen de al menos 2–3× el costo, que no se vendan en cada tienda local, ligeros (envío barato). | AliExpress, CJ Dropshipping, mayoristas locales |
| Proveedor | Pide fotos/videos reales y tiempos de envío a tu país. Prueba con proveedores con muchas reseñas. | Chat del proveedor |
| Tienda | Este repositorio (o Facebook Marketplace / Instagram Shop directamente). | GitHub Pages |
| Tráfico | Contenido orgánico: 1–3 videos diarios mostrando el producto resolviendo el problema. Sin anuncios pagados al inicio. | TikTok, Reels, Marketplace, grupos de Facebook |
| Cobro | Transferencia, link de pago o contra entrega local. **Cobra antes de comprar.** | Mercado Pago, PayPal, transferencia bancaria |
| Compra al proveedor | Con el dinero del cliente, pon su dirección como destino. | Proveedor |
| Seguimiento | Envía el número de guía al cliente y responde rápido. | WhatsApp Business |

### Alternativa aún más segura: impresión bajo demanda
Printify / Printful tienen planes gratis: diseñas playeras, tazas, etc. (Canva gratis) y ellos
imprimen y envían solo cuando alguien compra. Sin problemas de copias ni de calidad desconocida.

## 3. Lo que sí debes saber

- **"Gratis" no significa sin esfuerzo**: sin anuncios, tu inversión es tiempo creando contenido.
  Cuenta con semanas antes de las primeras ventas.
- **Tiempos de envío**: desde China tarda 1–4 semanas. Dilo claramente antes de cobrar;
  el cliente molesto por la espera es la causa #1 de reembolsos.
- **Reembolsos**: si el producto llega mal, tú respondes ante el cliente, no el proveedor.
  Guarda un pequeño margen para cubrirlos.
- **Impuestos y aduanas**: al empezar a vender con regularidad, regístrate como vendedor
  según las reglas de tu país. Algunos paquetes pueden pagar impuestos de importación.
- **Pide una muestra** en cuanto tengas la primera venta (o compra una con esa ganancia)
  para comprobar la calidad.
- Nunca uses fotos o marcas de otras empresas sin permiso.

## Archivos

- `productos.js` — configuración de la tienda y catálogo (el único archivo que necesitas editar).
- `index.html`, `tienda.js`, `estilos.css` — la tienda.
- `assets/` — pon aquí tus propias fotos y úsalas como `imagen: "assets/mi-foto.jpg"`.
