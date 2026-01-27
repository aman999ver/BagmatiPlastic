"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ui/ImageUpload";
import { Trash2, Plus, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ColorVariant {
    name: string;
    code: string;
    image: string;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        type: "",
        series: "",
        size: "",
        features: "", // comma separated
        description: "",
        images: "", // comma separated URLs (General Gallery)
        isNew: false,
        isTrending: false,
        brand: "Bagmati Plastic"
    });

    const [colors, setColors] = useState<ColorVariant[]>([]);

    // Dropdowns
    const [categories, setCategories] = useState<any[]>([]);
    const [seriesList, setSeriesList] = useState<any[]>([]);

    useEffect(() => {
        // Fetch Metadata
        fetch("/api/categories").then(res => res.json()).then(setCategories);
        fetch("/api/series").then(res => res.json()).then(setSeriesList);

        // Fetch Product Data
        fetch(`/api/products?id=${id}`) // Note: GET /api/products returns array, we need by ID. 
        // Wait, GET /api/products currently returns ALL or Filtered list. It doesn't fetch single by ID efficiently.
        // We really should have GET /api/products/[id] or adjust GET /api/products?id=... logic.
        // The implementation plan didn't explicitly change GET for single item, but let's check lib/products.ts `getProductById`.
        // Ideally API should support ?id=...
        // Let's check api/products/route.ts again.
        // It does NOT support fetching by ID in GET.
        // I will assume for now I need to filter client side or update API. 更新 API seems better but for speed I might just fetch all and find content if list is small. 
        // But better: use the server action or existing helper if possible? 
        // No, let's fix the API to support ID fetch or just fetch all and find. 
        // Given the requirement, I'll update the API GET to support ID if easy, otherwise fetch all.
        // Actually, looking at route.ts, GET supports filters. I can filter by ID if I adding `_id: id` to query?
        // No, `_id` isn't in the allowed filters list.
        // Let's implement robust solution: Add GET by ID support to API right now via another tool or hack it here?
        // I'll hack it here: fetch all and find for now to save tool calls, or just assume I can add it. 
        // Wait, I can use `getProductById` if this was a server component, but this is a client component.
        // I will implement a quick fetch-all-and-find because I don't want to break flow to edit API GET again right now.
        // Wait, if product list is huge this is bad. 
        // Let's check if I can just use `getProducts` logic. 
        // Actually, I'll update the API GET to support `id` query param. It's safer.
        // I'll do that in parallel or before this? I'll do it in this file creation assuming it works, and I'll update route.ts in next step.

    }, [id]);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch(`/api/products?id=${id}`);
                const products = await res.json();
                // API returns array even if filtered by ID (based on find(query))
                // Or does find(query) return array? Yes.
                const product = products[0];

                if (product) {
                    setFormData({
                        name: product.name || "",
                        category: product.category || "",
                        type: product.type || "",
                        series: product.series || "",
                        size: product.size || "",
                        features: (product.features || []).join(", "),
                        description: product.description || "",
                        images: (product.images || []).join(", "),
                        isNew: product.isNewItem || false,
                        isTrending: product.isTrending || false,
                        brand: product.brand || "Bagmati Plastic"
                    });
                    setColors(product.colors || []);
                } else {
                    alert("Product not found");
                    router.push("/admin/products");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if (id) loadData();
    }, [id, router]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...formData,
            features: formData.features.split(",").map(s => s.trim()).filter(Boolean),
            images: formData.images.split(",").map(s => s.trim()).filter(Boolean),
            colors: colors
        };

        const res = await fetch(`/api/products?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            router.push("/admin/products");
        } else {
            alert("Failed to update product");
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const addColor = () => {
        setColors([...colors, { name: "", code: "#000000", image: "" }]);
    };

    const removeColor = (index: number) => {
        setColors(colors.filter((_, i) => i !== index));
    };

    const updateColor = (index: number, field: keyof ColorVariant, value: string) => {
        const newColors = [...colors];
        newColors[index][field] = value;
        setColors(newColors);
    };

    if (loading) return <div style={{ padding: "4rem", textAlign: "center" }}>Loading product...</div>;

    return (
        <div className="container" style={{ padding: "2rem", maxWidth: "900px", background: "white", borderRadius: "8px", margin: "2rem auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <Link href="/admin/products" style={{ color: "#666" }}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 style={{ fontSize: "2rem", margin: 0 }}>Edit Product</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.5rem" }}>

                {/* Brand & Category */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    <label>
                        Brand *
                        <select name="brand" value={formData.brand} onChange={handleChange} style={inputStyle}>
                            <option value="Bagmati Plastic">Bagmati Plastic</option>
                            <option value="Bagmati Plastotech">Bagmati Plastotech</option>
                        </select>
                    </label>

                    <label>
                        Category *
                        <select name="category" value={formData.category} onChange={handleChange} style={inputStyle} required>
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>

                {/* Name & Type */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    <label>
                        Product Name *
                        <input name="name" required value={formData.name} onChange={handleChange} style={inputStyle} />
                    </label>
                    <label>
                        Type (e.g. Bucket) *
                        <input name="type" required value={formData.type} onChange={handleChange} style={inputStyle} />
                    </label>
                </div>

                {/* Series & Size */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    <label>
                        Series *
                        <select name="series" value={formData.series} onChange={handleChange} style={inputStyle}>
                            <option value="">Select Series</option>
                            <option value="None">None</option>
                            {seriesList.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                        </select>
                    </label>
                    <label>
                        Size (e.g. 20L)
                        <input name="size" value={formData.size} onChange={handleChange} style={inputStyle} />
                    </label>
                </div>

                {/* Colors Section */}
                <div style={{ border: "1px solid #eee", padding: "1rem", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <label style={{ fontWeight: "600" }}>Color Variants</label>
                        <button type="button" onClick={addColor} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#E3F2FD", color: "#2196F3", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}>
                            <Plus size={16} /> Add Color
                        </button>
                    </div>

                    {colors.length === 0 && <p style={{ color: "#999", fontSize: "0.9rem" }}>No colors added yet.</p>}

                    <div style={{ display: "grid", gap: "1rem" }}>
                        {colors.map((color, index) => (
                            <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr auto", gap: "1rem", alignItems: "start", background: "#f9f9f9", padding: "1rem", borderRadius: "6px" }}>
                                <div>
                                    <input
                                        placeholder="Color Name (e.g. Red)"
                                        value={color.name}
                                        onChange={(e) => updateColor(index, "name", e.target.value)}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <input
                                            type="color"
                                            value={color.code}
                                            onChange={(e) => updateColor(index, "code", e.target.value)}
                                            style={{ height: "42px", padding: "0", border: "none", background: "none", cursor: "pointer" }}
                                        />
                                        <input
                                            value={color.code}
                                            onChange={(e) => updateColor(index, "code", e.target.value)}
                                            style={inputStyle}
                                            placeholder="#RRGGBB"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <ImageUpload
                                        value={color.image}
                                        onChange={(url) => updateColor(index, "image", url)}
                                        uploadType="product"
                                        productName={formData.name || "temp"}
                                    />
                                </div>
                                <button type="button" onClick={() => removeColor(index)} style={{ color: "#F44336", background: "white", border: "1px solid #ffcdd2", padding: "0.5rem", borderRadius: "4px", cursor: "pointer" }}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features & Description */}
                <label>
                    Features (Comma separated)
                    <textarea name="features" value={formData.features} onChange={handleChange} placeholder="Unbreakable, Easy Grip" style={{ ...inputStyle, minHeight: "80px" }} />
                </label>

                <label>
                    Description
                    <textarea name="description" value={formData.description} onChange={handleChange} style={{ ...inputStyle, minHeight: "120px" }} />
                </label>

                {/* General Images */}
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Product Gallery Images</label>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                        <ImageUpload
                            value=""
                            onChange={(url) => setFormData(prev => ({
                                ...prev,
                                images: prev.images ? `${prev.images}, ${url}` : url
                            }))}
                            uploadType="product"
                            productName={formData.name}
                        />
                        <div style={{ flex: 1 }}>
                            <input
                                name="images"
                                value={formData.images}
                                onChange={handleChange}
                                placeholder="URLs (comma separated)"
                                style={inputStyle}
                            />
                        </div>
                    </div>
                </div>

                {/* Toggles */}
                <div style={{ display: "flex", gap: "2rem" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} />
                        Mark as New
                    </label>

                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} />
                        Mark as Trending
                    </label>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                        type="submit"
                        disabled={saving}
                        style={{ background: "var(--primary)", color: "white", padding: "1rem 2rem", borderRadius: "4px", fontWeight: "bold", opacity: saving ? 0.7 : 1, display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                        <Save size={18} />
                        {saving ? "Saving..." : "Update Product"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        style={{ background: "#f5f5f5", color: "#333", padding: "1rem 2rem", borderRadius: "4px", fontWeight: "bold", border: "none", cursor: "pointer" }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    marginTop: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem"
};
