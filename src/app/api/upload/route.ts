import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import sharp from "sharp";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const type = formData.get("type") as string; // 'banner', 'grid', 'product'
        const productName = formData.get("productName") as string;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Determine folder based on type
        let folderPath = "uploads"; // Base folder in public
        if (type === "banner") {
            folderPath = "uploads/banners";
        } else if (type === "grid" || type === "category") {
            folderPath = "uploads/categories";
        } else if (type === "product") {
            if (productName) {
                const sanitized = productName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                folderPath = `uploads/products/${sanitized}`;
            } else {
                folderPath = "uploads/products/general";
            }
        }

        // Create directory if it doesn't exist
        const publicDir = path.join(process.cwd(), "public");
        const fullUploadDir = path.join(publicDir, folderPath);

        await mkdir(fullUploadDir, { recursive: true });

        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `image-${uniqueSuffix}.webp`;
        const filepath = path.join(fullUploadDir, filename);

        // Convert to WebP using Sharp
        await sharp(buffer)
            .webp({ quality: 80 })
            .toFile(filepath);

        // Return the relative URL
        const fileUrl = `/${folderPath}/${filename}`;

        return NextResponse.json({ success: true, url: fileUrl });

    } catch (error: any) {
        console.error("Upload API Error:", error);
        return NextResponse.json({ error: error.message || "Error uploading file" }, { status: 500 });
    }
}
