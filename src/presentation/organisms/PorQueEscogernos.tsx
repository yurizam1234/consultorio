import { Reveal } from "@/presentation/atoms/Reveal";
import { Icon } from "@/presentation/atoms/Icon";
import { ReasonFeatureItem } from "@/presentation/molecules/ReasonFeatureItem";
import { DiamondImage } from "@/presentation/molecules/DiamondImage";
import { reasonFeatures } from "@/shared/data/contacto";

export function PorQueEscogernos() {
  return (
    <section id="por-que-escogernos" style={{ padding: "56px 0" }}>
      <div className="wrap">
        <Reveal className="reasons-grid">
          <div className="reasons-content">
            <div className="reasons-tagline-row">
              <p className="eyebrow" style={{ margin: 0 }}>
                Por qué escogernos
              </p>
              <span className="reasons-tagline-line" />
            </div>

            <h2 className="reasons-title">Motivos para confiar tu salud a SH Arboledas</h2>
            <p className="reasons-desc">
              Combinamos experiencia clínica, tecnología de punta y un trato cercano para que cada visita te dé
              certeza, no dudas.
            </p>

            <div className="reasons-features">
              {reasonFeatures.map((feature) => (
                <ReasonFeatureItem key={feature.label} icon={feature.icon} label={feature.label} />
              ))}
            </div>

            <a href="#servicios" className="reasons-cta-btn">
              Conocer nuestras áreas médicas
              <Icon name="arrow-right" stroke="currentColor" strokeWidth={2.2} />
            </a>
          </div>

          <div className="reasons-collage">
            <DiamondImage
              position={1}
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80"
              alt="Especialistas SH Arboledas"
            />
            <DiamondImage
              position={2}
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&q=80"
              alt="Tecnología de diagnóstico"
            />
            <DiamondImage
              position={3}
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80"
              alt="Instalaciones SH Arboledas"
            />
            <div className="reasons-center-badge">✓</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
