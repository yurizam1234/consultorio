"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { StepCard } from "@/presentation/molecules/StepCard";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { agendaSteps } from "@/shared/data/contacto";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function AgendarInfo() {
  const { t } = useLanguage();

  return (
    <section className="band" id="agendar-info">
      <div className="wrap">
        <SectionHead eyebrow={t("agendar.badge")} title={t("agendar.title")} description={t("agendar.desc")} />

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
