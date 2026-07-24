"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { SplitChars } from "@/presentation/atoms/SplitChars";
import { Icon } from "@/presentation/atoms/Icon";
import { StepCard } from "@/presentation/molecules/StepCard";
import { agendaSteps } from "@/shared/data/contacto";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function AgendarInfo() {
  const { t } = useLanguage();

  return (
    <section className="band" id="agendar-info">
      <div className="wrap">
        <span className="feature-badge-pill" data-reveal-name>
          {t("agendar.badge")}
        </span>
        <Reveal className="feature-intro">
          <h2 className="feature-title" aria-label={t("agendar.title")}>
            <SplitChars text={t("agendar.title")} />
          </h2>
          <p className="feature-desc">{t("agendar.desc")}</p>
        </Reveal>

        <div className="agenda-steps">
          {agendaSteps.map((step) => (
            <StepCard
              key={step.num}
              num={step.num}
              title={t(`agendar.step${step.num}.title`)}
              description={t(`agendar.step${step.num}.desc`)}
              icon={step.icon}
              showChevron={step.num !== 3}
            />
          ))}
        </div>

        <div className="steps-note">
          <Icon name="layers" />
          {t("agendar.note")}
        </div>
      </div>
    </section>
  );
}
