
import { Award, ShieldCheck, DollarSign, Truck } from "lucide-react";

export default function WhyChooseUs() {
    return (
        <section style={{ padding: "4rem 1rem", background: "#f9f9f9" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "3rem", color: "#333" }}>Why Choose Us?</h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                    {/* Quality */}
                    <div className="feature-card" style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                        <div style={{ marginBottom: "1rem" }}>
                            <Award color="#F44336" size={32} />
                        </div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Quality</h3>
                        <p style={{ color: "#666", lineHeight: "1.5", fontSize: "0.95rem" }}>
                            From the raw plastic, the mold and the machines used to make, all are of standard quality, ensuring the result is standard too. The result is a perfect piece that gives value. Also, before packing, each item is checked with strict rules, hence the guarantee comes with the safety that is visibly clear in every point.
                        </p>
                    </div>

                    {/* Durability */}
                    <div className="feature-card" style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                        <div style={{ marginBottom: "1rem" }}>
                            <ShieldCheck color="#F44336" size={32} />
                        </div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Durability</h3>
                        <p style={{ color: "#666", lineHeight: "1.5", fontSize: "0.95rem" }}>
                            As a user, you define durability by number of years. For us, durability is your testimony. We use best raw materials in production process to verify all our products are long lasting. Or lets say, its a one time investment in quality for a long term bond because we know how a small break can hurt your smile and life.
                        </p>
                    </div>

                    {/* Affordable */}
                    <div className="feature-card" style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                        <div style={{ marginBottom: "1rem" }}>
                            <DollarSign color="#F44336" size={32} />
                        </div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Affordable</h3>
                        <p style={{ color: "#666", lineHeight: "1.5", fontSize: "0.95rem" }}>
                            Bagmati Plastic Industries is a customer centric company in Nepal. We make market keeping affordability factor that always comes to our mind, offering our products to cost efficient rate that’s not heavy on you wallet. Meaning you get quality, strength, style without being heavy on pocket.
                        </p>
                    </div>

                    {/* Nationwide Service */}
                    <div className="feature-card" style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                        <div style={{ marginBottom: "1rem" }}>
                            <Truck color="#F44336" size={32} />
                        </div>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Nationwide Service</h3>
                        <p style={{ color: "#666", lineHeight: "1.5", fontSize: "0.95rem" }}>
                            As a leading plastic manufacturing company in Nepal, we have massive supplying distribution network that delivers to the country, meaning our product is very near your home, either you reside in Kathmandu or Dhangadhi, Nepalgunj, Biratnagar, and elsewhere.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
