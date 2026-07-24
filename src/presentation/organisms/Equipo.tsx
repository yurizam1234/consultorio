"use client";

import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Stethoscope, HeartPulse, Scissors, ConciergeBell, ShieldCheck, ScanLine, SprayCan } from "lucide-react";
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

const deptIcons: Record<Departamento, LucideIcon> = {
  medicos: Stethoscope,
  enfermeria: HeartPulse,
  quirofano: Scissors,
  recepcion: ConciergeBell,
  aseguradora: ShieldCheck,
  imagenologia: ScanLine,
  intendencia: SprayCan,
};

export function Equipo() {
  const { t, lang } = useLanguage();
  const [dept, setDept] = useState<Departamento>("medicos");
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalDoctor, setModalDoctor] = useState<Doctor | null>(null);
  const [deptMenuOpen, setDeptMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!deptMenuOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setDeptMenuOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [deptMenuOpen]);

  return (
    <section id="equipo">
      <div className="wrap">
        <SectionHead eyebrow={t("equipo.eyebrow")} />
      </div>

      <div className="wrap">
        <Reveal className="equipo-showcase full-bleed">
          <div className="equipo-hero" style={{ backgroundImage: `url(${active.img})` }}>
            <div className="equipo-hero-scrim" />

            <div className="equipo-dept-nav">
              <button
                type="button"
                className="equipo-dept-toggle"
                onClick={() => setDeptMenuOpen((open) => !open)}
                aria-label={t("aria.equipo_dept_menu")}
                aria-expanded={deptMenuOpen}
              >
                <Icon name="menu" strokeWidth={2} />
              </button>

              {deptMenuOpen && (
                <>
                  <div className="equipo-dept-backdrop" onClick={() => setDeptMenuOpen(false)} />
                  <nav className="equipo-dept-menu">
                    {departamentos.map((d) => {
                      const DeptIcon = deptIcons[d];
                      return (
                        <button
                          key={d}
                          type="button"
                          className={cn("equipo-dept-tab", d === dept && "active")}
                          onClick={() => {
                            handleSelectDept(d);
                            setDeptMenuOpen(false);
                          }}
                        >
                          <DeptIcon size={20} strokeWidth={1.8} />
                          <span>{t(`equipo.dept.${d}`)}</span>
                        </button>
                      );
                    })}
                  </nav>
                </>
              )}
            </div>

            <div className="equipo-hero-content">
              {isMedicos ? (
                <>
                  {activeDoctor?.exp && <span className="equipo-hero-badge">{activeDoctor.exp[lang]}</span>}
                  <h3 className="equipo-hero-name">{activeDoctor?.name ?? t("equipo.name_pending")}</h3>
                  <p className="equipo-hero-specialty">
                    {activeDoctor?.specialty?.[lang] ?? t("equipo.specialty_pending")}
                  </p>
                  <div className="equipo-hero-cedulas">
                    <span>
                      {t("equipo.cedula_profesional_label")}: {activeDoctor?.cedulaProfesional ?? t("equipo.cedula_pending")}
                    </span>
                    <span>
                      {t("equipo.cedula_especialidad_label")}: {activeDoctor?.cedulaEspecialidad ?? t("equipo.cedula_pending")}
                    </span>
                  </div>
                  <button type="button" className="equipo-hero-cta" onClick={() => setModalDoctor(activeDoctor)}>
                    {t("equipo.view_profile")}
                    <Icon name="arrow-right" strokeWidth={2.2} />
                  </button>
                </>
              ) : (
                <>
                  {activeMiembro?.esJefe && <span className="equipo-hero-badge">{t("equipo.jefe_badge")}</span>}
                  <h3 className="equipo-hero-name">{activeMiembro?.role ?? t("equipo.role_pending")}</h3>
                </>
              )}
            </div>
          </div>

          <aside className="equipo-sidebar">
            <div className="equipo-sidebar-scroll">
              {items.map((item, index) => (
                <button
                  key={item.img}
                  type="button"
                  className={cn("equipo-thumb", index === activeIndex && "active")}
                  onClick={() => setActiveIndex(index)}
                  aria-label={
                    isMedicos
                      ? (item as Doctor).name ?? t("equipo.name_pending")
                      : (item as MiembroOtraArea).role ?? t("equipo.role_pending")
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </aside>
        </Reveal>
      </div>

      <DoctorModal doctor={modalDoctor} onClose={() => setModalDoctor(null)} />
    </section>
  );
}
