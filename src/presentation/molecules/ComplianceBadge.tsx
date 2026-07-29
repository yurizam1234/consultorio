import { Icon } from "@/presentation/atoms/Icon";
import { contactoInfo } from "@/shared/data/contacto";

export function ComplianceBadge() {
  const texto = `${contactoInfo.cofeprisCompleto} | ${contactoInfo.licenciaSanitariaCompleta}`;

  return (
    <div className="nav-compliance" title={texto}>
      <Icon name="shield-check" strokeWidth={2} />
      <span className="nav-compliance-text">{texto}</span>
    </div>
  );
}
