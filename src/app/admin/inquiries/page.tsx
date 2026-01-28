
"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import styles from "../AdminLayout.module.css";
import { Trash2, MailOpen, Mail } from "lucide-react";

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<any[]>([]);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        const res = await fetch("/api/inquiries");
        if (res.ok) {
            const data = await res.json();
            setInquiries(data);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this inquiry?")) return;
        const res = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
        if (res.ok) {
            fetchInquiries();
        }
    };

    // Could add Mark as Read functionality here if API supported PUT

    return (
        <AdminSidebar>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <header style={{ marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#1a1a1a" }}>Inquiries</h1>
                    <p style={{ color: "#666", marginTop: "0.5rem" }}>Messages from the contact form.</p>
                </header>

                <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", overflow: "hidden", border: "1px solid #f0f0f0" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead style={{ background: "#f9fafb", borderBottom: "1px solid #eee" }}>
                            <tr>
                                <th style={{ padding: "1.2rem 1.5rem", textAlign: "left", fontSize: "0.85rem", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Date</th>
                                <th style={{ padding: "1.2rem 1.5rem", textAlign: "left", fontSize: "0.85rem", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>From</th>
                                <th style={{ padding: "1.2rem 1.5rem", textAlign: "left", fontSize: "0.85rem", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Contact Info</th>
                                <th style={{ padding: "1.2rem 1.5rem", textAlign: "left", fontSize: "0.85rem", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Message</th>
                                <th style={{ padding: "1.2rem 1.5rem", textAlign: "right", fontSize: "0.85rem", textTransform: "uppercase", color: "#666", fontWeight: "600" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((inquiry) => (
                                <tr key={inquiry._id} style={{ borderBottom: "1px solid #f5f5f5", transition: "background 0.2s" }} className="hover:bg-gray-50">
                                    <td style={{ padding: "1.5rem", color: "#666", fontSize: "0.9rem", whiteSpace: "nowrap", verticalAlign: "top" }}>
                                        {new Date(inquiry.createdAt || Date.now()).toLocaleDateString()}
                                        <div style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.2rem" }}>
                                            {new Date(inquiry.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td style={{ padding: "1.5rem", verticalAlign: "top" }}>
                                        <div style={{ fontWeight: "600", color: "#333", marginBottom: "0.2rem" }}>{inquiry.firstName} {inquiry.lastName}</div>
                                        {inquiry.company && (
                                            <div style={{ fontSize: "0.85rem", color: "#666", background: "#f0f0f0", display: "inline-block", padding: "2px 8px", borderRadius: "10px" }}>
                                                {inquiry.company}
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: "1.5rem", verticalAlign: "top" }}>
                                        <a href={`mailto:${inquiry.email}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "var(--primary)", fontWeight: "500", fontSize: "0.95rem" }}>
                                            <Mail size={14} />
                                            {inquiry.email}
                                        </a>
                                        {/* Phone could go here if available */}
                                    </td>
                                    <td style={{ padding: "1.5rem", maxWidth: "400px", verticalAlign: "top" }}>
                                        <div style={{ background: "#fafafa", padding: "1rem", borderRadius: "8px", border: "1px solid #eee", fontSize: "0.95rem", color: "#444", lineHeight: "1.6" }}>
                                            {inquiry.message}
                                        </div>
                                    </td>
                                    <td style={{ padding: "1.5rem", textAlign: "right", verticalAlign: "top" }}>
                                        <button
                                            onClick={() => handleDelete(inquiry._id)}
                                            style={{
                                                padding: "0.6rem", color: "#d32f2f", background: "#fff0f0",
                                                border: "none", borderRadius: "8px", cursor: "pointer",
                                                transition: "all 0.2s"
                                            }}
                                            title="Delete Inquiry"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {inquiries.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ padding: "4rem", textAlign: "center", color: "#888" }}>
                                        <MailOpen size={48} style={{ opacity: 0.1, marginBottom: "1rem" }} />
                                        <p>No new inquiries found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminSidebar>
    );
}
