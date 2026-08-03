"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { patientProfile, type PatientProfile } from "@/shared/data/patientMock";

const STORAGE_KEY = "shArboledasAuth";

interface AuthContextValue {
  isAuthenticated: boolean;
  patient: PatientProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePatient: (patch: Partial<PatientProfile>) => void;
}

// ===== INTEGRACIÓN DE BACKEND (pendiente) =====
// A diferencia de "Agendar cita" (ver useCitaBooking.ts → container.crearCita,
// que ya sigue el patrón domain/application/infrastructure), este hook todavía
// NO pasa por esa capa — habla directo con localStorage. Para conectarlo a un
// backend real, seguir el MISMO patrón ya establecido en src/infrastructure/:
//   1. src/domain/repositories/AuthRepository.ts — interfaz
//      (login(email,password): Promise<PatientProfile>, updateProfile(patch): Promise<PatientProfile>)
//   2. src/application/auth/LoginUseCase.ts / UpdateProfileUseCase.ts
//   3. src/infrastructure/repositories/HttpAuthRepository.ts — implementación real
//      (fetch/POST al endpoint de login, guardar el token que devuelva en vez del "1" actual)
//   4. Registrar en src/infrastructure/container.ts junto a "crearCita"
// Los 3 puntos donde hoy hay lógica de demo que reemplazar:
const AuthContext = createContext<AuthContextValue | null>(null);

// Mismo patrón que useLanguage.tsx: localStorage es una fuente externa, se sincroniza
// con useSyncExternalStore (seguro en SSR/export estático, y se refleja entre pestañas).
const listeners = new Set<() => void>();

function getSnapshot(): boolean {
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function writeAuth(next: boolean) {
  if (next) window.localStorage.setItem(STORAGE_KEY, "1");
  else window.localStorage.removeItem(STORAGE_KEY);
  listeners.forEach((callback) => callback());
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const isAuthenticated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // Cambios de "Mi perfil": en memoria nada más (no hay backend todavía), se
  // combinan sobre el paciente mock — así el resto del panel (ej. edad/peso
  // prellenados al agendar un estudio) ve siempre el dato más reciente.
  const [patientOverrides, setPatientOverrides] = useState<Partial<PatientProfile>>({});

  // PUNTO DE INTEGRACIÓN 1/3: login simulado — cualquier correo/contraseña con
  // formato válido "entra" como el paciente de demostración. Reemplazar por
  // `const patient = await container.auth.login(email, password)` y guardar
  // el token/sesión que devuelva el backend (no un simple "1"). El retraso
  // artificial se puede quitar: la llamada de red real ya tendrá su latencia.
  const login = useCallback(async (email: string, password: string) => {
    if (!email || !password) throw new Error("Missing credentials");
    await new Promise((resolve) => setTimeout(resolve, 700));
    writeAuth(true);
  }, []);

  const logout = useCallback(() => writeAuth(false), []);

  // PUNTO DE INTEGRACIÓN 2/3: guarda los cambios de "Mi perfil" sólo en memoria
  // (se pierden al recargar) — falta un `container.auth.updateProfile(patch)`
  // real (PATCH al backend) antes de aplicar el patch aquí.
  const updatePatient = useCallback((patch: Partial<PatientProfile>) => {
    setPatientOverrides((prev) => ({ ...prev, ...patch }));
  }, []);

  const patient = useMemo<PatientProfile | null>(
    () => (isAuthenticated ? { ...patientProfile, ...patientOverrides } : null),
    [isAuthenticated, patientOverrides]
  );

  const value = useMemo<AuthContextValue>(
    () => ({ isAuthenticated, patient, login, logout, updatePatient }),
    [isAuthenticated, patient, login, logout, updatePatient]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
