
"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import styles from "../AdminLayout.module.css";
import { Trash2, Plus, Upload } from "lucide-react";

export default function AdminFactoryPage() {
    const [images, setImages] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [caption, setCaption] = useState("");

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const res = await fetch("/api/factory-images");
        if (res.ok) {
            const data = await res.json();
            setImages(data);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        try {
            // 1. Upload Image
            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const { url } = await uploadRes.json();

            // 2. Save to DB
            const res = await fetch("/api/factory-images", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: url, caption }),
            });

            if (res.ok) {
                fetchImages();
                setCaption("");
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this image?")) return;
        const res = await fetch(`/api/factory-images?id=${id}`, { method: "DELETE" });
        if (res.ok) {
            fetchImages();
        }
    };

    return (
        <AdminSidebar>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <div>
                        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#1a1a1a" }}>Factory Gallery</h1>
                        <p style={{ color: "#666", marginTop: "0.5rem" }}>Manage images displayed in the factory showcase.</p>
                    </div>
                    <label style={{
                        display: "flex", alignItems: "center", gap: "0.5rem",
                        background: "var(--primary)", color: "white",
                        padding: "0.8rem 1.5rem", borderRadius: "8px",
                        fontWeight: "500", cursor: "pointer", transition: "all 0.2s",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                    }}>
                        <Plus size={20} />
                        {uploading ? "Uploading..." : "Add New Image"}
                        <input type="file" hidden onChange={handleUpload} disabled={uploading} accept="image/*" />
                    </label>
                </header>

                {/* Upload Context Caption - Only show if user selects file? No, maybe simple input near header or separate modal?
                    Let's keep it simple: The button above triggers file select. 
                    Wait, I removed the caption input in the header button approach. 
                    Let's revert to a nice form area or add caption after? 
                    Actually, for factory images, caption is optional. Let's keep the form area but make it look like a "Drop zone" or clean panel.
                */}

                <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px dashed #e0e0e0", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem" }}>Quick Upload</h3>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <input
                                type="text"
                                placeholder="Enter caption for the next upload..."
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                style={{ flex: 1, padding: "0.8rem", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "0.95rem" }}
                            />
                            {/* Re-using the header button logic here actually makes more sense for "Contextual" action */}
                            <label style={{
                                display: "flex", alignItems: "center", gap: "0.5rem",
                                background: "#333", color: "white",
                                padding: "0.8rem 1.5rem", borderRadius: "8px",
                                fontWeight: "500", cursor: "pointer"
                            }}>
                                <Upload size={18} />
                                <span>Select & Upload</span>
                                <input type="file" hidden onChange={handleUpload} disabled={uploading} accept="image/*" />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
                    {images.map((img) => (
                        <div key={img._id} className="group" style={{ position: "relative", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", background: "white", transition: "transform 0.2s" }}>
                            <div style={{ height: "220px", position: "relative", background: "#f5f5f5" }}>
                                <img src={img.image} alt={img.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                {/* Overlay Action */}
                                <div style={{
                                    position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                                    background: "rgba(0,0,0,0.4)", opacity: 0, transition: "opacity 0.2s",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}
                                    className="hover-overlay"
                                >
                                    <button
                                        onClick={() => handleDelete(img._id)}
                                        style={{ background: "white", border: "none", borderRadius: "50%", padding: "10px", cursor: "pointer", color: "#d32f2f", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
                                        title="Delete Image"
                                    >
                                        <Trash2 size={24} />
                                    </button>
                                </div>
                                {/* CSS for hover need style block or global/module */}
                                <style jsx>{`
                                    .group:hover .hover-overlay { opacity: 1 !important; }
                                    .group:hover { transform: translateY(-5px); }
                                `}</style>
                            </div>
                            <div style={{ padding: "1rem" }}>
                                <p style={{ fontWeight: "500", color: "#444", fontSize: "0.95rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {img.caption || "Untitled Image"}
                                </p>
                                <p style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.2rem" }}>
                                    Added {new Date(img.createdAt || Date.now()).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                    {images.length === 0 && (
                        <div style={{ wordSpacing: "100%", textAlign: "center", padding: "4rem", background: "#f9f9f9", borderRadius: "12px", border: "2px dashed #e0e0e0", color: "#888" }}>
                            <Upload size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
                            <p>No images yet. Upload your first factory image.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminSidebar>
    );
}
