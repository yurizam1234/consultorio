import Link from "next/link";
import { User } from "lucide-react";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function PanelAccessButton() {
  const { t } = useLanguage();

  return (
    <Link href="/panel" prefetch={false} className="panel-access-btn">
      <User size={16} strokeWidth={2} />
      {t("panel.nav.login")}
    </Link>
  );
}
