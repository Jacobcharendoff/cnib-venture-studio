import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "The Venture Collective | CNIB",
  description:
    "A free entrepreneurship course for aspiring entrepreneurs living with sight loss. 24 lessons. 6 modules. One real business.",
  openGraph: {
    title: "The Venture Collective | CNIB",
    description: "Turn Your Idea Into Your First Dollar. Built for aspiring entrepreneurs living with sight loss.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
