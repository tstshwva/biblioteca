// JavaScript: interacciones de la página.
function conocerMas() {
  const servicios = document.getElementById('servicios');
  servicios.setAttribute('tabindex', '-1');
  servicios.focus({ preventScroll: true });
  servicios.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start'
  });
}

function mostrarMensaje() {
  alert('¡Bienvenido a Entre Líneas! Explora nuestros servicios y regístrate para comenzar tu próxima historia.');
}

function cambiarTexto() {
  document.getElementById('mensaje').textContent = '¡JavaScript modificó esta página! Cada libro abre una nueva posibilidad.';
}

function cambiarColor() {
  const activo = document.body.classList.toggle('color-alternativo');
  document.getElementById('boton-color').setAttribute('aria-pressed', String(activo));
}

// Cada tarjeta selecciona su servicio en el formulario.
document.querySelectorAll('[data-servicio]').forEach(function (boton) {
  boton.addEventListener('click', function () {
    document.getElementById('servicio').value = boton.dataset.servicio;
    document.getElementById('registro').scrollIntoView();
    document.getElementById('nombre').focus({ preventScroll: true });
  });
});

document.getElementById('formulario').addEventListener('submit', function (evento) {
  evento.preventDefault();
  const nombre = document.getElementById('nombre');
  if (!nombre.value.trim()) {
    nombre.setCustomValidity('Escribe tu nombre.');
    nombre.reportValidity();
    return;
  }
  const servicio = document.getElementById('servicio');
  document.getElementById('resultado').textContent = '¡Gracias, ' + nombre.value.trim() + '! Completaste el registro de demostración para ' + servicio.options[servicio.selectedIndex].text.toLowerCase() + '. No se enviaron ni guardaron tus datos.';
});
document.getElementById('nombre').addEventListener('input', function () {
  this.setCustomValidity('');
});

// Revela cada bloque una sola vez cuando entra en la pantalla.
// Sin soporte del navegador o con movimiento reducido, todo sigue visible.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.titulo-seccion, .tarjeta, .registro, .interactiva, footer').forEach(function (elemento) {
    elemento.classList.add('revelar');
    observador.observe(elemento);
    // La navegación con teclado también revela el bloque inmediatamente.
    elemento.addEventListener('focusin', function () {
      elemento.classList.add('visible');
      observador.unobserve(elemento);
    });
  });
}
