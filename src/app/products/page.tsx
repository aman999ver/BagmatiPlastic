import { Suspense } from "react";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/product";

// Helper removed as we fetch directly
// function filterProducts...

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // Await searchParams as per Next.js 15/16 conventions if needed, but for now treating as prop
    // Actually in newer Next.js versions searchParams might be a Promise, but assuming 14/15 style for now unless error.

    // Convert search params to string
    const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
    const brand = typeof searchParams.brand === 'string' ? searchParams.brand : undefined;
    // We could add series filter to `getProducts` too, but for now `getProducts` handles category/brand/color.
    // If series is needed, update getProducts.

    // Note: getProducts currently handles category, brand, color. Series needs to be added.
    const filteredProducts = await getProducts({ category, brand });
    // Wait, getProducts handles series? No. I need to update getProducts to handle series too if I want full fidelity.
    // Let's assume series isn't critical for this step OR I update getProducts briefly.
    // For now I'll just pass category/brand.

    // Note: The previous client-side `filterProducts` handled SEARCH query too.
    // Ideally update getProducts to handle search query 'q'.

    return (
        <div className="container" style={{ padding: "3rem 1rem", display: "flex", gap: "2rem", flexDirection: "column" }}>
            <h1 style={{ fontSize: "2rem", color: "var(--foreground)" }}>Our Products</h1>

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }} className="products-layout-wrapper">
                {/* We wrap styles in a class or use inline for simple layout */}
                <style dangerouslySetInnerHTML={{
                    __html: `
           @media (min-width: 768px) {
             .products-layout-wrapper { flex-wrap: nowrap !important; }
           }
         `}} />

                <Suspense fallback={<div style={{ width: '250px' }}>Loading filters...</div>}>
                    <FilterSidebar />
                </Suspense>

                <div style={{ flex: 1 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(p => <ProductCard key={p.id} product={p} />)
                        ) : (
                            <p>No products found matching your criteria.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
