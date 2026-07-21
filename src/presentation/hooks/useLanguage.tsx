"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { translations, type Lang, type TranslationKey } from "@/shared/i18n/translations";

const STORAGE_KEY = "shArboledasLang";

// Acepta las claves conocidas (con autocompletado) o cualquier string armada dinámicamente
// (ej. `agendar.step${num}.title`), sin perder el tipado en los usos estáticos.
type AnyTranslationKey = TranslationKey | (string & {});

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: AnyTranslationKey, vars?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// localStorage es una fuente externa (no estado de React): se sincroniza con
// useSyncExternalStore para que la lectura sea segura en SSR y se actualice
// entre pestañas, en vez de leerla dentro de un useEffect con setState directo.
const listeners = new Set<() => void>();

function getSnapshot(): Lang {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "es";
}

function getServerSnapshot(): Lang {
  return "es";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function writeLang(next: Lang) {
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((callback) => callback());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "es-MX";
  }, [lang]);

  const setLang = useCallback((next: Lang) => writeLang(next), []);

  const t = useCallback<LanguageContextValue["t"]>(
    (key, vars) => {
      const dict = translations[lang] as Record<string, string>;
      const fallbackDict = translations.es as Record<string, string>;
      let text: string = dict[key] ?? fallbackDict[key] ?? key;
      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          text = text.replaceAll(`{${name}}`, value);
        }
      }
      return text;
    },
    [lang]
  );

  const value = useMemo<LanguageContextValue>(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return ctx;
}