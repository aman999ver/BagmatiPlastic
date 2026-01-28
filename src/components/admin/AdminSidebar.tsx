"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, ShoppingBag, PlusCircle, Image as ImageIcon, Grid, LogOut, Layers, Tag, FileText, Star, Award, Mail, Menu, X } from "lucide-react";
import styles from "./AdminLayout.module.css";

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = async () => {
        // In a real app, call an API to clear the cookie
        await fetch("/api/logout", { method: "POST" });
        router.push("/admin/login");
    };

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: ShoppingBag }, // Replaced "Add Product"
        { name: "Categories", href: "/admin/categories", icon: Layers },
        { name: "Series", href: "/admin/series", icon: Tag },
        { name: "Brands", href: "/admin/brands", icon: Star },
        { name: "Blogs", href: "/admin/blogs", icon: FileText },
        { name: "Factory", href: "/admin/factory", icon: ImageIcon },
        { name: "Certificates", href: "/admin/certificates", icon: Award },
        { name: "Inquiries", href: "/admin/inquiries", icon: Mail },
        { name: "Banners", href: "/admin/banners", icon: ImageIcon },
        { name: "Featured Grid", href: "/admin/featured", icon: Grid },
    ];

    // Don't show sidebar on login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className={styles.layout}>
            {/* Mobile Header */}
            <div className={styles.mobileHeader}>
                <div className={styles.mobileLogo}>
                    <Image
                        src="/mobilelogo.png"
                        alt="Bagmati Plastic"
                        width={40}
                        height={40}
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <button
                    className={styles.menuBtn}
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <aside className={`${styles.sidebar} ${isMobileOpen ? styles.open : ""}`}>
                <div className={styles.logo}>
                    <Image
                        src="/bagmati-logo.png"
                        alt="Bagmati Plastic"
                        width={120}
                        height={40}
                        style={{ objectFit: "contain" }}
                    />
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <button onClick={handleLogout} className={styles.logoutBtn}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                        <LogOut size={18} />
                        Logout
                    </div>
                </button>
            </aside>

            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
