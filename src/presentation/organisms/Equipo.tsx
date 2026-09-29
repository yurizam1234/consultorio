"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/presentation/atoms/Reveal";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { DoctorModal } from "@/presentation/organisms/DoctorModal";
import { Icon } from "@/presentation/atoms/Icon";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { doctores, type Doctor } from "@/shared/data/doctores";
import { equipoOtrasAreas, type OtroDepartamento, type MiembroOtraArea } from "@/shared/data/equipoOtrasAreas";
import { nombreServicioDeEspecialidad } from "@/shared/data/serviciosAgenda";
import { cn } from "@/shared/lib/utils";

type Departamento = "medicos" | OtroDepartamento;

const departamentos: Departamento[] = [
  "medicos",
  "enfermeria",
  "quirofano",
  "recepcion",
  "aseguradora",
  "imagenologia",
  "intendencia",
];

export function Equipo() {
  const { t, lang } = useLanguage();
  const [dept, setDept] = useState<Departamento>("medicos");
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [profileVisible, setProfileVisible] = useState(true);

  const profileTransitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [modalDoctor, setModalDoctor] = useState<Doctor | null>(null);
  // Sólo se usa en la versión móvil (ver ".equipo-v2-dept-select" en
  // globals.css) — en desktop los departamentos se quedan como pestañas de
  // texto en fila (".equipo-v2-nav"), que sí caben cómodas ahí.
  const [deptMenuOpen, setDeptMenuOpen] = useState(false);
  // Carrusel de la barra de equipo (móvil, ver ".equipo-v2-team-bar" en
  // globals.css): teamBarRef mide el scroll para saber cuál circulito quedó
  // centrado, teamItemRefs guarda cada botón para poder centrarlo con
  // scrollIntoView al hacer click o al cambiar de departamento.
  const teamBarRef = useRef<HTMLDivElement>(null);
  const teamItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  // El listener de scroll (más abajo) necesita el índice activo más reciente
  // sin re-suscribirse en cada cambio — de ahí el ref en vez de leer
  // "activeIndex" directo dentro de ese efecto.
  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const isMedicos = dept === "medicos";
  const items: { img: string }[] = isMedicos ? doctores : equipoOtrasAreas[dept];
  const active = items[Math.min(displayIndex, items.length - 1)];
  const activeDoctor = isMedicos ? (active as Doctor) : null;
  const activeMiembro = !isMedicos ? (active as MiembroOtraArea) : null;
  useEffect(() => {
  doctores.forEach((doctor) => {
    const src = doctor.imgMedioCuerpo ?? doctor.img;

    const image = new window.Image();
    image.src = src;
  });
  // Precargar imágenes grandes de las demás áreas
  Object.values(equipoOtrasAreas)
    .flat()
    .forEach((persona) => {
      const image = new window.Image();
      image.src = persona.imgMedioCuerpo ?? persona.img;
    });
}, []);
    useEffect(() => {
  return () => {
    if (profileTransitionTimer.current) {
      clearTimeout(profileTransitionTimer.current);
    }
  };
}, []);

  function handleSelectDept(next: Departamento) {
     setDept(next);
  setActiveIndex(0);
  setDisplayIndex(0);
  setProfileVisible(true);
  setDeptMenuOpen(false);
  }

function updateActiveProfile(index: number) {
  // El circulito seleccionado cambia inmediatamente.
  setActiveIndex(index);

  // Cancela una transición anterior si el usuario hace clicks/swipes rápidos.
  if (profileTransitionTimer.current) {
    clearTimeout(profileTransitionTimer.current);
  }

  // 1. Desvanecer suavemente el perfil actual.
  setProfileVisible(false);

  // 2. Cambiar el contenido cuando ya casi desapareció.
  profileTransitionTimer.current = setTimeout(() => {
    setDisplayIndex(index);

    // 3. Esperar a que React pinte el nuevo médico y hacerlo aparecer.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setProfileVisible(true);
      });
    });
  }, 180);
}

function handleSelectTeamItem(index: number) {
  if (index === activeIndex) return;

  updateActiveProfile(index);

  const bar = teamBarRef.current;
  const item = teamItemRefs.current[index];

  if (!bar || !item) return;

  if (window.innerWidth <= 900) {
    item.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    return;
  }

  const itemCenter =
    item.offsetLeft + item.offsetWidth / 2;

  const targetLeft =
    itemCenter - bar.clientWidth / 2;

  bar.scrollTo({
    left: targetLeft,
    behavior: "smooth",
  });
}

  // Sin flechas, la barra sólo se podía desplazar con touch/trackpad — con
  // mouse normal (sin scroll horizontal nativo) los integrantes que quedaban
  // fuera de vista (ej. desde "Arturo" en adelante) eran imposibles de
  // alcanzar y por lo tanto de seleccionar.
  function scrollTeamBar(direction: 1 | -1) {
    teamBarRef.current?.scrollBy({ left: direction * 220, behavior: "smooth" });
  }

  // Al cambiar de departamento la barra debe volver al inicio: si no se
  // reinicia el scroll a mano, se queda mostrando el hueco donde estaba el
  // integrante que se veía en el departamento anterior (activeIndex ya
  // vuelve a 0 en handleSelectDept, pero eso no mueve el scroll por sí solo).
  useEffect(() => {
    teamBarRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [dept]);

  // Carrusel móvil de "un integrante a la vez" (ver ".equipo-v2-team-bar" en
  // globals.css, con scroll-snap): al deslizar con el dedo no hay ningún
  // evento de click, así que este listener detecta cuál circulito quedó
  // centrado en la barra y actualiza activeIndex para que la foto/nombre/bio
  // de arriba cambien junto con el swipe. Sólo aplica en móvil (≤900px, ver
  // ese mismo breakpoint en ".equipo-v2-team-bar" en globals.css): en
  // escritorio la barra no tiene scroll-snap de "uno a la vez", y clickear
  // a alguien cerca del borde dispara un scroll (scrollIntoView) que este
  // mismo listener reinterpretaba como "el más cercano al centro", pisando
  // la selección real con la de otra persona — algunos integrantes no se
  // dejaban seleccionar.
  useEffect(() => {
    const bar = teamBarRef.current;
    if (!bar) return;
    let rafId = 0;
    function syncActiveFromScroll() {
      rafId = 0;
      if (window.innerWidth > 900) return;
      const barRect = bar!.getBoundingClientRect();
      const barCenter = barRect.left + barRect.width / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      teamItemRefs.current.forEach((item, index) => {
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        const distance = Math.abs(itemRect.left + itemRect.width / 2 - barCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      if (activeIndexRef.current !== closestIndex) {
        updateActiveProfile(closestIndex);
      }
    }
    function handleScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(syncActiveFromScroll);
    }
    bar.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      bar.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [items.length]);

  useEffect(() => {
    document.body.style.overflow = modalDoctor ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalDoctor]);

  useEffect(() => {
    if (!deptMenuOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setDeptMenuOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [deptMenuOpen]);

  useEffect(() => {
    if (!modalDoctor) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setModalDoctor(null);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [modalDoctor]);

  // Disparado desde las tarjetas de "Servicios" al hacer click en "Ver especialistas":
  // cambia a la pestaña Médicos y, si algún doctor ya tiene esa especialidad cargada,
  // lo selecciona. Mientras las especialidades sigan vacías (ver doctores.ts), solo
  // cambia de pestaña sin resaltar a nadie en particular.
  useEffect(() => {
    function handleSeleccionar(event: Event) {
      const especialidad = (event as CustomEvent<{ especialidad: string }>).detail?.especialidad;
      if (!especialidad) return;
      setDept("medicos");
      const index = doctores.findIndex(
        (doctor) => doctor.specialty && nombreServicioDeEspecialidad(doctor.specialty.es) === especialidad
      );
      setActiveIndex(index >= 0 ? index : 0);
    }
    window.addEventListener("equipo:seleccionar", handleSeleccionar);
    return () => window.removeEventListener("equipo:seleccionar", handleSeleccionar);
  }, []);

  return (
    <section id="equipo">
      <div className="wrap">
        <SectionHead eyebrow={t("equipo.eyebrow")} />
      </div>

      <div className="equipo-v2-fade full-bleed">
        <div className="wrap">
          <Reveal className="equipo-v2-card">
            <header className="equipo-v2-header">
              <nav className="equipo-v2-nav" aria-label={t("aria.equipo_dept_menu")}>
                {departamentos.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={cn("equipo-v2-nav-link", d === dept && "active")}
                    onClick={() => handleSelectDept(d)}
                  >
                    {t(`equipo.dept.${d}`)}
                  </button>
                ))}
              </nav>

              {/* Sólo visible en móvil (ver CSS): mismos departamentos, pero
                  agrupados en un botón desplegable en vez de una fila de texto
                  que competía por espacio con la foto y la barra de equipo. */}
              <div className="equipo-v2-dept-select">
                <button
                  type="button"
                  className="equipo-v2-dept-select-toggle"
                  aria-label={t("aria.equipo_dept_menu")}
                  aria-expanded={deptMenuOpen}
                  onClick={() => setDeptMenuOpen((prev) => !prev)}
                >
                  {t(`equipo.dept.${dept}`)}
                  <ChevronDown size={18} strokeWidth={2} className={cn("equipo-v2-dept-select-chevron", deptMenuOpen && "open")} />
                </button>

                {deptMenuOpen && (
                  <>
                    <div className="equipo-v2-dept-select-backdrop" onClick={() => setDeptMenuOpen(false)} />
                    <div className="equipo-v2-dept-select-menu">
                      {departamentos.map((d) => (
                        <button
                          key={d}
                          type="button"
                          className={cn("equipo-v2-dept-select-option", d === dept && "active")}
                          onClick={() => handleSelectDept(d)}
                        >
                          {t(`equipo.dept.${d}`)}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </header>

	    <main
	    className={cn(
		    "equipo-v2-main",
		    "equipo-v2-profile-transition",
		    profileVisible ? "profile-visible" : "profile-hidden"
		    )}
	    >
              <div className="equipo-v2-info">
                {isMedicos ? (
                  <>
                    {activeDoctor?.exp && <span className="equipo-v2-badge">{activeDoctor.exp[lang]}</span>}
                    <h3 className="equipo-v2-name">{activeDoctor?.name ?? t("equipo.name_pending")}</h3>
                    <p className="equipo-v2-role">{activeDoctor?.specialty?.[lang] ?? t("equipo.specialty_pending")}</p>
                    {activeDoctor?.desc && <p className="equipo-v2-bio">{activeDoctor.desc[lang]}</p>}
                    {(activeDoctor?.cedulaProfesional || activeDoctor?.cedulaEspecialidad) && (
                      <div className="equipo-v2-cedulas">
                        {activeDoctor?.cedulaProfesional && (
                          <span>
                            {t("equipo.cedula_profesional_label")}: {activeDoctor.cedulaProfesional}
                          </span>
                        )}
                        {activeDoctor?.cedulaEspecialidad && (
                          <span>
                            {t("equipo.cedula_especialidad_label")}: {activeDoctor.cedulaEspecialidad}
                          </span>
                        )}
                      </div>
                    )}
                    <button type="button" className="equipo-v2-cta" onClick={() => setModalDoctor(activeDoctor)}>
                      {t("equipo.view_profile")}
                      <Icon name="arrow-right" strokeWidth={2.2} />
                    </button>
                  </>
                ) : (
                  <>
                    {activeMiembro?.esJefe && <span className="equipo-v2-badge">{t("equipo.jefe_badge")}</span>}
                    <h3 className="equipo-v2-name">{activeMiembro?.name ?? t("equipo.name_pending")}</h3>
                    <p className="equipo-v2-role">{activeMiembro?.role ?? t("equipo.role_pending")}</p>
                  </>
                )}
              </div>

              <div className="equipo-v2-photo-col">
                {/* La foto grande usa "imgMedioCuerpo" (recorte de medio
                    cuerpo) cuando existe — es la pensada para este recuadro
                    ancho; "img" (recorte de estudio, para el circulito de
                    abajo) queda como respaldo mientras no todos la tengan. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
		    src={activeDoctor?.imgMedioCuerpo ?? activeMiembro?.imgMedioCuerpo ?? active.img}
		      alt={activeDoctor?.name ?? activeMiembro?.name ?? ""}
		      className="equipo-v2-photo"
		      loading="eager"
		      decoding="async"
                />
              </div>
            </main>

            <div className="equipo-v2-team-bar-row">
              <button
                type="button"
                className="carousel-btn equipo-v2-team-bar-btn"
                aria-label={t("aria.prev_area")}
                onClick={() => scrollTeamBar(-1)}
              >
                ‹
              </button>

              <aside className="equipo-v2-team-bar" ref={teamBarRef}>
                {items.map((item, index) => (
                  <button
                    key={item.img}
                    type="button"
                    ref={(el) => {
                      teamItemRefs.current[index] = el;
                    }}
                    className={cn("equipo-v2-team-item", index === activeIndex && "active")}
                    onClick={() => handleSelectTeamItem(index)}
                  >
                    <span className="equipo-v2-avatar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt="" loading="lazy" />
                    </span>
                    <span className="equipo-v2-member-name">
                      {isMedicos ? (item as Doctor).name ?? t("equipo.name_pending") : (item as MiembroOtraArea).name ?? t("equipo.name_pending")}
                    </span>
                  </button>
                ))}
              </aside>

              <button
                type="button"
                className="carousel-btn equipo-v2-team-bar-btn"
                aria-label={t("aria.next_area")}
                onClick={() => scrollTeamBar(1)}
              >
                ›
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <DoctorModal doctor={modalDoctor} onClose={() => setModalDoctor(null)} />
    </section>
  );
}
