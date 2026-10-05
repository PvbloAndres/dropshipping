/* ============================================================
   Tema Casa en Orden: carrito lateral, variantes, entrega estimada.
   window.tema (rutas, textos y plazo de entrega) se define en layout/theme.liquid.
   ============================================================ */

(() => {
  const { rutas, textos, entrega } = window.tema;

  /* ---------- Carrito lateral ---------- */

  const carrito = () => document.querySelector('[data-carrito-lateral]');

  function abrirCarrito() {
    const dialogo = carrito();
    if (dialogo && !dialogo.open) dialogo.showModal();
  }

  function cerrarCarrito() {
    const dialogo = carrito();
    if (dialogo?.open) dialogo.close();
  }

  // Vuelve a pedir el carrito renderizado por Shopify (Section Rendering API) y lo reemplaza.
  async function refrescarCarrito() {
    const respuesta = await fetch(`${rutas.raiz}?sections=carrito-lateral`);
    const secciones = await respuesta.json();
    const html = new DOMParser().parseFromString(secciones['carrito-lateral'], 'text/html');
    const nuevo = html.querySelector('[data-carrito-contenido]');
    const actual = document.querySelector('[data-carrito-contenido]');
    if (nuevo && actual) actual.replaceWith(nuevo);
    actualizarContador(Number(nuevo?.dataset.cantidadTotal || 0));
  }

  function actualizarContador(cantidad) {
    document.querySelectorAll('[data-contador-carrito]').forEach((contador) => {
      contador.textContent = cantidad;
      contador.hidden = cantidad === 0;
      contador.classList.remove('rebote');
      void contador.offsetWidth;
      contador.classList.add('rebote');
    });
  }

  function botonesDelForm(form) {
    return [...document.querySelectorAll(`[form="${form.id}"][type="submit"]`), ...form.querySelectorAll('[type="submit"]')];
  }

  document.addEventListener('submit', async (evento) => {
    const form = evento.target.closest('form[data-agregar-carrito]');
    if (!form) return;
    evento.preventDefault();

    const botones = botonesDelForm(form).filter((b) => !b.closest('.producto__compra-rapida'));
    const error = form.querySelector('[data-error-carrito]');
    botones.forEach((b) => b.setAttribute('aria-busy', 'true'));
    if (error) error.hidden = true;

    try {
      const respuesta = await fetch(`${rutas.carritoAgregar}.js`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.description || textos.errorCarrito);
      await refrescarCarrito();
      if (!form.hasAttribute('data-sin-abrir')) abrirCarrito();
    } catch (e) {
      if (error) {
        error.textContent = e.message || textos.errorCarrito;
        error.hidden = false;
      } else {
        alert(e.message || textos.errorCarrito);
      }
    } finally {
      botones.forEach((b) => b.removeAttribute('aria-busy'));
    }
  });

  document.addEventListener('click', async (evento) => {
    const abrir = evento.target.closest('[data-abrir-carrito]');
    if (abrir && carrito() && document.body.classList.contains('plantilla-cart') === false) {
      evento.preventDefault();
      abrirCarrito();
      return;
    }

    if (evento.target.closest('[data-cerrar-carrito]') || evento.target === carrito()) {
      cerrarCarrito();
      return;
    }

    const cambiar = evento.target.closest('[data-cambiar-linea]');
    if (cambiar) {
      cambiar.setAttribute('aria-busy', 'true');
      await fetch(`${rutas.carritoCambiar}.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ line: Number(cambiar.dataset.cambiarLinea), quantity: Number(cambiar.dataset.nuevaCantidad) }),
      });
      await refrescarCarrito();
    }
  });

  // Si el cliente vuelve con el botón "atrás", el carrito puede haber cambiado.
  window.addEventListener('pageshow', (evento) => {
    if (evento.persisted) refrescarCarrito();
  });

  /* ---------- Menú móvil ---------- */

  document.addEventListener('click', (evento) => {
    document.querySelectorAll('[data-menu-movil][open]').forEach((menu) => {
      if (!menu.contains(evento.target) || evento.target.closest('a')) menu.removeAttribute('open');
    });
  });

  /* ---------- Página de producto ---------- */

  document.querySelectorAll('[data-producto]').forEach((producto) => {
    const form = producto.querySelector('form[data-agregar-carrito]');
    const inputVariante = producto.querySelector('[data-variante-id]');
    const datosVariantes = producto.querySelector('[data-variantes]');
    const variantes = datosVariantes ? JSON.parse(datosVariantes.textContent) : [];
    const fotos = producto.querySelector('[data-fotos]');
    const miniaturas = producto.querySelectorAll('[data-ir-a]');

    // Galería: miniaturas y deslizamiento
    function irAFoto(idMedia) {
      const foto = fotos?.querySelector(`[data-media-id="${idMedia}"]`);
      if (foto) fotos.scrollTo({ left: foto.offsetLeft, behavior: 'smooth' });
    }
    miniaturas.forEach((miniatura) => miniatura.addEventListener('click', () => irAFoto(miniatura.dataset.irA)));
    if (fotos && miniaturas.length) {
      const observador = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            const id = entrada.target.dataset.mediaId;
            miniaturas.forEach((m) => m.setAttribute('aria-current', String(m.dataset.irA === id)));
          });
        },
        { root: fotos, threshold: 0.6 }
      );
      fotos.querySelectorAll('[data-media-id]').forEach((foto) => observador.observe(foto));
    }

    // Cantidad
    producto.querySelectorAll('[data-cantidad-cambiar]').forEach((boton) => {
      boton.addEventListener('click', () => {
        const input = boton.closest('[data-cantidad]').querySelector('input');
        input.value = Math.max(1, Math.min(Number(input.max) || 99, Number(input.value) + Number(boton.dataset.cantidadCambiar)));
      });
    });

    // Variantes: al elegir una opción se busca la variante y se vuelve a pedir el precio a Shopify
    function actualizarBotones(variante) {
      producto.querySelectorAll('[data-boton-agregar]').forEach((boton) => {
        boton.disabled = !variante || !variante.available;
        boton.textContent = !variante ? textos.noDisponible : variante.available ? textos.agregar : textos.agotado;
      });
    }

    producto.querySelectorAll('[data-opcion] input').forEach((input) => {
      input.addEventListener('change', async () => {
        const elegidas = [...producto.querySelectorAll('[data-opcion]')].map((grupo) => {
          const marcado = grupo.querySelector('input:checked');
          grupo.querySelector('[data-opcion-elegida]').textContent = marcado.value;
          return marcado.value;
        });
        const variante = variantes.find((v) => v.options.every((valor, i) => valor === elegidas[i]));
        actualizarBotones(variante);
        if (!variante) return;

        inputVariante.value = variante.id;
        history.replaceState(null, '', `${location.pathname}?variant=${variante.id}`);
        if (variante.featured_media) irAFoto(variante.featured_media.id);

        const respuesta = await fetch(`${location.pathname}?variant=${variante.id}&section_id=${producto.dataset.seccion}`);
        const html = new DOMParser().parseFromString(await respuesta.text(), 'text/html');
        const precioNuevo = html.querySelector('[data-precio-producto]');
        if (precioNuevo) producto.querySelector('[data-precio-producto]').innerHTML = precioNuevo.innerHTML;
        const barraNueva = html.querySelector('[data-barra-precio]');
        if (barraNueva) producto.querySelector('[data-barra-precio]').textContent = barraNueva.textContent;
      });
    });

    // Barra de compra fija en celulares: aparece cuando el botón principal sale de la pantalla
    const barra = producto.querySelector('[data-barra-compra]');
    const botonPrincipal = form?.querySelector('[data-boton-agregar]');
    if (barra && botonPrincipal) {
      new IntersectionObserver(([entrada]) => {
        const pasado = !entrada.isIntersecting && entrada.boundingClientRect.top < 0;
        barra.hidden = !pasado;
        document.body.classList.toggle('con-barra-compra', pasado);
      }).observe(botonPrincipal);
    }

    // Entrega estimada en días hábiles (lunes a viernes)
    const textoEntrega = producto.querySelector('[data-estimacion-entrega] span');
    if (textoEntrega && entrega.min) {
      textoEntrega.textContent = textoFechaEntrega();
    }
  });

  function sumarDiasHabiles(fecha, dias) {
    const resultado = new Date(fecha);
    let sumados = 0;
    while (sumados < dias) {
      resultado.setDate(resultado.getDate() + 1);
      const dia = resultado.getDay();
      if (dia !== 0 && dia !== 6) sumados += 1;
    }
    return resultado;
  }

  // Pedidos después de la hora de corte o en fin de semana se despachan el siguiente día hábil.
  function textoFechaEntrega() {
    const ahora = new Date();
    const finDeSemana = ahora.getDay() === 0 || ahora.getDay() === 6;
    const despacho = ahora.getHours() >= entrega.horaCorte || finDeSemana ? sumarDiasHabiles(ahora, 1) : ahora;
    const formato = new Intl.DateTimeFormat('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
    const desde = formato.format(sumarDiasHabiles(despacho, entrega.min));
    const hasta = formato.format(sumarDiasHabiles(despacho, entrega.max));
    return desde === hasta
      ? textos.entregaDia.replace('{dia}', desde)
      : textos.entregaRango.replace('{desde}', desde).replace('{hasta}', hasta);
  }

  /* ---------- Colección: ordenar ---------- */

  document.querySelectorAll('[data-ordenar] select').forEach((select) => {
    select.addEventListener('change', () => select.form.submit());
  });

  /* ---------- Productos relacionados ---------- */

  document.querySelectorAll('[data-recomendaciones]').forEach(async (seccion) => {
    const respuesta = await fetch(seccion.dataset.url);
    const html = new DOMParser().parseFromString(await respuesta.text(), 'text/html');
    const nueva = html.querySelector('[data-recomendaciones]');
    if (nueva && nueva.innerHTML.trim()) seccion.innerHTML = nueva.innerHTML;
  });
})();
