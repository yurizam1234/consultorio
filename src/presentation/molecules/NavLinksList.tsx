import type { NavLink } from "@/shared/data/navegacion";
import { cn } from "@/shared/lib/utils";

interface NavLinksListProps {
  links: NavLink[];
  mobileOpen: boolean;
  onLinkClick?: () => void;
  onOpenCita: () => void;
}

export function NavLinksList({ links, mobileOpen, onLinkClick, onOpenCita }: NavLinksListProps) {
  return (
    <nav className={cn("nav-links", mobileOpen && "mobile-open")}>
      {links.map((link) => (
        <a key={link.href} href={link.href} onClick={onLinkClick}>
          {link.label}
        </a>
      ))}
      <a
        href="#"
        className="nav-btn-active"
        onClick={(event) => {
          event.preventDefault();
          onOpenCita();
          onLinkClick?.();
        }}
      >
        Agendar cita
      </a>
    </nav>
  );
}
