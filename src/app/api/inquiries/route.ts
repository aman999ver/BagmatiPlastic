
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Inquiry } from "@/models";

export async function GET() {
    await dbConnect();
    try {
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
        return NextResponse.json(inquiries);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        // Public endpoint, so basic validation
        const body = await request.json();

        if (!body.firstName || !body.email || !body.message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newInquiry = await Inquiry.create(body);
        return NextResponse.json(newInquiry, { status: 201 });
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
        await Inquiry.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
