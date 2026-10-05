#!/bin/sh
# Genera el .zip del tema para subirlo a Shopify (Tienda online → Temas → Agregar tema → Subir archivo zip).
# Las carpetas del tema deben quedar en la raíz del .zip, no dentro de otra carpeta.
cd "$(dirname "$0")/tema" && rm -f ../patas-contentas-tema-shopify.zip && zip -qr -X ../patas-contentas-tema-shopify.zip assets config layout locales sections snippets templates
echo "Listo: shopify/patas-contentas-tema-shopify.zip"
