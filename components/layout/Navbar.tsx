"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart, Heart, Menu, X, Search,
  ChevronDown, Sun, Moon, Monitor,
  Laptop, Shirt, Home, BookOpen, Dumbbell, Baby, Tag, LayoutGrid,
  User, LogOut, LayoutDashboard
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useSession, signOut } from "@/lib/auth-client";

const categories = [
  { id: "electronics", name: "Electronics", icon: Laptop, href: "/explore?cat=electronics" },
  { id: "fashion", name: "Fashion", icon: Shirt, href: "/explore?cat=fashion" },
  { id: "home", name: "Home & Living", icon: Home, href: "/explore?cat=home" },
  { id: "books", name: "Books", icon: BookOpen, href: "/explore?cat=books" },
  { id: "sports", name: "Sports", icon: Dumbbell, href: "/explore?cat=sports" },
  { id: "kids", name: "Baby & Kids", icon: Baby, href: "/explore?cat=kids" },
  { id: "deals", name: "Deals", icon: Tag, href: "/explore?cat=deals" },
  { id: "all", name: "All Categories", icon: LayoutGrid, href: "/explore" },
];

const navLinks = [
  { name: "Explore", href: "/explore" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options = [
    { value: "light", label: "Light", Icon: Sun },
    { value: "dark", label: "Dark", Icon: Moon },
    { value: "system", label: "System", Icon: Monitor },
  ];

  const CurrentIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle theme"
        className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all"
      >
        <CurrentIcon size={16} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-[#0a0a0a] rounded-lg shadow-card border border-neutral-200 dark:border-neutral-800 py-1 z-50 animate-slide-down">
          {options.map(({ value, label, Icon }) => (
            <button
              key={value}
              onClick={() => { setTheme(value as "light" | "dark" | "system"); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-sm transition-colors ${theme === value
                ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 font-medium"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const catRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = useSession();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setCatOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-subtle border-b border-neutral-200/50 dark:border-neutral-800/50 py-3"
          : "bg-white dark:bg-black border-b border-transparent py-4"
          }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex items-center justify-between">

          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 shrink-0">
              <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Nexa<span className="text-primary-500">Mart</span>
              </span>
            </Link>

            {/* Nav links */}
            <nav className="hidden lg:flex items-center gap-6" role="navigation">
              <div ref={catRef} className="relative">
                <button
                  onClick={() => setCatOpen(!catOpen)}
                  aria-haspopup="true"
                  aria-expanded={catOpen}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${catOpen ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                >
                  Categories
                  <ChevronDown size={14} className={`transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} />
                </button>

                {catOpen && (
                  <div className="absolute top-full left-0 mt-4 w-64 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-card dark:shadow-dark-card border border-neutral-200 dark:border-neutral-800 p-2 z-50 animate-slide-down">
                    <div className="grid grid-cols-1 gap-1">
                      {categories.map(({ name, icon: Icon, href }) => (
                        <Link
                          key={name}
                          href={href}
                          onClick={() => setCatOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white rounded-lg transition-colors group"
                        >
                          <Icon size={16} className="text-neutral-400 group-hover:text-primary-500 transition-colors" />
                          {name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${pathname === link.href
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-md border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 focus-within:border-neutral-300 dark:focus-within:border-neutral-700 transition-all px-3 py-1.5 w-64">
              <Search size={14} className="text-neutral-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-white placeholder-neutral-500 outline-none ml-2"
              />
            </div>

            <ThemeToggle />

            {/* Icons */}
            <Link
              href="/wishlist"
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <Heart size={18} />
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <ShoppingCart size={18} />
              <span className="absolute top-1 right-0 bg-primary-500 text-white text-[10px] font-medium h-4 w-4 rounded-full flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Auth */}
            <div className="hidden lg:flex items-center gap-3 ml-2 pl-4 border-l border-neutral-200 dark:border-neutral-800">
              {isPending ? (
                <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              ) : session?.user ? (
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
                      {session.user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-card border border-neutral-200 dark:border-neutral-800 py-1 z-50 animate-slide-down">
                      <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800 mb-1">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{session.user.name}</p>
                        <p className="text-xs text-neutral-500 truncate">{session.user.email}</p>
                      </div>
                      <Link
                        href={(session.user as any).role === "admin" ? "/admin" : (session.user as any).role === "seller" ? "/seller" : "/profile"}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        <LayoutDashboard size={14} />
                        {(session.user as any).role === "seller" || (session.user as any).role === "admin" ? "Dashboard" : "Profile"}
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <LogOut size={14} />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    Log in
                  </Link>
                  <Link href="/register" className="btn-primary py-1.5 px-4 text-xs">
                    Sign up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-neutral-600 dark:text-neutral-300"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setMobileOpen(false)} />
          <div className="relative ml-auto w-full max-w-sm bg-white dark:bg-[#0a0a0a] shadow-2xl flex flex-col animate-slide-up h-full">
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 dark:border-neutral-900">
              <span className="text-lg font-bold">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-md px-3 py-2 w-full">
                <Search size={16} className="text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-white placeholder-neutral-500 outline-none ml-2"
                />
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map(l => (
                  <Link key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="text-base font-medium text-neutral-900 dark:text-white">
                    {l.name}
                  </Link>
                ))}
                <div className="h-px bg-neutral-100 dark:bg-neutral-900 my-2" />
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Categories</p>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {categories.map(c => (
                    <Link key={c.name} href={c.href} onClick={() => setMobileOpen(false)} className="text-sm text-neutral-600 dark:text-neutral-300">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
            <div className="p-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col gap-3">
              {session?.user ? (
                <>
                  <div className="flex items-center gap-3 mb-2 px-2">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                      {session.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">{session.user.name}</p>
                      <p className="text-xs text-neutral-500">{session.user.email}</p>
                    </div>
                  </div>
                  <Link href={(session.user as any).role === "admin" ? "/admin" : (session.user as any).role === "seller" ? "/seller" : "/profile"} onClick={() => setMobileOpen(false)} className="btn-outline w-full justify-center gap-2">
                    <LayoutDashboard size={16} />
                    {(session.user as any).role === "seller" || (session.user as any).role === "admin" ? "Dashboard" : "Profile"}
                  </Link>
                  <button onClick={handleSignOut} className="btn-outline w-full justify-center gap-2 !text-red-600 !border-red-200 hover:!bg-red-50 dark:!border-red-900/30 dark:hover:!bg-red-900/20">
                    <LogOut size={16} />
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-outline w-full justify-center">Log in</Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
