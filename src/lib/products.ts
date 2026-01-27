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
    series?: string;
    color?: string; // Search in 'colors.name' or 'colors.code'
    sort?: string;
} = {}): Promise<Product[]> {
    await dbConnect();
    const query: any = {};
    if (filters.category && filters.category !== "all") {
        const cats = filters.category.split(",").map(s => s.trim()).filter(Boolean);
        if (cats.length > 0) query.category = { $in: cats };
    }
    if (filters.brand) {
        const brands = filters.brand.split(",").map(s => s.trim()).filter(Boolean);
        if (brands.length > 0) query.brand = { $in: brands };
    }
    if (filters.series) {
        const series = filters.series.split(",").map(s => s.trim()).filter(Boolean);
        if (series.length > 0) query.series = { $in: series };
    }
    if (filters.color) {
        // Match color name or code in the complex object array
        const colors = filters.color.split(",").map(s => s.trim()).filter(Boolean);
        if (colors.length > 0) {
            query.colors = {
                $elemMatch: {
                    $or: [
                        { name: { $in: colors.map(c => new RegExp(c, 'i')) } },
                        { code: { $in: colors } }
                    ]
                }
            };
        }
    }

    let sortOption: any = { createdAt: -1 };
    if (filters.sort === "asc") sortOption = { name: 1 };
    if (filters.sort === "desc") sortOption = { name: -1 };

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
