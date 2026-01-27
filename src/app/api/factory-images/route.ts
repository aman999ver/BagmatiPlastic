
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { FactoryImage } from "@/models";

export async function GET() {
    await dbConnect();
    try {
        const images = await FactoryImage.find({}).sort({ createdAt: -1 });
        return NextResponse.json(images);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const newImage = await FactoryImage.create(body);
        return NextResponse.json(newImage, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    try {
        await FactoryImage.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
