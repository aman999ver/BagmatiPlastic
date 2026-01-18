"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./FilterSidebar.module.css";

// In a real app, these could be dynamic
const CATEGORIES = ["Household", "Bathroom", "Industrial", "Kitchen", "Furniture"];
const SERIES = ["Gold", "Diamond", "Platinum", "Silver"];
const BRANDS = ["Bagmati Plastic", "Bagmati Plastotech"];
const COLORS = ["Red", "Blue", "Green", "Yellow", "Orange", "Pink", "Black", "White", "Brown", "Purple"];

export default function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

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
        <aside className={styles.sidebar}>
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
                    {COLORS.map(c => (
                        <label key={c} className={styles.label} style={{ width: "auto" }}>
                            <input type="checkbox" checked={selectedColors.includes(c)} onChange={() => toggleColor(c)} />
                            {c}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.title}>Categories</h3>
                {CATEGORIES.map(cat => (
                    <label key={cat} className={styles.label}>
                        <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                        {cat}
                    </label>
                ))}
            </div>

            <div className={styles.section}>
                <h3 className={styles.title}>Series</h3>
                {SERIES.map(s => (
                    <label key={s} className={styles.label}>
                        <input
                            type="checkbox"
                            checked={selectedSeries.includes(s)}
                            onChange={() => toggleSeries(s)}
                        />
                        {s}
                    </label>
                ))}
            </div>
        </aside>
    );
}
