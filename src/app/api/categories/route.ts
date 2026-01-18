import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Category } from "@/models";

export async function GET() {
    await dbConnect();
    const items = await Category.find({}).sort({ createdAt: -1 });
    const formatted = items.map(doc => ({
        ...doc.toObject(),
        id: doc._id.toString()
    }));
    return NextResponse.json(formatted);
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const item = await Category.create(body);
        return NextResponse.json({ ...item.toObject(), id: item._id.toString() });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { id, ...updateData } = body;
        const item = await Category.findByIdAndUpdate(id, updateData, { new: true });

        if (!item) return NextResponse.json({ error: "Category not found" }, { status: 404 });

        return NextResponse.json({ ...item.toObject(), id: item._id.toString() });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        const item = await Category.findByIdAndDelete(id);
        if (!item) return NextResponse.json({ error: "Category not found" }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
