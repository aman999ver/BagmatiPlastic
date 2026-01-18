import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import sharp from "sharp";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const type = formData.get("type") as string; // 'banner', 'grid', 'product'
        const productName = formData.get("productName") as string; // Required if type === 'product'

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Determine upload directory based on type
        let relativeUploadDir = "uploads";
        if (type === "banner") {
            relativeUploadDir = "uploads/banner";
        } else if (type === "grid") {
            relativeUploadDir = "uploads/grid";
        } else if (type === "category") {
            relativeUploadDir = "uploads/category";
        } else if (type === "product" && productName) {
            // Sanitize product name for folder usage
            const sanitizedParams = productName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            relativeUploadDir = `uploads/products/${sanitizedParams}/img`;
        }

        const uploadDir = path.join(process.cwd(), "public", relativeUploadDir);

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = file.name.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + '.webp';
        const filepath = path.join(uploadDir, filename);

        // Convert to WebP and save
        await sharp(buffer)
            .webp({ quality: 80 })
            .toFile(filepath);

        // Return URL relative to public
        return NextResponse.json({ success: true, url: `/${relativeUploadDir}/${filename}` });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Error uploading file." }, { status: 500 });
    }
}
