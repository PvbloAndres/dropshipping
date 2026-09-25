# Patas Contentas: tienda de dropshipping con $0

Tienda en línea gratuita de accesorios para perros y gatos, pensada para Chile.
Los clientes arman su carrito y el pedido te llega a WhatsApp. Cobras primero (transferencia o
Mercado Pago) o usas pago contra entrega con Dropi, y el proveedor despacha. No pones dinero propio.

📋 **El estudio de mercado, el proveedor, el plan de contenido y la operación diaria están en [PLAN.md](PLAN.md).**

## Ponla en línea (10 minutos)

1. **Configura tus datos** en `productos.js`:
   - `whatsapp`: tu número con 56 adelante, solo dígitos (ej: `56912345678`).
   - `instagram` y `tiktok`: tu usuario sin @.
   - Si cambias el nombre de la tienda, cámbialo también en las primeras líneas de `index.html`
     (`<title>` y `og:title`), que es lo que muestra WhatsApp al compartir el link.
2. **Confirma precios y costos** en Dropi (ver [PLAN.md](PLAN.md) sección 2) y ajusta cada producto.
3. **Fotos:** guárdalas en `assets/` y pon en el producto `imagen: "assets/nombre.jpg"`.
   Mientras no haya foto se muestra un emoji.
4. **Publica gratis en GitHub Pages:**
   1. En GitHub: **Settings → General → Danger Zone → Change visibility → Public**
      (GitHub Pages gratis solo funciona con repositorios públicos).
   2. **Settings → Pages → Build and deployment → Source: Deploy from a branch**, elige la rama
      `claude/practical-dirac-cs672v` y la carpeta `/ (root)`, y guarda.
   3. En 1 o 2 minutos tu tienda estará en `https://pvbloandres.github.io/dropshipping/`.
5. Pon ese link en la bio de TikTok e Instagram.

Para probarla en tu computadora abre `index.html` en el navegador.

## Cobrar en la web (Mercado Pago)

Con esto el cliente paga en la tienda con tarjeta, débito o transferencia, y tú recibes el dinero
**antes** de comprarle al proveedor. Todo es gratis salvo la comisión de Mercado Pago por cada venta.

El pago necesita un pequeño servidor privado (`pagos/worker.js`) que guarda tu clave secreta de
Mercado Pago y calcula el total con los precios de `productos.js`, para que nadie pueda cambiar un
precio desde el navegador. Corre gratis en Cloudflare Workers.

### Paso 1: clave de Mercado Pago
1. Entra a **mercadopago.cl/developers** con tu cuenta de Mercado Pago y ve a **Tus integraciones → Crear aplicación**.
   Elige **Pagos online** y **Checkout Pro**.
2. En la aplicación, abre **Credenciales de producción** y actívalas. En **Sitio web** pon
   `https://pvbloandres.github.io/dropshipping/`.
3. Copia el **Access Token** (empieza con `APP_USR-`). **Es secreto: no lo pegues en la tienda ni lo compartas.**

### Paso 2: servidor gratis en Cloudflare
1. Crea una cuenta gratis en **dash.cloudflare.com**.
2. Ve a **Workers & Pages → Create → Create Worker**, ponle de nombre `patas-pagos` y toca **Deploy**.
3. Toca **Edit code**, borra todo, pega el contenido de `pagos/worker.js` y toca **Deploy**.
4. Ve a **Storage & Databases → KV → Create** y crea un espacio llamado `pedidos`.
5. Vuelve a tu worker → **Settings → Bindings → Add → KV namespace**. En nombre de variable escribe
   `PEDIDOS` y elige `pedidos`.
6. En **Settings → Variables and Secrets** agrega:
   - `TIENDA_URL` (tipo Text): `https://pvbloandres.github.io/dropshipping/`
   - `MP_ACCESS_TOKEN` (tipo Secret): tu Access Token del paso 1
   - `CLAVE_ADMIN` (tipo Secret): una contraseña que inventes para ver tus pedidos
7. Copia la dirección de tu worker (algo como `https://patas-pagos.tu-usuario.workers.dev`).

### Paso 3: conectar la tienda
En `productos.js` pega esa dirección en `urlPagos`. Desde ese momento el carrito muestra
**"Pagar ahora"** y, al pagar, el cliente vuelve a la tienda con la confirmación.

### Tus pedidos
Abre `https://patas-pagos.tu-usuario.workers.dev/pedidos?clave=TU_CLAVE_ADMIN` (guárdalo en favoritos).
Verás cada pedido con nombre, teléfono, dirección, productos y estado. **Despacha solo los que dicen
"✅ pagado"**: ese estado lo confirma Mercado Pago directamente, no el navegador del cliente.

**Prueba antes de anunciar:** pide a un amigo que compre el producto más barato con su tarjeta
(Mercado Pago no deja pagarte a ti mismo), revisa que aparezca como pagado y devuélvele el dinero
desde tu cuenta de Mercado Pago.

## Opcional: botón "Comprar ahora" con Mercado Pago

En tu cuenta de Mercado Pago crea un **link de pago** por producto (crearlo es gratis; cobran una
comisión solo cuando vendes) y pégalo en `linkPago`. Aparecerá un botón para pagar al instante.
Pide al cliente que te mande su dirección por WhatsApp después de pagar.

## Archivos

| Archivo | Para qué |
|---|---|
| `pagos/worker.js` | Servidor de cobro en línea (se copia a Cloudflare, ver "Cobrar en la web") |
| `productos.js` | Datos de la tienda, categorías y productos. **Es el único que necesitas editar.** |
| `PLAN.md` | Estudio de mercado, proveedor, precios, videos y operación |
| `index.html`, `tienda.js`, `estilos.css` | La tienda |
| `assets/` | Tus fotos |
