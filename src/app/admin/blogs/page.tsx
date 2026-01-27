"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<any[]>([]);

    const fetchBlogs = async () => {
        const res = await fetch("/api/blogs");
        if (res.ok) setBlogs(await res.json());
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this blog?")) return;
        const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
        if (res.ok) fetchBlogs();
    };

    return (
        <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "1.8rem", color: "#333" }}>Blogs</h1>
                <Link href="/admin/blogs/add" style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    background: "var(--primary)", color: "white", padding: "0.8rem 1.5rem", borderRadius: "6px", fontWeight: "600"
                }}>
                    <Plus size={18} /> Add Blog
                </Link>
            </div>

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid #eee", textAlign: "left", color: "#666" }}>
                            <th style={{ padding: "1rem" }}>Image</th>
                            <th style={{ padding: "1rem" }}>Title</th>
                            <th style={{ padding: "1rem" }}>Category</th>
                            <th style={{ padding: "1rem" }}>Status</th>
                            <th style={{ padding: "1rem" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog.id} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "1rem" }}>
                                    <div style={{ width: "60px", height: "40px", borderRadius: "4px", overflow: "hidden", background: "#f9f9f9", position: "relative" }}>
                                        {blog.image ? (
                                            <Image src={blog.image} alt="" fill style={{ objectFit: "cover" }} />
                                        ) : (
                                            <div style={{ width: "100%", height: "100%", background: "#eee" }} />
                                        )}
                                    </div>
                                </td>
                                <td style={{ padding: "1rem", fontWeight: "500" }}>{blog.title}</td>
                                <td style={{ padding: "1rem", color: "#666" }}>{blog.category}</td>
                                <td style={{ padding: "1rem" }}>
                                    <span style={{
                                        padding: "4px 8px", borderRadius: "12px", fontSize: "0.85rem",
                                        background: blog.isPublished ? "#E8F5E9" : "#FFEBEE",
                                        color: blog.isPublished ? "#2E7D32" : "#C62828"
                                    }}>
                                        {blog.isPublished ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td style={{ padding: "1rem" }}>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        <Link href={`/admin/blogs/edit/${blog.id}`} style={{ padding: "6px", border: "1px solid #BBDEFB", background: "#E3F2FD", borderRadius: "4px", color: "#1976D2", cursor: "pointer", display: "flex", alignItems: "center" }}>
                                            <Edit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(blog.id)} style={{ padding: "6px", border: "1px solid #FFCDD2", background: "#FFEBEE", borderRadius: "4px", color: "#D32F2F", cursor: "pointer" }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {blogs.length === 0 && <p style={{ padding: "2rem", textAlign: "center", color: "#999" }}>No blogs found.</p>}
            </div>
        </div>
    );
}
