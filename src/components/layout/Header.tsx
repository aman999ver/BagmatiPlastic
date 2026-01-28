"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, Globe } from "lucide-react";
import styles from "./Header.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Glass effect logic
            setScrolled(currentScrollY > 50);

            // Hide/Show logic
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down & past top
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const [currentLang, setCurrentLang] = useState("EN");

    useEffect(() => {
        // Check cookie to set initial state label
        const getCookie = (name: string) => {
            const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        };
        const langInfo = getCookie("googtrans");
        if (langInfo === "/en/ne") setCurrentLang("NP");
        else setCurrentLang("EN");
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleLanguage = () => {
        const newLang = currentLang === "EN" ? "NP" : "EN";
        const cookieValue = newLang === "NP" ? "/en/ne" : "/en/en";

        // Set cookie for Google Translate
        document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=${cookieValue}; path=/;`; // fallback

        // Reload to apply
        window.location.reload();
    };

    return (
        <header
            className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${!isVisible ? styles.hidden : ""}`}
        >
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    {/* Desktop Logo */}
                    <div className="desktop-logo">
                        <Image
                            src="/bagmati-logo.png"
                            alt="Bagmati Plastic"
                            width={150}
                            height={50}
                            style={{ objectFit: "contain", height: "50px", width: "auto" }}
                            priority
                        />
                    </div>
                    {/* Mobile Logo */}
                    <div className="mobile-logo">
                        <Image
                            src="/mobilelogo.png"
                            alt="Bagmati Plastic"
                            width={50}
                            height={50}
                            style={{ objectFit: "contain", height: "40px", width: "auto" }}
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>{t("home")}</Link>
                    <Link href="/products" className={styles.navLink}>{t("products")}</Link>
                    <Link href="/about" className={styles.navLink}>{t("about")}</Link>
                    <Link href="/blogs" className={styles.navLink}>{t("blog")}</Link>
                    <Link href="/contact" className={styles.navLink}>{t("contact")}</Link>
                </nav>

                <div className={styles.actions}>
                    <div className={styles.searchWrapper}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const input = form.elements.namedItem("search") as HTMLInputElement;
                            if (input.value.trim()) {
                                window.location.href = `/products?search=${encodeURIComponent(input.value.trim())}`;
                            }
                        }} className={`${styles.searchForm} ${isSearchOpen ? styles.open : ""}`}>
                            <input
                                name="search"
                                type="text"
                                placeholder="Search..."
                                className={styles.searchInput}
                            />
                        </form>
                        <button aria-label="Search" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                            <Search size={20} />
                        </button>
                    </div>

                    <button aria-label="Language" onClick={toggleLanguage} style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "bold" }}>
                        <Globe size={20} />
                        <span>{currentLang}</span>
                    </button>

                    <button
                        className={styles.menuBtn}
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <nav className={styles.mobileMenu}>
                    <Link href="/" className={styles.navLink} onClick={toggleMenu}>{t("home")}</Link>
                    <Link href="/products" className={styles.navLink} onClick={toggleMenu}>{t("products")}</Link>
                    <Link href="/about" className={styles.navLink} onClick={toggleMenu}>{t("about")}</Link>
                    <Link href="/blogs" className={styles.navLink} onClick={toggleMenu}>{t("blog")}</Link>
                    <Link href="/contact" className={styles.navLink} onClick={toggleMenu}>{t("contact")}</Link>
                </nav>
            )}
        </header>
    );
}
