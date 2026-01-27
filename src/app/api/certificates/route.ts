
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Certificate } from "@/models";

export async function GET() {
    await dbConnect();
    try {
        const certs = await Certificate.find({}).sort({ createdAt: -1 });
        return NextResponse.json(certs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const newCert = await Certificate.create(body);
        return NextResponse.json(newCert, { status: 201 });
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
        await Certificate.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
