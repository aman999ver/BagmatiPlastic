import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Banner } from "@/models";

export async function GET() {
    await dbConnect();
    const banners = await Banner.find({}).sort({ createdAt: -1 });
    const formatted = banners.map(doc => ({
        ...doc.toObject(),
        id: doc._id.toString()
    }));
    return NextResponse.json(formatted);
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const banner = await Banner.create(body);
        return NextResponse.json({ ...banner.toObject(), id: banner._id.toString() });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { id, ...updateData } = body;
        const banner = await Banner.findByIdAndUpdate(id, updateData, { new: true });

        if (!banner) return NextResponse.json({ error: "Banner not found" }, { status: 404 });

        return NextResponse.json({ ...banner.toObject(), id: banner._id.toString() });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        const banner = await Banner.findByIdAndDelete(id);
        if (!banner) return NextResponse.json({ error: "Banner not found" }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
