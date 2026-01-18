import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Product } from "@/models";

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const isTrending = searchParams.get("isTrending");
    const isNew = searchParams.get("isNew");
    const brand = searchParams.get("brand");

    let query: any = {};
    if (category && category !== "all") query.category = category;
    if (type) query.type = type;
    if (isTrending === "true") query.isTrending = true;
    if (isNew === "true") query.isNewItem = true;
    if (brand && brand !== "All") query.brand = brand; // Filter by brand

    try {
        const products = await Product.find(query).sort({ createdAt: -1 });
        const formatted = products.map(doc => ({
            ...doc.toObject(),
            id: doc._id.toString()
        }));
        return NextResponse.json(formatted);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const product = await Product.create({
            ...body,
            isNewItem: body.isNew
        });
        return NextResponse.json({ ...product.toObject(), id: product._id.toString() }, { status: 201 });
    } catch (error: any) {
        console.error("Product Save Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        await Product.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
