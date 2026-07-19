import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "NexaMart – AI Powered E-Commerce", template: "%s | NexaMart" },
  description: "The AI-powered e-commerce platform that finds products tailored for you.",
  keywords: ["e-commerce", "AI", "shopping", "NexaMart"],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#030712" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent dark-mode flash before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('nexamart-theme');
                var sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (t === 'dark' || (!t || t === 'system') && sys) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white`}>
        <ThemeProvider>
          <ToastProvider />
          <Navbar />
          <main className="flex-1 pt-[64px]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
