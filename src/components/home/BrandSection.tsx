import dbConnect from "@/lib/db";
import { Brand } from "@/models";
import styles from "./BrandSection.module.css";

async function getBrands() {
    await dbConnect();
    const brands = await Brand.find({}).sort({ createdAt: -1 });
    return brands.map(doc => ({
        ...doc.toObject(),
        id: doc._id.toString()
    }));
}

export default async function BrandSection() {
    const brands = await getBrands();

    if (brands.length === 0) return null;

    // Duplicate brands to ensure seamless loop
    // We need enough items to fill width + scroll
    const displayBrands = [...brands, ...brands, ...brands, ...brands];

    return (
        <section style={{ padding: "4rem 1rem", background: "#fcfcfc" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "3rem", textAlign: "center" }}>Our Brands</h2>

                <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeTrack}>
                        {displayBrands.map((brand, index) => (
                            <div key={`${brand.id}-${index}`} className={styles.brandLogo}>
                                {brand.logo ? (
                                    <img src={brand.logo} alt={brand.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                                ) : (
                                    <span style={{ fontWeight: "600", color: "#888" }}>{brand.name}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
