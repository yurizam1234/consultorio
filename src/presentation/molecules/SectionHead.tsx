import type { ElementType } from "react";
import { cn } from "@/shared/lib/utils";
import { Reveal } from "@/presentation/atoms/Reveal";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
  eyebrowColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  reveal?: boolean;
}

export function SectionHead({
  eyebrow,
  title,
  description,
  center,
  className,
  eyebrowColor,
  titleColor,
  descriptionColor,
  reveal = true,
}: SectionHeadProps) {
  const Wrapper: ElementType = reveal ? Reveal : "div";

  return (
    <Wrapper
      className={cn("section-head", center && "text-center mx-auto", className)}
      style={center ? { textAlign: "center", margin: "0 auto 44px" } : undefined}
    >
      <p className="eyebrow" style={eyebrowColor ? { color: eyebrowColor } : undefined}>
        {eyebrow}
      </p>
      <h2 style={titleColor ? { color: titleColor } : undefined}>{title}</h2>
      {description && <p style={descriptionColor ? { color: descriptionColor } : undefined}>{description}</p>}
    </Wrapper>
  );
}
