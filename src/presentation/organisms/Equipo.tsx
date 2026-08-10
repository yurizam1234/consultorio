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

// Foto de prueba (recorte tipo "cutout"): ninguno de los integrantes reales tiene
// todavía una foto en este formato (las de doctores.ts/equipoOtrasAreas.ts son
// fotos de estudio normales, usadas en el carrusel de abajo) — se usa la misma
// para todos mientras tanto, sólo para ver terminado el nuevo diseño.
const FOTO_RECORTE_PRUEBA = "/doctor-cutout-demo.png";

export function Equipo() {
  const { t, lang } = useLanguage();
  const [dept, setDept] = useState<Departamento>("medicos");
  const [activeIndex, setActiveIndex] = useState(0);
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

  const isMedicos = dept === "medicos";
  const items: { img: string }[] = isMedicos ? doctores : equipoOtrasAreas[dept];
  const active = items[Math.min(activeIndex, items.length - 1)];
  const activeDoctor = isMedicos ? (active as Doctor) : null;
  const activeMiembro = !isMedicos ? (active as MiembroOtraArea) : null;

  function handleSelectDept(next: Departamento) {
    setDept(next);
    setActiveIndex(0);
    setDeptMenuOpen(false);
  }

  function handleSelectTeamItem(index: number) {
    setActiveIndex(index);
    teamItemRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
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
  // de arriba cambien junto con el swipe.
  useEffect(() => {
    const bar = teamBarRef.current;
    if (!bar) return;
    let rafId = 0;
    function syncActiveFromScroll() {
      rafId = 0;
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
      setActiveIndex((prev) => (prev === closestIndex ? prev : closestIndex));
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

            <main className="equipo-v2-main">
              <div className="equipo-v2-info">
                {isMedicos ? (
                  <>
                    {activeDoctor?.exp && <span className="equipo-v2-badge">{activeDoctor.exp[lang]}</span>}
                    <h3 className="equipo-v2-name">{activeDoctor?.name ?? t("equipo.name_pending")}</h3>
                    <p className="equipo-v2-role">{activeDoctor?.specialty?.[lang] ?? t("equipo.specialty_pending")}</p>
                    {activeDoctor?.desc && <p className="equipo-v2-bio">{activeDoctor.desc[lang]}</p>}
                    <div className="equipo-v2-cedulas">
                      <span>
                        {t("equipo.cedula_profesional_label")}: {activeDoctor?.cedulaProfesional ?? t("equipo.cedula_pending")}
                      </span>
                      <span>
                        {t("equipo.cedula_especialidad_label")}: {activeDoctor?.cedulaEspecialidad ?? t("equipo.cedula_pending")}
                      </span>
                    </div>
                    <button type="button" className="equipo-v2-cta" onClick={() => setModalDoctor(activeDoctor)}>
                      {t("equipo.view_profile")}
                      <Icon name="arrow-right" strokeWidth={2.2} />
                    </button>
                  </>
                ) : (
                  <>
                    {activeMiembro?.esJefe && <span className="equipo-v2-badge">{t("equipo.jefe_badge")}</span>}
                    <h3 className="equipo-v2-name">{activeMiembro?.role ?? t("equipo.role_pending")}</h3>
                  </>
                )}
              </div>

              <div className="equipo-v2-photo-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FOTO_RECORTE_PRUEBA} alt="" className="equipo-v2-photo" loading="lazy" />
              </div>
            </main>

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
                    {isMedicos ? (item as Doctor).name ?? t("equipo.name_pending") : (item as MiembroOtraArea).role ?? t("equipo.role_pending")}
                  </span>
                </button>
              ))}
            </aside>
          </Reveal>
        </div>
      </div>

      <DoctorModal doctor={modalDoctor} onClose={() => setModalDoctor(null)} />
    </section>
  );
}
