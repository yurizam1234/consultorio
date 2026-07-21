// ===== MENÚ MÓVIL =====
document.querySelector('.burger').addEventListener('click', function() {
  const nav = document.querySelector('.nav-links');
  if (nav.style.display === 'flex') {
    nav.style.display = '';
  } else {
    nav.style.display = 'flex';
    nav.style.cssText += 'flex-direction:column;position:absolute;top:80px;left:0;right:0;background:#fff;padding:24px 28px;gap:16px;border-radius:0 0 24px 24px;box-shadow:0 20px 40px rgba(0,0,0,0.04);border-top:1px solid rgba(0,0,0,0.04);';
  }
});

// ===== DEMO BOOKER =====
const specChips = document.querySelectorAll('#specChips .chip');
const dayEls = document.querySelectorAll('#dayStrip .day');
const timeChips = document.querySelectorAll('#timeChips .chip');
const summary = document.getElementById('summaryText');
let state = { spec:'Oftalmología', day:'Jue 17', time:'09:00' };

function updateSummary(){
  summary.textContent = `${state.spec} · ${state.day} · ${state.time} hrs`;
}

specChips.forEach(c => c.addEventListener('click', () => {
  specChips.forEach(x => x.classList.remove('active'));
  c.classList.add('active');
  state.spec = c.dataset.spec;
  updateSummary();
}));

dayEls.forEach(d => d.addEventListener('click', () => {
  dayEls.forEach(x => x.classList.remove('active'));
  d.classList.add('active');
  state.day = d.dataset.day;
  updateSummary();
}));

timeChips.forEach(t => t.addEventListener('click', () => {
  timeChips.forEach(x => x.classList.remove('active'));
  t.classList.add('active');
  state.time = t.dataset.time;
  updateSummary();
}));

document.getElementById('confirmBtn').addEventListener('click', () => {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
});

// ===== FILTROS =====
document.querySelectorAll('#galTabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#galTabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    document.querySelectorAll('#gallery .tile').forEach(tile => {
      tile.style.display = (cat === 'todas' || tile.dataset.cat === cat) ? '' : 'none';
    });
  });
});

document.querySelectorAll('#teamTabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#teamTabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    document.querySelectorAll('#teamGrid .doc').forEach(doc => {
      doc.style.display = (doc.dataset.cat === cat) ? '' : 'none';
    });
  });
});

// ===== SCROLL REVEAL =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// ===== SLIDESHOW – EQUIPO =====
(function() {
  // Datos de los doctores (reutiliza los mismos nombres y especialidades)
  const doctors = [
    {
      name: 'Dr. Edgar A. Solano Tego',
      specialty: 'Oftalmología',
      desc: 'Especialista en diagnóstico y tratamiento visual con más de 12 años de experiencia.',
      exp: '12 años',
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80'
    },
    {
      name: 'Dr. Carlos D. Cabrera Reyes',
      specialty: 'Oftalmología',
      desc: 'Certificado en cirugía refractiva y manejo de patologías oculares complejas.',
      exp: '10 años',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80'
    },
    {
      name: 'Dr. Werner Schlie Villa',
      specialty: 'Cardiología',
      desc: 'Experto en prevención y tratamiento de enfermedades cardiovasculares.',
      exp: '15 años',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80'
    },
    {
      name: 'Dr. Nelson J. Urbina López',
      specialty: 'Medicina del dolor',
      desc: 'Manejo integral del dolor crónico y agudo con enfoque multidisciplinario.',
      exp: '8 años',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80'
    },
    {
      name: 'Dr. Rubén Bañuelos',
      specialty: 'Radiología',
      desc: 'Jefe de imagenología, especialista en resonancia magnética y tomografía.',
      exp: '14 años',
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80'
    }
  ];

  const track = document.getElementById('teamSlidesTrack');
  const dotsWrap = document.getElementById('teamDots');
  if (!track) return;

  let activeIndex = 0;
  let slideElements = [];
  let dotElements = [];

  // Construir slides
  function buildSlides() {
    track.innerHTML = '';
    dotsWrap.innerHTML = '';
    doctors.forEach((doc, index) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.dataset.index = index;
      slide.innerHTML = `
        <img src="${doc.img}" alt="${doc.name}" />
        <span class="badge-exp">${doc.exp}</span>
        <div class="caption">
          <div class="doc-name">${doc.name}</div>
          <div class="doc-specialty">${doc.specialty}</div>
          <p class="doc-desc">${doc.desc}</p>
        </div>
      `;
      track.appendChild(slide);
      slideElements.push(slide);

      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Ver a ${doc.name}`);
      dot.addEventListener('click', () => goToSlide(index));
      dotsWrap.appendChild(dot);
      dotElements.push(dot);
    });
  }

  // Mostrar el slide activo
  function updateSlideshow() {
    slideElements.forEach((slide, index) => {
      slide.classList.toggle('active', index === activeIndex);
    });
    dotElements.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  function goToSlide(index) {
    activeIndex = (index + doctors.length) % doctors.length;
    updateSlideshow();
  }

  // Controles (flechas)
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(activeIndex + 1));

  // Inicializar
  buildSlides();
  updateSlideshow();

  // Autoplay cada 5 segundos
  let autoplay = setInterval(() => goToSlide(activeIndex + 1), 5000);

  // Pausar autoplay al hacer hover
  const container = document.getElementById('teamSlideshow');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoplay));
    container.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goToSlide(activeIndex + 1), 5000);
    });
  }
})();

// ===== CINEMATIC HERO SLIDER – ÁREAS MÉDICAS =====
(function() {
  const medicalAreas = [
    {
      tagline: 'Diagnóstico por imagen',
      title: 'Imagenología',
      desc: 'Equipos de última generación para estudios de rayos X, tomografía, resonancia y ultrasonido con resultados precisos.',
      img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80'
    },
    {
      tagline: 'Salud visual',
      title: 'Oftalmología',
      desc: 'Diagnóstico y tratamiento visual con especialistas certificados en cirugía refractiva y patologías oculares complejas.',
      img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80'
    },
    {
      tagline: 'Resultados confiables',
      title: 'Laboratorio clínico',
      desc: 'Pruebas de laboratorio con tecnología de punta y entrega de resultados en 24 horas.',
      img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=80'
    },
    {
      tagline: 'Atención inmediata',
      title: 'Urgencias 24/7',
      desc: 'Personal capacitado y área equipada disponible los 365 días del año, a cualquier hora.',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80'
    },
    {
      tagline: 'Cirugía segura',
      title: 'Quirófanos',
      desc: 'Cinco quirófanos totalmente equipados con tecnología de punta para procedimientos seguros.',
      img: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200&q=80'
    }
  ];

  const slidesWrap = document.getElementById('medHeroSlides');
  const thumbRow = document.getElementById('medThumbRow');
  const taglineEl = document.getElementById('medTagline');
  const titleEl = document.getElementById('medTitle');
  const descEl = document.getElementById('medDesc');
  const counterEl = document.getElementById('medCounter');
  if (!slidesWrap) return;

  let activeIndex = 0;
  const slideElements = [];
  const thumbElements = [];

  // Construir slides de fondo y miniaturas
  function build() {
    slidesWrap.innerHTML = '';
    thumbRow.innerHTML = '';
    medicalAreas.forEach((area, index) => {
      const slide = document.createElement('div');
      slide.className = 'med-hero-slide';
      slide.innerHTML = `<img src="${area.img}" alt="${area.title}" />`;
      slidesWrap.appendChild(slide);
      slideElements.push(slide);

      const thumb = document.createElement('button');
      thumb.className = 'med-thumb';
      thumb.setAttribute('aria-label', area.title);
      thumb.innerHTML = `<img src="${area.img}" alt="${area.title}" />`;
      thumb.addEventListener('click', () => goToArea(index));
      thumbRow.appendChild(thumb);
      thumbElements.push(thumb);
    });
  }

  // Mostrar el área activa
  function update() {
    const area = medicalAreas[activeIndex];
    slideElements.forEach((slide, index) => slide.classList.toggle('active', index === activeIndex));
    thumbElements.forEach((thumb, index) => thumb.classList.toggle('active', index === activeIndex));
    if (taglineEl) taglineEl.textContent = area.tagline;
    if (titleEl) titleEl.textContent = area.title;
    if (descEl) descEl.textContent = area.desc;
    if (counterEl) counterEl.textContent = String(activeIndex + 1).padStart(2, '0');
  }

  function goToArea(index) {
    activeIndex = (index + medicalAreas.length) % medicalAreas.length;
    update();
  }

  // Controles (flechas circulares)
  const prevBtn = document.getElementById('medPrevBtn');
  const nextBtn = document.getElementById('medNextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => goToArea(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToArea(activeIndex + 1));

  // Inicializar
  build();
  update();

  // Autoplay cada 6 segundos
  let autoplay = setInterval(() => goToArea(activeIndex + 1), 6000);

  // Pausar autoplay al hacer hover
  const container = document.getElementById('medHeroSlider');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoplay));
    container.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goToArea(activeIndex + 1), 6000);
    });
  }
})();

// ===== BOTÓN FLOTANTE DE URGENCIAS =====
(function() {
  const wrap = document.getElementById('emergencyFloat');
  const btn = document.getElementById('emergencyBtn');
  if (!wrap || !btn) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) {
      wrap.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      wrap.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

// ===== MODAL: AGENDA TU CITA =====
(function() {
  const overlay = document.getElementById('citaModalOverlay');
  const closeBtn = document.getElementById('citaModalClose');
  const openTriggers = document.querySelectorAll('.js-open-cita');
  if (!overlay) return;

  function openModal(e) {
    if (e) e.preventDefault();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openTriggers.forEach(el => el.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();

// ===== CARRUSEL – TESTIMONIOS =====
(function() {
  const testimonials = [
    {
      quote: 'La atención fue excelente desde el primer contacto. Agendé mi cita en línea y me atendieron puntual, sin esperas.',
      name: 'Renata M.',
      role: 'Paciente de Medicina General',
      initials: 'RM'
    },
    {
      quote: 'El equipo de imagenología es de primer nivel. Tuve mis resultados en menos de 24 horas.',
      name: 'Carlos V.',
      role: 'Paciente de Imagenología',
      initials: 'CV'
    },
    {
      quote: 'Fui a urgencias un domingo y me atendieron de inmediato. Se nota que están preparados 24/7.',
      name: 'Daniela R.',
      role: 'Paciente de Urgencias',
      initials: 'DR'
    },
    {
      quote: 'Los doctores explican todo con calma y claridad. Me sentí escuchada en cada consulta.',
      name: 'Sofía L.',
      role: 'Paciente de Oftalmología',
      initials: 'SL'
    },
    {
      quote: 'Instalaciones limpias, modernas y personal muy amable. Totalmente recomendado.',
      name: 'Jorge A.',
      role: 'Paciente de Laboratorio',
      initials: 'JA'
    }
  ];

  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testiDots');
  if (!track) return;

  let activeIndex = 0;
  const cardElements = [];
  const dotElements = [];

  function build() {
    track.innerHTML = '';
    dotsWrap.innerHTML = '';
    testimonials.forEach((t, index) => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.innerHTML = `
        <div class="testi-stars">★★★★★</div>
        <p class="testi-quote">"${t.quote}"</p>
        <div class="testi-author">
          <div class="testi-avatar">${t.initials}</div>
          <div class="testi-author-info">
            <b>${t.name}</b>
            <span>${t.role}</span>
          </div>
        </div>
      `;
      track.appendChild(card);
      cardElements.push(card);

      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Ver testimonio de ${t.name}`);
      dot.addEventListener('click', () => goToSlide(index));
      dotsWrap.appendChild(dot);
      dotElements.push(dot);
    });
  }

  function update() {
    cardElements.forEach((card, index) => card.classList.toggle('active', index === activeIndex));
    dotElements.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
  }

  function goToSlide(index) {
    activeIndex = (index + testimonials.length) % testimonials.length;
    update();
  }

  const prevBtn = document.getElementById('testiPrevBtn');
  const nextBtn = document.getElementById('testiNextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(activeIndex + 1));

  build();
  update();

  let autoplay = setInterval(() => goToSlide(activeIndex + 1), 6000);

  const container = document.getElementById('testimonialCarousel');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoplay));
    container.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goToSlide(activeIndex + 1), 6000);
    });
  }
})();