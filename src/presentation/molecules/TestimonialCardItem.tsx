"use client";

import type { Testimonio } from "@/shared/data/testimonios";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

interface TestimonialCardItemProps {
  testimonio: Testimonio;
  active: boolean;
}

export function TestimonialCardItem({ testimonio, active }: TestimonialCardItemProps) {
  const { lang } = useLanguage();

  return (
    <div className={cn("testimonial-card", active && "active")}>
      <div className="testi-stars">★★★★★</div>
      <p className="testi-quote">&ldquo;{testimonio.quote[lang]}&rdquo;</p>
      <div className="testi-author">
        <div className="testi-avatar">{testimonio.initials}</div>
        <div className="testi-author-info">
          <b>{testimonio.name}</b>
          <span>{testimonio.role[lang]}</span>
        </div>
      </div>
    </div>
  );
}
