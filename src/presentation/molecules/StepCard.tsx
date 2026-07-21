import { Icon, type IconName } from "@/presentation/atoms/Icon";

interface StepCardProps {
  num: number;
  title: string;
  description: string;
  icon: IconName;
  showChevron?: boolean;
}

export function StepCard({ num, title, description, icon, showChevron = true }: StepCardProps) {
  return (
    <div className="info-step-card">
      <div className="card-ribbon">
        <span className="ribbon-circle">{num}</span>
      </div>
      <div className="card-text-block">
        <span className="card-title">{title}</span>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-action-block">
        <span className="step-icon">
          <Icon name={icon} />
        </span>
        {showChevron && (
          <div className="chevron-group">
            <span className="chevron-arrow" />
            <span className="chevron-arrow" />
          </div>
        )}
      </div>
    </div>
  );
}
