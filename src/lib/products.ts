import dbConnect from "@/lib/db";
import { Product as ProductModel } from "@/models";
import { Product } from "@/types/product";

// Helper to serialize Mongoose docs to plain objects
const serialize = (doc: any): Product => {
    const obj = doc.toObject();
    obj.id = obj._id.toString();
    obj.isNew = obj.isNewItem; // Map backend isNewItem to frontend isNew
    // Ensure colors is array
    if (!obj.colors) obj.colors = [];
    delete obj._id;
    delete obj.__v;
    return obj as Product;
};

export async function getProducts(filters: {
    category?: string;
    brand?: string;
    color?: string; // Search in 'colors.name' or 'colors.code'
    sort?: string;
} = {}): Promise<Product[]> {
    await dbConnect();
    const query: any = {};
    if (filters.category && filters.category !== "all") {
        const cats = filters.category.split(",").filter(Boolean);
        if (cats.length > 0) query.category = { $in: cats };
    }
    if (filters.brand) {
        const brands = filters.brand.split(",").filter(Boolean);
        if (brands.length > 0) query.brand = { $in: brands };
    }
    if (filters.color) {
        // Match color name or code in the complex object array
        query.colors = { $elemMatch: { $or: [{ name: new RegExp(filters.color, 'i') }, { code: filters.color }] } };
    }

    let sortOption: any = { createdAt: -1 };
    if (filters.sort === "asc") sortOption = { price: 1 }; // Assuming price, or maybe name?
    // Bagmati doesn't seem to have price. Sort A-Z?

    const products = await ProductModel.find(query).sort(sortOption);
    return products.map(serialize);
}

export async function getTrendingProducts(): Promise<Product[]> {
    await dbConnect();
    const products = await ProductModel.find({ isTrending: true }).sort({ createdAt: -1 });
    return products.map(serialize);
}

export async function getNewProducts(): Promise<Product[]> {
    await dbConnect();
    const products = await ProductModel.find({ isNewItem: true }).sort({ createdAt: -1 });
    return products.map(serialize);
}

export async function getProductById(id: string): Promise<Product | undefined> {
    await dbConnect();
    try {
        const product = await ProductModel.findById(id);
        return product ? serialize(product) : undefined;
    } catch {
        return undefined;
    }
}
