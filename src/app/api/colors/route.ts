import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Product } from "@/models";

export async function GET() {
    await dbConnect();
    try {
        // Get all unique color names from the 'colors' array 
        const items = await Product.distinct("colors.name");
        return NextResponse.json(items.filter(Boolean).sort());
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
