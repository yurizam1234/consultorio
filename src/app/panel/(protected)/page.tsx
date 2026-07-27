"use client";

import { useLanguage } from "@/presentation/hooks/useLanguage";
import { PanelDashboardContent } from "@/presentation/organisms/PanelDashboardContent";

export default function PanelDashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="panel-view">
      <h1 className="panel-view-title">{t("panel.dashboard.title")}</h1>
      <PanelDashboardContent />
    </div>
  );
}
