"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "np";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        home: "Home",
        products: "Products",
        about: "About",
        contact: "Contact",
        blog: "Blog",
        search: "Search",
        trending: "Trending Products",
        newArrivals: "New Arrivals",
    },
    np: {
        home: "गृहपृष्ठ",
        products: "उत्पादनहरू",
        about: "हाम्रो बारेमा",
        contact: "सम्पर्क",
        blog: "ब्लग",
        search: "खोज्नुहोस्",
        trending: "चल्तीका उत्पादनहरू",
        newArrivals: "नयाँ आगमन",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: string) => {
        // @ts-ignore
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
