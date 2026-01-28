
import Link from "next/link";
import dbConnect from "@/lib/db";
import { Blog } from "@/models";
import BlogCardHorizontal from "@/components/blog/BlogCardHorizontal";
import BlogSidebar from "@/components/blog/BlogSidebar";

export const metadata = {
    title: "Blogs | Bagmati Plastic",
    description: "Read our latest news and updates."
};

async function getBlogs(category?: string) {
    await dbConnect();
    const query: any = { isPublished: true };
    if (category && category !== "All") {
        query.category = category;
    }
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    return blogs.map(doc => ({
        ...doc.toObject(),
        id: doc._id.toString(),
        createdAt: doc.createdAt.toISOString() // Serializable date for props
    }));
}

async function getCategories() {
    await dbConnect();
    const categories = await Blog.distinct("category", { isPublished: true });
    return ["All", ...categories.filter(Boolean)];
}

export default async function BlogsPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const category = typeof searchParams.category === 'string' ? searchParams.category : "All";

    const blogs = await getBlogs(category);
    const categories = await getCategories();

    return (
        <div className="container" style={{ padding: "3rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Blog</h1>
                <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Welcome to our Blog page!</h2>
                <p style={{ color: "#666", fontSize: "0.95rem" }}>We look forward to hearing from you and helping you find the perfect plastic products for your home or business.</p>
            </div>

            {/* Tabs */}
            <div style={{ borderBottom: "1px solid #eee", marginBottom: "3rem", display: "flex", gap: "2rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
                {categories.map((cat) => (
                    <Link
                        key={cat}
                        href={`/blogs?category=${cat === "All" ? "" : cat}`}
                        style={{
                            textDecoration: "none",
                            color: category === cat || (category === "All" && cat === "All") ? "#F44336" : "#555",
                            fontWeight: category === cat || (category === "All" && cat === "All") ? "bold" : "normal",
                            paddingBottom: "1rem",
                            borderBottom: category === cat || (category === "All" && cat === "All") ? "2px solid #F44336" : "none",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {cat}
                    </Link>
                ))}
            </div>

            {/* Content Area */}
            <div style={{ display: "flex", gap: "4rem", alignItems: "flex-start" }} className="blog-layout">
                {/* Main List */}
                <div style={{ flex: 1, minWidth: 0 }}> {/* minWidth 0 prevents flex child from overflowing */}
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <BlogCardHorizontal key={blog.id} blog={blog} />
                        ))
                    ) : (
                        <p style={{ fontSize: "1.1rem", color: "#666", padding: "2rem 0" }}>No posts found in this category.</p>
                    )}
                </div>

                {/* Sidebar */}
                <BlogSidebar />
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .blog-layout { flex-direction: column; gap: 2rem !important; }
                }
            `}</style>
        </div>
    );
}
