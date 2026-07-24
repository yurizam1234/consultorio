// Slots de video-testimonio. Todos vacíos por ahora: aún no hay videos reales
// ni consentimiento informado y firmado de los pacientes (requisito legal bajo
// la LFPDPPP antes de publicar cualquier grabación). Cuando el hospital tenga
// los videos y sus consentimientos, completa videoSrc/posterSrc/subtitlesSrc
// de cada slot — no se debe publicar ninguno sin su consentimiento firmado.
export interface TestimonioVideo {
  id: string;
  videoSrc: string | null;
  posterSrc: string | null;
  subtitlesSrc: string | null;
}

export const testimoniosVideos: TestimonioVideo[] = [
  { id: "1", videoSrc: null, posterSrc: null, subtitlesSrc: null },
  { id: "2", videoSrc: null, posterSrc: null, subtitlesSrc: null },
  { id: "3", videoSrc: null, posterSrc: null, subtitlesSrc: null },
  { id: "4", videoSrc: null, posterSrc: null, subtitlesSrc: null },
  { id: "5", videoSrc: null, posterSrc: null, subtitlesSrc: null },
];
