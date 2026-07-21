import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

// Marca el nodo con data-reveal; la animación de entrada (ensamblado horizontal
// ligado al scroll) la controla GSAP/ScrollTrigger en ScrollEffects.tsx.
export function Reveal({ className, children, ...rest }: RevealProps) {
  return (
    <div data-reveal className={cn(className)} {...rest}>
      {children}
    </div>
  );
}