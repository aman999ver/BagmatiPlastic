
import { Target, Eye, Heart } from "lucide-react";

export default function CoreValues() {
    return (
        <section style={{ padding: "4rem 1rem" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>

                {/* Mission */}
                <div style={{ background: "#FFF5F5", padding: "2rem", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ background: "#FFE0E0", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Target color="#F44336" size={24} />
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#F44336" }}>Our Mission</h3>
                    <p style={{ color: "#555", lineHeight: "1.6" }}>
                        Redefining plasticware with a fusion of style, durability, and innovation to meet standard needs with strict adherence to quality. throughout our journey, we have focused on one thing: "The Satisfaction of Our Shareholders and Customers".
                    </p>
                </div>

                {/* Vision */}
                <div style={{ background: "#FFF5F5", padding: "2rem", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ background: "#FFE0E0", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Eye color="#F44336" size={24} />
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#F44336" }}>Our Vision</h3>
                    <p style={{ color: "#555", lineHeight: "1.6" }}>
                        To become the LEADING brand in plastic industries of Nepal. We believe that we will achieve this with our motto of “Quality Product, Happy Customer”. The satisfaction of our customers is our ultimate energy to move ahead.
                    </p>
                </div>

                {/* Motto */}
                <div style={{ background: "#FFF5F5", padding: "2rem", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ background: "#FFE0E0", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Heart color="#F44336" size={24} />
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#F44336" }}>Our Motto</h3>
                    <p style={{ color: "#555", lineHeight: "1.6" }}>
                        For over years, Bagmati Plastic has been the plastic product you prefer for your home. We would like to assure you that we would continue to develop and deliver customer satisfaction by bringing out high quality products in Nepal.
                    </p>
                </div>

            </div>
        </section>
    );
}
