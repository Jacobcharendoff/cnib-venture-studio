import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Venture Studio | Powered by CNIB",
  description:
    "Turn your idea into your first dollar. An immersive entrepreneurial program for blind and low-vision founders, powered by CNIB.",
  keywords: [
    "CNIB",
    "Venture Studio",
    "entrepreneurship",
    "blind entrepreneurs",
    "low vision",
    "business program",
    "accessibility",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
