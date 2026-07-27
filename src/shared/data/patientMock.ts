// Datos de demostración del paciente: el login todavía no tiene backend real (ver
// useAuth.tsx), así que cualquier acceso válido entra como este mismo paciente fijo.
// Cuando exista el backend, este archivo se reemplaza por la respuesta real de la API.
export interface PatientProfile {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  edad: number;
  peso: number;
  miembroDesde: string;
  tipoAcceso: string;
  estatus: "activo" | "inactivo";
  puntos: number;
}

export const patientProfile: PatientProfile = {
  id: "PAC-00482",
  nombre: "Mariana Torres López",
  email: "mariana.torres@example.com",
  telefono: "(961) 233-4487",
  fechaNacimiento: "1991-04-12",
  edad: 34,
  peso: 61,
  miembroDesde: "2022-03-08",
  tipoAcceso: "Paciente registrado",
  estatus: "activo",
  puntos: 1350,
};

export const PUNTOS_PARA_CHECKUP = 2000;
