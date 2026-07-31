"use client";

import Link from "next/link";
import { Reveal } from "@/presentation/atoms/Reveal";
import { SplitChars } from "@/presentation/atoms/SplitChars";
import { Icon } from "@/presentation/atoms/Icon";
import { TrustPointItem } from "@/presentation/molecules/TrustPointItem";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function TrustIntro() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" style={{ padding: "20px 0 56px" }}>
      <div className="wrap">
        <p className="eyebrow" data-reveal-name>
          {t("nosotros.eyebrow")}
        </p>
        <div className="trust-intro">
          <Reveal className="trust-visual">
            <div className="trust-badge-float">
              <b>+15</b>
              <span>{t("nosotros.badge")}</span>
            </div>
            <div className="trust-photo-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/instalaciones/consultorios/dr3.webp" alt="Equipo médico SH Arboledas" />
            </div>
          </Reveal>

          <div className="trust-content">
            <Reveal style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h2 aria-label={t("nosotros.h2")}>
                <SplitChars text={t("nosotros.h2")} />
              </h2>
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
