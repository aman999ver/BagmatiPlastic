"use client";

import { useEffect } from "react";

export default function GoogleTranslate() {
    useEffect(() => {
        // Initialize Google Translate
        const addScript = document.createElement("script");
        addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        addScript.async = true;
        document.body.appendChild(addScript);

        // Define the callback function globally
        (window as any).googleTranslateElementInit = () => {
            new (window as any).google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "en,ne", // English and Nepali
                    layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false,
                },
                "google_translate_element"
            );
        };
    }, []);

    return (
        <div id="google_translate_element" style={{ display: "none" }}></div>
    );
}
