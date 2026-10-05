# Plan de negocio: Casa en Orden

## 1. Estudio de mercado (octubre 2026)

**El mercado:** el ecommerce en Chile creció cerca de 15% real en el primer trimestre de 2026
y superó US$2.500 millones. Los chilenos compran por precio, pero ahora también valoran
**recibir rápido** y saber de dónde viene el producto.

**Nichos en boom en Chile para dropshipping:**

| Nicho | Margen típico | ¿Sirve para empezar con $0? |
|---|---|---|
| Hogar inteligente (enchufes, sensores, luces) | 30–50% | ❌ Los productos eléctricos necesitan certificación SEC para venderse en Chile |
| Belleza y skincare | 45–65% | ❌ Los cosméticos requieren registro en el ISP; vender sin él es riesgoso |
| Accesorios tecnológicos | 50–70% | ⚠️ Mucha competencia (retail y Mercado Libre venden lo mismo más barato) |
| Fitness en casa | 40–60% | ✅ Buena opción, sobre todo de octubre a diciembre |
| Mascotas | 30–50% | ✅ Buena opción, pero no es lo que quieres vender |
| **Hogar y organización** | 40–55% | ✅ **Elegido** |

**Por qué hogar y organización:**
- Es de las categorías que **más se venden en Chile** y la compra casi todo el mundo, no solo un grupo.
- Cada vez más gente vive en **departamentos chicos**: lo que ahorra espacio se vende solo.
- **El "antes y después" es de lo más viral** en TikTok e Instagram: un clóset desordenado que queda
  impecable en 15 segundos no necesita explicación.
- Los productos elegidos **no se enchufan, no son cosméticos ni alimentos**: no necesitas certificaciones.
- Ticket de $10.000 a $30.000: compra por impulso, y los packs suben el valor de cada pedido.
- **Temporada:** de octubre a diciembre la gente guarda la ropa de invierno, hace aseo de primavera
  y arregla la casa para las fiestas.

**Fechas clave:**
- **Cyber Monday: 5 al 7 de octubre de 2026.** Si ya tienes productos, aprovéchalo; si no, no te apures: viene más.
- Black Friday (fines de noviembre).
- Navidad: organizadores y packs se venden como regalo práctico.
- Fin de año: "ordena tu casa para empezar el año".

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

**Complementos del carrito ("Llévate también"):** los ganchos adhesivos cuestan $3.990 porque viajan
en el mismo paquete que otro producto. Compra los complementos al **mismo proveedor** que tus
productos principales. Si no, cada uno genera un envío aparte y pierdes plata.

**Fórmula de precio:**
```
precio de venta ≥ (precio proveedor + envío) × 1,6   → y redondea a ...990
```
Ejemplo: proveedor $5.000 + envío $3.500 = $8.500 × 1,6 = $13.600, entonces vende a **$13.990**.
Los `costo` de `productos.js` son **estimaciones**: confírmalos en Dropi antes de publicar.

**Contra entrega:** el cliente paga al recibir y tú no pones plata. Pero **si el cliente rechaza el
pedido, pierdes la venta** (fuentes de 2026 dicen que Dropi ya no cobra el flete de los rechazados;
revisa las condiciones vigentes en tu panel). Confirmando se reciben 65–78% de los pedidos; sin
confirmar, solo 50–60%. Por eso:
- Confirma **cada pedido** por WhatsApp antes de despacharlo ("Hola Ana, confirmamos tu pedido de...").
- Si no responde en 24 horas, no lo despaches.
- Prefiere transferencia o Mercado Pago: el dinero llega antes de despachar y no hay riesgo.

## 3. Tráfico gratis: plan de contenido

Tu publicidad son los videos. Regla: **mostrar el problema → el producto resolviéndolo → el precio.**

**Cuentas:** crea `@casaenorden.cl` (o el nombre que elijas) en TikTok e Instagram y en la bio
pon el link de tu tienda. Publica también cada producto en **Facebook Marketplace** y en grupos
de dueñas y dueños de casa, departamentos y "vendo/compro" de tu comuna.

**Ritmo:** 1 a 3 videos diarios de 10 a 20 segundos, grabados con el celular. Lo que más funciona es
el **antes y después en tu propia casa**. Si aún no tienes el producto, usa los videos del proveedor
(Dropi y AliExpress los incluyen) con tu voz o texto en pantalla.

**Guiones listos:**

| Producto | Gancho (primeros 2 segundos) | Qué mostrar |
|---|---|---|
| Bolsas al vacío | "Guardé TODA la ropa de invierno en un cajón" | Montaña de plumones → bomba manual → bolsa plana entrando al cajón |
| Organizador de cajones | "Mi cajón de calcetines antes y después" | Cajón revuelto → organizadores → todo a la vista |
| Organizadores de refrigerador | "Así se ordena un refri de verdad" | Refri desordenado → cajas transparentes por tipo → vista final |
| Picador manual | "Pica una cebolla en 5 segundos sin llorar" | Cebolla entera → 5 tirones de la cuerda → picada fina |
| Repisa de ducha adhesiva | "Sin taladro y aguanta todo" | Shampoos en el suelo → pegar la repisa → ducha ordenada |
| Organizador para puerta | "El espacio que no estabas usando" | Zapatos en el suelo → organizador detrás de la puerta |
| Cepillo de rieles | "Lo que hay en el riel de tu ventana 😳" | Riel sucio → 3 pasadas → riel limpio |

**Texto para cada publicación:**
> Envío a todo Chile incluido 🚚 Llega en 1 a 3 días. Pide por el link de la bio o escríbenos por WhatsApp.
> #orden #organizacion #hogarchile #departamento #tipsdeorden #santiago

**Semana a semana:**
- **Semana 1:** crea las cuentas y publica 2 videos diarios de las bolsas al vacío, el organizador de
  cajones y el picador (los más fáciles de mostrar).
- **Semana 2:** mira qué video tuvo más vistas y haz 5 versiones más de ese producto.
- **Semanas 3 y 4:** prueba el pack "Clóset Ordenado" y la serie "ordenando mi departamento".
- **Noviembre y diciembre:** Black Friday, "regalos prácticos para la casa" y "ordena tu casa antes de las fiestas".

## 4. Operación diaria (15 a 30 minutos)

1. Llega un pedido: si el cliente pagó en la web, aparece como **✅ pagado** en tu página de pedidos
   (README, "Tus pedidos") y te saltas el paso 2. Si eligió transferencia o contra entrega, te llega por WhatsApp.
2. Respondes confirmando y envías los datos de pago (o confirmas la dirección si es contra entrega).
3. Cuando el cliente paga, creas el pedido en Dropi con su nombre y dirección.
4. Cuando Dropi te da el número de seguimiento, se lo mandas al cliente.
5. Cuando llega, pídele una foto o video del antes y después en su casa. **Esas fotos son tu mejor publicidad**
   (pide permiso para publicarlas).

**Respuestas rápidas para WhatsApp Business** (Configuración → Herramientas → Respuestas rápidas):
- `/pago`: "¡Gracias por tu pedido! Puedes transferir a: [banco, tipo de cuenta, número, RUT, correo]. Envíanos el comprobante y lo despachamos hoy."
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
