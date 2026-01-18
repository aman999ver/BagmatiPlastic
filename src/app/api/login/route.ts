import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Hardcoded credentials for demonstration
        if (username === "admin" && password === "admin123") {
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
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
