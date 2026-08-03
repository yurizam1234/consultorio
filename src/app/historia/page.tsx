"use client";

import type { LucideIcon } from "lucide-react";
import { HeartHandshake, Award, Eye, ShieldCheck } from "lucide-react";
import { Navbar } from "@/presentation/organisms/Navbar";
import { Footer } from "@/presentation/organisms/Footer";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";
import { Reveal } from "@/presentation/atoms/Reveal";
import { SplitChars } from "@/presentation/atoms/SplitChars";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { PhotoStack } from "@/presentation/molecules/PhotoStack";
import { useLanguage } from "@/presentation/hooks/useLanguage";

// Genéricas por ahora — reemplazar por fotos reales del hospital cuando estén
// disponibles (mismo criterio que las de Nuestra Historia en la landing).
const historiaPhotos = [
  { src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80", alt: "Equipo médico SH Arboledas" },
  { src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80", alt: "Equipamiento de diagnóstico" },
  { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", alt: "Instalaciones SH Arboledas" },
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
              src="/instalaciones/consultorios/con2.JPG"
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
      </div>
    </>
  );
}
