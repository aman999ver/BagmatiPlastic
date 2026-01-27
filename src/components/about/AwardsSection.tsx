
import Image from "next/image";
import { Award } from "lucide-react";

export default async function AwardsSection() {
    let certificates = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/certificates`, { cache: 'no-store' });
        if (res.ok) {
            certificates = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch certificates", error);
    }

    return (
        <section style={{ padding: "4rem 1rem", background: "#fcfcfc" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "center" }}>

                    {/* Text Card */}
                    <div style={{ background: "white", padding: "3rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ background: "#FFE5E5", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                            <Award color="#F44336" size={30} />
                        </div>
                        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#F44336" }}>Achievements & Awards</h2>
                        <p style={{ color: "#555", marginBottom: "1.5rem", lineHeight: "1.6" }}>
                            Bagmati is the winning brand in Nepal to have achieved such certificates. It is constantly making progress in quality and excellence that resulted in an international recognition.
                        </p>
                        <p style={{ fontStyle: "italic", color: "#777" }}>
                            "This award brings high responsibility to serve, act, and behave well for our customers."
                        </p>
                    </div>

                    {/* Certificates Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", flex: 1 }}>
                        {certificates.length > 0 ? (
                            certificates.map((cert: any) => (
                                <div key={cert._id} style={{ background: "white", padding: "1rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", textAlign: "center", border: "1px solid #eee" }}>
                                    <div style={{ position: "relative", height: "200px", marginBottom: "1rem", background: "#fff" }}>
                                        <Image src={cert.image} alt={cert.title} fill style={{ objectFit: "contain" }} />
                                    </div>
                                    <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "#333", marginBottom: "0.5rem" }}>{cert.title}</h3>
                                    {cert.description && <p style={{ fontSize: "0.8rem", color: "#666" }}>{cert.description}</p>}
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: "1 / -1", padding: "2rem", background: "#fff", borderRadius: "12px", textAlign: "center", color: "#888", border: "1px dashed #ccc" }}>
                                No certificates uploaded yet.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
