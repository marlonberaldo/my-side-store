import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "My Side Store",
    template: "%s | My Side Store",
  },
  description: "Um simples e-commerce para você comprar o que quiser.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}>
        <Header />

        <div className="min-h-[calc(100vh-60px)] px-4 py-[50px] lg:px-6">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
