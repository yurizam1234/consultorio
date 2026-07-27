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

  // Login simulado: todavía no hay backend (ver comentario en patientMock.ts) — cualquier
  // correo/contraseña con formato válido "entra" como el paciente de demostración. El
  // pequeño retraso simula una llamada de red real, para que el estado de carga del
  // formulario se sienta igual que cuando se conecte al backend de verdad.
  const login = useCallback(async (email: string, password: string) => {
    if (!email || !password) throw new Error("Missing credentials");
    await new Promise((resolve) => setTimeout(resolve, 700));
    writeAuth(true);
  }, []);

  const logout = useCallback(() => writeAuth(false), []);

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
