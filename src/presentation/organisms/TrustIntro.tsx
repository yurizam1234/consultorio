"use client";

import Link from "next/link";
import { Reveal } from "@/presentation/atoms/Reveal";
import { Icon } from "@/presentation/atoms/Icon";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { TrustPointItem } from "@/presentation/molecules/TrustPointItem";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function TrustIntro() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="nosotros-section">
      <Reveal className="trust-banner full-bleed">
        <div className="trust-banner-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/servicios/urgencias-24hr.jpg" alt="" className="trust-banner-img" loading="lazy" />
          <div className="brand-photo-tint" />
          <div className="trust-banner-fade" />
          <div className="trust-banner-bottom-fade" />
        </div>

        {/* Agregamos "text-left" (o "text-right") aquí */}
        <div className="trust-banner-content text-left">
          <SectionHead
            eyebrow={t("nosotros.eyebrow")}
            beforeTitle={
              <span className="trust-banner-badge">
                <b>+15</b>
                {t("nosotros.badge")}
              </span>
            }
            title={t("nosotros.h2")}
          >
            <p className="trust-lead">{t("nosotros.lead")}</p>
            <ul className="trust-points">
              <TrustPointItem text={t("nosotros.point1")} />
              <TrustPointItem text={t("nosotros.point2")} />
              <TrustPointItem text={t("nosotros.point3")} />
            </ul>
            <Link href="/historia" className="reasons-cta-btn">
              {t("nosotros.more_cta")}
              <Icon name="arrow-right" strokeWidth={2.2} />
            </Link>
          </SectionHead>
        </div>
      </Reveal>
    </section>
  );
}