import { Icon } from "@/presentation/atoms/Icon";
import { contactoInfo } from "@/shared/data/contacto";

export function ComplianceBadge() {
  return (
    <div className="nav-compliance" title={`${contactoInfo.cofepris} | ${contactoInfo.licenciaSanitaria}`}>
      <Icon name="shield-check" strokeWidth={2} />
      <span className="nav-compliance-text">
        <b>{contactoInfo.cofepris}</b>
        <em>{contactoInfo.licenciaSanitaria}</em>
      </span>
    </div>
  );
}
