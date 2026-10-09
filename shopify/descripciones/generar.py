# Genera las descripciones tipo "landing" de cada producto de DeptoListo.
# Uso: python3 generar.py descripciones.json  (crea el JSON y una vista previa .html)
import json, sys, html
OUT = sys.argv[1]

C_DARK = "#0f3d3e"; C_OK = "#16a34a"; C_SOFT = "#f1f7f6"; C_TXT = "#1f2937"

def banner(q, sub, checks):
    items = "".join(f'<li style="margin:6px 0;">✅ <strong>{c}</strong></li>' for c in checks)
    return (f'<div style="background:{C_DARK};color:#fff;border-radius:14px;padding:22px 18px;margin:0 0 18px;text-align:center;">'
            f'<p style="font-size:26px;line-height:1.2;font-weight:800;margin:0 0 8px;color:#fff;">{q}</p>'
            f'<p style="font-size:16px;margin:0 0 14px;color:#d1fae5;">{sub}</p>'
            f'<ul style="list-style:none;padding:0;margin:0 auto;display:inline-block;text-align:left;font-size:16px;color:#fff;">{items}</ul>'
            '</div>')

def badges():
    b = [("🚚","Envío GRATIS","a todo Chile"),("💳","Pago seguro","tarjeta con Flow"),("↩️","10 días","para arrepentirte")]
    cells = "".join(f'<div style="box-sizing:border-box;flex:1 1 30%;min-width:95px;background:{C_SOFT};border-radius:12px;padding:12px 6px;text-align:center;">'
                    f'<div style="font-size:24px;">{i}</div><div style="font-weight:800;color:{C_DARK};font-size:15px;">{t}</div>'
                    f'<div style="font-size:13px;color:{C_TXT};">{s}</div></div>' for i,t,s in b)
    return f'<div style="display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px;">{cells}</div>'

def pack():
    return (f'<div style="border:2px dashed {C_OK};border-radius:12px;padding:14px;margin:0 0 18px;text-align:center;background:#f0fdf4;">'
            f'<p style="margin:0;font-size:18px;font-weight:800;color:{C_OK};">🎁 Lleva 2 o más productos y ahorra 10%</p>'
            f'<p style="margin:4px 0 0;font-size:14px;color:{C_TXT};">El descuento se aplica solo en el carrito. Combina los productos que quieras.</p></div>')

def h2(t):
    return f'<h2 style="text-align:center;font-size:22px;font-weight:800;color:{C_DARK};margin:22px 0 12px;">{t}</h2>'

def benefits(title, items):
    body = "".join(f'<div style="margin:0 0 12px;"><p style="margin:0;font-weight:800;font-size:16px;color:{C_TXT};">✅ {t}</p>'
                   f'<p style="margin:2px 0 0 26px;color:#4b5563;">{d}</p></div>' for t,d in items)
    return h2(title) + body

def uses(title, items):
    cells = "".join(f'<div style="box-sizing:border-box;flex:1 1 45%;min-width:130px;background:{C_SOFT};border-radius:12px;padding:14px 8px;text-align:center;">'
                    f'<div style="font-size:28px;">{i}</div><div style="font-weight:700;color:{C_DARK};">{t}</div></div>' for i,t in items)
    return h2(title) + f'<div style="display:flex;flex-wrap:wrap;gap:8px;">{cells}</div>'

def timeline():
    steps = [("🛒","Haces tu pedido","hoy"),("📦","Lo despachamos","y te mandamos el seguimiento"),("🏠","Llega a tu casa","en 1 a 3 días hábiles")]
    cells = "".join(f'<div style="box-sizing:border-box;flex:1 1 30%;min-width:95px;text-align:center;"><div style="width:48px;height:48px;line-height:48px;margin:0 auto 6px;border-radius:50%;background:{C_DARK};font-size:22px;">{i}</div>'
                    f'<div style="font-weight:800;color:{C_TXT};font-size:14px;">{t}</div><div style="font-size:13px;color:#6b7280;">{s}</div></div>' for i,t,s in steps)
    return h2("Así llega tu pedido") + f'<div style="display:flex;flex-wrap:wrap;gap:8px;">{cells}</div>'

def includes(items):
    li = "".join(f'<li style="margin:4px 0;">{i}</li>' for i in items)
    return h2("Qué incluye") + f'<ul style="background:{C_SOFT};border-radius:12px;padding:14px 14px 14px 34px;margin:0;">{li}</ul>'

def faq(items):
    body = "".join(f'<details style="border:1px solid #e5e7eb;border-radius:10px;padding:12px 14px;margin:0 0 8px;">'
                   f'<summary style="font-weight:700;cursor:pointer;color:{C_TXT};">☑️ {q}</summary>'
                   f'<p style="margin:8px 0 0;color:#4b5563;">{a}</p></details>' for q,a in items)
    return h2("Preguntas frecuentes") + body

def cierre():
    return (f'<div style="background:{C_DARK};color:#fff;border-radius:14px;padding:18px;margin:22px 0 0;text-align:center;">'
            '<p style="margin:0;font-size:18px;font-weight:800;color:#fff;">🛡️ Compra protegida</p>'
            '<p style="margin:6px 0 0;color:#d1fae5;">Tienes 10 días para arrepentirte y 6 meses de garantía legal. '
            'Si tu producto llega con falla, te lo cambiamos o te devolvemos tu dinero.</p></div>')

FAQ_ENVIO = ("¿Cuánto cuesta el envío?", "Nada. El envío es gratis a todo Chile y llega en 1 a 3 días hábiles. Te mandamos el número de seguimiento apenas sale.")
FAQ_PAGO = ("¿Cómo pago?", "Con tarjeta de débito o crédito a través de Flow, una pasarela de pago chilena y segura.")

P = {
"15383709155519": dict(
  q="¿Tu terraza queda a oscuras en la noche?", sub="Ilumínala con energía solar, sin cables ni cuenta de la luz.",
  checks=["10 metros de luz de colores","Se carga sola con el sol","Sin enchufes ni alargadores"],
  ben=[("Se carga con el sol","El panel solar se carga de día y la manguera se enciende de noche. No pagas luz."),
       ("Sin cables ni enchufes","Lo instalas donde quieras: no necesitas alargadores ni electricista."),
       ("10 metros flexibles","La doblas y la acomodas en una baranda, un árbol, una reja o el borde de la terraza."),
       ("Ambiente para tus noches","Luces de colores para el verano, cumpleaños y las fiestas de fin de año.")],
  uses=[("🌿","Jardín"),("🏙️","Balcón"),("🌳","Árboles"),("🎄","Navidad")],
  inc=["1 manguera de luces LED de 10 metros","1 panel solar con estaca para enterrar en el jardín o en un macetero"],
  faq=[("¿Necesita enchufe o pilas?","No. Funciona solo con el panel solar."),
       ("¿Dónde pongo el panel?","Donde reciba sol directo durante el día. Mientras más sol recibe, más dura encendida en la noche."),
       FAQ_ENVIO, FAQ_PAGO]),
"15383713022143": dict(
  q="¿Quieres decorar para Navidad sin subir la cuenta de la luz?", sub="30 metros de luces que se cargan con el sol.",
  checks=["30 metros de luces tipo hada","Energía solar: no pagas luz","Cable fino que se adapta a todo"],
  ben=[("No gasta electricidad","El panel se carga de día y la guirnalda ilumina de noche. Sin enchufes ni pilas."),
       ("30 metros de largo","Alcanza para envolver un árbol completo, una baranda larga o el borde del techo."),
       ("Cable fino y flexible","Se adapta a ramas, rejas y plantas sin que se note."),
       ("Para todo el año","Navidad, Año Nuevo, cumpleaños y noches de verano en la terraza.")],
  uses=[("🎄","Árbol de Navidad"),("🏠","Fachada"),("🌿","Jardín"),("🏙️","Terraza")],
  inc=["1 guirnalda de luces LED de 30 metros","1 panel solar con estaca para enterrar en el jardín o en un macetero"],
  faq=[("¿Necesita enchufe o pilas?","No. Funciona solo con el panel solar."),
       ("¿Dónde pongo el panel?","Donde reciba sol directo durante el día. Mientras más sol recibe, más dura encendida en la noche."),
       FAQ_ENVIO, FAQ_PAGO]),
"15383714824383": dict(
  q="¿Otra vez buscando el destornillador por toda la casa?", sub="Todo lo básico para arreglar tu casa, en un solo estuche.",
  checks=["15 piezas en un estuche rígido","Cabe en cualquier cajón","Ideal para regalar"],
  ben=[("Todo en un solo lugar","Cada herramienta tiene su espacio en el estuche: ves al tiro si falta algo."),
       ("Para los arreglos de siempre","Colgar un cuadro, armar un mueble o apretar ese tornillo suelto."),
       ("Mangos cómodos","Mangos ergonómicos para trabajar sin que te duela la mano."),
       ("El regalo práctico","Perfecto para quien se va a su primer depto o como regalo de Navidad.")],
  uses=[("🖼️","Colgar cuadros"),("🪑","Armar muebles"),("🚪","Ajustar puertas"),("🎁","Regalo")],
  inc=["Destornilladores, alicate y huincha de medir, entre otras herramientas","Estuche rígido (15 piezas en total)"],
  faq=[("¿Sirve si nunca he usado herramientas?","Sí. Trae lo básico para los arreglos simples de la casa."),
       ("¿Sirve para regalo?","Sí, llega en su estuche y se ve ordenado al abrirlo."),
       FAQ_ENVIO, FAQ_PAGO]),
"15383715840191": dict(
  q="¿Tu cajón de cocina es un desorden?", sub="Todo lo que necesitas para cocinar, ordenado en un solo soporte.",
  checks=["19 piezas: cuchillos, tijeras y utensilios","No rayan tus sartenes","Soporte organizador incluido"],
  ben=[("Todo a mano","Los cuchillos van en su base y los utensilios en su vaso, sobre el mesón."),
       ("Cuidan tus ollas","Los utensilios son de silicona: no rayan sartenes ni ollas antiadherentes."),
       ("Se ve lindo","Diseño negro con mangos de madera que combina con cualquier cocina."),
       ("Equipa tu cocina de una vez","Ideal para tu primer depto o como regalo de Navidad.")],
  uses=[("🍳","Cocinar"),("🍲","Servir"),("🥩","Cortar"),("🎁","Regalo")],
  inc=["Set de cuchillos y tijeras de cocina","Utensilios de silicona: espátulas, cucharones, batidor, pinza y brocha, entre otros","Soporte organizador (19 piezas en total)"],
  faq=[("¿Rayan las ollas antiadherentes?","No. Los utensilios son de silicona."),
       ("¿Trae dónde guardarlos?","Sí, incluye el soporte para cuchillos y el vaso para los utensilios."),
       FAQ_ENVIO, FAQ_PAGO]),
"15383716790463": dict(
  q="¿Tu despensa está llena de paquetes abiertos?", sub="Ordénala y ve todo de un vistazo.",
  checks=["7 contenedores transparentes","Tapa con cierre de palanca","Se apilan y ahorran espacio"],
  ben=[("Ves todo al tiro","Son transparentes: sabes qué tienes y cuánto queda sin abrir cada paquete."),
       ("Se cierran con una mano","La tapa de palanca ayuda a mantener los alimentos frescos."),
       ("Ahorran espacio","Son cuadrados y apilables: ocupan menos que paquetes y frascos redondos."),
       ("4 tamaños","Uno alto para fideos largos y otros para granos, cereales y snacks.")],
  uses=[("🍝","Fideos"),("🍚","Arroz y legumbres"),("🥣","Cereales"),("🍪","Snacks")],
  inc=["2 contenedores de 0,5 L","2 contenedores de 0,8 L","2 contenedores de 1,2 L","1 contenedor alto de 1,9 L (ideal para fideos largos)"],
  faq=[("¿Caben los fideos largos?","Sí, en el contenedor alto de 1,9 L."),
       ("¿Se pueden apilar?","Sí, son cuadrados y se apilan para aprovechar la repisa."),
       FAQ_ENVIO, FAQ_PAGO]),
"15383717642431": dict(
  q="¿Se acabó el espacio y el mesón siempre mojado?", sub="Platos, tazas y cubiertos secándose ordenados en un solo lugar.",
  checks=["Zonas para platos, pocillos y tazas","Portacubiertos incluido","Bandeja que junta el agua"],
  ben=[("Sin charcos en el mesón","La bandeja recolectora junta el agua que escurre."),
       ("Todo de pie y ordenado","Zonas separadas para que nada se amontone mientras se seca."),
       ("Cubiertos aparte","Portacubiertos lateral para tenedores, cucharas, cuchillos y utensilios."),
       ("Se ve moderno","Diseño blanco que queda ordenado al lado del lavaplatos.")],
  uses=[("🍽️","5 platos"),("🥣","8 pocillos"),("☕","4 tazas"),("🍴","15 cubiertos")],
  inc=["Rejilla escurridora","Bandeja recolectora de agua","Portacubiertos"],
  faq=[("¿Cuánto le cabe?","Aproximadamente 8 pocillos, 5 platos, 4 tazas y 15 cubiertos."),
       ("¿Moja el mesón?","No, la bandeja recolectora junta el agua."),
       FAQ_ENVIO, FAQ_PAGO]),
"15388110127295": dict(  # Rociador giratorio 360° (Dropi 35054)
  q="¿Regar el jardín te quita tiempo todos los días?", sub="Riega solo mientras haces otra cosa.",
  checks=["Gira 360° y riega en círculo","3 brazos que reparten el agua","Funciona sin electricidad"],
  ben=[("Riega solo","Lo conectas a la manguera, abres la llave y el rociador gira repartiendo el agua."),
       ("Riego parejo","Sus 3 brazos giran 360° para regar todo alrededor, no solo un punto."),
       ("Sin instalación","Lo dejas sobre el pasto con su base circular y listo. Lo cambias de lugar cuando quieras."),
       ("Listo para el verano","Mantén tu pasto verde y tus plantas regadas cuando más calor hace.")],
  uses=[("🌱","Pasto"),("🌸","Flores"),("🥬","Huerto"),("🏡","Patio")],
  inc=["1 rociador giratorio de 3 brazos con base circular"],
  faq=[("¿Necesita electricidad?","No. Gira solo con la presión del agua de tu manguera."),
       ("¿Viene con manguera?","No. Se conecta a la manguera de jardín que ya tienes."),
       FAQ_ENVIO, FAQ_PAGO]),
"15388115566783": dict(  # Foco solar 20 LED con sensor (Dropi 26522)
  q="¿Llegas de noche y tu patio está a oscuras?", sub="Una luz que se enciende sola cuando pasas, sin cables ni cuenta de la luz.",
  checks=["20 LED de luz blanca","Sensor de movimiento","Se carga con el sol"],
  ben=[("Se enciende sola","Su sensor detecta el movimiento y prende la luz cuando alguien pasa."),
       ("No pagas luz","El panel solar se carga de día. No necesitas enchufes ni cables."),
       ("Fácil de instalar","Se cuelga en la pared y queda lista. No necesitas electricista."),
       ("Más seguridad","Ilumina la entrada, el pasillo o el patio cuando más lo necesitas.")],
  uses=[("🚪","Entrada"),("🚗","Estacionamiento"),("🌿","Patio"),("🧱","Pasillos")],
  inc=["1 foco solar de 20 LED con sensor de movimiento"],
  faq=[("¿Necesita enchufe o pilas?","No. Se carga con el panel solar que trae incorporado."),
       ("¿Dónde lo instalo?","En una pared donde le llegue sol directo durante el día. Mientras más sol recibe, más rinde en la noche."),
       FAQ_ENVIO, FAQ_PAGO]),
}

res = {}
for pid, d in P.items():
    h = (banner(d["q"], d["sub"], d["checks"]) + badges() + pack()
         + benefits("Por qué te va a encantar", d["ben"]) + uses("Ideal para", d["uses"])
         + timeline() + includes(d["inc"]) + faq(d["faq"]) + cierre())
    res[pid] = h
json.dump(res, open(OUT, "w"), ensure_ascii=False)
# preview page
with open(OUT.replace(".json", ".html"), "w") as f:
    f.write('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><body style="font-family:sans-serif;max-width:480px;margin:auto;padding:16px;">')
    f.write(res["15383716790463"])
print("ok", {k: len(v) for k, v in res.items()})
