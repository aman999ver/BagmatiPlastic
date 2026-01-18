"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Edit, Trash2 } from "lucide-react";

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products", { cache: "no-store" })
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <header style={{ marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
                <h1 style={{ fontSize: "1.8rem", color: "#333" }}>Product Dashboard</h1>
                <p style={{ color: "#777" }}>Manage your product inventory.</p>
            </header>

            {loading ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>Loading inventory...</div>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
                        <thead>
                            <tr style={{ background: "#f8f9fa", textAlign: "left", color: "#444", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.5px" }}>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Category</th>
                                <th style={thStyle}>Type</th>
                                <th style={thStyle}>Series</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={tdStyle}>
                                        <div style={{ fontWeight: "600", color: "#333" }}>{product.name}</div>
                                    </td>
                                    <td style={tdStyle}>{product.category}</td>
                                    <td style={tdStyle}>{product.type}</td>
                                    <td style={tdStyle}>{product.series}</td>
                                    <td style={tdStyle}>
                                        <div style={{ display: "flex", gap: "1rem" }}>
                                            <button style={actionBtnStyle} title="Edit">
                                                <Edit size={18} color="#2196F3" />
                                            </button>
                                            <button style={actionBtnStyle} title="Delete">
                                                <Trash2 size={18} color="#F44336" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {products.length === 0 && (
                        <div style={{ padding: "3rem", textAlign: "center", color: "#888", background: "#f9f9f9", borderRadius: "4px", marginTop: "1rem" }}>
                            No products found. Add your first product using the sidebar.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const thStyle = { padding: "1rem", borderBottom: "2px solid #e0e0e0" };
const tdStyle = { padding: "1rem", verticalAlign: "middle", color: "#555" };
const actionBtnStyle = { background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "4px", transition: "background 0.2s" };
