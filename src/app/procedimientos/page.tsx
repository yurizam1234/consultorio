"use client";

import { useMemo, useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { Navbar } from "@/presentation/organisms/Navbar";
import { Footer } from "@/presentation/organisms/Footer";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";
import { Chip } from "@/presentation/atoms/Chip";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { catalogoProcedimientos } from "@/shared/data/catalogoProcedimientos";
import { buildWhatsAppUrl } from "@/shared/data/contacto";

export default function ProcedimientosPage() {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeEspecialidad, setActiveEspecialidad] = useState<string | null>(null);

  // Filtra por especialidad activa y, dentro de esa (o de todas), por texto —
  // así "ordenar por especialidad" y "buscar directo por el procedimiento"
  // son la misma UI, no dos modos separados.
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
      .filter((grupo) => grupo.procedimientos.length > 0);
  }, [query, activeEspecialidad, lang]);

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
              <label className="procedimientos-search">
                <Search size={18} strokeWidth={1.8} />
                <input
                  type="text"
                  placeholder={t("procedimientos.search_placeholder")}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>

              <div className="chip-row">
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
            </div>

            {grupos.length === 0 ? (
              <p className="procedimientos-empty">{t("procedimientos.no_results")}</p>
            ) : (
              <div className="procedimientos-groups">
                {/* Sin <Reveal>: ese componente depende de que ScrollEffects.tsx
                    detecte el elemento en su barrido inicial del DOM (una sola
                    vez, al montar la página) — como estas cards aparecen y
                    desaparecen según el buscador/filtro (no según el scroll),
                    una card nueva nunca sería detectada y se quedaría en
                    opacity:0 para siempre (invisible). Estas cards son
                    siempre visibles apenas se filtran a la vista. */}
                {grupos.map((grupo) => (
                  <div key={grupo.id} className="procedimientos-group">
                    <h3 className="procedimientos-group-title">{grupo.especialidad[lang]}</h3>
                    <ul className="procedimientos-list">
                      {grupo.procedimientos.map((procedimiento) => (
                        <li key={procedimiento.es}>
                          <a
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
                            {procedimiento[lang]}
                            <MessageCircle size={14} strokeWidth={1.8} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
