import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const type = formData.get("type") as string; // 'banner', 'grid', 'product'
        const productName = formData.get("productName") as string;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        // Determine folder based on type
        let folder = "bagmati/uploads"; // Base folder
        if (type === "banner") {
            folder = "bagmati/banners";
        } else if (type === "grid" || type === "category") {
            folder = "bagmati/categories";
        } else if (type === "product") {
            if (productName) {
                const sanitized = productName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                folder = `bagmati/products/${sanitized}`;
            } else {
                folder = "bagmati/products/general";
            }
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: folder,
                    resource_type: "auto", // Works for images and raw files
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(buffer);
        });

        return NextResponse.json({ success: true, url: result.secure_url });

    } catch (error: any) {
        console.error("Upload API Error:", error);
        return NextResponse.json({ error: error.message || "Error uploading file" }, { status: 500 });
    }
}
