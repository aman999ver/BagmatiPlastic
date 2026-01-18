"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            router.push("/admin/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5" }}>
            <form onSubmit={handleLogin} style={{ background: "white", padding: "2.5rem 2rem", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", width: "350px" }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <Image
                        src="/bagmati-logo.png"
                        alt="Bagmati Plastic"
                        width={180}
                        height={60}
                        style={{ objectFit: "contain", height: "60px", width: "auto" }}
                        priority
                    />
                </div>

                <h1 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", textAlign: "center", color: "#666" }}>Admin Portal Login</h1>

                {error && <div style={{ background: "#ffebee", color: "#d32f2f", padding: "0.75rem", borderRadius: "6px", fontSize: "0.9rem", marginBottom: "1.5rem", textAlign: "center" }}>{error}</div>}

                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#555", fontWeight: "500" }}>Username</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", color: "#555", fontWeight: "500" }}>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>

                <button
                    type="submit"
                    style={{ width: "100%", padding: "0.85rem", background: "var(--primary)", color: "white", borderRadius: "6px", fontWeight: "600", border: "none", cursor: "pointer", transition: "opacity 0.2s" }}
                >
                    Access Dashboard
                </button>
            </form>
        </div>
    );
}

const inputStyle = { width: "100%", padding: "0.75rem", border: "1px solid #e0e0e0", borderRadius: "6px", fontSize: "1rem", outline: "none", transition: "border-color 0.2s" };
