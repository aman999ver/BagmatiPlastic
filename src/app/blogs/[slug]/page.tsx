import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/db";
import { Blog } from "@/models";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

async function getBlog(slug: string) {
    await dbConnect();
    const blog = await Blog.findOne({ slug, isPublished: true });
    if (!blog) return null;
    return { ...blog.toObject(), id: blog._id.toString() };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlog(slug);
    if (!blog) return { title: "Blog Not Found" };
    return {
        title: `${blog.title} | Bagmati Plastic`,
        description: blog.excerpt || blog.title
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) notFound();

    return (
        <article style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1rem" }}>
            <Link href="/blogs" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#666", textDecoration: "none", marginBottom: "2rem" }}>
                <ArrowLeft size={20} /> Back to Blogs
            </Link>

            <header style={{ marginBottom: "2rem", textAlign: "center" }}>
                {blog.category && (
                    <span style={{
                        background: "#E8F5E9", color: "#2E7D32",
                        fontSize: "0.9rem", padding: "6px 12px", borderRadius: "20px", fontWeight: "600", display: "inline-block", marginBottom: "1rem"
                    }}>
                        {blog.category}
                    </span>
                )}
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", lineHeight: "1.2", marginBottom: "1rem" }}>{blog.title}</h1>
                <div style={{ color: "#666", fontSize: "1rem" }}>
                    <span>By {blog.author}</span> • <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
            </header>

            {blog.image && (
                <div style={{ width: "100%", height: "400px", position: "relative", marginBottom: "3rem", borderRadius: "12px", overflow: "hidden" }}>
                    <Image src={blog.image} alt={blog.title} fill style={{ objectFit: "cover" }} priority />
                </div>
            )}

            <div
                style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#333" }}
                dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} // Simple newline to BR if no rich HTML
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
                <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #eee" }}>
                    <span style={{ fontWeight: "bold", marginRight: "1rem" }}>Tags:</span>
                    {blog.tags.map((tag: string) => (
                        <span key={tag} style={{ background: "#f5f5f5", padding: "4px 10px", borderRadius: "4px", fontSize: "0.9rem", color: "#555", marginRight: "0.5rem" }}>
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
}
