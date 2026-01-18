"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", paddingTop: isAdmin ? "0" : "80px" }}>
            {!isAdmin && <Header />}
            <main style={{ flex: 1 }}>
                {children}
            </main>
            {!isAdmin && <Footer />}
        </div>
    );
}
