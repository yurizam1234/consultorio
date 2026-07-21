import { Icon, type IconName } from "@/presentation/atoms/Icon";

interface ContactInfoRowProps {
  icon: IconName;
  children: React.ReactNode;
}

export function ContactInfoRow({ icon, children }: ContactInfoRowProps) {
  return (
    <div className="glass-info-row">
      <span className="ic">
        <Icon name={icon} />
      </span>
      <span>{children}</span>
    </div>
  );
}
