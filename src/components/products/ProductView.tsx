"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductView({ product }: { product: Product }) {
    const [activeImage, setActiveImage] = useState(product.images[0] || "/placeholder.jpg");
    const [activeColor, setActiveColor] = useState<string | null>(null);

    const handleColorClick = (color: any) => {
        setActiveColor(color.name);
        if (color.image) {
            setActiveImage(color.image);
        }
    };

    return (
        <div className="container" style={{ padding: "4rem 1rem" }}>
            <Link href="/products" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", color: "#666", width: "fit-content" }}>
                &larr; Back to Products
            </Link>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "4rem" }}>
                {/* Image Section */}
                <div style={{ position: "relative", height: "500px", borderRadius: "12px", overflow: "hidden", background: "#f9f9f9", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <Image
                        src={activeImage}
                        alt={product.name}
                        fill
                        style={{ objectFit: "contain", padding: "2rem" }}
                        priority
                    />
                </div>

                {/* Info Section */}
                <div className="product-info">
                    <div style={{ marginBottom: "1.5rem" }}>
                        <span style={{
                            background: "var(--primary)",
                            color: "white",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "100px",
                            fontSize: "0.85rem",
                            fontWeight: "500"
                        }}>
                            {product.category}
                        </span>
                        {product.isNew && (
                            <span style={{
                                background: "#4CAF50",
                                color: "white",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "100px",
                                fontSize: "0.85rem",
                                fontWeight: "500",
                                marginLeft: "0.5rem"
                            }}>
                                New
                            </span>
                        )}
                        {product.brand && (
                            <span style={{
                                background: "#2196F3",
                                color: "white",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "100px",
                                fontSize: "0.85rem",
                                fontWeight: "500",
                                marginLeft: "0.5rem"
                            }}>
                                {product.brand}
                            </span>
                        )}
                    </div>

                    <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--foreground)" }}>{product.name}</h1>
                    <p style={{ fontSize: "1.1rem", color: "#666", lineHeight: "1.6", marginBottom: "2rem" }}>
                        {product.description || "No description available for this product."}
                    </p>

                    <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
                        <div style={specRow}>
                            <span style={specLabel}>Type:</span>
                            <span style={specValue}>{product.type}</span>
                        </div>
                        {product.series && (
                            <div style={specRow}>
                                <span style={specLabel}>Series:</span>
                                <span style={specValue}>{product.series}</span>
                            </div>
                        )}
                        {product.size && (
                            <div style={specRow}>
                                <span style={specLabel}>Size/Capacity:</span>
                                <span style={specValue}>{product.size}</span>
                            </div>
                        )}

                        {/* New Color Swatches Logic */}
                        {(product.colors && product.colors.length > 0) && (
                            <div style={specRow}>
                                <span style={specLabel}>Select Color:</span>
                                <div style={{ display: "flex", gap: "0.75rem" }}>
                                    {product.colors.map((c, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleColorClick(c)}
                                            title={c.name}
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                background: c.code,
                                                border: activeColor === c.name ? "2px solid #333" : "1px solid #ddd",
                                                boxShadow: activeColor === c.name ? "0 0 0 2px white, 0 0 0 4px #333" : "none",
                                                cursor: "pointer",
                                                transition: "transform 0.2s"
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Legacy Colors Support */}
                        {(!product.colors || product.colors.length === 0) && product.color && product.color.length > 0 && (
                            <div style={specRow}>
                                <span style={specLabel}>Available Colors:</span>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    {product.color.map(c => (
                                        <span key={c} style={{ border: "1px solid #ddd", padding: "2px 8px", borderRadius: "4px", fontSize: "0.9rem" }}>{c}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {product.features && product.features.length > 0 && (
                        <div style={{ marginBottom: "2rem" }}>
                            <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Key Features</h3>
                            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.5rem" }}>
                                {product.features.map((feature, i) => (
                                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#555" }}>
                                        <span style={{ color: "var(--primary)", fontWeight: "bold" }}>&bull;</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const specRow = { display: "grid", gridTemplateColumns: "150px 1fr", padding: "0.75rem 0", borderBottom: "1px solid #eee", alignItems: "center" };
const specLabel = { fontWeight: "600", color: "#444" };
const specValue = { color: "#666" };
