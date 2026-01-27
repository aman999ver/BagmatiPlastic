
import CoreValues from "@/components/about/CoreValues";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import FactorySection from "@/components/about/FactorySection";
import AwardsSection from "@/components/about/AwardsSection";
import BrandSection from "@/components/home/BrandSection";

export default function AboutPage() {
    return (
        <div className="about-page">
            {/* Hero / Introduction */}
            <div className="container" style={{ padding: "4rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#333" }}>About Us</h1>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem", color: "#555" }}>
                    Plastic Manufacturing Company in Nepal – Serving Nepal Since 1995 AD
                </h2>
                <p style={{ lineHeight: "1.8", color: "#666", marginBottom: "1rem", maxWidth: "900px" }}>
                    We are a plastic manufacturing company owned by Bagmati Group, established in year 2052 BS (1995 AD). Our portfolio includes supply of Plastic Buckets, Mugs, Dustbins, Crates, Basins, Containers (Jars/Oliya), Tiffin, Jug, Table, Chair, Stool, Soap Case, and others.
                </p>
                <p style={{ lineHeight: "1.8", color: "#666", maxWidth: "900px" }}>
                    We have our well-equipped 65,000 sq ft. production plant located in <strong>Malaya Road, Biratnagar-13, Morang, Koshi, Nepal</strong>. We also have distribution point and sales, corporate office at <strong>4th Floor Four Square Building, Naxal, Kathmandu, Bagmati, Nepal</strong>.
                </p>
            </div>

            {/* Core Values */}
            <CoreValues />

            {/* Bagmati Family (Brands) */}
            <div style={{ background: "#fff", paddingTop: "2rem" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Bagmati Family</h2>
                </div>
                <BrandSection />
            </div>

            {/* Product Range Text */}
            <div className="container" style={{ padding: "2rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Product Range</h2>
                <p style={{ color: "#666", lineHeight: "1.6", textTransform: "uppercase", fontSize: "0.9rem" }}>
                    HOUSEHOLD | BASIN | BUCKET | BATH MUG | STORAGE | LAUNDRY | KITCHEN | CONTAINER | DUSTBIN | DUSTPAN | SMART DUSTBIN | PARTITION BASKET | DRAWER | STOOL | PATRA | BABY PRODUCT | HANGER | BOTTLE | PAINT BUCKET | COMPOST BIN | ROAD SAFETY
                </p>
            </div>

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Factory */}
            <FactorySection />

            {/* Customers Section (Using Brands for now as placeholder for "Consumers and Customers" if distinct data needed later) */}
            <div style={{ background: "#fff", padding: "4rem 1rem" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Consumers and Customers</h2>
                    <p style={{ color: "#666", marginBottom: "2rem" }}>
                        We serve our esteemed "Bagmati Family" comprising of Households, Industries, Hospitals, Institutions, Banks, Hotels, Restaurants, Catering, Party Palaces, Poultry, Construction, Dairy, Paint, Chemical, Agriculture, and many more.
                    </p>
                    {/* Reusing BrandSection or could add specific client logos here */}
                    <div style={{ opacity: 0.8 }}>
                        <BrandSection />
                    </div>
                </div>
            </div>

            {/* Awards */}
            <AwardsSection />
        </div>
    );
}
