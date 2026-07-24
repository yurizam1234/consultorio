import { Fragment } from "react";
import { cn } from "@/shared/lib/utils";

interface SplitCharsProps {
  text: string;
  className?: string;
}

// Envuelve cada letra en su propio <span> para animarlas en cascada (ver
// ScrollEffects.tsx, selector ".split-chars"). Oculto para lectores de
// pantalla: el elemento que lo use debe llevar aria-label={text} (el texto
// completo, sin fragmentar) para que siga siendo accesible.
export function SplitChars({ text, className }: SplitCharsProps) {
  const words = text.split(" ");

  return (
    <span className={cn("split-chars", className)} aria-hidden="true">
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          <span className="split-word">
            {word.split("").map((char, charIndex) => (
              <span className="split-char" key={charIndex}>
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
