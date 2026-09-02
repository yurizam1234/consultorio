import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { Reveal } from "@/presentation/atoms/Reveal";
import { SplitChars } from "@/presentation/atoms/SplitChars";
import { EcgDivider } from "@/presentation/atoms/EcgDivider";

interface SectionHeadProps {
  eyebrow?: string; // ← Agrega el signo de interrogación aquí
  eyebrowExtra?: ReactNode;
  beforeTitle?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  titleColor?: string;
  descriptionColor?: string;
}

export function SectionHead({
  eyebrow = "", // ← Valor por defecto opcional
  eyebrowExtra,
  beforeTitle,
  title,
  description,
  children,
  className,
  style,
  titleColor,
  descriptionColor,
}: SectionHeadProps) {
  const EyebrowTag = title ? "p" : "h2";

  return (
    <>
      {eyebrow && (
        eyebrowExtra ? (
          <div className="section-head-eyebrow-row">
            <EyebrowTag className="eyebrow" data-reveal-name style={{ margin: 0 }}>
              {eyebrow}
            </EyebrowTag>
            {eyebrowExtra}
          </div>
        ) : (
          <EyebrowTag className="eyebrow" data-reveal-name>
            {eyebrow}
          </EyebrowTag>
        )
      )}
      {beforeTitle}
      {(title || description || children) && (
        <Reveal className={cn("section-head", className)} style={style}>
          {title && (
            <div className="section-head-title-row">
              <h2 aria-label={title} style={titleColor ? { color: titleColor } : undefined}>
                <SplitChars text={title} />
              </h2>
              <EcgDivider inline />
            </div>
          )}
          {description && <p style={descriptionColor ? { color: descriptionColor } : undefined}>{description}</p>}
          {children}
        </Reveal>
      )}
    </>
  );
}