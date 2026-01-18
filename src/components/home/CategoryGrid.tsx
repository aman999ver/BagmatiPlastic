"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CategoryGrid.module.css";

export default function CategoryGrid() {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/categories") // Fetch Categories
            .then(res => res.json())
            // Map category fields to expected grid item fields if different
            // Category: {name, image} -> Grid: {title, imageUrl, link}
            .then(data => {
                const formatted = data.map((cat: any) => ({
                    id: cat.id,
                    title: cat.name,
                    imageUrl: cat.image,
                    link: `/products?category=${encodeURIComponent(cat.name)}`
                }));
                setItems(formatted);
            })
            .catch(err => console.error("Failed to load grid", err));
    }, []);

    if (items.length === 0) return null;

    return (
        <section className="container" style={{ padding: "4rem 1rem" }}>
            <h2 style={{
                fontSize: "2rem",
                marginBottom: "2rem",
                color: "var(--foreground)",
                borderLeft: "5px solid var(--primary)",
                paddingLeft: "1rem"
            }}>
                Explore Categories
            </h2>

            <div className={styles.grid}>
                {items.map(item => (
                    <Link
                        key={item.id}
                        href={item.link}
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
                            <p className={styles.subtitle}>Clean Looks, Clean Living</p>
                            <span className={styles.ctaButton}>View More &rarr;</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
