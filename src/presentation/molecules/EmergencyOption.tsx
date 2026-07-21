import { Icon, type IconName } from "@/presentation/atoms/Icon";

interface EmergencyOptionProps {
  href: string;
  icon: IconName;
  label: string;
  external?: boolean;
}

export function EmergencyOption({ href, icon, label, external }: EmergencyOptionProps) {
  return (
    <a href={href} className="emergency-option" target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      <span className="ic">
        <Icon name={icon} />
      </span>
      {label}
    </a>
  );
}
