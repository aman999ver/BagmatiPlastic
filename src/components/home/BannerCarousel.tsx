"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./BannerCarousel.module.css";
import siteContent from "@/data/site-content.json";

export default function BannerCarousel() {
    const [current, setCurrent] = useState(0);
    const [banners, setBanners] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/banners")
            .then(res => res.json())
            .then(data => setBanners(data))
            .catch(err => console.error("Failed to load banners", err));
    }, []);

    useEffect(() => {
        if (banners.length === 0) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const next = () => setCurrent((prev) => (prev + 1) % banners.length);
    const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

    if (banners.length === 0) return null;

    return (
        <section className={styles.carousel}>
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`${styles.slide} ${index === current ? styles.active : ""}`}
                >
                    <Image
                        src={banner.imageUrl}
                        alt={banner.title}
                        fill
                        className={styles.image}
                        priority={index === 0}
                    />
                    <div className={styles.overlay}>
                        <div className="container">
                            <h2>{banner.title}</h2>
                            {banner.link && (
                                <Link href={banner.link} style={{
                                    background: "var(--primary)",
                                    color: "white",
                                    padding: "0.5rem 1.5rem",
                                    borderRadius: "4px",
                                    fontWeight: "bold",
                                    display: "inline-block"
                                }}>
                                    Explore
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <div className={styles.controls}>
                <button onClick={prev} className={styles.controlBtn} aria-label="Previous">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={next} className={styles.controlBtn} aria-label="Next">
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
}
