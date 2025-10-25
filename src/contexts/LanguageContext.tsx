import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (id: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("digiat-language");
    if (stored) return stored as Language;

    // Auto-detect based on browser language
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("id") ? "id" : "en";
  });

  useEffect(() => {
    localStorage.setItem("digiat-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (id: string, en: string) => {
    return language === "id" ? id : en;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
