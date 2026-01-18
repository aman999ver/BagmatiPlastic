"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Hero.module.css";

export default function Hero() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/products?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>Premium Quality Plastic Products</h1>
                <p className={styles.subtitle}>
                    Discover our wide range of durable and stylish baskets, series, and household items.
                </p>

                <form onSubmit={handleSearch} className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Search products (e.g. Bucket, Mug)..."
                        className={styles.input}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className={styles.button}>Search</button>
                </form>
            </div>
        </section>
    );
}
