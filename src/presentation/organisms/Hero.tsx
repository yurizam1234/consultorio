import { Reveal } from "@/presentation/atoms/Reveal";
import { StatItem } from "@/presentation/molecules/StatItem";
import { heroStats } from "@/shared/data/contacto";
import { HeroCtas } from "@/presentation/organisms/HeroCtas";

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="wrap">
        <Reveal className="hero-visual-3d">
          <div className="hero-3d-glow" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero-3d-img"
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=80"
            alt="Ilustración 3D SH Arboledas"
          />
        </Reveal>

        <Reveal className="hero-info">
          <p className="eyebrow">Hospital · Diagnóstico por imagen · Urgencias 24/7</p>
          <h1>
            Claridad, desde <em>la primera cita.</em>
          </h1>
          <p className="lead">
            Agenda en línea con especialistas certificados, estudios de imagenología de alta precisión y atención de
            urgencias los 365 días del año, en Tuxtla Gutiérrez.
          </p>
          <HeroCtas />
          <div className="hero-stats">
            {heroStats.map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
