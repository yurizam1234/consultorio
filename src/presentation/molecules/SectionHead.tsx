import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/utils";
import { Reveal } from "@/presentation/atoms/Reveal";
import { SplitChars } from "@/presentation/atoms/SplitChars";

interface SectionHeadProps {
  eyebrow: string;
  title?: string;
  description?: string;
  className?: string;
  style?: CSSProperties;
  titleColor?: string;
  descriptionColor?: string;
}

export function SectionHead({
  eyebrow,
  title,
  description,
  className,
  style,
  titleColor,
  descriptionColor,
}: SectionHeadProps) {
  // Cuando no hay "title", el eyebrow es el único texto que funciona como
  // encabezado de la sección (ej. Equipo, Instalaciones) — debe ser un <h2>
  // real para que aparezca en la navegación por encabezados de un lector de
  // pantalla, no sólo un <p> con estilo grande. Con "title" presente, el
  // eyebrow es sólo un kicker decorativo y el <h2> real es el título de abajo.
  const EyebrowTag = title ? "p" : "h2";

  return (
    <>
      <EyebrowTag className="eyebrow" data-reveal-name>
        {eyebrow}
      </EyebrowTag>
      {(title || description) && (
        <Reveal className={cn("section-head", className)} style={style}>
          {title && (
            <h2 aria-label={title} style={titleColor ? { color: titleColor } : undefined}>
              <SplitChars text={title} />
            </h2>
          )}
          {description && <p style={descriptionColor ? { color: descriptionColor } : undefined}>{description}</p>}
        </Reveal>
      )}
    </>
  );
}