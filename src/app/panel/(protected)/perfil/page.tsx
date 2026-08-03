"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { BadgeCheck, CalendarDays, CheckCircle2, Save } from "lucide-react";
import { useAuth } from "@/presentation/hooks/useAuth";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  fechaNacimiento?: string;
  edad?: string;
  peso?: string;
}

export default function PanelPerfilPage() {
  const { t, lang } = useLanguage();
  const { patient, updatePatient } = useAuth();

  const [nombre, setNombre] = useState(patient?.nombre ?? "");
  const [email, setEmail] = useState(patient?.email ?? "");
  const [telefono, setTelefono] = useState(patient?.telefono ?? "");
  const [fechaNacimiento, setFechaNacimiento] = useState(patient?.fechaNacimiento ?? "");
  const [edad, setEdad] = useState(String(patient?.edad ?? ""));
  const [peso, setPeso] = useState(String(patient?.peso ?? ""));
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const miembroDesde = patient
    ? new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-MX", { month: "long", year: "numeric" }).format(
        new Date(patient.miembroDesde)
      )
    : "";

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (!nombre.trim()) nextErrors.nombre = t("panel.perfil.error_required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t("panel.login.error_email");
    if (!/^[\d\s()+-]{7,}$/.test(telefono)) nextErrors.telefono = t("panel.perfil.error_phone");
    if (!fechaNacimiento) nextErrors.fechaNacimiento = t("panel.perfil.error_required");
    const edadNum = Number(edad);
    if (!edadNum || edadNum <= 0 || edadNum > 120) nextErrors.edad = t("panel.perfil.error_age");
    const pesoNum = Number(peso);
    if (!pesoNum || pesoNum <= 0 || pesoNum > 300) nextErrors.peso = t("panel.perfil.error_weight");
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    updatePatient({
      nombre,
      email,
      telefono,
      fechaNacimiento,
      edad: Number(edad),
      peso: Number(peso),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!patient) return null;

  return (
    <div className="panel-view">
      <h1 className="panel-view-title">{t("panel.sidebar.perfil")}</h1>

      <div className="panel-account-info">
        <h3 className="panel-section-title">{t("panel.perfil.account_info_title")}</h3>
        <div className="panel-account-info-grid">
          <div className="panel-account-info-item">
            <span className="panel-account-info-icon">
              <BadgeCheck size={18} strokeWidth={1.8} />
            </span>
            <div>
              <span className="panel-field-label">{t("panel.perfil.access_type_label")}</span>
              <p>{patient.tipoAcceso}</p>
            </div>
          </div>
          <div className="panel-account-info-item">
            <span className="panel-account-info-icon">
              <CalendarDays size={18} strokeWidth={1.8} />
            </span>
            <div>
              <span className="panel-field-label">{t("panel.perfil.member_since_label")}</span>
              <p>{miembroDesde}</p>
            </div>
          </div>
          <div className="panel-account-info-item">
            <span className="panel-account-info-icon">
              <CheckCircle2 size={18} strokeWidth={1.8} />
            </span>
            <div>
              <span className="panel-field-label">{t("panel.perfil.status_label")}</span>
              <p>
                <span className={cn("panel-status-badge", `is-${patient.estatus}`)}>
                  {t(patient.estatus === "activo" ? "panel.perfil.status_activo" : "panel.perfil.status_inactivo")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="panel-personal-data">
        <h3 className="panel-section-title">{t("panel.perfil.personal_data_title")}</h3>
        <form className="panel-personal-form" onSubmit={handleSubmit} noValidate>
          <label className="panel-field">
            <span className="panel-field-label">{t("panel.perfil.name_label")}</span>
            <input
              className={cn("input-field-element", errors.nombre && "has-error")}
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
            />
            {errors.nombre && <span className="panel-field-error">{errors.nombre}</span>}
          </label>
          <label className="panel-field">
            <span className="panel-field-label">{t("panel.perfil.email_label")}</span>
            <input
              type="email"
              className={cn("input-field-element", errors.email && "has-error")}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email && <span className="panel-field-error">{errors.email}</span>}
          </label>
          <label className="panel-field">
            <span className="panel-field-label">{t("panel.perfil.phone_label")}</span>
            <input
              className={cn("input-field-element", errors.telefono && "has-error")}
              value={telefono}
              onChange={(event) => setTelefono(event.target.value)}
            />
            {errors.telefono && <span className="panel-field-error">{errors.telefono}</span>}
          </label>
          <label className="panel-field">
            <span className="panel-field-label">{t("panel.perfil.birthdate_label")}</span>
            <input
              type="date"
              className={cn("input-field-element", errors.fechaNacimiento && "has-error")}
              value={fechaNacimiento}
              onChange={(event) => setFechaNacimiento(event.target.value)}
            />
            {errors.fechaNacimiento && <span className="panel-field-error">{errors.fechaNacimiento}</span>}
          </label>
          <label className="panel-field">
            <span className="panel-field-label">{t("panel.perfil.age_label")}</span>
            <input
              type="number"
              min={0}
              className={cn("input-field-element", errors.edad && "has-error")}
              value={edad}
              onChange={(event) => setEdad(event.target.value)}
            />
            {errors.edad && <span className="panel-field-error">{errors.edad}</span>}
          </label>
          <label className="panel-field">
            <span className="panel-field-label">{t("panel.perfil.weight_label")}</span>
            <input
              type="number"
              min={0}
              className={cn("input-field-element", errors.peso && "has-error")}
              value={peso}
              onChange={(event) => setPeso(event.target.value)}
            />
            {errors.peso && <span className="panel-field-error">{errors.peso}</span>}
          </label>

          <div className="panel-personal-form-actions">
            <button type="submit" className="panel-submit-btn panel-save-btn" disabled={saving}>
              <Save size={16} strokeWidth={1.8} />
              {saving ? t("panel.perfil.save_btn_loading") : t("panel.perfil.save_btn")}
            </button>
          </div>

          <div className={cn("toast", saved && "show")}>{t("panel.perfil.save_success")}</div>
        </form>
      </div>
    </div>
  );
}
