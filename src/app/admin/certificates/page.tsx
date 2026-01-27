
"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import styles from "../AdminLayout.module.css";
import { Trash2, Plus, Upload } from "lucide-react";

export default function AdminCertificatesPage() {
    const [certs, setCerts] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        fetchCerts();
    }, []);

    const fetchCerts = async () => {
        const res = await fetch("/api/certificates");
        if (res.ok) {
            const data = await res.json();
            setCerts(data);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile || !title) {
            alert("Title and Image are required");
            return;
        }
        setUploading(true);

        try {
            // 1. Upload Image
            const formData = new FormData();
            formData.append("file", imageFile);
            const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
            const { url } = await uploadRes.json();

            // 2. Save to DB
            const res = await fetch("/api/certificates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, image: url }),
            });

            if (res.ok) {
                fetchCerts();
                setTitle("");
                setDescription("");
                setImageFile(null);
            }
        } catch (error) {
            console.error("Failed", error);
            alert("Failed to add certificate");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this certificate?")) return;
        const res = await fetch(`/api/certificates?id=${id}`, { method: "DELETE" });
        if (res.ok) {
            fetchCerts();
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <AdminSidebar>
                <div style={{ padding: "2rem" }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>Certificates</h1>

                    {/* Add Form */}
                    <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", marginBottom: "3rem", maxWidth: "600px" }}>
                        <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", fontWeight: "bold" }}>Add New Certificate</h2>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <input
                                type="text" placeholder="Certificate Title"
                                value={title} onChange={(e) => setTitle(e.target.value)}
                                style={{ padding: "0.8rem", border: "1px solid #ddd", borderRadius: "4px" }}
                                required
                            />
                            <textarea
                                placeholder="Description (Optional)"
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                style={{ padding: "0.8rem", border: "1px solid #ddd", borderRadius: "4px" }}
                                rows={3}
                            />
                            <div style={{ border: "1px dashed #ccc", padding: "1rem", borderRadius: "4px", textAlign: "center" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                    style={{ marginBottom: "0.5rem" }}
                                />
                                {imageFile && <p style={{ fontSize: "0.8rem", color: "green" }}>Selected: {imageFile.name}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={uploading}
                                style={{ padding: "0.8rem", background: "#F44336", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", opacity: uploading ? 0.7 : 1 }}
                            >
                                {uploading ? "Adding..." : "Add Certificate"}
                            </button>
                        </form>
                    </div>

                    {/* List */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
                        {certs.map((cert) => (
                            <div key={cert._id} style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden", background: "white", padding: "1rem" }}>
                                <div style={{ height: "200px", marginBottom: "1rem", background: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <img src={cert.image} alt={cert.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                                </div>
                                <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{cert.title}</h3>
                                {cert.description && <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>{cert.description}</p>}
                                <button onClick={() => handleDelete(cert._id)} style={{ width: "100%", padding: "0.5rem", background: "#ffebee", color: "#c62828", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </AdminSidebar>
        </div>
    );
}
