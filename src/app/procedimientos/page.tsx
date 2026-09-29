"use client";

import { useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from "react";
import { Search, MessageCircle, Home, ScanLine, FlaskConical, Stethoscope, Syringe } from "lucide-react";
import { Navbar } from "@/presentation/organisms/Navbar";
import { Footer } from "@/presentation/organisms/Footer";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";
import { LandingOverlays } from "@/presentation/pages/LandingOverlays";
import { Chip } from "@/presentation/atoms/Chip";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { catalogoProcedimientos } from "@/shared/data/catalogoProcedimientos";
import { buildWhatsAppUrl } from "@/shared/data/contacto";

export default function ProcedimientosPage() {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeEspecialidad, setActiveEspecialidad] = useState<string | null>(null);
  const chipRowRef = useRef<HTMLDivElement>(null);
  const [draggingChips, setDraggingChips] = useState(false);

  const dragState = useRef({ pointerId: 0, isDown: false, startX: 0, startScrollLeft: 0, moved: false });

  function scrollChips(direction: 1 | -1) {
    chipRowRef.current?.scrollBy({ left: direction * 220, behavior: "smooth" });
  }

  function handleChipsPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const el = chipRowRef.current;
    if (!el) return;
    // Ojo: NO se captura el puntero aquí todavía — un simple click en un chip
    // también dispara pointerdown, y capturar de inmediato redirige el
    // mouseup/click resultante al contenedor en vez del <button>, matando el
    // click normal. Sólo se captura si el gesto se confirma como arrastre
    // (ver handleChipsPointerMove).
    dragState.current = { pointerId: event.pointerId, isDown: true, startX: event.clientX, startScrollLeft: el.scrollLeft, moved: false };
  }

  function handleChipsPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const el = chipRowRef.current;
    if (!el || !dragState.current.isDown) return;
    const delta = event.clientX - dragState.current.startX;
    if (!dragState.current.moved && Math.abs(delta) > 4) {
      dragState.current.moved = true;
      setDraggingChips(true);
      el.setPointerCapture(dragState.current.pointerId);
    }
    if (dragState.current.moved) el.scrollLeft = dragState.current.startScrollLeft - delta;
  }

  function endChipsDrag() {
    dragState.current.isDown = false;
    setDraggingChips(false);
  }

  // Un arrastre real no debe además disparar el click del chip que quedó
  // debajo del cursor al soltar — se intercepta en fase de captura, antes de
  // que el evento llegue al <button> del chip.
  function handleChipsClickCapture(event: ReactMouseEvent<HTMLDivElement>) {
    if (dragState.current.moved) {
      event.stopPropagation();
      event.preventDefault();
      dragState.current.moved = false;
    }
  }

  // Filtra por especialidad activa y, dentro de esa (o de todas), por texto —
  // así "ordenar por especialidad" y "buscar directo por el procedimiento"
  // son la misma UI, no dos modos separados.
  //
  // Especialidades como Cardiología o Gastroenterología existen en el
  // catálogo (para el chip de filtro) pero todavía no tienen procedimientos
  // cargados (ver el comentario junto a esas entradas en
  // catalogoProcedimientos.ts). Antes sólo se mostraban si el usuario las
  // elegía directo desde el chip; buscarlas por nombre las hacía
  // "desaparecer" (el .filter final las tiraba por tener 0 procedimientos).
  // Ahora una especialidad vacía sigue siendo un resultado válido: en
  // "Todas" (sin buscar nada) se muestran todas, chip activo o no; al
  // escribir en el buscador se filtra igual que las demás, por nombre.
  const grupos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogoProcedimientos
      .filter((grupo) => !activeEspecialidad || grupo.id === activeEspecialidad)
      .map((grupo) => ({
        ...grupo,
        procedimientos: q
          ? grupo.procedimientos.filter(
              (p) => p[lang].toLowerCase().includes(q) || grupo.especialidad[lang].toLowerCase().includes(q)
            )
          : grupo.procedimientos,
      }))
      .filter((grupo) => {
        if (grupo.procedimientos.length > 0) return true;
        if (!q) return true;
        return grupo.especialidad[lang].toLowerCase().includes(q);
      });
  }, [query, activeEspecialidad, lang]);

  // Especialidades con procedimientos ya cargados: una <section> por cada
  // una, con su propia grilla de cards (como siempre). Las que todavía no
  // tienen procedimientos (17 en el catálogo) se separan aparte: antes cada
  // una ocupaba una <section> completa (título + subtítulo + recuadro vacío)
  // — apiladas, 17 de esas hacían la página kilométrica. Se juntan en una
  // sola sección compacta más abajo ("Más especialidades").
  const gruposConProcedimientos = grupos.filter((grupo) => grupo.procedimientos.length > 0);
  const gruposVacios = grupos.filter((grupo) => grupo.procedimientos.length === 0);

  return (
    <>
      <ScrollEffects />

      <div className="landing-wrapper">
        <Navbar />

        {/* ".navbar-expand-trigger": mismo mecanismo que /historia — esta página
            tampoco tiene hero de video, así que el navbar debe expandirse desde
            el inicio (ver el comentario junto a "navbarExpandSection" en
            ScrollEffects.tsx). */}
        <section className="procedimientos-hero navbar-expand-trigger" id="procedimientos-inicio">
          <div className="wrap">
            <SectionHead
              eyebrow={t("procedimientos.eyebrow")}
              title={t("procedimientos.title")}
              description={t("procedimientos.subtitle")}
            />
            <p className="procedimientos-hint">
              <MessageCircle size={15} strokeWidth={1.8} />
              {t("procedimientos.inquiry_hint")}
            </p>
          </div>
        </section>

        <section className="procedimientos-catalog">
          <div className="wrap">
            <div className="procedimientos-controls">
              <div className="procedimientos-filter-row">
                <button
                  type="button"
                  className="carousel-btn"
                  aria-label={t("aria.prev_especialidad")}
                  onClick={() => scrollChips(-1)}
                >
                  ‹
                </button>
                <div
                  className={"chip-row" + (draggingChips ? " dragging" : "")}
                  ref={chipRowRef}
                  onPointerDown={handleChipsPointerDown}
                  onPointerMove={handleChipsPointerMove}
                  onPointerUp={endChipsDrag}
                  onPointerCancel={endChipsDrag}
                  onClickCapture={handleChipsClickCapture}
                >
                  <Chip active={activeEspecialidad === null} onClick={() => setActiveEspecialidad(null)}>
                    {t("procedimientos.filter_all")}
                  </Chip>
                  {catalogoProcedimientos.map((grupo) => (
                    <Chip
                      key={grupo.id}
                      active={activeEspecialidad === grupo.id}
                      onClick={() => setActiveEspecialidad(grupo.id)}
                    >
                      {grupo.especialidad[lang]}
                    </Chip>
                  ))}
                </div>
                <button
                  type="button"
                  className="carousel-btn"
                  aria-label={t("aria.next_especialidad")}
                  onClick={() => scrollChips(1)}
                >
                  ›
                </button>
              </div>

              <label className="procedimientos-search">
                <Search size={18} strokeWidth={1.8} />
                <input
                  type="text"
                  placeholder={t("procedimientos.search_placeholder")}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
            </div>

            {gruposConProcedimientos.length === 0 && gruposVacios.length === 0 ? (
              <p className="procedimientos-empty">{t("procedimientos.no_results")}</p>
            ) : (
              <>
                {gruposConProcedimientos.length > 0 && (
                  <div className="procedimientos-sections">
                    {/* Sin <Reveal>: ese componente depende de que ScrollEffects.tsx
                        detecte el elemento en su barrido inicial del DOM (una sola
                        vez, al montar la página) — como estas cards aparecen y
                        desaparecen según el buscador/filtro (no según el scroll),
                        una card nueva nunca sería detectada y se quedaría en
                        opacity:0 para siempre (invisible). Estas cards son
                        siempre visibles apenas se filtran a la vista. */}
                    {gruposConProcedimientos.map((grupo) => (
                      <section key={grupo.id} className="procedimientos-section">
                        <h3 className="procedimientos-section-title">{grupo.especialidad[lang]}</h3>
                        <p className="procedimientos-section-subtitle">{grupo.subtitulo[lang]}</p>
                        <div className="procedimientos-cards-grid">
                          {grupo.procedimientos.map((procedimiento) => (
                            <a
                              key={procedimiento.es}
                              className="procedimiento-card"
                              href={buildWhatsAppUrl(
                                t("procedimientos.inquiry_message", {
                                  procedimiento: procedimiento[lang],
                                  especialidad: grupo.especialidad[lang],
                                })
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={t("procedimientos.inquiry_aria", { procedimiento: procedimiento[lang] })}
                            >
                              <div className="procedimiento-card-media">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={procedimiento.img} alt="" loading="lazy" />
                                {procedimiento.exclusivo && (
                                  <span className="procedimiento-exclusivo-badge">
                                    {t("procedimientos.exclusivo_badge")}
                                  </span>
                                )}
                              </div>
                              <div className="procedimiento-card-body">
                                <div className="procedimiento-card-name-row">
                                  <span className="procedimiento-card-name">{procedimiento.titulo[lang]}</span>
                                  <MessageCircle size={14} strokeWidth={1.8} />
                                </div>
                                <p className="procedimiento-card-desc">{procedimiento.desc[lang]}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                )}

                {gruposVacios.length > 0 && (
                  <section className="procedimientos-section procedimientos-section-more">
                    <h3 className="procedimientos-section-title">{t("procedimientos.more_title")}</h3>
                    <p className="procedimientos-section-subtitle">{t("procedimientos.more_subtitle")}</p>
                    <div className="procedimientos-cards-grid">
                      {gruposVacios.map((grupo) => (
                        <a
                          key={grupo.id}
                          className="procedimiento-card"
                          href={buildWhatsAppUrl(
                            t("procedimientos.inquiry_especialidad_message", {
                              especialidad: grupo.especialidad[lang],
                            })
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("procedimientos.inquiry_especialidad_aria", {
                            especialidad: grupo.especialidad[lang],
                          })}
                        >
                          <div className="procedimiento-card-media">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={grupo.img ?? "/instalaciones/consultorios/con1.webp"}
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div className="procedimiento-card-body">
                            <div className="procedimiento-card-name-row">
                              <span className="procedimiento-card-name">{grupo.especialidad[lang]}</span>
                              <MessageCircle size={14} strokeWidth={1.8} />
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            <div className="domicilio-banner">
              <span className="domicilio-badge">{t("procedimientos.domicilio_badge")}</span>
              <div className="domicilio-head">
                <span className="domicilio-icon">
                  <Home size={22} strokeWidth={1.8} />
                </span>
                <div className="domicilio-text">
                  <h3>{t("procedimientos.domicilio_title")}</h3>
                  <p>{t("procedimientos.domicilio_desc")}</p>
                </div>
              </div>
              <div className="domicilio-pills">
                <span className="domicilio-pill">
                  <ScanLine size={14} strokeWidth={1.8} />
                  {t("procedimientos.domicilio_item_rayosx")}
                </span>
                <span className="domicilio-pill">
                  <FlaskConical size={14} strokeWidth={1.8} />
                  {t("procedimientos.domicilio_item_laboratorio")}
                </span>
                <span className="domicilio-pill">
                  <Stethoscope size={14} strokeWidth={1.8} />
                  {t("procedimientos.domicilio_item_medicina")}
                </span>
                <span className="domicilio-pill">
                  <Syringe size={14} strokeWidth={1.8} />
                  {t("procedimientos.domicilio_item_enfermeria")}
                </span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <LandingOverlays />
      </div>
    </>
  );
}
