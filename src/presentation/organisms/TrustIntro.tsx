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
      <Reveal className="trust-banner full-bleed">
        <div className="trust-banner-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/servicios/urgencias-24hr.jpg" alt="" className="trust-banner-img" />
          <div className="trust-banner-fade" />
          <div className="trust-banner-bottom-fade" />
        </div>

        <div className="trust-banner-content">
          <p className="eyebrow" data-reveal-name>
            {t("nosotros.eyebrow")}
          </p>
          <span className="trust-banner-badge">
            <b>+15</b>
            {t("nosotros.badge")}
          </span>
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
        </div>
      </Reveal>
    </section>
  );
}
