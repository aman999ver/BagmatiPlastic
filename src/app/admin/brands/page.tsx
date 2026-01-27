"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/ui/ImageUpload";
import { Trash2, Plus, Loader2 } from "lucide-react";

export default function AdminBrandsPage() {
    const [brands, setBrands] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [logo, setLogo] = useState("");

    const fetchBrands = async () => {
        const res = await fetch("/api/brands");
        if (res.ok) setBrands(await res.json());
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !logo) return alert("Please provide name and logo");

        setLoading(true);
        const res = await fetch("/api/brands", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, logo }),
        });

        if (res.ok) {
            setName("");
            setLogo("");
            fetchBrands();
        } else {
            alert("Failed to add brand");
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this brand?")) return;
        const res = await fetch(`/api/brands?id=${id}`, { method: "DELETE" });
        if (res.ok) fetchBrands();
    };

    return (
        <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <h1 style={{ fontSize: "1.8rem", color: "#333", marginBottom: "2rem" }}>Brands</h1>

            {/* Add Brand Form */}
            <div style={{ background: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
                <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem" }}>Add New Brand</h3>
                <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "1rem", alignItems: "end" }}>
                    <label style={{ display: "grid", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>Brand Name</span>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="e.g. Bagmati Plastic"
                            style={{ padding: "0.8rem", border: "1px solid #ccc", borderRadius: "4px" }}
                            required
                        />
                    </label>

                    <div>
                        <span style={{ fontSize: "0.9rem", fontWeight: "500", display: "block", marginBottom: "0.5rem" }}>Logo</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <ImageUpload
                                value={logo}
                                onChange={setLogo}
                                uploadType="brand"
                            />
                            {logo && <span style={{ fontSize: "0.8rem", color: "green" }}>Uploaded</span>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ background: "var(--primary)", color: "white", padding: "0.8rem 1.5rem", borderRadius: "4px", fontWeight: "bold", border: "none", cursor: "pointer", height: "46px", display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                        Add
                    </button>
                </form>
            </div>

            {/* List */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
                {brands.map(brand => (
                    <div key={brand.id} style={{ border: "1px solid #eee", borderRadius: "8px", padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", position: "relative" }}>
                        <div style={{ width: "100%", height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {brand.logo ? (
                                <img src={brand.logo} alt={brand.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                            ) : (
                                <div style={{ width: "100%", height: "100%", background: "#eee" }} />
                            )}
                        </div>
                        <h4 style={{ margin: 0, textAlign: "center" }}>{brand.name}</h4>
                        <button
                            onClick={() => handleDelete(brand.id)}
                            style={{ position: "absolute", top: "10px", right: "10px", padding: "6px", background: "#FFEBEE", color: "#D32F2F", border: "none", borderRadius: "4px", cursor: "pointer" }}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {brands.length === 0 && <p style={{ textAlign: "center", color: "#999", marginTop: "2rem" }}>No brands added yet.</p>}
        </div>
    );
}
