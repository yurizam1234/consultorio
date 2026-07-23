import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

export function LangSwitch() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="lang-switch">
      <button type="button" className={cn("lang-btn", lang === "es" && "active")} onClick={() => setLang("es")}>
        ES
      </button>
      <button type="button" className={cn("lang-btn", lang === "en" && "active")} onClick={() => setLang("en")}>
        EN
      </button>
    </div>
  );
}