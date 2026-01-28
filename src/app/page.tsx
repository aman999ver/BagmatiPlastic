import BannerCarousel from "@/components/home/BannerCarousel";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import CategoryGrid from "@/components/home/CategoryGrid";
import BlogSection from "@/components/home/BlogSection";
import BrandSection from "@/components/home/BrandSection";
import { getTrendingProducts, getNewProducts } from "@/lib/products";
import ProductCarousel from "@/components/home/ProductCarousel";

export default async function Home() {
  const trending = await getTrendingProducts();
  const newProducts = await getNewProducts();

  return (
    <>
      <BannerCarousel />
      <FeaturedGrid />
      <CategoryGrid />

      <section className="container" style={{ padding: "2rem 1rem 4rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem", color: "var(--foreground)", borderLeft: "5px solid var(--primary)", paddingLeft: "1rem" }}>
            Trending Products
          </h2>
        </div>

        {trending.length > 0 ? (
          <ProductCarousel products={trending} />
        ) : (
          <p>No trending products found.</p>
        )}
      </section>

      <section style={{ background: "#f9f9f9", padding: "4rem 1rem" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--foreground)", borderLeft: "5px solid var(--primary)", paddingLeft: "1rem" }}>
            New Arrivals
          </h2>
          {newProducts.length > 0 ? (
            <ProductCarousel products={newProducts} />
          ) : (
            <p>No new products found.</p>
          )}
        </div>
      </section>

      <BlogSection />
      <BrandSection />
    </>
  );
}
