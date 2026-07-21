"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { Chip } from "@/presentation/atoms/Chip";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { useCitaBooking } from "@/presentation/hooks/useCitaBooking";
import { especialidades, diasDisponibles, horariosDisponibles } from "@/shared/data/contacto";
import { cn } from "@/shared/lib/utils";

export function CitaModal() {
  const { isOpen, close } = useCitaModal();
  const { especialidad, setEspecialidad, dia, setDia, horario, setHorario, status, confirmar, summary } =
    useCitaBooking();

  return (
    <div className={cn("cita-modal-overlay", isOpen && "open")} onClick={(event) => event.target === event.currentTarget && close()}>
      <div className="cita-modal" role="dialog" aria-modal="true" aria-labelledby="citaModalTitle">
        <button className="cita-modal-close" aria-label="Cerrar" onClick={close}>
          ×
        </button>

        <div className="organic-booker-card">
          <div className="card-graphic-container">
            <Icon name="calendar-hours" strokeWidth={1.6} />
          </div>

          <div className="card-info-content">
            <div className="organic-card-head">
              <h4 id="citaModalTitle">Agenda tu cita</h4>
              <span className="demo-badge">DEMO</span>
            </div>

            <div className="booking-row">
              <div className="booking-field">
                <p className="booker-label">1 · Especialidad</p>
                <div className="chip-row">
                  {especialidades.map((spec) => (
                    <Chip key={spec} active={spec === especialidad} onClick={() => setEspecialidad(spec)}>
                      {spec}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="booking-field">
                <p className="booker-label">2 · Fecha</p>
                <div className="day-strip">
                  {diasDisponibles.map((d) => (
                    <div
                      key={d.label}
                      className={cn("day", d.label === dia && "active")}
                      onClick={() => setDia(d.label)}
                    >
                      <span className="dname">{d.dname}</span>
                      <span className="dnum">{d.dnum}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="booking-field">
                <p className="booker-label">3 · Horario</p>
                <div className="chip-row">
                  {horariosDisponibles.map((time) => (
                    <Chip key={time} active={time === horario} onClick={() => setHorario(time)}>
                      {time}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-summary-block">
              <div className="summary-left">
                <span className="info-tagline">Tu cita</span>
                <h2 className="info-main-date">{summary}</h2>
              </div>
              <button className="card-pill-btn" onClick={confirmar} disabled={status === "loading"}>
                {status === "loading" ? "Agendando..." : "Confirmar cita"}
              </button>
            </div>

            <div className={cn("toast", status === "success" && "show")}>
              ✓ Cita agendada — confirmación enviada por WhatsApp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
