
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
        <div style={{ display: "flex" }}>
            <AdminSidebar>
                <div style={{ padding: "2rem" }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>Factory Images</h1>

                    {/* Upload Section */}
                    <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", marginBottom: "2rem", display: "flex", gap: "1rem", alignItems: "flex-end" }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Add New Image</label>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <input
                                    type="text"
                                    placeholder="Caption (Optional)"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    style={{ padding: "0.5rem", border: "1px solid #ddd", borderRadius: "4px", flex: 1 }}
                                />
                                <label style={{ cursor: "pointer", background: "#333", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <Upload size={18} />
                                    {uploading ? "Uploading..." : "Upload Image"}
                                    <input type="file" hidden onChange={handleUpload} disabled={uploading} accept="image/*" />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
                        {images.map((img) => (
                            <div key={img._id} style={{ position: "relative", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", background: "white" }}>
                                <div style={{ height: "150px", position: "relative" }}>
                                    <img src={img.image} alt={img.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div style={{ padding: "0.8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: "0.9rem", color: "#666", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px" }}>
                                        {img.caption || "No Caption"}
                                    </span>
                                    <button onClick={() => handleDelete(img._id)} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AdminSidebar>
        </div>
    );
}
