"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

type FeaturedItem = { id: string; title: string; imageUrl: string; link: string; };

export default function AdminFeaturedAndGrid() {
    const [items, setItems] = useState<FeaturedItem[]>([]);
    const [formData, setFormData] = useState({ id: "", title: "", imageUrl: "", link: "" });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch("/api/featured").then(res => res.json()).then(setItems);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const method = isEditing ? "PUT" : "POST";
        const res = await fetch("/api/featured", {
            method,
            body: JSON.stringify(isEditing ? formData : { ...formData, id: undefined }),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            const savedItem = await res.json();
            if (isEditing) {
                setItems(items.map(i => i.id === savedItem.id ? savedItem : i));
            } else {
                setItems([...items, savedItem]);
            }
            resetForm();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const res = await fetch(`/api/featured?id=${id}`, { method: "DELETE" });
        if (res.ok) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    const startEdit = (item: FeaturedItem) => {
        setFormData(item);
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({ id: "", title: "", imageUrl: "", link: "" });
        setIsEditing(false);
    };

    return (
        <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <h1 style={{ fontSize: "1.8rem", color: "#333", marginBottom: "2rem" }}>Manage Featured Grid</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
                <div>
                    <h3 style={{ marginBottom: "1rem", color: "#555" }}>
                        {isEditing ? "Edit Grid Item" : "Add New Item"}
                    </h3>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <input
                            placeholder="Title (e.g. Bathroom Items)"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            style={inputStyle}
                            required
                        />

                        <div style={{ marginBottom: "0.5rem" }}>
                            <label style={{ display: "block", marginBottom: "0.5rem", color: "#555", fontSize: "0.9rem" }}>Grid Image</label>
                            <ImageUpload
                                value={formData.imageUrl}
                                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                                uploadType="grid"
                            />
                        </div>

                        <input
                            placeholder="Link (e.g., /products?category=Bathroom)"
                            value={formData.link}
                            onChange={e => setFormData({ ...formData, link: e.target.value })}
                            style={inputStyle}
                        />

                        <div style={{ display: "flex", gap: "1rem" }}>
                            <button type="submit" style={btnStyle}>
                                {isEditing ? "Update Item" : "Add Item"}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={resetForm} style={cancelBtnStyle}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div>
                    <h3 style={{ marginBottom: "1rem", color: "#555" }}>Current Grid Items</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {items.length === 0 && <p style={{ color: "#888" }}>No items found.</p>}
                        {items.map((item) => (
                            <div key={item.id} style={{ border: "1px solid #eee", padding: "1rem", borderRadius: "8px", display: "flex", gap: "1rem", alignItems: "center" }}>
                                <div style={{ width: "80px", height: "60px", position: "relative", borderRadius: "4px", overflow: "hidden", background: "#f0f0f0" }}>
                                    {/* Use img for simplicity with external urls if next/image errors, but we use uploader now so standard img ok or Next Image */}
                                    <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: "600", color: "#333", margin: 0 }}>{item.title}</p>
                                    <p style={{ fontSize: "0.85rem", color: "#777", margin: 0 }}>{item.link || "No link"}</p>
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <button onClick={() => startEdit(item)} style={actionBtnStyle} title="Edit">
                                        <Edit size={18} color="#2196F3" />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} style={actionBtnStyle} title="Delete">
                                        <Trash2 size={18} color="#F44336" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const inputStyle = { padding: "0.75rem", border: "1px solid #e0e0e0", borderRadius: "6px", outline: "none" };
const btnStyle = { padding: "0.75rem", background: "var(--primary)", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" };
const cancelBtnStyle = { padding: "0.75rem", background: "#f5f5f5", color: "#333", border: "1px solid #ddd", borderRadius: "6px", cursor: "pointer", fontWeight: "600" };
const actionBtnStyle = { background: "white", border: "1px solid #eee", cursor: "pointer", padding: "6px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" };
