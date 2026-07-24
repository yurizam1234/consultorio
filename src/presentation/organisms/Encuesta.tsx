"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { Chip } from "@/presentation/atoms/Chip";
import { Reveal } from "@/presentation/atoms/Reveal";
import { useEncuestaForm } from "@/presentation/hooks/useEncuestaForm";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { serviciosAgenda } from "@/shared/data/serviciosAgenda";
import { cn } from "@/shared/lib/utils";

export function Encuesta() {
  const { servicio, setServicio, calificacion, setCalificacion, comentario, setComentario, status, handleSubmit } =
    useEncuestaForm();
  const { t } = useLanguage();

  const submitLabel =
    status === "success" ? t("encuesta.submit_success") : status === "loading" ? t("encuesta.submit_loading") : t("encuesta.submit");

  return (
    <section id="encuesta" style={{ padding: "20px 0 56px" }}>
      <div className="wrap">
        <Reveal className="encuesta-card">
          <header className="form-header-block">
            <h3 className="form-main-title">{t("encuesta.title")}</h3>
            <p className="form-subtitle">{t("encuesta.subtitle")}</p>
          </header>

          <form id="encuesta-form" className="fields-stack" onSubmit={handleSubmit}>
            <div className="input-group-linear">
              <label className="input-label-text">{t("encuesta.service_label")}</label>
              <div className="chip-row">
                {serviciosAgenda.map((s) => (
                  <Chip key={s.nombre} active={s.nombre === servicio} onClick={() => setServicio(s.nombre)}>
                    {s.nombre}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="input-group-linear">
              <label className="input-label-text">{t("encuesta.rating_label")}</label>
              <div className="star-rating" role="radiogroup" aria-label={t("encuesta.rating_label")}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={value === calificacion}
                    aria-label={String(value)}
                    className={cn("star-btn", value <= calificacion && "active")}
                    onClick={() => setCalificacion(value)}
                  >
                    <Icon name="star" fill={value <= calificacion ? "currentColor" : "none"} strokeWidth={1.6} />
                  </button>
                ))}
              </div>
            </div>
            <div className="input-group-linear">
              <label className="input-label-text" htmlFor="encuesta-comentario">
                {t("encuesta.comment_label")}
              </label>
              <input
                id="encuesta-comentario"
                type="text"
                className="input-field-element"
                placeholder={t("encuesta.comment_placeholder")}
                value={comentario}
                onChange={(event) => setComentario(event.target.value)}
              />
            </div>
          </form>

          <button className="submit-pill-btn" type="submit" form="encuesta-form" disabled={status === "loading"}>
            {submitLabel}
            <Icon name="arrow-right" strokeWidth={2.5} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
