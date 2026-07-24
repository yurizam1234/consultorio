"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { ContactInfoRow } from "@/presentation/molecules/ContactInfoRow";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { contactoInfo, mapsEmbedSrc, mapsDirectionsHref } from "@/shared/data/contacto";

export function Contacto() {
  const { t, lang } = useLanguage();

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
            <iframe
              className="map-embed-layer"
              src={mapsEmbedSrc}
              title={t("contact.map_title", { name: contactoInfo.nombreHospital })}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="contact-bottom-row">
              <div className="contact-info-glass">
                <div className="glass-addr">
                  <b>{contactoInfo.nombreHospital}</b>
                  <span>{contactoInfo.direccion}</span>
                  <span className="glass-addr-ref">{contactoInfo.referencia[lang]}</span>
                </div>
                <ContactInfoRow icon="phone">{contactoInfo.telefonoUrgencias}, 24/7</ContactInfoRow>
                <ContactInfoRow icon="chat">{contactoInfo.telefonoConmutador}</ContactInfoRow>
                <ContactInfoRow icon="mail">{contactoInfo.email}</ContactInfoRow>
                <a className="directions-btn" href={mapsDirectionsHref} target="_blank" rel="noopener noreferrer">
                  <Icon name="pin" strokeWidth={2} />
                  {t("contact.directions_cta")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
