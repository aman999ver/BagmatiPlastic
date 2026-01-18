"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit } from "lucide-react";

interface Series { id: string; name: string; }

export default function AdminSeriesPage() {
    const [seriesList, setSeriesList] = useState<Series[]>([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchSeries = async () => {
        const res = await fetch("/api/series");
        if (res.ok) setSeriesList(await res.json());
    };

    useEffect(() => { fetchSeries(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            // Update
            const res = await fetch("/api/series", {
                method: "PUT",
                body: JSON.stringify({ id: editingId, name }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                setName("");
                setEditingId(null);
                fetchSeries();
            }
        } else {
            // Create
            const res = await fetch("/api/series", {
                method: "POST",
                body: JSON.stringify({ name }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                setName("");
                fetchSeries();
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this series?")) return;
        const res = await fetch(`/api/series?id=${id}`, { method: "DELETE" });
        if (res.ok) fetchSeries();
    };

    const startEdit = (series: Series) => {
        setName(series.name);
        setEditingId(series.id);
    };

    return (
        <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <h1 style={{ fontSize: "1.8rem", marginBottom: "2rem", color: "#333" }}>Manage Product Series</h1>

            <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{editingId ? "Edit Series" : "Add New Series"}</h3>
                    <input
                        placeholder="Series Name (e.g. Gold)"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button type="submit" style={btnStyle}>{editingId ? "Update" : "Add"}</button>
                        {editingId && <button type="button" onClick={() => { setEditingId(null); setName(""); }} style={cancelBtnStyle}>Cancel</button>}
                    </div>
                </form>

                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem" }}>
                    {seriesList.map(s => (
                        <div key={s.id} style={{ padding: "1rem", border: "1px solid #eee", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f9f9f9" }}>
                            <span style={{ fontWeight: "600" }}>{s.name}</span>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button onClick={() => startEdit(s)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#2196F3" }}>
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => handleDelete(s.id)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#F44336" }}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {seriesList.length === 0 && <p style={{ color: "#999" }}>No series found.</p>}
                </div>
            </div>
        </div>
    );
}

const inputStyle = { padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd" };
const btnStyle = { padding: "0.8rem", background: "var(--primary)", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", flex: 1 };
const cancelBtnStyle = { padding: "0.8rem", background: "#eee", color: "#333", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" };
