"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/presentation/atoms/Icon";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { buildMonthGrid, formatDateFull, formatMonthTitle, isSameDay, startOfToday, weekdayShort } from "@/shared/lib/dates";
import { cn } from "@/shared/lib/utils";

interface DatePickerFieldProps {
  value: Date;
  onChange: (date: Date) => void;
}

// Selector de fecha "a medida": botón que abre un mini-calendario mensual real
// (en vez de los 5 chips de días fijos que había antes). El popover se monta
// con un portal en <body> — dentro de la card, ".cita-card-wrap" tiene
// "transform" (para el deslizamiento de GSAP), y cualquier ancestro con
// transform convierte a sus hijos "position: fixed" en relativos A ESE
// ANCESTRO en vez del viewport; ningún z-index arregla eso, hay que sacar el
// popover del árbol transformado.
export function DatePickerField({ value, onChange }: DatePickerFieldProps) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => new Date(value.getFullYear(), value.getMonth(), 1));
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

  const today = startOfToday();
  const weeks = buildMonthGrid(viewMonth);

  function changeMonth(delta: number) {
    setViewMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  }

  // Al abrir, vuelve a mostrar el mes de la fecha seleccionada y calcula la
  // posición del popover a partir del botón (mismo trigger que lo abre).
  function toggleOpen() {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        setViewMonth(new Date(value.getFullYear(), value.getMonth(), 1));
        const rect = btnRef.current?.getBoundingClientRect();
        if (rect) setPosition({ top: rect.bottom + 8, left: rect.left });
      }
      return next;
    });
  }

  return (
    <div className="picker-field">
      <button
        ref={btnRef}
        type="button"
        className="picker-field-btn"
        onClick={toggleOpen}
        aria-expanded={open}
        aria-label={t("aria.date_picker")}
      >
        <Icon name="calendar" strokeWidth={1.8} />
        <span className="picker-field-value">{formatDateFull(value, lang)}</span>
        <Icon name="chevron-right" strokeWidth={2} />
      </button>

      {open && position && createPortal(
        <>
          <div className="picker-backdrop" onClick={() => setOpen(false)} />
          <div className="picker-popover calendar-popover" style={{ top: position.top, left: position.left }}>
            <div className="calendar-popover-head">
              <button type="button" className="calendar-nav-btn" onClick={() => changeMonth(-1)} aria-label={t("aria.prev_month")}>
                <Icon name="chevron-left" strokeWidth={2} />
              </button>
              <span className="calendar-month-title">{formatMonthTitle(viewMonth, lang)}</span>
              <button type="button" className="calendar-nav-btn" onClick={() => changeMonth(1)} aria-label={t("aria.next_month")}>
                <Icon name="chevron-right" strokeWidth={2} />
              </button>
            </div>

            <div className="calendar-weekday-row">
              {Array.from({ length: 7 }, (_, i) => (
                <span key={i}>{weekdayShort(i, lang)}</span>
              ))}
            </div>

            <div className="calendar-grid">
              {weeks.flatMap((week, wi) =>
                week.map((day, di) => {
                  if (!day) return <span key={`${wi}-${di}`} className="calendar-cell calendar-cell-empty" />;
                  const disabled = day < today;
                  const selected = isSameDay(day, value);
                  return (
                    <button
                      key={`${wi}-${di}`}
                      type="button"
                      className={cn(
                        "calendar-cell",
                        isSameDay(day, today) && "calendar-cell-today",
                        selected && "calendar-cell-selected"
                      )}
                      disabled={disabled}
                      onClick={() => {
                        onChange(day);
                        setOpen(false);
                      }}
                    >
                      {day.getDate()}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
