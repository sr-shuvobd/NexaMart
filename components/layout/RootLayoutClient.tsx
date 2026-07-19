"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ToastProvider from "@/components/providers/ToastProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/admin") || pathname?.startsWith("/seller");

  return (
    <ThemeProvider>
      <ToastProvider />
      {!isDashboard && <Navbar />}
      <main className={`flex-1 ${isDashboard ? "" : "pt-[64px]"}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </ThemeProvider>
  );
}
