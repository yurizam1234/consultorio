export type AreaEstudioId = "resonancia" | "tomografia" | "general";

export interface AreaEstudio {
  id: AreaEstudioId;
  labelKey: "panel.agendar.area_resonancia" | "panel.agendar.area_tomografia" | "panel.agendar.area_general";
}

export const areasEstudio: AreaEstudio[] = [
  { id: "resonancia", labelKey: "panel.agendar.area_resonancia" },
  { id: "tomografia", labelKey: "panel.agendar.area_tomografia" },
  { id: "general", labelKey: "panel.agendar.area_general" },
];
