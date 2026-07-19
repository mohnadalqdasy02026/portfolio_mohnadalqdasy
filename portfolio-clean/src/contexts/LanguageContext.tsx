"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ar, en, TranslationKeys } from "@/i18n";

type Language = "ar" | "en";
type Direction = "rtl" | "ltr";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  translations: TranslationKeys;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) {
      setLanguageState(savedLang);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("language", language);
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
  }, [language, isMounted]);

  const direction: Direction = language === "ar" ? "rtl" : "ltr";
  const translations = language === "ar" ? ar : en;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "ar" ? "en" : "ar"));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        translations,
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
