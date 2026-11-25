
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyBuddies",
  description:
    "Discover study groups, connect with students, and organize your learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-slate-200 bg-white">
          <nav
            className="mx-auto flex min-h-16 w-[min(1120px,calc(100%-40px))] items-center justify-between gap-5"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight text-blue-800"
            >
              StudyBuddies
            </Link>

            <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-slate-700">
              <Link href="/study-groups">Study groups</Link>
              <Link href="/dashboard">My dashboard</Link>
            </div>
          </nav>
        </header>

        {children}

        <footer className="mt-auto border-t border-slate-200 bg-white">
          <div className="mx-auto w-[min(1120px,calc(100%-40px))] py-6 text-sm text-slate-500">
            StudyBuddies — Learn together. Grow together.
          </div>
        </footer>
      </body>
    </html>
  );
}
