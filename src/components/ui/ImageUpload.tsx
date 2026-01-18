"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    disabled?: boolean;
    uploadType?: "banner" | "grid" | "product" | "category";
    productName?: string;
}

export default function ImageUpload({ value, onChange, disabled, uploadType, productName }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (uploadType === "product" && !productName) {
            setError("Please enter a product name first.");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        if (uploadType) formData.append("type", uploadType);
        if (productName) formData.append("productName", productName);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");

            onChange(data.url);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (value) {
        return (
            <div style={{ position: "relative", width: "200px", height: "150px", borderRadius: "8px", overflow: "hidden", border: "1px solid #ddd" }}>
                <Image src={value} alt="Uploaded Image" fill style={{ objectFit: "cover" }} />
                <button
                    type="button"
                    onClick={() => onChange("")}
                    disabled={disabled}
                    style={{
                        position: "absolute", top: "5px", right: "5px",
                        background: "rgba(255,0,0,0.8)", color: "white",
                        border: "none", borderRadius: "50%", padding: "4px",
                        cursor: "pointer", zIndex: 10
                    }}
                >
                    <X size={16} />
                </button>
            </div>
        );
    }

    return (
        <div style={{ width: "100%", maxWidth: "300px" }}>
            <label style={{
                border: "2px dashed #ccc", borderRadius: "8px",
                padding: "2rem", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", cursor: "pointer",
                backgroundColor: loading ? "#f5f5f5" : "transparent",
                transition: "border 0.2s"
            }}>
                {loading ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: "#666" }}>
                        <Loader2 className="animate-spin" size={24} />
                        <span style={{ fontSize: "0.85rem" }}>Converting to WebP...</span>
                    </div>
                ) : (
                    <>
                        <Upload size={24} color="#666" />
                        <span style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" }}>Click to Upload Image</span>
                        <span style={{ fontSize: "0.75rem", color: "#999" }}>(Auto-converts to WebP)</span>
                    </>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={disabled || loading}
                    style={{ display: "none" }}
                />
            </label>
            {error && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "0.5rem" }}>{error}</p>}
        </div>
    );
}
