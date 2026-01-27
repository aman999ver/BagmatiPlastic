"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ui/ImageUpload";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        excerpt: "",
        image: "",
        category: "",
        tags: "",
        isPublished: true
    });

    useEffect(() => {
        fetch(`/api/blogs?id=${id}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setFormData({
                        title: data.title,
                        content: data.content,
                        excerpt: data.excerpt || "",
                        image: data.image || "",
                        category: data.category || "",
                        tags: (data.tags || []).join(", "),
                        isPublished: data.isPublished
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...formData,
            tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean)
        };

        const res = await fetch(`/api/blogs?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            router.push("/admin/blogs");
        } else {
            alert("Failed to update blog");
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    if (loading) return <div style={{ padding: "4rem", textAlign: "center" }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: "2rem", maxWidth: "800px", background: "white", borderRadius: "8px", margin: "2rem auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <Link href="/admin/blogs" style={{ color: "#666" }}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 style={{ fontSize: "2rem", margin: 0 }}>Edit Blog</h1>
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
                        uploadType="banner"
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
                    disabled={saving}
                    style={{ background: "var(--primary)", color: "white", padding: "1rem", borderRadius: "4px", fontWeight: "bold", opacity: saving ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                    <Save size={18} />
                    {saving ? "Updating..." : "Update Blog"}
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
