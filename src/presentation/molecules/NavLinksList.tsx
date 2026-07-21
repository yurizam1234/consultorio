import type { NavLink } from "@/shared/data/navegacion";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

interface NavLinksListProps {
  links: NavLink[];
  mobileOpen: boolean;
  onLinkClick?: () => void;
}

export function NavLinksList({ links, mobileOpen, onLinkClick }: NavLinksListProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <nav className={cn("nav-links", mobileOpen && "mobile-open")}>
      {links.map((link) => (
        <a key={link.href} href={link.href} onClick={onLinkClick}>
          {t(link.labelKey)}
        </a>
      ))}
      <div className="lang-switch">
        <button
          type="button"
          className={cn("lang-btn", lang === "es" && "active")}
          onClick={() => setLang("es")}
        >
          ES
        </button>
        <button
          type="button"
          className={cn("lang-btn", lang === "en" && "active")}
          onClick={() => setLang("en")}
        >
          EN
        </button>
      </div>
    </nav>
  );
}
