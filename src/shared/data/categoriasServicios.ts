export type CategoriaServicioId = "resonancias" | "tomografias" | "oftalmologia" | "generales";

export interface CategoriaServicio {
  id: CategoriaServicioId;
  labelKey:
    | "panel.servicios.category_resonancias"
    | "panel.servicios.category_tomografias"
    | "panel.servicios.category_oftalmologia"
    | "panel.servicios.category_generales";
  count: number;
  img: string;
}

// El listado de estudios de cada categoría llega después — de momento sólo se
// muestran las categorías y su conteo (ver PanelServiciosPage).
export const categoriasServicios: CategoriaServicio[] = [
  {
    id: "resonancias",
    labelKey: "panel.servicios.category_resonancias",
    count: 69,
    img: "/instalaciones/areas-diagnosticas/reso3.webp",
  },
  {
    id: "tomografias",
    labelKey: "panel.servicios.category_tomografias",
    count: 54,
    img: "/instalaciones/areas-diagnosticas/tac2.webp",
  },
  {
    id: "oftalmologia",
    labelKey: "panel.servicios.category_oftalmologia",
    count: 185,
    img: "/servicios/oftalmologia.webp",
  },
  {
    id: "generales",
    labelKey: "panel.servicios.category_generales",
    count: 42,
    img: "/instalaciones/areas-diagnosticas/usg.webp",
  },
];
