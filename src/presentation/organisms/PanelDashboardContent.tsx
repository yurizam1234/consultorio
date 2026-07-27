"use client";

import { useState } from "react";
import { Percent, Gift, CheckCircle2 } from "lucide-react";
import { useImagingBookingModal } from "@/presentation/hooks/useImagingBookingModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { useAuth } from "@/presentation/hooks/useAuth";
import { PUNTOS_PARA_CHECKUP } from "@/shared/data/patientMock";

export function PanelDashboardContent() {
  const { t } = useLanguage();
  const { open } = useImagingBookingModal();
  const { patient } = useAuth();
  const [discountRedeemed, setDiscountRedeemed] = useState(false);

  const puntos = patient?.puntos ?? 0;
  const progressPct = Math.min(100, Math.round((puntos / PUNTOS_PARA_CHECKUP) * 100));
  const checkupReady = puntos >= PUNTOS_PARA_CHECKUP;

  return (
    <>
      <div className="panel-cta-card">
        <div className="panel-cta-text">
          <h2>{t("panel.dashboard.cta_title")}</h2>
          <p>{t("panel.dashboard.cta_desc")}</p>
        </div>
        <button type="button" className="panel-cta-btn" onClick={open}>
          {t("panel.dashboard.cta_btn")}
        </button>
      </div>

      <div className="panel-promos">
        <h3 className="panel-section-title">{t("panel.dashboard.promos_title")}</h3>
        <div className="panel-promos-grid">
          <div className="panel-promo-card">
            <span className="panel-promo-icon">
              <Percent size={20} strokeWidth={1.8} />
            </span>
            <div className="panel-promo-body">
              <h4>{t("panel.promo.discount_title")}</h4>
              <p>{t("panel.promo.discount_desc")}</p>
            </div>
            <button
              type="button"
              className="panel-promo-btn"
              disabled={discountRedeemed}
              onClick={() => setDiscountRedeemed(true)}
            >
              {discountRedeemed ? (
                <>
                  <CheckCircle2 size={16} strokeWidth={2} /> {t("panel.promo.discount_redeemed")}
                </>
              ) : (
                t("panel.promo.discount_btn")
              )}
            </button>
          </div>

          <div className="panel-promo-card">
            <span className="panel-promo-icon">
              <Gift size={20} strokeWidth={1.8} />
            </span>
            <div className="panel-promo-body">
              <h4>{t("panel.promo.checkup_title")}</h4>
              <p>{t("panel.promo.checkup_desc")}</p>
              <div className="panel-promo-progress-track">
                <div className="panel-promo-progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <div className="panel-promo-progress-footer">
                <span className="panel-promo-progress-label">
                  {t("panel.promo.points_progress", { current: String(puntos), total: String(PUNTOS_PARA_CHECKUP) })}
                </span>
                <span className={checkupReady ? "panel-promo-ready" : "panel-promo-progress-note"}>
                  {checkupReady
                    ? t("panel.promo.checkup_ready")
                    : t("panel.promo.points_remaining", { remaining: String(PUNTOS_PARA_CHECKUP - puntos) })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
