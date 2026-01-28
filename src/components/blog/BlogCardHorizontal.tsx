import Link from "next/link";
import Image from "next/image";
import { Clock, Folder } from "lucide-react";

interface BlogCardProps {
    blog: any;
}

export default function BlogCardHorizontal({ blog }: BlogCardProps) {
    return (
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", flexDirection: "row", alignItems: "flex-start" }} className="blog-card-horizontal">
            {/* Image */}
            <div style={{ flexShrink: 0, width: "280px", height: "180px", position: "relative", borderRadius: "8px", overflow: "hidden" }} className="card-image">
                {blog.image ? (
                    <Image src={blog.image} alt={blog.title} fill style={{ objectFit: "cover" }} />
                ) : (
                    <div style={{ width: "100%", height: "100%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>No Image</div>
                )}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
                <Link href={`/blogs/${blog.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.8rem", lineHeight: "1.4", color: "#333" }}>
                        {blog.title}
                    </h2>
                </Link>

                {blog.excerpt && (
                    <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {blog.excerpt}
                    </p>
                )}

                <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.85rem", color: "#888" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span suppressHydrationWarning>
                            {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                    </span>
                    {blog.category && (
                        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                            | {blog.category}
                        </span>
                    )}
                </div>
            </div>

            {/* Responsive Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .blog-card-horizontal { flex-direction: column !important; }
                    .card-image { width: 100% !important; height: 220px !important; }
                }
            ` }} />
        </div>
    );
}
