import dbConnect from "@/lib/db";
import { Brand } from "@/models";

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

    return (
        <section style={{ padding: "4rem 1rem", background: "#fcfcfc" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>Brands</h2>

                <div style={{
                    display: "flex",
                    gap: "3rem",
                    overflowX: "auto",
                    padding: "1rem 0",
                    alignItems: "center",
                    scrollbarWidth: "none" // Hide scrollbar Firefox
                }}>
                    {brands.map((brand) => (
                        <div key={brand.id} style={{ flexShrink: 0, width: "150px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", filter: "grayscale(100%)", opacity: 0.7, transition: "all 0.3s" }} className="brand-logo">
                            {brand.logo ? (
                                <img src={brand.logo} alt={brand.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                            ) : (
                                <span>{brand.name}</span>
                            )}
                        </div>
                    ))}
                    {/* Repeat if few items to make it look full? Or just list them. User asked to match image style which is specific logos. */}
                </div>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .brand-logo:hover { filter: grayscale(0%) !important; opacity: 1 !important; transform: scale(1.1); }
                 ` }} />
            </div>
        </section>
    );
}
