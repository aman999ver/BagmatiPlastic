import { getProducts, getProductById } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductView from "@/components/products/ProductView";

export async function generateStaticParams() {
    const { products } = await getProducts({ limit: 100 }); // Increase limit for SSG
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <ProductView product={product} />
    );
}

const specRow = { display: "grid", gridTemplateColumns: "150px 1fr", padding: "0.75rem 0", borderBottom: "1px solid #eee" };
const specLabel = { fontWeight: "600", color: "#444" };
const specValue = { color: "#666" };
