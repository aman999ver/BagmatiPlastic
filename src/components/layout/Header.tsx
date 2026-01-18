"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, Globe } from "lucide-react";
import styles from "./Header.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
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

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleLanguage = () => setLanguage(language === "en" ? "np" : "en");

    return (
        <header
            className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${!isVisible ? styles.hidden : ""}`}
        >
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/bagmati-logo.png"
                        alt="Bagmati Plastic"
                        width={150}
                        height={50}
                        style={{ objectFit: "contain", height: "50px", width: "auto" }}
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>{t("home")}</Link>
                    <Link href="/products" className={styles.navLink}>{t("products")}</Link>
                    <Link href="/about" className={styles.navLink}>{t("about")}</Link>
                    <Link href="/blog" className={styles.navLink}>{t("blog")}</Link>
                    <Link href="/contact" className={styles.navLink}>{t("contact")}</Link>
                </nav>

                <div className={styles.actions}>
                    <button aria-label="Search">
                        <Search size={20} />
                    </button>
                    <button aria-label="Language" onClick={toggleLanguage} style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "bold" }}>
                        <Globe size={20} />
                        <span>{language === "en" ? "EN" : "NP"}</span>
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
                    <Link href="/blog" className={styles.navLink} onClick={toggleMenu}>{t("blog")}</Link>
                    <Link href="/contact" className={styles.navLink} onClick={toggleMenu}>{t("contact")}</Link>
                </nav>
            )}
        </header>
    );
}
