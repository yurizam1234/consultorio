"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface CitaModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CitaModalContext = createContext<CitaModalContextValue | null>(null);

export function CitaModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const value = useMemo<CitaModalContextValue>(
    () => ({ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }),
    [isOpen]
  );

  return <CitaModalContext.Provider value={value}>{children}</CitaModalContext.Provider>;
}

export function useCitaModal() {
  const ctx = useContext(CitaModalContext);
  if (!ctx) throw new Error("useCitaModal debe usarse dentro de CitaModalProvider");
  return ctx;
}
