import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Blog } from "@/models";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    await dbConnect();
    const { slug } = await params;

    try {
        const blog = await Blog.findOne({ slug });
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json({ ...blog.toObject(), id: blog._id.toString() });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
