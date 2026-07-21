import { Reveal } from "@/presentation/atoms/Reveal";
import { TrustPointItem } from "@/presentation/molecules/TrustPointItem";
import { trustPoints } from "@/shared/data/contacto";

export function TrustIntro() {
  return (
    <section id="nosotros" style={{ padding: "56px 0" }}>
      <div className="wrap">
        <Reveal className="trust-intro">
          <div className="trust-visual">
            <div className="trust-badge-float">
              <b>+15</b>
              <span>Años de experiencia</span>
            </div>
            <div className="trust-shape shape-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"
                alt="Equipo médico SH Arboledas"
              />
            </div>
            <div className="trust-shape shape-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80"
                alt="Equipamiento de diagnóstico"
              />
            </div>
          </div>

          <div className="trust-content">
            <p className="eyebrow">SH Arboledas</p>
            <h2>Un equipo médico en el que puedes confiar</h2>
            <p className="trust-lead">
              Por más de una década hemos acompañado a familias de Tuxtla Gutiérrez con diagnósticos precisos,
              especialistas certificados y tecnología de punta — porque tu salud merece claridad, no incertidumbre.
            </p>
            <ul className="trust-points">
              {trustPoints.map((point) => (
                <TrustPointItem key={point} text={point} />
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
