"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface EmergencyModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const EmergencyModalContext = createContext<EmergencyModalContextValue | null>(null);

export function EmergencyModalProvider({ children }: { children: ReactNode }) {
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

  const value = useMemo<EmergencyModalContextValue>(
    () => ({ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }),
    [isOpen]
  );

  return <EmergencyModalContext.Provider value={value}>{children}</EmergencyModalContext.Provider>;
}

export function useEmergencyModal() {
  const ctx = useContext(EmergencyModalContext);
  if (!ctx) throw new Error("useEmergencyModal debe usarse dentro de EmergencyModalProvider");
  return ctx;
}