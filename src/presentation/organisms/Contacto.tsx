"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { ContactInfoRow } from "@/presentation/molecules/ContactInfoRow";
import { useContactForm } from "@/presentation/hooks/useContactForm";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { contactoInfo } from "@/shared/data/contacto";

export function Contacto() {
  const { nombre, setNombre, telefono, setTelefono, mensaje, setMensaje, status, handleSubmit } = useContactForm();
  const { t } = useLanguage();

  const submitLabel =
    status === "success" ? t("contact.submit_success") : status === "loading" ? t("contact.submit_loading") : t("contact.submit");

  return (
    <section id="contacto">
      <div className="wrap">
        <SectionHead eyebrow={t("contacto.eyebrow")} title={t("contacto.title")} />
      </div>

      <div className="contacto-video-wrap">
        <video
          className="contacto-video"
          src="/videos/contacto_scrub.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="contacto-video-scrim" />

        <div className="wrap contacto-card-slot">
          <div className="contact-container contacto-rise-card">
            <div className="map-background-layer" />

            <div className="map-location-pin">
              <div className="pin-glow-effect" />
              <Icon name="pin" fill="var(--teal-start)" stroke="none" />
            </div>

            <div className="contact-content">
              <header className="form-header-block">
                <h3 className="form-main-title">{t("contact.form_title")}</h3>
                <p className="form-subtitle">{t("contact.form_subtitle")}</p>
              </header>

              <form id="contact-form" className="fields-stack" onSubmit={handleSubmit}>
                <div className="input-group-linear">
                  <label className="input-label-text" htmlFor="contact-nombre">
                    {t("contact.label_name")}
                  </label>
                  <input
                    id="contact-nombre"
                    type="text"
                    className="input-field-element"
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    required
                  />
                </div>
                <div className="input-group-linear">
                  <label className="input-label-text" htmlFor="contact-telefono">
                    {t("contact.label_phone")}
                  </label>
                  <input
                    id="contact-telefono"
                    type="tel"
                    className="input-field-element"
                    value={telefono}
                    onChange={(event) => setTelefono(event.target.value)}
                  />
                </div>
                <div className="input-group-linear">
                  <label className="input-label-text" htmlFor="contact-mensaje">
                    {t("contact.label_message")}
                  </label>
                  <input
                    id="contact-mensaje"
                    type="text"
                    className="input-field-element"
                    placeholder={t("contact.message_placeholder")}
                    value={mensaje}
                    onChange={(event) => setMensaje(event.target.value)}
                    required
                  />
                </div>
              </form>
            </div>

            <div className="contact-bottom-row">
              <button className="submit-pill-btn" type="submit" form="contact-form" disabled={status === "loading"}>
                {submitLabel}
                <Icon name="arrow-right" strokeWidth={2.5} />
              </button>

              <div className="contact-info-glass">
                <div className="glass-addr">
                  <b>{contactoInfo.nombreHospital}</b>
                  <span>{contactoInfo.direccion}</span>
                </div>
                <ContactInfoRow icon="phone">{contactoInfo.telefonoUrgencias}, 24/7</ContactInfoRow>
                <ContactInfoRow icon="chat">{contactoInfo.telefonoConmutador}</ContactInfoRow>
                <ContactInfoRow icon="mail">{contactoInfo.email}</ContactInfoRow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}