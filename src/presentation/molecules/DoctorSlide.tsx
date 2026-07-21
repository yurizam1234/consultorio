"use client";

import type { Doctor } from "@/shared/data/doctores";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

interface DoctorSlideProps {
  doctor: Doctor;
  active: boolean;
}

export function DoctorSlide({ doctor, active }: DoctorSlideProps) {
  const { lang } = useLanguage();

  return (
    <div className={cn("slide", active && "active")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={doctor.img} alt={doctor.name} loading="lazy" />
      <span className="badge-exp">{doctor.exp[lang]}</span>
      <div className="caption">
        <div className="doc-name">{doctor.name}</div>
        <div className="doc-specialty">{doctor.specialty[lang]}</div>
        <p className="doc-desc">{doctor.desc[lang]}</p>
      </div>
    </div>
  );
}
