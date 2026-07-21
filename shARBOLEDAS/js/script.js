// ===== IDIOMA (ES / EN) =====
let currentLang = localStorage.getItem('shArboledasLang') || 'es';
window.__i18nRebuilders = [];

const translations = {
  es: {
    'nav.servicios': 'Servicios', 'nav.agendar': 'Cómo agendar', 'nav.instalaciones': 'Instalaciones', 'nav.equipo': 'Equipo', 'nav.contacto': 'Contacto',
    'hero.eyebrow': 'Hospital · Diagnóstico por imagen · Urgencias 24/7',
    'hero.h1': 'Claridad, desde <em>la primera cita.</em>',
    'hero.lead': 'Agenda en línea con especialistas certificados, estudios de imagenología de alta precisión y atención de urgencias los 365 días del año, en Tuxtla Gutiérrez.',
    'hero.cta1': 'Agendar mi cita', 'hero.cta2': 'Conocer especialidades',
    'hero.stat1': 'QUIRÓFANOS EQUIPADOS', 'hero.stat2': 'ESPECIALISTAS', 'hero.stat3': 'URGENCIAS TODO EL AÑO', 'hero.stat4': 'ENTREGA DE RESULTADOS',
    'nosotros.badge': 'Años de experiencia', 'nosotros.eyebrow': 'SH Arboledas',
    'nosotros.h2': 'Un equipo médico en el que puedes confiar',
    'nosotros.lead': 'Por más de una década hemos acompañado a familias de Tuxtla Gutiérrez con diagnósticos precisos, especialistas certificados y tecnología de punta — porque tu salud merece claridad, no incertidumbre.',
    'nosotros.point1': 'Especialistas certificados en cada área médica',
    'nosotros.point2': 'Equipos de diagnóstico de última generación',
    'nosotros.point3': 'Acompañamiento cercano en cada etapa de tu atención',
    'servicios.badge': 'Áreas médicas', 'servicios.title': 'Todo lo que tu salud necesita, bajo un mismo techo.',
    'servicios.desc': 'Instalaciones modernas y personal especializado en diagnóstico, cirugía y atención integral.', 'servicios.ver_todo': 'Ver todo',
    'agendar.badge': 'Agenda en línea', 'agendar.title': 'Tres pasos, sin filas ni llamadas.',
    'agendar.desc': 'Diseñado para que cualquier paciente, sin importar su experiencia con la tecnología, agende su cita en menos de dos minutos.',
    'agendar.step1_title': 'Elige especialidad',
    'agendar.step1_desc': 'Selecciona el área médica y, si lo sabes, el motivo de tu consulta. Te mostramos horarios reales del especialista.',
    'agendar.step2_title': 'Elige fecha y hora',
    'agendar.step2_desc': 'Un calendario simple con disponibilidad real. Sin llamadas, sin esperar a que alguien te conteste.',
    'agendar.step3_title': 'Confirma y listo',
    'agendar.step3_desc': 'Recibe confirmación por WhatsApp o correo, con recordatorio automático 24 horas antes de tu cita.',
    'agendar.note': 'Tu historial de estudios y citas queda disponible en tu cuenta, para consultarlo cuando lo necesites.',
    'reasons.eyebrow': 'Por qué escogernos', 'reasons.title': 'Motivos para confiar tu salud a SH Arboledas',
    'reasons.desc': 'Combinamos experiencia clínica, tecnología de punta y un trato cercano para que cada visita te dé certeza, no dudas.',
    'reasons.feature1': 'Especialistas certificados', 'reasons.feature2': 'Tecnología de punta', 'reasons.feature3': 'Urgencias 24/7',
    'reasons.feature4': 'Resultados en 24h', 'reasons.feature5': 'Atención personalizada', 'reasons.feature6': 'Instalaciones modernas',
    'reasons.cta': 'Conocer nuestras áreas médicas',
    'instalaciones.eyebrow': 'Instalaciones', 'instalaciones.title': 'Infraestructura pensada para diagnósticos precisos.',
    'instalaciones.desc': 'Pasa el cursor sobre cada imagen para descubrir nuestros espacios.',
    'instalaciones.panel1_title': 'Consultorios privados', 'instalaciones.panel1_desc': 'Espacios acogedores para una atención personalizada y confidencial.', 'instalaciones.panel1_tag': '🔬 Diagnóstico',
    'instalaciones.panel2_title': 'Área de diagnóstico', 'instalaciones.panel2_desc': 'Equipos de última generación para estudios precisos y rápidos.', 'instalaciones.panel2_tag': '📡 Imagenología',
    'instalaciones.panel3_title': 'Sala de espera', 'instalaciones.panel3_desc': 'Ambiente relajante con luz natural, áreas verdes y confort.', 'instalaciones.panel3_tag': '🛋️ Confort',
    'instalaciones.panel4_title': 'Quirófanos', 'instalaciones.panel4_desc': 'Cinco quirófanos totalmente equipados con tecnología de punta.', 'instalaciones.panel4_tag': '🏥 Cirugía',
    'instalaciones.panel5_title': 'Urgencias 24/7', 'instalaciones.panel5_desc': 'Personal capacitado y área equipada disponible todos los días del año.', 'instalaciones.panel5_tag': '🚨 Atención inmediata',
    'equipo.eyebrow': 'Nuestro equipo', 'equipo.title': 'Las personas detrás de tu atención',
    'equipo.desc': 'Médicos con amplia experiencia y vocación de servicio.',
    'testimonios.eyebrow': 'Testimonios', 'testimonios.title': 'Qué piensan los pacientes de nosotros',
    'contacto.eyebrow': 'Contacto', 'contacto.title': 'Estamos cerca. Escríbenos o visítanos.',
    'contact.form_title': 'Contáctanos', 'contact.form_subtitle': 'Escríbenos y te ayudamos a resolver tus dudas.',
    'contact.label_name': 'Nombre completo', 'contact.label_phone': 'Teléfono', 'contact.label_message': 'Mensaje',
    'contact.message_placeholder': '¿En qué podemos ayudarte?', 'contact.submit': 'Enviar mensaje',
    'footer.desc': 'Hospital y centro de diagnóstico en Tuxtla Gutiérrez, Chiapas. Atención integral, urgencias 24/7 e imagenología de alta precisión.',
    'emergency.label': '¿Es una urgencia?', 'emergency.call': 'Llamar ahora — 961 602 9586', 'emergency.whatsapp': 'Escribir por WhatsApp',
    'float.agendar': 'Agendar cita',
    'modal.title': 'Agenda tu cita', 'modal.demo_badge': 'DEMO', 'modal.step1_label': '1 · Especialidad', 'modal.step2_label': '2 · Fecha', 'modal.step3_label': '3 · Horario',
    'modal.tagline': 'Tu cita', 'modal.confirm_btn': 'Confirmar cita', 'modal.toast': '✓ Cita agendada — confirmación enviada por WhatsApp',
    'aria.open_menu': 'Abrir menú', 'aria.close_modal': 'Cerrar',
    'aria.prev_area': 'Área anterior', 'aria.next_area': 'Área siguiente',
    'aria.prev_doctor': 'Doctor anterior', 'aria.next_doctor': 'Doctor siguiente',
    'aria.prev_testimonial': 'Testimonio anterior', 'aria.next_testimonial': 'Testimonio siguiente'
  },
  en: {
    'nav.servicios': 'Services', 'nav.agendar': 'How to book', 'nav.instalaciones': 'Facilities', 'nav.equipo': 'Team', 'nav.contacto': 'Contact',
    'hero.eyebrow': 'Hospital · Imaging diagnostics · 24/7 Emergency care',
    'hero.h1': 'Clarity, from <em>the first visit.</em>',
    'hero.lead': 'Book online with certified specialists, high-precision imaging studies, and emergency care 365 days a year, in Tuxtla Gutiérrez.',
    'hero.cta1': 'Book my appointment', 'hero.cta2': 'See specialties',
    'hero.stat1': 'EQUIPPED OPERATING ROOMS', 'hero.stat2': 'SPECIALISTS', 'hero.stat3': 'YEAR-ROUND EMERGENCY CARE', 'hero.stat4': 'RESULTS DELIVERY',
    'nosotros.badge': 'Years of experience', 'nosotros.eyebrow': 'SH Arboledas',
    'nosotros.h2': 'A medical team you can trust',
    'nosotros.lead': "For over a decade we've supported families in Tuxtla Gutiérrez with precise diagnostics, certified specialists, and cutting-edge technology — because your health deserves clarity, not uncertainty.",
    'nosotros.point1': 'Certified specialists in every medical area',
    'nosotros.point2': 'State-of-the-art diagnostic equipment',
    'nosotros.point3': 'Close support at every stage of your care',
    'servicios.badge': 'Medical Areas', 'servicios.title': 'Everything your health needs, under one roof.',
    'servicios.desc': 'Modern facilities and specialized staff in diagnostics, surgery, and comprehensive care.', 'servicios.ver_todo': 'See all',
    'agendar.badge': 'Book Online', 'agendar.title': 'Three steps, no lines, no calls.',
    'agendar.desc': "Designed so any patient, regardless of their experience with technology, can book an appointment in under two minutes.",
    'agendar.step1_title': 'Choose specialty',
    'agendar.step1_desc': "Select the medical area and, if you know it, the reason for your visit. We'll show the specialist's real availability.",
    'agendar.step2_title': 'Choose date and time',
    'agendar.step2_desc': 'A simple calendar with real availability. No calls, no waiting for someone to answer.',
    'agendar.step3_title': 'Confirm and done',
    'agendar.step3_desc': 'Get confirmation by WhatsApp or email, with an automatic reminder 24 hours before your appointment.',
    'agendar.note': 'Your studies and appointment history stay available in your account, to check whenever you need it.',
    'reasons.eyebrow': 'Why choose us', 'reasons.title': 'Reasons to trust your health to SH Arboledas',
    'reasons.desc': 'We combine clinical experience, cutting-edge technology, and a close relationship so every visit gives you certainty, not doubts.',
    'reasons.feature1': 'Certified specialists', 'reasons.feature2': 'Cutting-edge technology', 'reasons.feature3': '24/7 Emergency care',
    'reasons.feature4': 'Results in 24h', 'reasons.feature5': 'Personalized attention', 'reasons.feature6': 'Modern facilities',
    'reasons.cta': 'See our medical areas',
    'instalaciones.eyebrow': 'Facilities', 'instalaciones.title': 'Infrastructure designed for precise diagnostics.',
    'instalaciones.desc': 'Hover over each image to discover our spaces.',
    'instalaciones.panel1_title': 'Private offices', 'instalaciones.panel1_desc': 'Welcoming spaces for personalized, confidential care.', 'instalaciones.panel1_tag': '🔬 Diagnostics',
    'instalaciones.panel2_title': 'Diagnostics area', 'instalaciones.panel2_desc': 'Latest-generation equipment for precise, fast studies.', 'instalaciones.panel2_tag': '📡 Imaging',
    'instalaciones.panel3_title': 'Waiting room', 'instalaciones.panel3_desc': 'Relaxing atmosphere with natural light, green areas, and comfort.', 'instalaciones.panel3_tag': '🛋️ Comfort',
    'instalaciones.panel4_title': 'Operating rooms', 'instalaciones.panel4_desc': 'Five fully equipped operating rooms with cutting-edge technology.', 'instalaciones.panel4_tag': '🏥 Surgery',
    'instalaciones.panel5_title': '24/7 Emergency care', 'instalaciones.panel5_desc': 'Trained staff and equipped area available every day of the year.', 'instalaciones.panel5_tag': '🚨 Immediate care',
    'equipo.eyebrow': 'Our Team', 'equipo.title': 'The people behind your care',
    'equipo.desc': 'Doctors with extensive experience and a vocation for service.',
    'testimonios.eyebrow': 'Testimonials', 'testimonios.title': 'What our patients think of us',
    'contacto.eyebrow': 'Contact', 'contacto.title': "We're close by. Write to us or visit us.",
    'contact.form_title': 'Contact us', 'contact.form_subtitle': "Write to us and we'll help answer your questions.",
    'contact.label_name': 'Full name', 'contact.label_phone': 'Phone', 'contact.label_message': 'Message',
    'contact.message_placeholder': 'How can we help you?', 'contact.submit': 'Send message',
    'footer.desc': 'Hospital and diagnostic center in Tuxtla Gutiérrez, Chiapas. Comprehensive care, 24/7 emergency services, and high-precision imaging.',
    'emergency.label': 'Is this an emergency?', 'emergency.call': 'Call now — 961 602 9586', 'emergency.whatsapp': 'Message on WhatsApp',
    'float.agendar': 'Book appointment',
    'modal.title': 'Book your appointment', 'modal.demo_badge': 'DEMO', 'modal.step1_label': '1 · Specialty', 'modal.step2_label': '2 · Date', 'modal.step3_label': '3 · Time',
    'modal.tagline': 'Your appointment', 'modal.confirm_btn': 'Confirm appointment', 'modal.toast': '✓ Appointment booked — confirmation sent via WhatsApp',
    'aria.open_menu': 'Open menu', 'aria.close_modal': 'Close',
    'aria.prev_area': 'Previous area', 'aria.next_area': 'Next area',
    'aria.prev_doctor': 'Previous doctor', 'aria.next_doctor': 'Next doctor',
    'aria.prev_testimonial': 'Previous testimonial', 'aria.next_testimonial': 'Next testimonial'
  }
};

function applyStaticTranslations() {
  document.documentElement.lang = currentLang === 'en' ? 'en' : 'es-MX';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = translations[currentLang][el.getAttribute('data-i18n')];
    if (val !== undefined) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const val = translations[currentLang][el.getAttribute('data-i18n-html')];
    if (val !== undefined) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const val = translations[currentLang][el.getAttribute('data-i18n-placeholder')];
    if (val !== undefined) el.setAttribute('placeholder', val);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const val = translations[currentLang][el.getAttribute('data-i18n-aria')];
    if (val !== undefined) el.setAttribute('aria-label', val);
  });
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

function setLanguage(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem('shArboledasLang', lang);
  applyStaticTranslations();
  window.__i18nRebuilders.forEach((fn) => fn());
  if (window.ScrollTrigger) window.ScrollTrigger.refresh();
}

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

applyStaticTranslations();

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
      specialty: { es: 'Oftalmología', en: 'Ophthalmology' },
      desc: { es: 'Especialista en diagnóstico y tratamiento visual con más de 12 años de experiencia.', en: 'Specialist in visual diagnosis and treatment with over 12 years of experience.' },
      exp: { es: '12 años', en: '12 years' },
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80'
    },
    {
      name: 'Dr. Carlos D. Cabrera Reyes',
      specialty: { es: 'Oftalmología', en: 'Ophthalmology' },
      desc: { es: 'Certificado en cirugía refractiva y manejo de patologías oculares complejas.', en: 'Certified in refractive surgery and management of complex eye conditions.' },
      exp: { es: '10 años', en: '10 years' },
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80'
    },
    {
      name: 'Dr. Werner Schlie Villa',
      specialty: { es: 'Cardiología', en: 'Cardiology' },
      desc: { es: 'Experto en prevención y tratamiento de enfermedades cardiovasculares.', en: 'Expert in prevention and treatment of cardiovascular disease.' },
      exp: { es: '15 años', en: '15 years' },
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80'
    },
    {
      name: 'Dr. Nelson J. Urbina López',
      specialty: { es: 'Medicina del dolor', en: 'Pain Medicine' },
      desc: { es: 'Manejo integral del dolor crónico y agudo con enfoque multidisciplinario.', en: 'Comprehensive management of chronic and acute pain with a multidisciplinary approach.' },
      exp: { es: '8 años', en: '8 years' },
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80'
    },
    {
      name: 'Dr. Rubén Bañuelos',
      specialty: { es: 'Radiología', en: 'Radiology' },
      desc: { es: 'Jefe de imagenología, especialista en resonancia magnética y tomografía.', en: 'Head of imaging, specialist in MRI and CT scans.' },
      exp: { es: '14 años', en: '14 years' },
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
        <span class="badge-exp">${doc.exp[currentLang]}</span>
        <div class="caption">
          <div class="doc-name">${doc.name}</div>
          <div class="doc-specialty">${doc.specialty[currentLang]}</div>
          <p class="doc-desc">${doc.desc[currentLang]}</p>
        </div>
      `;
      track.appendChild(slide);
      slideElements.push(slide);

      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `${currentLang === 'en' ? 'View' : 'Ver a'} ${doc.name}`);
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

  window.__i18nRebuilders.push(() => {
    const keep = activeIndex;
    slideElements = [];
    dotElements = [];
    buildSlides();
    activeIndex = keep;
    updateSlideshow();
  });

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
      tagline: { es: 'Diagnóstico por imagen', en: 'Imaging diagnostics' },
      title: { es: 'Imagenología', en: 'Imaging' },
      desc: { es: 'Equipos de última generación para estudios de rayos X, tomografía, resonancia y ultrasonido con resultados precisos.', en: 'Latest-generation equipment for X-ray, CT, MRI, and ultrasound studies with precise results.' },
      img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80'
    },
    {
      tagline: { es: 'Salud visual', en: 'Visual health' },
      title: { es: 'Oftalmología', en: 'Ophthalmology' },
      desc: { es: 'Diagnóstico y tratamiento visual con especialistas certificados en cirugía refractiva y patologías oculares complejas.', en: 'Visual diagnosis and treatment with specialists certified in refractive surgery and complex eye conditions.' },
      img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80'
    },
    {
      tagline: { es: 'Resultados confiables', en: 'Reliable results' },
      title: { es: 'Laboratorio clínico', en: 'Clinical Lab' },
      desc: { es: 'Pruebas de laboratorio con tecnología de punta y entrega de resultados en 24 horas.', en: 'Lab tests with cutting-edge technology and results delivered within 24 hours.' },
      img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=80'
    },
    {
      tagline: { es: 'Atención inmediata', en: 'Immediate care' },
      title: { es: 'Urgencias 24/7', en: '24/7 Emergency' },
      desc: { es: 'Personal capacitado y área equipada disponible los 365 días del año, a cualquier hora.', en: 'Trained staff and an equipped area available 365 days a year, any time.' },
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80'
    },
    {
      tagline: { es: 'Cirugía segura', en: 'Safe surgery' },
      title: { es: 'Quirófanos', en: 'Operating Rooms' },
      desc: { es: 'Cinco quirófanos totalmente equipados con tecnología de punta para procedimientos seguros.', en: 'Five fully equipped operating rooms with cutting-edge technology for safe procedures.' },
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
    slideElements.length = 0;
    thumbElements.length = 0;
    medicalAreas.forEach((area, index) => {
      const title = area.title[currentLang];
      const slide = document.createElement('div');
      slide.className = 'med-hero-slide';
      slide.innerHTML = `<img src="${area.img}" alt="${title}" />`;
      slidesWrap.appendChild(slide);
      slideElements.push(slide);

      const thumb = document.createElement('button');
      thumb.className = 'med-thumb';
      thumb.setAttribute('aria-label', title);
      thumb.innerHTML = `<img src="${area.img}" alt="${title}" />`;
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
    if (taglineEl) taglineEl.textContent = area.tagline[currentLang];
    if (titleEl) titleEl.textContent = area.title[currentLang];
    if (descEl) descEl.textContent = area.desc[currentLang];
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

  window.__i18nRebuilders.push(() => {
    const keep = activeIndex;
    build();
    activeIndex = keep;
    update();
  });

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
      quote: { es: 'La atención fue excelente desde el primer contacto. Agendé mi cita en línea y me atendieron puntual, sin esperas.', en: 'The care was excellent from the first contact. I booked my appointment online and was seen right on time, no waiting.' },
      name: 'Renata M.',
      role: { es: 'Paciente de Medicina General', en: 'General Medicine patient' },
      initials: 'RM'
    },
    {
      quote: { es: 'El equipo de imagenología es de primer nivel. Tuve mis resultados en menos de 24 horas.', en: 'The imaging team is first-rate. I had my results in under 24 hours.' },
      name: 'Carlos V.',
      role: { es: 'Paciente de Imagenología', en: 'Imaging patient' },
      initials: 'CV'
    },
    {
      quote: { es: 'Fui a urgencias un domingo y me atendieron de inmediato. Se nota que están preparados 24/7.', en: 'I went to the ER on a Sunday and was seen right away. You can tell they are ready 24/7.' },
      name: 'Daniela R.',
      role: { es: 'Paciente de Urgencias', en: 'Emergency Care patient' },
      initials: 'DR'
    },
    {
      quote: { es: 'Los doctores explican todo con calma y claridad. Me sentí escuchada en cada consulta.', en: 'The doctors explain everything calmly and clearly. I felt heard at every visit.' },
      name: 'Sofía L.',
      role: { es: 'Paciente de Oftalmología', en: 'Ophthalmology patient' },
      initials: 'SL'
    },
    {
      quote: { es: 'Instalaciones limpias, modernas y personal muy amable. Totalmente recomendado.', en: 'Clean, modern facilities and very friendly staff. Highly recommended.' },
      name: 'Jorge A.',
      role: { es: 'Paciente de Laboratorio', en: 'Laboratory patient' },
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
    cardElements.length = 0;
    dotElements.length = 0;
    testimonials.forEach((t, index) => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.innerHTML = `
        <div class="testi-stars">★★★★★</div>
        <p class="testi-quote">"${t.quote[currentLang]}"</p>
        <div class="testi-author">
          <div class="testi-avatar">${t.initials}</div>
          <div class="testi-author-info">
            <b>${t.name}</b>
            <span>${t.role[currentLang]}</span>
          </div>
        </div>
      `;
      track.appendChild(card);
      cardElements.push(card);

      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `${currentLang === 'en' ? 'View testimonial from' : 'Ver testimonio de'} ${t.name}`);
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

  window.__i18nRebuilders.push(() => {
    const keep = activeIndex;
    build();
    activeIndex = keep;
    update();
  });

  let autoplay = setInterval(() => goToSlide(activeIndex + 1), 6000);

  const container = document.getElementById('testimonialCarousel');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoplay));
    container.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goToSlide(activeIndex + 1), 6000);
    });
  }
})();