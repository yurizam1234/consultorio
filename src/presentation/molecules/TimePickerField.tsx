"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/presentation/atoms/Icon";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { formatTime12h } from "@/shared/lib/dates";
import { cn } from "@/shared/lib/utils";

interface TimePickerFieldProps {
  value: string;
  onChange: (time: string) => void;
  slots: string[];
}

// Selector de hora "tipo reloj": botón que abre una grilla de horarios
// disponibles (AM / PM) en vez de los 5 chips de horario fijos que había
// antes. Portal a <body> por la misma razón que DatePickerField.tsx: dentro
// de la card, un ancestro con "transform" (".cita-card-wrap") reancla
// "position: fixed" a sí mismo en vez del viewport.
export function TimePickerField({ value, onChange, slots }: TimePickerFieldProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function reposition() {
      const rect = btnRef.current?.getBoundingClientRect();
      if (rect) setPosition({ top: rect.bottom + 8, left: rect.left });
    }
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open]);

  function toggleOpen() {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        const rect = btnRef.current?.getBoundingClientRect();
        if (rect) setPosition({ top: rect.bottom + 8, left: rect.left });
      }
      return next;
    });
  }

  const am = slots.filter((s) => Number(s.split(":")[0]) < 12);
  const pm = slots.filter((s) => Number(s.split(":")[0]) >= 12);

  return (
    <div className="picker-field">
      <button
        ref={btnRef}
        type="button"
        className="picker-field-btn"
        onClick={toggleOpen}
        aria-expanded={open}
        aria-label={t("aria.time_picker")}
      >
        <Icon name="clock" strokeWidth={1.8} />
        <span className="picker-field-value">{formatTime12h(value)}</span>
        <Icon name="chevron-right" strokeWidth={2} />
      </button>

      {open && position && createPortal(
        <>
          <div className="picker-backdrop" onClick={() => setOpen(false)} />
          <div className="picker-popover time-popover" style={{ top: position.top, left: position.left }}>
            {[
              { label: "AM", items: am },
              { label: "PM", items: pm },
            ].map((group) => (
              <div key={group.label} className="time-popover-group">
                <span className="time-popover-group-label">{group.label}</span>
                <div className="time-popover-grid">
                  {group.items.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={cn("time-slot", time === value && "time-slot-active")}
                      onClick={() => {
                        onChange(time);
                        setOpen(false);
                      }}
                    >
                      {formatTime12h(time)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
