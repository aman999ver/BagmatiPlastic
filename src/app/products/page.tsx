import { Suspense } from "react";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/product";

// Helper removed as we fetch directly
// function filterProducts...

export default async function ProductsPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // Await searchParams as per Next.js 15 conventions
    const searchParams = await props.searchParams;

    // Convert search params to string
    const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
    const brand = typeof searchParams.brand === 'string' ? searchParams.brand : undefined;
    const series = typeof searchParams.series === 'string' ? searchParams.series : undefined;
    const color = typeof searchParams.color === 'string' ? searchParams.color : undefined;
    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : undefined;
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
    const limit = 6; // Requested limit

    const { products, totalPages, currentPage } = await getProducts({ category, brand, series, color, sort, search, page, limit });

    return (
        <div className="container" style={{ padding: "3rem 1rem", display: "flex", gap: "2rem", flexDirection: "column" }}>
            <h1 style={{ fontSize: "2rem", color: "var(--foreground)" }}>Our Products</h1>

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }} className="products-layout-wrapper">
                <style dangerouslySetInnerHTML={{
                    __html: `
           .product-grid-layout {
              display: grid;
              grid-template-columns: repeat(2, 1fr); /* Default mobile: 2 columns */
              gap: 1rem;
           }
           @media (min-width: 768px) {
             .products-layout-wrapper { flex-wrap: nowrap !important; }
             .product-grid-layout {
                grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
                gap: 1.5rem;
             }
           }
         `}} />

                <Suspense fallback={<div style={{ width: '250px' }}>Loading filters...</div>}>
                    <FilterSidebar />
                </Suspense>

                <div style={{ flex: 1 }}>
                    <div className="product-grid-layout">
                        {products.length > 0 ? (
                            products.map(p => <ProductCard key={p.id} product={p} />)
                        ) : (
                            <p>No products found matching your criteria.</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "3rem" }}>
                            <a
                                href={currentPage > 1 ? `?page=${currentPage - 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}` : '#'}
                                style={{
                                    padding: "0.5rem 1rem",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    background: currentPage > 1 ? "white" : "#f5f5f5",
                                    color: currentPage > 1 ? "black" : "#ccc",
                                    pointerEvents: currentPage > 1 ? "auto" : "none",
                                    textDecoration: "none"
                                }}
                            >
                                Previous
                            </a>
                            <span style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
                                Page {currentPage} of {totalPages}
                            </span>
                            <a
                                href={currentPage < totalPages ? `?page=${currentPage + 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}` : '#'}
                                style={{
                                    padding: "0.5rem 1rem",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    background: currentPage < totalPages ? "white" : "#f5f5f5",
                                    color: currentPage < totalPages ? "black" : "#ccc",
                                    pointerEvents: currentPage < totalPages ? "auto" : "none",
                                    textDecoration: "none"
                                }}
                            >
                                Next
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

