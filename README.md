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

## Opcional: botón "Comprar ahora" con Mercado Pago

En tu cuenta de Mercado Pago crea un **link de pago** por producto (crearlo es gratis; cobran una
comisión solo cuando vendes) y pégalo en `linkPago`. Aparecerá un botón para pagar al instante.
Pide al cliente que te mande su dirección por WhatsApp después de pagar.

## Archivos

| Archivo | Para qué |
|---|---|
| `productos.js` | Datos de la tienda, categorías y productos. **Es el único que necesitas editar.** |
| `PLAN.md` | Estudio de mercado, proveedor, precios, videos y operación |
| `index.html`, `tienda.js`, `estilos.css` | La tienda |
| `assets/` | Tus fotos |
