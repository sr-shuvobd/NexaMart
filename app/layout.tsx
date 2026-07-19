import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "NexaMart - AI Powered E-Commerce",
  description: "Intelligent shopping platform powered by AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col bg-white dark:bg-dark-950`}>
        <Navbar />
        <main className="flex-1 pt-[80px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
