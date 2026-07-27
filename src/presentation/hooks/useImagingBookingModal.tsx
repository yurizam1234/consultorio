"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ImagingBookingModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ImagingBookingModalContext = createContext<ImagingBookingModalContextValue | null>(null);

// Mismo patrón que useEmergencyModal.tsx / useCitaModal.tsx.
export function ImagingBookingModalProvider({ children }: { children: ReactNode }) {
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

  return (
    <ImagingBookingModalContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </ImagingBookingModalContext.Provider>
  );
}

export function useImagingBookingModal() {
  const ctx = useContext(ImagingBookingModalContext);
  if (!ctx) throw new Error("useImagingBookingModal debe usarse dentro de ImagingBookingModalProvider");
  return ctx;
}
