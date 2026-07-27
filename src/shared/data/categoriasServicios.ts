export type CategoriaServicioId = "resonancias" | "tomografias" | "oftalmologia" | "generales";

export interface CategoriaServicio {
  id: CategoriaServicioId;
  labelKey:
    | "panel.servicios.category_resonancias"
    | "panel.servicios.category_tomografias"
    | "panel.servicios.category_oftalmologia"
    | "panel.servicios.category_generales";
  count: number;
}

// El listado de estudios de cada categoría llega después — de momento sólo se
// muestran las categorías y su conteo (ver PanelServiciosPage).
export const categoriasServicios: CategoriaServicio[] = [
  { id: "resonancias", labelKey: "panel.servicios.category_resonancias", count: 69 },
  { id: "tomografias", labelKey: "panel.servicios.category_tomografias", count: 54 },
  { id: "oftalmologia", labelKey: "panel.servicios.category_oftalmologia", count: 185 },
  { id: "generales", labelKey: "panel.servicios.category_generales", count: 42 },
];
