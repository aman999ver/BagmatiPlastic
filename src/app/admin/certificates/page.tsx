
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
        <AdminSidebar>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <header style={{ marginBottom: "3rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                        <div>
                            <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#1a1a1a" }}>Certifications</h1>
                            <p style={{ color: "#666", marginTop: "0.5rem" }}>Manage company certificates and awards.</p>
                        </div>
                    </div>
                </header>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "start" }}>

                    {/* Left Column: Add Form */}
                    <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #f0f0f0" }}>
                        <h2 style={{ fontSize: "1.2rem", marginBottom: "1.5rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Plus size={20} className="text-blue-600" />
                            Add New Certificate
                        </h2>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                            <div>
                                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "600", marginBottom: "0.5rem", color: "#444" }}>Title</label>
                                <input
                                    type="text" placeholder="e.g. ISO 9001:2015"
                                    value={title} onChange={(e) => setTitle(e.target.value)}
                                    style={{ width: "100%", padding: "0.8rem", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "0.95rem" }}
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "600", marginBottom: "0.5rem", color: "#444" }}>Description</label>
                                <textarea
                                    placeholder="Brief details about the certification..."
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                    style={{ width: "100%", padding: "0.8rem", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "0.95rem", minHeight: "80px" }}
                                    rows={3}
                                />
                            </div>

                            <div style={{ border: "2px dashed #e0e0e0", padding: "1.5rem", borderRadius: "8px", textAlign: "center", background: "#fafafa" }}>
                                <input
                                    type="file"
                                    id="cert-upload"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                    hidden
                                />
                                <label htmlFor="cert-upload" style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                                    <Upload size={24} color="#888" />
                                    <span style={{ color: "#666", fontSize: "0.9rem" }}>
                                        {imageFile ? imageFile.name : "Click to upload image"}
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={uploading}
                                style={{
                                    padding: "1rem", background: "var(--primary)", color: "white",
                                    border: "none", borderRadius: "8px", fontWeight: "600",
                                    cursor: "pointer", opacity: uploading ? 0.7 : 1, marginTop: "0.5rem",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                                }}
                            >
                                {uploading ? "Adding Certificate..." : "Add to Gallery"}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: List */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
                        {certs.length > 0 ? (
                            certs.map((cert) => (
                                <div key={cert._id} className="group" style={{
                                    border: "1px solid #eee", borderRadius: "12px", overflow: "hidden",
                                    background: "white", display: "flex", flexDirection: "column",
                                    transition: "all 0.2s hover:shadow-lg"
                                }}>
                                    <div style={{ height: "200px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", position: "relative" }}>
                                        <img src={cert.image} alt={cert.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                                    </div>
                                    <div style={{ padding: "1.2rem", flex: 1, borderTop: "1px solid #f5f5f5" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                                            <h3 style={{ fontWeight: "700", fontSize: "1.1rem", color: "#333", lineHeight: "1.3" }}>{cert.title}</h3>
                                            <button onClick={() => handleDelete(cert._id)} style={{ padding: "6px", background: "#ffebee", color: "#d32f2f", border: "none", borderRadius: "6px", cursor: "pointer", flexShrink: 0 }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        {cert.description && <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem", lineHeight: "1.5" }}>{cert.description}</p>}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", color: "#888" }}>
                                <p>No certificates found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminSidebar>
    );
}
