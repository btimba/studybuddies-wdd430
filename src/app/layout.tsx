import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StudyBuddies",
  description:
    "Connect, collaborate, and achieve your academic goals together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <a
          href="#main-content"
          className="absolute left-4 top-3 z-50 -translate-y-20 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
