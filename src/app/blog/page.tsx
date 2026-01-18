export default function BlogPage() {
    const posts = [
        { id: 1, title: "Why Choose Bagmati Plastic?", date: "Jan 10, 2024", excerpt: "Discover the quality and durability that sets us apart." },
        { id: 2, title: "New Series Launch: Diamond Collection", date: "Jan 05, 2024", excerpt: "Introducing our premium Diamond series buckets and mugs." },
    ];

    return (
        <div className="container" style={{ padding: "4rem 1rem" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "var(--primary)" }}>Latest News</h1>

            <div style={{ display: "grid", gap: "2rem" }}>
                {posts.map(post => (
                    <div key={post.id} style={{ border: "1px solid #eee", padding: "2rem", borderRadius: "8px", background: "white" }}>
                        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{post.title}</h2>
                        <p style={{ color: "#777", marginBottom: "1rem" }}>{post.date}</p>
                        <p>{post.excerpt}</p>
                        <button style={{ marginTop: "1rem", color: "var(--primary)", fontWeight: "600" }}>Read More &rarr;</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
