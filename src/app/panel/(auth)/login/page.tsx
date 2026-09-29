"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/presentation/hooks/useAuth";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { Footer } from "@/presentation/organisms/Footer";
import { GoogleIcon } from "@/presentation/atoms/GoogleIcon";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function PanelLoginPage() {
  const { isAuthenticated, login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [forgotNotice, setForgotNotice] = useState(false);
  const [googleNotice, setGoogleNotice] = useState(false);

  // Si ya hay sesión (localStorage), no tiene caso mostrar el login de nuevo.
  useEffect(() => {
    if (isAuthenticated) router.replace("/panel");
  }, [isAuthenticated, router]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t("panel.login.error_email");
    if (password.length < 6) nextErrors.password = t("panel.login.error_password");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/panel");
    } catch {
      setErrors({ general: t("panel.login.error_generic") });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="panel-auth-page">
      <div className="panel-auth-wrap">
        <div className="panel-auth-card">
          <Link href="/" className="panel-auth-back">
            ← {t("panel.login.back_home")}
          </Link>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.webp" alt="SH Arboledas" className="panel-auth-logo" />
          <h1 className="panel-auth-title">{t("panel.login.title")}</h1>
          <p className="panel-auth-subtitle">{t("panel.login.subtitle")}</p>

          <form className="panel-auth-form" onSubmit={handleSubmit} noValidate>
            <label className="panel-field">
              <span className="panel-field-label">{t("panel.login.email_label")}</span>
              <span className={`panel-field-control${errors.email ? " has-error" : ""}`}>
                <Mail size={17} strokeWidth={1.8} />
                <input
                  type="email"
                  className="input-field-element"
                  placeholder={t("panel.login.email_placeholder")}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </span>
              {errors.email && <span className="panel-field-error">{errors.email}</span>}
            </label>

            <label className="panel-field">
              <span className="panel-field-label">{t("panel.login.password_label")}</span>
              <span className={`panel-field-control${errors.password ? " has-error" : ""}`}>
                <Lock size={17} strokeWidth={1.8} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field-element"
                  placeholder={t("panel.login.password_placeholder")}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="panel-password-toggle"
                  aria-label={t("aria.toggle_password")}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={17} strokeWidth={1.8} /> : <Eye size={17} strokeWidth={1.8} />}
                </button>
              </span>
              {errors.password && <span className="panel-field-error">{errors.password}</span>}
            </label>

            <div className="panel-auth-forgot-row">
              <button type="button" className="panel-forgot-link" onClick={() => setForgotNotice(true)}>
                {t("panel.login.forgot")}
              </button>
              {forgotNotice && <span className="panel-forgot-notice">{t("panel.login.forgot_notice")}</span>}
            </div>

            {errors.general && <p className="panel-field-error panel-field-error-general">{errors.general}</p>}

            <button type="submit" className="panel-submit-btn" disabled={submitting}>
              {submitting ? t("panel.login.submitting") : t("panel.login.submit")}
            </button>
          </form>

          <div className="panel-auth-divider">
            <span />
            {t("panel.login.google_divider")}
            <span />
          </div>

          <button
            type="button"
            className="panel-google-btn"
            onClick={() => setGoogleNotice(true)}
          >
            <GoogleIcon size={18} />
            {t("panel.login.google_cta")}
          </button>
          {googleNotice && <span className="panel-forgot-notice panel-google-notice">{t("panel.login.google_notice")}</span>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
