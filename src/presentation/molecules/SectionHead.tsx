import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/utils";
import { Reveal } from "@/presentation/atoms/Reveal";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
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
  return (
    <>
      <p className="eyebrow" data-reveal-name>
        {eyebrow}
      </p>
      <Reveal className={cn("section-head", className)} style={style}>
        <h2 style={titleColor ? { color: titleColor } : undefined}>{title}</h2>
        {description && <p style={descriptionColor ? { color: descriptionColor } : undefined}>{description}</p>}
      </Reveal>
    </>
  );
}