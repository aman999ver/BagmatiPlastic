import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { LanguageProvider } from "@/context/LanguageContext";
import GoogleTranslate from "@/components/common/GoogleTranslate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bagmati Plastic",
  description: "Explore Bagmati Plastic's wide range of high-quality plastic products including buckets, mugs, and household items. Durable and stylish solutions for your home.",
  icons: {
    icon: "/mobilelogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LanguageProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <GoogleTranslate />
        </LanguageProvider>
      </body>
    </html>
  );
}
