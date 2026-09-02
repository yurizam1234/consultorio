"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface AssistantModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const AssistantModalContext = createContext<AssistantModalContextValue | null>(null);

export function AssistantModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const value = useMemo<AssistantModalContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
    }),
    [isOpen]
  );

  return <AssistantModalContext.Provider value={value}>{children}</AssistantModalContext.Provider>;
}

export function useAssistantModal() {
  const ctx = useContext(AssistantModalContext);
  if (!ctx) throw new Error("useAssistantModal debe usarse dentro de AssistantModalProvider");
  return ctx;
}
