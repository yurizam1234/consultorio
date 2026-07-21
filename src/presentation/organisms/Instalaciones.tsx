import { SectionHead } from "@/presentation/molecules/SectionHead";
import { DiagonalPanelItem } from "@/presentation/molecules/DiagonalPanelItem";
import { instalaciones } from "@/shared/data/instalaciones";

export function Instalaciones() {
  return (
    <section id="instalaciones" style={{ background: "#e6f7f5", padding: "56px 0" }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Instalaciones"
          title="Infraestructura pensada para diagnósticos precisos."
          description="Pasa el cursor sobre cada imagen para descubrir nuestros espacios."
        />

        <div className="diagonal-container">
          {instalaciones.map((item) => (
            <DiagonalPanelItem key={item.num} instalacion={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
