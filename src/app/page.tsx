import BannerCarousel from "@/components/home/BannerCarousel";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductCard from "@/components/ui/ProductCard";
import { getTrendingProducts, getNewProducts } from "@/lib/products";

export default async function Home() {
  const trending = await getTrendingProducts();
  const newProducts = await getNewProducts();

  return (
    <>
      <BannerCarousel />
      <FeaturedGrid />
      <CategoryGrid />

      <section className="container" style={{ padding: "2rem 1rem 4rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--foreground)", borderLeft: "5px solid var(--primary)", paddingLeft: "1rem" }}>
          Trending Products
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2rem" }}>
          {trending.length > 0 ? (
            trending.map(p => <ProductCard key={p.id} product={p} />)
          ) : (
            <p>No trending products found.</p>
          )}
        </div>
      </section>

      <section style={{ background: "#f9f9f9", padding: "4rem 1rem" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--foreground)", borderLeft: "5px solid var(--primary)", paddingLeft: "1rem" }}>
            New Arrivals
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2rem" }}>
            {newProducts.length > 0 ? (
              newProducts.map(p => <ProductCard key={p.id} product={p} />)
            ) : (
              <p>No new products found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
