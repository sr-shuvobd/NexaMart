"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Package, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export default function AdminNavigation() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  const NavLinks = () => (
    <>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white font-medium">
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
        <Link href="/admin/products" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white transition-colors">
          <Package size={18} />
          Products
        </Link>
        <Link href="/admin/orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white transition-colors">
          <ShoppingBag size={18} />
          Orders
        </Link>
        <Link href="/admin/users" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white transition-colors">
          <Users size={18} />
          Users
        </Link>
      </nav>
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-1">
        <Link href="/admin/settings" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white transition-colors">
          <Settings size={18} />
          Settings
        </Link>
        <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#0a0a0a] border-r border-neutral-200 dark:border-neutral-800 hidden lg:flex flex-col z-50">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Nexa<span className="text-primary-500">Admin</span>
            </span>
          </Link>
        </div>
        <NavLinks />
      </aside>

      {/* ── Mobile Topbar ── */}
      <header className="lg:hidden h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] flex items-center justify-between px-4 sticky top-0 z-20">
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Nexa<span className="text-primary-500">Admin</span>
          </span>
        </Link>
        <button className="p-2 text-neutral-600 dark:text-neutral-400" onClick={() => setMobileOpen(true)}>
          <Menu size={20} />
        </button>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 bg-white dark:bg-[#0a0a0a] shadow-2xl flex flex-col h-full animate-slide-right">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <Link href="/" className="flex items-center gap-1.5 shrink-0">
                <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Nexa<span className="text-primary-500">Admin</span>
                </span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            <NavLinks />
          </div>
        </div>
      )}
    </>
  );
}
