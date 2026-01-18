"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

interface Category { id: string; name: string; image: string; }

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({ id: "", name: "", image: "" });
    const [isEditing, setIsEditing] = useState(false);

    const fetchCategories = async () => {
        const res = await fetch("/api/categories");
        if (res.ok) setCategories(await res.json());
    };

    useEffect(() => { fetchCategories(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = isEditing ? "PUT" : "POST";
        const body = isEditing ? formData : { name: formData.name, image: formData.image };

        const res = await fetch("/api/categories", {
            method,
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            setFormData({ id: "", name: "", image: "" });
            setIsEditing(false);
            fetchCategories();
        } else {
            alert("Failed to save category");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this category?")) return;
        const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
        if (res.ok) fetchCategories();
    };

    const startEdit = (cat: Category) => {
        setFormData(cat);
        setIsEditing(true);
    };

    return (
        <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <h1 style={{ fontSize: "1.8rem", marginBottom: "2rem", color: "#333" }}>Manage Categories</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "2rem" }}>
                {/* Form */}
                <div>
                    <h3 style={{ marginBottom: "1rem", color: "#555" }}>{isEditing ? "Edit Category" : "Add New Category"}</h3>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <input
                            placeholder="Category Name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={inputStyle}
                            required
                        />
                        <div style={{ marginBottom: "0.5rem" }}>
                            <label style={{ display: "block", marginBottom: "0.5rem", color: "#666", fontSize: "0.9rem" }}>Cover Image</label>
                            <ImageUpload
                                value={formData.image}
                                onChange={url => setFormData({ ...formData, image: url })}
                                uploadType="category"
                            />
                        </div>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <button type="submit" style={btnStyle}>{isEditing ? "Update" : "Add"}</button>
                            {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: "", name: "", image: "" }) }} style={cancelBtnStyle}>Cancel</button>}
                        </div>
                    </form>
                </div>

                {/* List */}
                <div>
                    <h3 style={{ marginBottom: "1rem", color: "#555" }}>All Categories</h3>
                    <div style={{ display: "grid", gap: "1rem" }}>
                        {categories.map(cat => (
                            <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: "1px solid #eee", borderRadius: "8px" }}>
                                <div style={{ width: "60px", height: "60px", background: "#f5f5f5", borderRadius: "4px", overflow: "hidden" }}>
                                    {cat.image && <img src={cat.image} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                </div>
                                <span style={{ flex: 1, fontWeight: "600", color: "#333" }}>{cat.name}</span>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <button onClick={() => startEdit(cat)} style={actionBtnStyle}><Edit size={16} color="#2196F3" /></button>
                                    <button onClick={() => handleDelete(cat.id)} style={actionBtnStyle}><Trash2 size={16} color="#F44336" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const inputStyle = { padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd", width: "100%" };
const btnStyle = { padding: "0.8rem 1.5rem", background: "var(--primary)", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" };
const cancelBtnStyle = { padding: "0.8rem 1.5rem", background: "#eee", color: "#333", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" };
const actionBtnStyle = { padding: "8px", background: "white", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center" };
