"use client";

import type { Doctor } from "@/shared/data/doctores";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

interface DoctorSlideProps {
  doctor: Doctor;
  active: boolean;
  onOpenProfile: () => void;
}

export function DoctorSlide({ doctor, active, onOpenProfile }: DoctorSlideProps) {
  const { lang, t } = useLanguage();

  return (
    <div
      className={cn("slide", active && "active")}
      role="button"
      tabIndex={0}
      aria-label={t("aria.view_doctor", { name: doctor.name })}
      onClick={onOpenProfile}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenProfile();
        }
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={doctor.img} alt={doctor.name} loading="lazy" />
      <span className="badge-exp">{doctor.exp[lang]}</span>
      <div className="caption">
        <div className="doc-name">{doctor.name}</div>
        <div className="doc-specialty">{doctor.specialty[lang]}</div>
        <p className="doc-desc">{doctor.desc[lang]}</p>
        <span className="doc-view-profile">{t("equipo.view_profile")}</span>
      </div>
    </div>
  );
}
