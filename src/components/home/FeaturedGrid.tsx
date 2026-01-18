"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// Using inline styles or reusing CategoryGrid ones if we want consistency, 
// but let's make a new simpler module or just use inline for now to avoid complexity unless requested.
// actually, let's duplicate the CSS for now as FeaturedGrid.module.css was moved.
// I'll create a new FeaturedGrid.module.css with similar simpler styles (maybe just 2x2 grid).

import styles from "./FeaturedGrid.module.css";

export default function FeaturedGrid() {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/featured")
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error("Failed to load featured grid", err));
    }, []);

    if (items.length === 0) return null;

    return (
        <section className="container" style={{ padding: "4rem 1rem", paddingBottom: "0" }}>
            <h2 style={{
                fontSize: "2rem",
                marginBottom: "2rem",
                color: "var(--foreground)",
                borderLeft: "5px solid var(--accent, #FFC107)", // Different color for distinction
                paddingLeft: "1rem"
            }}>
                Featured Products
            </h2>

            <div className={styles.grid}>
                {items.map(item => (
                    <Link
                        key={item.id}
                        href={item.link || "#"}
                        className={styles.item}
                    >
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className={styles.image}
                        />
                        <div className={styles.overlay}>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.subtitle}>Smart Solutions for Your Home</p>
                            <span className={styles.ctaButton}>View Details &rarr;</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
