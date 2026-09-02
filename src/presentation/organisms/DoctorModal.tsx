"use client";

import type { Doctor } from "@/shared/data/doctores";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { Icon } from "@/presentation/atoms/Icon";
import { cn } from "@/shared/lib/utils";

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}

export function DoctorModal({ doctor, onClose }: DoctorModalProps) {
  const { lang, t } = useLanguage();
  const isOpen = doctor !== null;

  return (
    <div
      className={cn("cita-modal-overlay", isOpen && "open")}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      {doctor && (
        <div className="cita-modal doctor-modal" role="dialog" aria-modal="true" aria-labelledby="doctorModalTitle">
          <button className="cita-modal-close" aria-label={t("modal.close")} onClick={onClose}>
            <Icon name="x" strokeWidth={2.2} />
          </button>

          <div className="doctor-modal-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="doctor-modal-img" src={doctor.img} alt={doctor.name ?? t("equipo.name_pending")} loading="lazy" />

            <div className="doctor-modal-body">
              {doctor.exp && <span className="doctor-modal-badge">{doctor.exp[lang]}</span>}
              <h4 id="doctorModalTitle">{doctor.name ?? t("equipo.name_pending")}</h4>
              <p className="doctor-modal-specialty">{doctor.specialty?.[lang] ?? t("equipo.specialty_pending")}</p>
              <p className="doctor-modal-desc">{doctor.desc?.[lang] ?? t("equipo.desc_pending")}</p>

              <div className="doctor-modal-divider" />

              <p className="doctor-modal-section-label">
                <span className="doctor-modal-section-icon">
                  <Icon name="shield-check" strokeWidth={1.8} />
                </span>
                {t("equipo.profile_credentials_label")}
              </p>
              {doctor.credentials ? (
                <ul className="doctor-modal-credentials">
                  {doctor.credentials[lang].map((item) => (
                    <li key={item}>
                      <Icon name="check-circle" strokeWidth={1.8} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="doctor-modal-desc">{t("equipo.credentials_pending")}</p>
              )}

              <div className="doctor-modal-divider" />

              <div className="doctor-modal-cedulas">
                <span>
                  <b>{t("equipo.cedula_profesional_label")}:</b> {doctor.cedulaProfesional ?? t("equipo.cedula_pending")}
                </span>
                <span>
                  <b>{t("equipo.cedula_especialidad_label")}:</b> {doctor.cedulaEspecialidad ?? t("equipo.cedula_pending")}
                </span>
                {doctor.cedulaProfesional && (
                  <a
                    className="doctor-modal-cedula-verify"
                    href="https://cedulaprofesional.sep.gob.mx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("equipo.cedula_verify_link")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}