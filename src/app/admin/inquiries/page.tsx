
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
        <div style={{ display: "flex" }}>
            <AdminSidebar>
                <div style={{ padding: "2rem", width: "100%" }}>
                    <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>Inquiries</h1>

                    <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead style={{ background: "#f5f5f5", textAlign: "left" }}>
                                <tr>
                                    <th style={{ padding: "1rem" }}>Date</th>
                                    <th style={{ padding: "1rem" }}>Name</th>
                                    <th style={{ padding: "1rem" }}>Email</th>
                                    <th style={{ padding: "1rem" }}>Company</th>
                                    <th style={{ padding: "1rem" }}>Message</th>
                                    <th style={{ padding: "1rem" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.map((inquiry) => (
                                    <tr key={inquiry._id} style={{ borderBottom: "1px solid #eee" }}>
                                        <td style={{ padding: "1rem", color: "#666", fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                                            {new Date(inquiry.createdAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: "1rem", fontWeight: "500" }}>{inquiry.firstName} {inquiry.lastName}</td>
                                        <td style={{ padding: "1rem", color: "#1976D2" }}>
                                            <a href={`mailto:${inquiry.email}`} style={{ textDecoration: "none", color: "inherit" }}>{inquiry.email}</a>
                                        </td>
                                        <td style={{ padding: "1rem", color: "#666" }}>{inquiry.company || "-"}</td>
                                        <td style={{ padding: "1rem", maxWidth: "300px" }}>
                                            <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: "1.5", maxHeight: "60px", overflow: "hidden", textOverflow: "ellipsis" }} title={inquiry.message}>
                                                {inquiry.message}
                                            </p>
                                        </td>
                                        <td style={{ padding: "1rem" }}>
                                            <button onClick={() => handleDelete(inquiry._id)} style={{ padding: "0.5rem", color: "#F44336", background: "none", border: "none", cursor: "pointer" }} title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {inquiries.length === 0 && (
                                    <tr>
                                        <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "#999" }}>No inquiries found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminSidebar>
        </div>
    );
}
