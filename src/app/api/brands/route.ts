import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Brand } from "@/models";

export async function GET() {
    await dbConnect();
    const brands = await Brand.find({}).sort({ createdAt: -1 });
    const formatted = brands.map(doc => ({
        ...doc.toObject(),
        id: doc._id.toString()
    }));
    return NextResponse.json(formatted);
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const brand = await Brand.create(body);
        return NextResponse.json({ ...brand.toObject(), id: brand._id.toString() }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        await Brand.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
