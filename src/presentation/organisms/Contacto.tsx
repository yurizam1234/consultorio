"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { Icon } from "@/presentation/atoms/Icon";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { ContactInfoRow } from "@/presentation/molecules/ContactInfoRow";
import { useContactForm } from "@/presentation/hooks/useContactForm";
import { contactoInfo } from "@/shared/data/contacto";

export function Contacto() {
  const { nombre, setNombre, telefono, setTelefono, mensaje, setMensaje, status, handleSubmit } = useContactForm();

  return (
    <section id="contacto">
      <div className="wrap">
        <SectionHead eyebrow="Contacto" title="Estamos cerca. Escríbenos o visítanos." />

        <Reveal className="contact-container">
          <div className="map-background-layer" />

          <div className="map-location-pin">
            <div className="pin-glow-effect" />
            <Icon name="pin" fill="var(--teal-start)" stroke="none" />
          </div>

          <div className="contact-content">
            <header className="form-header-block">
              <h3 className="form-main-title">Contáctanos</h3>
              <p className="form-subtitle">Escríbenos y te ayudamos a resolver tus dudas.</p>
            </header>

            <form id="contact-form" className="fields-stack" onSubmit={handleSubmit}>
              <div className="input-group-linear">
                <label className="input-label-text" htmlFor="contact-nombre">
                  Nombre completo
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
                  Teléfono
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
                  Mensaje
                </label>
                <input
                  id="contact-mensaje"
                  type="text"
                  className="input-field-element"
                  placeholder="¿En qué podemos ayudarte?"
                  value={mensaje}
                  onChange={(event) => setMensaje(event.target.value)}
                  required
                />
              </div>
            </form>
          </div>

          <div className="contact-bottom-row">
            <button className="submit-pill-btn" type="submit" form="contact-form" disabled={status === "loading"}>
              {status === "success" ? "Mensaje enviado ✓" : status === "loading" ? "Enviando..." : "Enviar mensaje"}
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
        </Reveal>
      </div>
    </section>
  );
}
