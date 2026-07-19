"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Package, Menu, X, PlusCircle, Sun, Moon, Monitor } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { useTheme } from "@/providers/ThemeProvider";

export default function SellerNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  const getPageTitle = () => {
    if (pathname.includes("/products")) return "My Products";
    if (pathname.includes("/add-product")) return "Add Product";
    if (pathname.includes("/orders")) return "Customer Orders";
    if (pathname.includes("/settings")) return "Store Settings";
    return "Seller Dashboard";
  };

  const NavLinks = () => (
    <>
      {/* Profile Section in Sidebar */}
      <div className="flex flex-col items-center p-6 border-b border-neutral-200 dark:border-neutral-800/50">
        <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-2xl mb-3 border-2 border-primary-500/20">
          {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "S"}
        </div>
        <h3 className="font-bold text-neutral-900 dark:text-white mb-0.5">
          {(session?.user as any)?.storeName || session?.user?.name || "Seller"}
        </h3>
        <p className="text-xs text-neutral-500 mb-3">{session?.user?.email}</p>
        <div className="bg-primary-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          SELLER
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link href="/seller" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${pathname === "/seller" ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white"}`}>
          <LayoutDashboard size={18} />
          Overview
        </Link>
        <Link href="/seller/products" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${pathname.includes("/products") ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white"}`}>
          <Package size={18} />
          My Products
        </Link>
        <Link href="/seller/add-product" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${pathname.includes("/add-product") ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white"}`}>
          <PlusCircle size={18} />
          Add Product
        </Link>
        <Link href="/seller/orders" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${pathname.includes("/orders") ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white"}`}>
          <ShoppingBag size={18} />
          Customer Orders
        </Link>
      </nav>
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800/50 space-y-1">
        <Link href="/seller/settings" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${pathname.includes("/settings") ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white"}`}>
          <Settings size={18} />
          Store Settings
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* ── Topbar (Global) ── */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md z-40 flex items-center justify-between px-4 lg:px-6">
        {/* Left Side: Logo (Desktop) or Menu (Mobile) */}
        <div className="flex items-center gap-4 w-64 shrink-0">
          <button className="lg:hidden p-2 -ml-2 text-neutral-600 dark:text-neutral-400" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <Link href="/" className="hidden lg:flex flex-col">
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">
                <LayoutDashboard size={18} />
              </div>
              NexaMart BD
            </span>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-10">SELLER DASHBOARD</span>
          </Link>
        </div>

        {/* Center: Page Title */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-sm lg:text-base font-bold text-neutral-900 dark:text-white border-b-2 border-primary-500 pb-1">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right Side: Profile & Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors hidden sm:block"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <div className="hidden sm:flex items-center gap-2 ml-2 pl-4 border-l border-neutral-200 dark:border-neutral-800">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
              {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "S"}
            </div>
            <span className="text-sm font-medium text-neutral-900 dark:text-white mx-2">{session?.user?.name || "Seller"}</span>
            <button onClick={handleSignOut} className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors ml-2">
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Desktop Sidebar ── */}
      <aside className="fixed top-16 bottom-0 left-0 w-64 bg-white dark:bg-[#0d0d12] border-r border-neutral-200 dark:border-neutral-800/80 hidden lg:flex flex-col z-30">
        <NavLinks />
      </aside>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 bg-white dark:bg-[#0d0d12] shadow-2xl flex flex-col h-full animate-slide-right">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">
                  <LayoutDashboard size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">NexaMart BD</span>
                  <span className="text-[10px] text-neutral-500">SELLER DASHBOARD</span>
                </div>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            <NavLinks />
            
            {/* Mobile Logout (since topbar logout is hidden on very small screens) */}
            <div className="p-4 sm:hidden border-t border-neutral-200 dark:border-neutral-800/50">
              <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left font-medium">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
