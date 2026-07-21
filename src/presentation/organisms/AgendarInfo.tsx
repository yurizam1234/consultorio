import { Reveal } from "@/presentation/atoms/Reveal";
import { Icon } from "@/presentation/atoms/Icon";
import { StepCard } from "@/presentation/molecules/StepCard";
import { agendaSteps } from "@/shared/data/contacto";

export function AgendarInfo() {
  return (
    <section className="band" id="agendar-info">
      <div className="wrap">
        <Reveal className="organic-feature-card reverse">
          <div className="media-mask-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80"
              alt="Agenda en línea SH Arboledas"
            />
          </div>
          <div className="info-content-wrapper">
            <span className="feature-badge-pill">Agenda en línea</span>
            <h2 className="feature-title">Tres pasos, sin filas ni llamadas.</h2>
            <p className="feature-desc">
              Diseñado para que cualquier paciente, sin importar su experiencia con la tecnología, agende su cita en
              menos de dos minutos.
            </p>
          </div>
        </Reveal>

        <div className="agenda-steps">
          {agendaSteps.map((step) => (
            <StepCard
              key={step.num}
              num={step.num}
              title={step.title}
              description={step.description}
              icon={step.icon}
              showChevron={step.num !== 3}
            />
          ))}
        </div>

        <div className="steps-note">
          <Icon name="layers" />
          Tu historial de estudios y citas queda disponible en tu cuenta, para consultarlo cuando lo necesites.
        </div>
      </div>
    </section>
  );
}
