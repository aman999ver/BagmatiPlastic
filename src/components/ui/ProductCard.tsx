import Link from "next/link";
import { Product } from "@/types/product";
import styles from "./ProductCard.module.css";
import { Image as ImageIcon } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                {product.images.length > 0 ? (
                    // In a real app, use next/image
                    <img src={product.images[0]} alt={product.name} />
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <ImageIcon size={32} />
                        <span>No Image</span>
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.category}>{product.category}</div>
                <h3 className={styles.title}>{product.name}</h3>
                <div className={styles.details}>
                    <span>Series: {product.series}</span>
                    {product.size && <span>Size: {product.size}</span>}
                </div>
            </div>
        </Link>
    );
}
