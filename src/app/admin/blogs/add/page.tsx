"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ui/ImageUpload";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        excerpt: "",
        image: "",
        category: "",
        tags: "",
        isPublished: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean)
        };

        const res = await fetch("/api/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            router.push("/admin/blogs");
        } else {
            alert("Failed to create blog");
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    return (
        <div className="container" style={{ padding: "2rem", maxWidth: "800px", background: "white", borderRadius: "8px", margin: "2rem auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <Link href="/admin/blogs" style={{ color: "#666" }}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 style={{ fontSize: "2rem", margin: 0 }}>Add New Blog</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.5rem" }}>

                <label>
                    Title *
                    <input name="title" required value={formData.title} onChange={handleChange} style={inputStyle} />
                </label>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    <label>
                        Category
                        <input name="category" placeholder="e.g. Tips & Tricks" value={formData.category} onChange={handleChange} style={inputStyle} />
                    </label>
                    <label>
                        Tags (comma separated)
                        <input name="tags" placeholder="plastic, home, garden" value={formData.tags} onChange={handleChange} style={inputStyle} />
                    </label>
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>Cover Image</label>
                    <ImageUpload
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                        uploadType="banner" // Reusing banner type for generic upload
                    />
                </div>

                <label>
                    Short Excerpt
                    <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} style={{ ...inputStyle, minHeight: "80px" }} />
                </label>

                <label>
                    Content (HTML supported) *
                    <textarea name="content" required value={formData.content} onChange={handleChange} style={{ ...inputStyle, minHeight: "300px", fontFamily: "monospace" }} />
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} />
                    Publish Immediately
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    style={{ background: "var(--primary)", color: "white", padding: "1rem", borderRadius: "4px", fontWeight: "bold", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                    <Save size={18} />
                    {loading ? "Saving..." : "Create Blog"}
                </button>
            </form>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    marginTop: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem"
};
