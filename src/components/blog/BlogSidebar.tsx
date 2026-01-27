import Link from "next/link";
import { Blog } from "@/models";
import dbConnect from "@/lib/db";

async function getSidebarData() {
    await dbConnect();
    // Recent posts
    const recent = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).limit(5);
    // Categories (distinct)
    const categories = await Blog.distinct("category", { isPublished: true });

    return {
        recent: recent.map(d => ({ title: d.title, slug: d.slug, id: d._id.toString() })),
        categories: categories.filter(Boolean) as string[],
        archives: ["September 2025", "August 2025", "July 2025", "June 2025"] // Mock for now matching image concept, or could be real aggregation
    };
}

export default async function BlogSidebar() {
    const data = await getSidebarData();

    return (
        <aside style={{ width: "300px", flexShrink: 0 }} className="blog-sidebar">
            {/* Recent Posts */}
            <div style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontSize: "1.1rem", color: "#F44336", marginBottom: "1rem", fontWeight: "600" }}>Recent Posts</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {data.recent.map(post => (
                        <li key={post.id} style={{ marginBottom: "0.8rem" }}>
                            <Link href={`/blogs/${post.slug}`} style={{ textDecoration: "none", color: "#555", fontSize: "0.9rem", lineHeight: "1.4", display: "block" }}>
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Categories */}
            <div style={{ marginBottom: "3rem" }}>
                <h3 style={{ fontSize: "1.1rem", color: "#F44336", marginBottom: "1rem", fontWeight: "600" }}>Categories</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {data.categories.map(cat => (
                        <li key={cat} style={{ marginBottom: "0.5rem" }}>
                            <Link href={`/blogs?category=${cat}`} style={{ textDecoration: "none", color: "#555", fontSize: "0.9rem" }}>
                                {cat}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Archives */}
            <div>
                <h3 style={{ fontSize: "1.1rem", color: "#F44336", marginBottom: "1rem", fontWeight: "600" }}>Archives</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {data.archives.map(arch => (
                        <li key={arch} style={{ marginBottom: "0.5rem" }}>
                            <span style={{ color: "#555", fontSize: "0.9rem", cursor: "pointer" }}>{arch}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 900px) {
                    .blog-sidebar { width: 100% !important; margin-top: 2rem; }
                }
            ` }} />
        </aside>
    );
}
