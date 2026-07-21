import { Icon, type IconName } from "@/presentation/atoms/Icon";

interface ReasonFeatureItemProps {
  icon: IconName;
  label: string;
}

export function ReasonFeatureItem({ icon, label }: ReasonFeatureItemProps) {
  return (
    <div className="reason-feature-item">
      <span className="reason-feature-icon">
        <Icon name={icon} />
      </span>
      <span className="reason-feature-label">{label}</span>
    </div>
  );
}
