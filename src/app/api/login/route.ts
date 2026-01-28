import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/models";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { username, password } = body;

        // Fetch user from DB
        const user = await User.findOne({ username });

        // Check if user exists and password matches
        // Note: In a real app with hashed passwords, use bcrypt.compare(password, user.password)
        if (user && user.password === password) {
            // In a real app, set a secure cookie/token
            const response = NextResponse.json({ success: true });
            response.cookies.set("admin_session", "true", {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24, // 1 day
            });
            return response;
        }

        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
