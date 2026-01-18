import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Product, Banner, FeaturedItem } from "@/models";
import productsData from "@/data/products.json";
import siteContent from "@/data/site-content.json";

export async function GET() {
    await dbConnect();

    try {
        // 1. Migrate Products
        await Product.deleteMany({}); // Clear existing
        // Map id to _id or let Mongo generate it? Let's keep data clean and let Mongo generate _id, 
        // BUT we need to be careful if we rely on string IDs in frontend. 
        // For this app, components expect 'id'. We will map 'id' to _id if possible or just store it.
        // Mongoose supports _id as string if we want, but ObjectId is better. 
        // To match frontend types, we'll strip the explicit 'id' from JSON and let Mongo create _id.
        // We'll need to update frontend to use _id.

        // Actually, to avoid breaking everything instantly, let's just insert.
        // The frontend uses 'id', Mongo uses '_id'. We will need a transform in API.

        const products = productsData.map(p => ({
            name: p.name,
            category: p.category,
            type: p.type,
            series: p.series,
            size: p.size,
            color: p.color,
            features: p.features,
            description: p.description,
            images: p.images,
            isNewItem: (p as any).isNew, // Map isNew -> isNewItem (if schema differs)
            isTrending: p.isTrending
        }));
        await Product.insertMany(products);

        // 2. Migrate Banners
        await Banner.deleteMany({});
        const banners = siteContent.banners.map(b => ({
            title: b.title,
            imageUrl: b.imageUrl,
            link: b.link
        }));
        await Banner.insertMany(banners);

        // 3. Migrate Featured Items
        await FeaturedItem.deleteMany({});
        const featured = siteContent.featuredGrid.map(f => ({
            title: f.title,
            imageUrl: f.imageUrl,
            link: f.link
        }));
        await FeaturedItem.insertMany(featured);

        return NextResponse.json({ success: true, message: "Database seeded successfully!" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
