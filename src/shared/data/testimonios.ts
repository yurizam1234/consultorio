// Video-testimonios publicados. Sólo se agrega un slot cuando el hospital ya
// tiene el video y el consentimiento informado y firmado del paciente
// (requisito legal bajo la LFPDPPP antes de publicar cualquier grabación).
// Para sumar otro: añade su entrada con videoSrc/posterSrc/subtitlesSrc — la
// sección vuelve a mostrar el carrusel en cuanto hay más de un testimonio.
//
// Cada video se sirve en dos formatos: webmSrc (VP9, más ligero) lo toman
// Chrome/Edge/Firefox/Android y videoSrc (H.264) queda de respaldo universal.
// Los másters sin comprimir viven en /masters, fuera del bundle.
export interface TestimonioVideo {
  id: string;
  videoSrc: string | null;
  webmSrc: string | null;
  posterSrc: string | null;
  subtitlesSrc: string | null;
}

export const testimoniosVideos: TestimonioVideo[] = [
  {
    id: "1",
    videoSrc: "/videos/testimonio/testimonio.mp4",
    webmSrc: "/videos/testimonio/testimonio.webm",
    posterSrc: "/videos/testimonio/testimonio-poster.webp",
    subtitlesSrc: null,
  },
];
