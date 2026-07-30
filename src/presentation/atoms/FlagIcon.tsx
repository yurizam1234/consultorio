// Emoji de bandera (🇲🇽/🇺🇸) no siempre se pintan como banderas reales en Windows
// (algunas fuentes muestran solo las letras del código de país) — se usan SVG
// propios para que el selector de idioma se vea igual en cualquier sistema.

export function FlagMX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
      <rect width="1" height="2" x="0" fill="#006847" />
      <rect width="1" height="2" x="1" fill="#ffffff" />
      <rect width="1" height="2" x="2" fill="#ce1126" />
      <circle cx="1.5" cy="1" r="0.28" fill="#8b5a2b" />
      <circle cx="1.5" cy="1" r="0.16" fill="#2f7a3c" />
    </svg>
  );
}

export function FlagUS({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
      <rect width="3" height="2" fill="#ffffff" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x="0" y={(i * 2) / 13} width="3" height={1 / 13} fill="#b22234" />
      ))}
      <rect width="1.2" height={(7 * 2) / 13} fill="#3c3b6e" />
    </svg>
  );
}
