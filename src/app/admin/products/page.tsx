"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [brandFilter, setBrandFilter] = useState("All");

    const fetchProducts = async () => {
        const url = brandFilter === "All" ? "/api/products" : `/api/products?brand=${encodeURIComponent(brandFilter)}`;
        const res = await fetch(url);
        if (res.ok) setProducts(await res.json());
    };

    useEffect(() => {
        fetchProducts();
    }, [brandFilter]);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this product?")) return;
        const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
        if (res.ok) fetchProducts();
    };

    return (
        <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "1.8rem", color: "#333" }}>Products</h1>
                <Link href="/admin/add-product" style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    background: "var(--primary)", color: "white", padding: "0.8rem 1.5rem", borderRadius: "6px", fontWeight: "600"
                }}>
                    <Plus size={18} /> Add Product
                </Link>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
                {["All", "Bagmati Plastic", "Bagmati Plastotech"].map(brand => (
                    <button
                        key={brand}
                        onClick={() => setBrandFilter(brand)}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "20px",
                            border: "none",
                            background: brandFilter === brand ? "var(--primary)" : "#f5f5f5",
                            color: brandFilter === brand ? "white" : "#666",
                            cursor: "pointer",
                            fontWeight: "500"
                        }}
                    >
                        {brand}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid #eee", textAlign: "left", color: "#666" }}>
                            <th style={{ padding: "1rem" }}>Image</th>
                            <th style={{ padding: "1rem" }}>Name</th>
                            <th style={{ padding: "1rem" }}>Brand</th>
                            <th style={{ padding: "1rem" }}>Category</th>
                            <th style={{ padding: "1rem" }}>Type</th>
                            <th style={{ padding: "1rem" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "1rem" }}>
                                    <div style={{ width: "50px", height: "50px", borderRadius: "4px", overflow: "hidden", background: "#f9f9f9" }}>
                                        {p.images && p.images[0] && <img src={p.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                    </div>
                                </td>
                                <td style={{ padding: "1rem", fontWeight: "500" }}>{p.name}</td>
                                <td style={{ padding: "1rem", color: "#666" }}>{p.brand}</td>
                                <td style={{ padding: "1rem", color: "#666" }}>{p.category}</td>
                                <td style={{ padding: "1rem", color: "#666" }}>{p.type}</td>
                                <td style={{ padding: "1rem" }}>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        <Link href={`/admin/edit-product/${p.id}`} style={{ padding: "6px", border: "1px solid #BBDEFB", background: "#E3F2FD", borderRadius: "4px", color: "#1976D2", cursor: "pointer", display: "flex", alignItems: "center" }}>
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(p.id)} style={{ padding: "6px", border: "1px solid #FFCDD2", background: "#FFEBEE", borderRadius: "4px", color: "#D32F2F", cursor: "pointer" }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && <p style={{ padding: "2rem", textAlign: "center", color: "#999" }}>No products found.</p>}
            </div>
        </div>
    );
}
