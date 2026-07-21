// ===== PARALLAX + ENSAMBLADO HORIZONTAL + ONDA ECG (GSAP / ScrollTrigger) =====
(function () {
  // Si el CDN de GSAP falla (red, bloqueador, etc.) el contenido no debe quedar invisible.
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    document.querySelectorAll('[data-reveal]').forEach((el) => { el.style.opacity = '1'; });
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // el CSS ya deja todo visible sin animación

  gsap.registerPlugin(ScrollTrigger);

  // ===== AURORA DE FONDO: los tonos de la paleta se revelan a lo largo de todo el scroll =====
  const aurora = document.querySelector('.scroll-aurora');
  if (aurora) {
    gsap.to(aurora, {
      backgroundPosition: '100% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });
  }

  // ===== DIVISORES ECG ENTRE SECCIONES =====
  function buildEcgDividers() {
    const sections = Array.from(document.querySelectorAll('.landing-wrapper > section'));
    const dividers = [];
    sections.forEach((section, index) => {
      if (index === sections.length - 1) return; // sin divisor después de la última (footer)
      const divider = document.createElement('div');
      divider.className = 'ecg-divider';
      divider.innerHTML = '<svg viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">' +
        '<path class="ecg-path" d="M0,30 L210,30 L228,8 L246,52 L264,20 L282,30 L600,30" /></svg>';
      section.insertAdjacentElement('afterend', divider);
      dividers.push(divider);
    });
    return dividers;
  }

  const dividers = buildEcgDividers();

  dividers.forEach((divider) => {
    const path = divider.querySelector('.ecg-path');
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: divider,
        start: 'top 90%',
        end: 'top 35%',
        scrub: 0.6
      }
    });
  });

  // ===== PARALLAX DE SALIDA DEL HERO =====
  const heroInfo = document.querySelector('.hero-info');
  if (heroInfo) {
    gsap.fromTo(heroInfo,
      { x: 0, y: 0, opacity: 1 },
      {
        y: -70,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      }
    );
  }

  // La imagen 3D se mueve un poco más lento que el texto (profundidad de parallax)
  const heroWedge = document.querySelector('.hero-visual-3d');
  if (heroWedge) {
    gsap.fromTo(heroWedge,
      { x: 0, y: 0, opacity: 1 },
      {
        y: -40,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      }
    );
  }

  // ===== ENSAMBLADO HORIZONTAL: contenedores con varias tarjetas se arman en cascada =====
  const groupSelectors = ['.agenda-steps', '.diagonal-container', '.reasons-features'];
  const groupContainers = [];

  groupSelectors.forEach((sel) => {
    const container = document.querySelector(sel);
    if (!container) return;
    groupContainers.push(container);
    const items = Array.from(container.children);
    gsap.fromTo(items,
      { x: -70, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 0.6
        }
      }
    );
  });

  // ===== ENSAMBLADO HORIZONTAL: resto de bloques [data-reveal] como una sola pieza =====
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (el === heroInfo || el.closest('.hero')) return;
    if (el.closest('#citaModalOverlay')) return;
    if (groupContainers.some((c) => c.contains(el) || c === el)) return;

    gsap.fromTo(el,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 45%',
          scrub: 0.6
        }
      }
    );
  });

  // Las imágenes cargan de forma asíncrona y cambian alturas: recalculamos los triggers.
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
