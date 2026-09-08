"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { HeartHandshake, Award, Eye, ShieldCheck, ChevronDown } from "lucide-react";
import { Navbar } from "@/presentation/organisms/Navbar";
import { Footer } from "@/presentation/organisms/Footer";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";
import { LandingOverlays } from "@/presentation/pages/LandingOverlays";
import { Reveal } from "@/presentation/atoms/Reveal";
import { SplitChars } from "@/presentation/atoms/SplitChars";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { PhotoStack } from "@/presentation/molecules/PhotoStack";
import { useLanguage } from "@/presentation/hooks/useLanguage";

const historiaPhotos = [
  { src: "/nuestro-equipo/medicos/drsolano.webp", alt: "Dr. Edgar A. Solano Tego, fundador de SH Arboledas" },
  { src: "/instalaciones/habitaciones/enf3.jpeg", alt: "Equipo médico y de enfermería de SH Arboledas" },
  { src: "/instalaciones/areas-diagnosticas/reso3.jpg", alt: "Equipo de resonancia magnética de SH Arboledas" },
];

interface ValorItem {
  key: string;
  icon: LucideIcon;
  titleKey: "historia.value1_title" | "historia.value2_title" | "historia.value3_title" | "historia.value4_title";
  descKey: "historia.value1_desc" | "historia.value2_desc" | "historia.value3_desc" | "historia.value4_desc";
}

const valores: ValorItem[] = [
  { key: "cercania", icon: HeartHandshake, titleKey: "historia.value1_title", descKey: "historia.value1_desc" },
  { key: "excelencia", icon: Award, titleKey: "historia.value2_title", descKey: "historia.value2_desc" },
  { key: "transparencia", icon: Eye, titleKey: "historia.value3_title", descKey: "historia.value3_desc" },
  { key: "compromiso", icon: ShieldCheck, titleKey: "historia.value4_title", descKey: "historia.value4_desc" },
];

export default function HistoriaPage() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <ScrollEffects />

      <div className="landing-wrapper">
        <Navbar />

        {/* ".navbar-expand-trigger" avisa a ScrollEffects.tsx que aquí (sin hero de
            video) también debe expandirse el navbar al pasar esta sección — ver el
            comentario junto a "navbarExpandSection" en ese archivo. */}
        <section className="historia-hero navbar-expand-trigger" id="historia-inicio">
          <div className="historia-hero-media full-bleed">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/equipo.jpg"
              alt=""
              className="historia-hero-img"
              fetchPriority="high"
            />
            <div className="historia-hero-scrim" />
            <div className="historia-hero-fade" />
          </div>
          <div className="wrap historia-hero-content">
            <p className="eyebrow" data-reveal-name>
              {t("nosotros.eyebrow")}
            </p>
            <h1 className="historia-hero-title" aria-label={t("historia.title")}>
              <SplitChars text={t("historia.title")} />
            </h1>
            <Reveal>
              <p className="historia-hero-subtitle">{t("historia.subtitle")}</p>
            </Reveal>
          </div>
        </section>

        <section className="historia-intro">
          <div className="wrap historia-intro-grid">
            <Reveal className="historia-intro-photos">
              <PhotoStack images={historiaPhotos} />
            </Reveal>
            <Reveal className="historia-intro-content">
              <span className="historia-eyebrow-small">{t("historia.intro_eyebrow")}</span>
              <h2>{t("historia.intro_title")}</h2>
              <p>{t("historia.intro_body1")}</p>
              <p>{t("historia.intro_body2")}</p>
              <p>{t("historia.intro_body3")}</p>

              <div className={`historia-intro-extra${expanded ? " is-expanded" : ""}`}>
                <div className="historia-intro-extra-inner">
                  <p>{t("historia.intro_body4")}</p>
                  <p>{t("historia.intro_body5")}</p>
                  <p>{t("historia.intro_body6")}</p>
                  <p>{t("historia.intro_body7")}</p>
                  <p>{t("historia.intro_body8")}</p>
                  <p>{t("historia.intro_body9")}</p>
                </div>
              </div>

              <button
                type="button"
                className="historia-vermas-btn"
                aria-expanded={expanded}
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? t("historia.ver_menos") : t("historia.ver_mas")}
                <ChevronDown size={16} strokeWidth={2.2} className="historia-vermas-icon" />
              </button>
            </Reveal>
          </div>
        </section>

        <section className="historia-mission">
          <div className="wrap">
            <Reveal className="historia-mission-card">
              <span className="historia-eyebrow-small">{t("historia.mission_eyebrow")}</span>
              <h2>{t("historia.mission_title")}</h2>
              <p>{t("historia.mission_body")}</p>
            </Reveal>
          </div>
        </section>

        <section className="historia-values">
          <div className="wrap">
            <SectionHead eyebrow={t("historia.values_eyebrow")} title={t("historia.values_title")} />

            <div className="historia-values-grid">
              {valores.map((valor) => {
                const ValorIcon = valor.icon;
                return (
                  <Reveal key={valor.key} className="historia-value-card">
                    <span className="historia-value-icon">
                      <ValorIcon size={22} strokeWidth={1.8} />
                    </span>
                    <h4>{t(valor.titleKey)}</h4>
                    <p>{t(valor.descKey)}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
        <LandingOverlays />
      </div>
    </>
  );
}
