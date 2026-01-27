import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Blog } from "@/models";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    if (slug) {
        const blog = await Blog.findOne({ slug });
        return NextResponse.json(blog ? { ...blog.toObject(), id: blog._id.toString() } : null);
    }

    if (id) {
        const blog = await Blog.findById(id);
        return NextResponse.json(blog ? { ...blog.toObject(), id: blog._id.toString() } : null);
    }

    // List all
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    const formatted = blogs.map(doc => ({
        ...doc.toObject(),
        id: doc._id.toString()
    }));
    return NextResponse.json(formatted);
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();

        // Auto-generate slug if missing
        if (!body.slug) {
            body.slug = body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        }

        const blog = await Blog.create(body);
        return NextResponse.json({ ...blog.toObject(), id: blog._id.toString() }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        const body = await request.json();
        const blog = await Blog.findByIdAndUpdate(id, body, { new: true });

        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

        return NextResponse.json({ ...blog.toObject(), id: blog._id.toString() });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
