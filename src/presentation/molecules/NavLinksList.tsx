import type { NavLink } from "@/shared/data/navegacion";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { LangSwitch } from "@/presentation/molecules/LangSwitch";
import { ComplianceBadge } from "@/presentation/molecules/ComplianceBadge";
import { PanelAccessButton } from "@/presentation/molecules/PanelAccessButton";
import { cn } from "@/shared/lib/utils";

interface NavLinksListProps {
  links: NavLink[];
  mobileOpen: boolean;
  onLinkClick?: () => void;
}

export function NavLinksList({ links, mobileOpen, onLinkClick }: NavLinksListProps) {
  const { t } = useLanguage();

  return (
    <nav className={cn("nav-links", mobileOpen && "mobile-open")}>
      {links.map((link) => (
        <a key={link.href} href={link.href} onClick={onLinkClick}>
          {t(link.labelKey)}
        </a>
      ))}
      <LangSwitch />
      <PanelAccessButton />
    </nav>
  );
}