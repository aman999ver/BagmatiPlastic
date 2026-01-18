import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Series } from "@/models";

export async function GET() {
    await dbConnect();
    const items = await Series.find({}).sort({ createdAt: -1 });
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
        const item = await Series.create(body);
        return NextResponse.json({ ...item.toObject(), id: item._id.toString() });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    await dbConnect();
    try {
        const { id, name } = await request.json();
        await Series.findByIdAndUpdate(id, { name });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        const item = await Series.findByIdAndDelete(id);
        if (!item) return NextResponse.json({ error: "Series not found" }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
