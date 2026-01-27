
import Image from "next/image";

export default async function FactorySection() {
    // Fetch data directly in Server Component
    let images = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/factory-images`, { cache: 'no-store' });
        if (res.ok) {
            images = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch factory images", error);
    }

    return (
        <section style={{ padding: "4rem 1rem", background: "#fff" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#333" }}>Manufacturing Facility</h2>
                    <p style={{ color: "#666", maxWidth: "800px", lineHeight: "1.6" }}>
                        We own state-of-the-art plant, mold, and robots with best engineers, and service loved post-sales team who treat you warm as we treat you well. We have best injection molding machines, mold, robots from Haiti (Top brand in High range machines), Yizumi, JSW, and others available in 65000+ sq. ft. factory located in <strong>Malaya Road, Biratnagar-13, Morang, Koshi, Nepal</strong>.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                    {images.length > 0 ? (
                        images.map((img: any) => (
                            <div key={img._id} style={{ height: "250px", position: "relative", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                                <Image src={img.image} alt={img.caption || "Factory Image"} fill style={{ objectFit: "cover" }} />
                                {img.caption && (
                                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.6)", color: "white", padding: "0.5rem", fontSize: "0.9rem" }}>
                                        {img.caption}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: "1 / -1", padding: "2rem", background: "#f9f9f9", borderRadius: "8px", textAlign: "center", color: "#888" }}>
                            No factory images uploaded yet.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
