"use client";

import { useEffect, useState } from "react";
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

  const isMedicos = dept === "medicos";
  const items: { img: string }[] = isMedicos ? doctores : equipoOtrasAreas[dept];
  const active = items[Math.min(activeIndex, items.length - 1)];
  const activeDoctor = isMedicos ? (active as Doctor) : null;
  const activeMiembro = !isMedicos ? (active as MiembroOtraArea) : null;

  function handleSelectDept(next: Departamento) {
    setDept(next);
    setActiveIndex(0);
  }

  useEffect(() => {
    document.body.style.overflow = modalDoctor ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalDoctor]);

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
                <img src={FOTO_RECORTE_PRUEBA} alt="" className="equipo-v2-photo" />
              </div>
            </main>

            <aside className="equipo-v2-team-bar">
              {items.map((item, index) => (
                <button
                  key={item.img}
                  type="button"
                  className={cn("equipo-v2-team-item", index === activeIndex && "active")}
                  onClick={() => setActiveIndex(index)}
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
