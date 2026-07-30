import type { Lang } from "@/shared/i18n/translations";

// Único punto de verdad para generar/formatear fechas y horas del selector de
// citas (CitaBookingForm): así el calendario y el reloj personalizados siempre
// muestran los próximos días reales (no fechas fijas como antes) y usan la
// localización correcta (es-MX / en-US) vía Intl, sin arrays de nombres a mano.
function locale(lang: Lang) {
  return lang === "en" ? "en-US" : "es-MX";
}

export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// "jueves, 30 de julio" / "Thursday, July 30" — texto del botón de fecha y del
// resumen/mensaje de WhatsApp.
export function formatDateFull(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(locale(lang), { weekday: "long", day: "numeric", month: "long" }).format(date);
}

// "julio 2026" — título del encabezado del calendario.
export function formatMonthTitle(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(locale(lang), { month: "long", year: "numeric" }).format(date);
}

// Iniciales de días de la semana (Dom..Sáb), en el orden de Date#getDay().
// 1 de enero de 2023 fue domingo: se usa solo como ancla fija para pedirle a
// Intl el nombre corto de cada día sin mantener un array de nombres a mano.
export function weekdayShort(dayIndex: number, lang: Lang): string {
  const anchor = new Date(2023, 0, 1 + dayIndex);
  return new Intl.DateTimeFormat(locale(lang), { weekday: "short" }).format(anchor);
}

// Cuadrícula de semanas (6 columnas nulas de relleno antes/después) para pintar
// el mes de "monthDate" en el popover del calendario.
export function buildMonthGrid(monthDate: Date): (Date | null)[][] {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

// Horarios cada 30 min dentro del horario de atención (08:00–19:00).
export function buildTimeSlots(startHour = 8, endHour = 19, stepMinutes = 30): string[] {
  const slots: string[] = [];
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      if (h === endHour && m > 0) break;
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

// "09:00" -> "9:00 AM" — más personal que el formato de 24h en el selector.
export function formatTime12h(time: string): string {
  const [hStr, m] = time.split(":");
  const h = Number(hStr);
  const period = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m} ${period}`;
}
