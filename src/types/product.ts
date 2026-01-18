export interface Product {
    id: string;
    name: string;
    slug: string;
    type: string; // e.g., Bucket, Mug, Basket
    series: string; // e.g., Gold, Diamond
    size?: string;
    color?: string[]; // Legacy
    colors?: { name: string; code: string; image: string; }[]; // New
    features?: string[];
    description?: string;
    images: string[];
    isTrending?: boolean;
    isNew?: boolean; // Mapped from isNewItem
    category: string;
    brand?: string; // Bagmati Plastic | Bagmati Plastotech
    createdAt: string;
}

export interface Category {
    id: string;
    name: string;
    image?: string;
}
