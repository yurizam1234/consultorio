"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { FlagMX, FlagUS } from "@/presentation/atoms/FlagIcon";
import { cn } from "@/shared/lib/utils";

const languages = [
  { code: "es" as const, Flag: FlagMX, label: "Español" },
  { code: "en" as const, Flag: FlagUS, label: "English" },
];

export function LangSwitch() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === lang) ?? languages[0];

  useEffect(() => {
    if (!open) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <div className="lang-switch">
      <button
        type="button"
        className="lang-switch-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={t("aria.lang_menu")}
      >
        <current.Flag className="lang-flag" />
        <span className="lang-code">{current.code.toUpperCase()}</span>
      </button>

      {open && (
        <>
          <div className="lang-switch-backdrop" onClick={() => setOpen(false)} />
          <div className="lang-switch-menu">
            {languages.map((option) => (
              <button
                key={option.code}
                type="button"
                className={cn("lang-switch-option", option.code === lang && "active")}
                onClick={() => {
                  setLang(option.code);
                  setOpen(false);
                }}
              >
                <option.Flag className="lang-flag" />
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
