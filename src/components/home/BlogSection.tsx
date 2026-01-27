import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/db";
import { Blog } from "@/models";

async function getLatestBlogs() {
    await dbConnect();
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).limit(4);
    return blogs.map(doc => ({
        ...doc.toObject(),
        id: doc._id.toString()
    }));
}

export default async function BlogSection() {
    const blogs = await getLatestBlogs();

    if (blogs.length === 0) return null;

    return (
        <section style={{ padding: "4rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Blogs</h2>
                <Link href="/blogs" style={{ color: "#F44336", fontWeight: "600", textDecoration: "none" }}>
                    View All Blogs &gt;
                </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
                {blogs.map((blog) => (
                    <Link key={blog.id} href={`/blogs/${blog.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                        <div style={{ border: "1px solid #eee", borderRadius: "12px", overflow: "hidden", transition: "transform 0.2s" }} className="blog-card">
                            <div style={{ width: "100%", height: "250px", position: "relative", background: "#f0f0f0" }}>
                                {blog.image ? (
                                    <Image src={blog.image} alt={blog.title} fill style={{ objectFit: "cover" }} />
                                ) : (
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#999" }}>No Image</div>
                                )}
                            </div>
                            <div style={{ padding: "1.5rem" }}>
                                {blog.category && (
                                    <span style={{
                                        display: "inline-block", background: "#E8F5E9", color: "#2E7D32",
                                        fontSize: "0.8rem", padding: "4px 8px", borderRadius: "4px", marginBottom: "0.5rem"
                                    }}>
                                        {blog.category}
                                    </span>
                                )}
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", margin: "0 0 0.5rem 0", lineHeight: "1.4" }}>
                                    {blog.title}
                                </h3>
                                {blog.excerpt && (
                                    <p style={{ fontSize: "0.9rem", color: "#666", margin: 0, lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                        {blog.excerpt}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {/* Simple CSS for hover effect */}
            <style dangerouslySetInnerHTML={{ __html: `.blog-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }` }} />
        </section>
    );
}
