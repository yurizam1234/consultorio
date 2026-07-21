import { navLinks } from "@/shared/data/navegacion";
import { contactoInfo } from "@/shared/data/contacto";

export function Footer() {
  return (
    <div className="wrap">
      <footer className="footer">
        <div className="foot-brand">
          <div className="foot-logo">
            <div className="logo-icon" />
            <span>SH Arboledas</span>
          </div>
          <p>
            Hospital y centro de diagnóstico en Tuxtla Gutiérrez, Chiapas. Atención integral, urgencias 24/7 e
            imagenología de alta precisión.
          </p>
          <div className="foot-badges">
            <span>{contactoInfo.cofepris}</span>
            <span>{contactoInfo.licenciaSanitaria}</span>
          </div>
        </div>
        <div className="footer-links">
          {navLinks
            .filter((link) => link.href !== "#agendar-info")
            .map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
        </div>
      </footer>
    </div>
  );
}
