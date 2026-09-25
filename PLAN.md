# Plan de negocio: Patas Contentas

## 1. Estudio de mercado (septiembre 2026)

**El mercado:** el ecommerce en Chile creció cerca de 15% real en el primer trimestre de 2026
y superó US$2.500 millones. Los chilenos compran por precio, pero ahora también valoran
**recibir rápido** y saber de dónde viene el producto.

**Nichos en boom en Chile para dropshipping:**

| Nicho | Margen típico | ¿Sirve para empezar con $0? |
|---|---|---|
| Hogar inteligente (enchufes, sensores, luces) | 30–50% | ❌ Los productos eléctricos necesitan certificación SEC para venderse en Chile |
| Belleza y skincare | 45–65% | ❌ Los cosméticos requieren registro en el ISP; vender sin él es riesgoso |
| Accesorios tecnológicos | 50–70% | ⚠️ Mucha competencia (retail y Mercado Libre venden lo mismo más barato) |
| Fitness | 40–60% | ⚠️ Bien, pero más difícil de hacer viral |
| **Mascotas** | 30–50% | ✅ **Elegido** |

**Por qué mascotas:**
- En Latinoamérica es de los nichos que más crece, y los dueños gastan en sus mascotas como si fueran familia.
- **Los videos de perros y gatos son de lo más viral en TikTok e Instagram.** El tráfico gratis es tu única publicidad, así que esto pesa mucho.
- Los productos elegidos **no son eléctricos, no son alimentos y no son medicamentos**, así que no necesitas certificaciones.
- Hay compra repetida (bolsas, repuestos) y clientes que recomiendan.
- **Temporada:** viene la primavera (muda de pelo) y el verano (calor, paseos). Por eso el catálogo tiene cepillos, rodillos quita pelos, botellas y tapetes refrescantes.

**Fechas clave:**
- **Cyber Monday: 5 al 7 de octubre de 2026.** Ten 10+ videos publicados antes de esa fecha.
- Black Friday (fines de noviembre).
- Navidad: los regalos para mascotas se venden mucho en diciembre.

## 2. Proveedor: Dropi Chile (recomendado)

[Dropi](https://www.dropi.cl/) es gratis, no cobra mensualidad y tiene **bodegas en Chile**.
Eso significa despacho de **24 a 72 horas** por Chilexpress, Starken o Blue Express
(en vez de 3 semanas desde China) y la opción de **pago contra entrega**.

**Paso a paso:**
1. Regístrate gratis en dropi.cl como **dropshipper**.
2. Busca cada producto con el texto del campo `buscar` en `productos.js`.
3. Para cada producto, anota el **precio proveedor** y el **costo de envío** que muestra Dropi.
4. Actualiza `costo` y ajusta `precio` con la fórmula de abajo. Usa las fotos del proveedor en `assets/`.
5. Si un producto no está en Dropi, búscalo en AliExpress (despacho lento: cambia `plazoEntrega`)
   o reemplázalo por otro del catálogo de Dropi del mismo nicho.

**Fórmula de precio:**
```
precio de venta ≥ (precio proveedor + envío) × 1,6   → y redondea a ...990
```
Ejemplo: proveedor $5.000 + envío $3.500 = $8.500 × 1,6 = $13.600, entonces vende a **$13.990**.
Los `costo` de `productos.js` son **estimaciones**: confírmalos en Dropi antes de publicar.

**Contra entrega:** el cliente paga al recibir y tú no pones plata. Pero **si el cliente rechaza el
pedido, el envío de ida y vuelta se descuenta de tu saldo**. Por eso:
- Confirma **cada pedido** por WhatsApp antes de despacharlo ("Hola Ana, confirmamos tu pedido de...").
- Si no responde en 24 horas, no lo despaches.
- Prefiere transferencia o Mercado Pago: el dinero llega antes de despachar y no hay riesgo.

## 3. Tráfico gratis: plan de contenido

Tu publicidad son los videos. Regla: **mostrar el problema → el producto resolviéndolo → el precio.**

**Cuentas:** crea `@patascontentas.cl` (o el nombre que elijas) en TikTok e Instagram y en la bio
pon el link de tu tienda. Publica también cada producto en **Facebook Marketplace** y en grupos
de mascotas de tu ciudad.

**Ritmo:** 1 a 3 videos diarios de 10 a 20 segundos. Lo que más funciona son los videos con tu propia
mascota o la de un amigo, grabados con el celular. Si aún no tienes el producto, usa los videos del
proveedor (Dropi y AliExpress los incluyen) con tu voz o texto en pantalla.

**Guiones listos:**

| Producto | Gancho (primeros 2 segundos) | Qué mostrar |
|---|---|---|
| Rodillo quita pelos | "Mi sillón después de 1 día con mi perro…" | Sillón lleno de pelos → 5 pasadas → abre el depósito lleno de pelo |
| Cepillo autolimpiante | "La muda de primavera llegó 😩" | Cepillar → apretar el botón → sale una bola enorme de pelo |
| Botella de paseo | "Deja de llevar un plato para el agua" | En la plaza: aprieta, toma agua, suelta y el agua vuelve |
| Tapete refrescante | "Así duerme mi perro con 30 grados" | Perro acalorado → se acuesta en el tapete y se relaja |
| Alfombra olfativa | "El juego que más cansa a mi perro" | Esconder premios → perro buscando concentrado |
| Plato lento | "Mi perro se comía todo en 20 segundos" | Cronómetro: plato normal vs plato lento |
| Varita para gatos | "Ningún gato puede ignorar esto" | Gato saltando y persiguiendo las plumas |

**Texto para cada publicación:**
> Envío a todo Chile incluido 🚚 Llega en 1 a 3 días. Pide por el link de la bio o escríbenos por WhatsApp 🐾
> #perroschile #gatoschile #mascotaschile #santiago #tipsperros

**Semana a semana:**
- **Semana 1 (hasta el 4 de octubre):** crea las cuentas, publica 2 videos diarios de rodillo, cepillo y botella (los más fáciles de mostrar).
- **Semana 2 (Cyber Monday, 5 al 7 de octubre):** anuncia "Envío gratis + regalo (1 rollo de bolsas) por Cyber". Solo ofrece lo que realmente das.
- **Semanas 3 y 4:** mira qué video tuvo más vistas y haz 5 versiones más de ese producto. Deja de publicar los que no funcionan.
- **Noviembre y diciembre:** Black Friday y "Regalos de Navidad para tu mascota".

## 4. Operación diaria (15 a 30 minutos)

1. Llega un pedido por WhatsApp con el detalle del carrito.
2. Respondes confirmando y envías los datos de pago (o confirmas la dirección si es contra entrega).
3. Cuando el cliente paga, creas el pedido en Dropi con su nombre y dirección.
4. Cuando Dropi te da el número de seguimiento, se lo mandas al cliente.
5. Cuando llega, pídele una foto o video de su mascota con el producto. **Esas fotos son tu mejor publicidad**
   (pide permiso para publicarlas).

**Respuestas rápidas para WhatsApp Business** (Configuración → Herramientas → Respuestas rápidas):
- `/pago`: "¡Gracias por tu pedido! 🐾 Puedes transferir a: [banco, tipo de cuenta, número, RUT, correo]. Envíanos el comprobante y lo despachamos hoy."
- `/confirmo`: "¡Pago recibido! Tu pedido sale en las próximas 24 horas. Te mando el seguimiento apenas lo tenga."
- `/seguimiento`: "Tu pedido va en camino 🚚 Número de seguimiento: ____ en ____."

## 5. Legal y números

- **Boletas:** cuando empieces a vender con regularidad, inicia actividades en el SII (es gratis y
  en línea) y emite boletas electrónicas desde el portal del SII sin costo.
- **Ley del Consumidor:** las compras online tienen derecho a retracto (10 días) y garantía legal.
  La tienda ya lo informa en Preguntas frecuentes, y debes cumplirlo.
- **Cuenta para recibir pagos:** abre una cuenta gratis (CuentaRUT, MACH o Tenpo) solo para el negocio,
  así llevas las cuentas separadas.
- **Registra cada venta** en una planilla: fecha, producto, precio, costo, ganancia. Si un producto
  deja menos de $4.000 de ganancia por venta, sube el precio o cámbialo.

## Fuentes
- [CCS: eCommerce en Chile 2026](https://www.ccs.cl/ecommerce/ecommerce-chile-2026-crecimiento-tendencias/)
- [CCS: comercio electrónico superó US$2.500 millones en el primer trimestre de 2026](https://www.ccs.cl/ecommerce/comercio-electronico-chile-us2500-millones-primer-trimestre-2026/)
- [Dropi: dropshipping en Chile 2026](https://dropi.cl/blog/dropshipping-chile/)
- [Dropi Chile](https://www.dropi.cl/)
- [Wiio: nichos más rentables en Latinoamérica 2026](https://wiio.com/es/the-most-profitable-dropshipping-niches-in-latam-for-2026/)
- [El Mostrador: fecha de Cyber Monday 2026](https://www.elmostrador.cl/datos-utiles/2026/09/21/cybermonday-2026-revisa-la-fecha-y-hora-de-inicio-de-las-ofertas/)
