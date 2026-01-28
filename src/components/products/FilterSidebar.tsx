"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import styles from "./FilterSidebar.module.css";

const BRANDS = ["Bagmati Plastic", "Bagmati Plastotech"];

export default function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Dynamic Data
    const [categories, setCategories] = useState<string[]>([]);
    const [seriesList, setSeriesList] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);

    // Filter State
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    useEffect(() => {
        // Fetch Categories
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => setCategories(data.map((c: any) => c.name)))
            .catch(err => console.error("Failed to load categories", err));

        // Fetch Series
        fetch("/api/series")
            .then(res => res.json())
            .then(data => setSeriesList(data.map((s: any) => s.name)))
            .catch(err => console.error("Failed to load series", err));

        // Fetch Colors
        fetch("/api/colors")
            .then(res => res.json())
            .then(setColors)
            .catch(err => console.error("Failed to load colors", err));
    }, []);

    useEffect(() => {
        // Sync state with URL params on load
        const cats = searchParams.get("category")?.split(",") || [];
        const sers = searchParams.get("series")?.split(",") || [];
        const brnds = searchParams.get("brand")?.split(",") || [];
        const cols = searchParams.get("color")?.split(",") || [];
        setSelectedCategories(cats.filter(Boolean));
        setSelectedSeries(sers.filter(Boolean));
        setSelectedBrands(brnds.filter(Boolean));
        setSelectedColors(cols.filter(Boolean));
    }, [searchParams]);

    const updateFilters = (cats: string[], sers: string[], brnds: string[], cols: string[]) => {
        const params = new URLSearchParams(searchParams.toString());

        if (cats.length > 0) params.set("category", cats.join(",")); else params.delete("category");
        if (sers.length > 0) params.set("series", sers.join(",")); else params.delete("series");
        if (brnds.length > 0) params.set("brand", brnds.join(",")); else params.delete("brand");
        if (cols.length > 0) params.set("color", cols.join(",")); else params.delete("color");

        router.push(`/products?${params.toString()}`);
    };

    const toggleCategory = (cat: string) => {
        const newCats = selectedCategories.includes(cat) ? selectedCategories.filter(c => c !== cat) : [...selectedCategories, cat];
        setSelectedCategories(newCats);
        updateFilters(newCats, selectedSeries, selectedBrands, selectedColors);
    };

    const toggleSeries = (s: string) => {
        const newSers = selectedSeries.includes(s) ? selectedSeries.filter(series => series !== s) : [...selectedSeries, s];
        setSelectedSeries(newSers);
        updateFilters(selectedCategories, newSers, selectedBrands, selectedColors);
    };

    const toggleBrand = (b: string) => {
        const newBrands = selectedBrands.includes(b) ? selectedBrands.filter(br => br !== b) : [...selectedBrands, b];
        setSelectedBrands(newBrands);
        updateFilters(selectedCategories, selectedSeries, newBrands, selectedColors);
    };

    const toggleColor = (c: string) => {
        const newColors = selectedColors.includes(c) ? selectedColors.filter(col => col !== c) : [...selectedColors, c];
        setSelectedColors(newColors);
        updateFilters(selectedCategories, selectedSeries, selectedBrands, newColors);
    };

    return (
        <>
            <button
                className={styles.mobileToggle}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? <X size={20} /> : <Filter size={20} />}
                <span>{isMobileOpen ? "Close Filters" : "Show Filters"}</span>
            </button>

            <aside className={`${styles.sidebar} ${isMobileOpen ? styles.open : ""}`}>
                <div className={styles.mobileHeader}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Filters</h2>
                    <button onClick={() => setIsMobileOpen(false)} className={styles.closeBtn}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.title}>Brand</h3>
                    {BRANDS.map(b => (
                        <label key={b} className={styles.label}>
                            <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} />
                            {b}
                        </label>
                    ))}
                </div>

                <div className={styles.section}>
                    <h3 className={styles.title}>Color</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {colors.length > 0 ? (
                            colors.map(c => (
                                <label key={c} className={styles.label} style={{ width: "auto" }}>
                                    <input type="checkbox" checked={selectedColors.includes(c)} onChange={() => toggleColor(c)} />
                                    {c}
                                </label>
                            ))
                        ) : (
                            <p style={{ color: "#999", fontSize: "0.9rem" }}>Loading colors...</p>
                        )}
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.title}>Categories</h3>
                    {categories.length > 0 ? (
                        categories.map(cat => (
                            <label key={cat} className={styles.label}>
                                <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                                {cat}
                            </label>
                        ))
                    ) : (
                        <p style={{ color: "#999", fontSize: "0.9rem" }}>Loading categories...</p>
                    )}
                </div>

                <div className={styles.section}>
                    <h3 className={styles.title}>Series</h3>
                    {seriesList.length > 0 ? (
                        seriesList.map(s => (
                            <label key={s} className={styles.label}>
                                <input
                                    type="checkbox"
                                    checked={selectedSeries.includes(s)}
                                    onChange={() => toggleSeries(s)}
                                />
                                {s}
                            </label>
                        ))
                    ) : (
                        <p style={{ color: "#999", fontSize: "0.9rem" }}>Loading series...</p>
                    )}
                </div>
            </aside>
        </>
    );
}
