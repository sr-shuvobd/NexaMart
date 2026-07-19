"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Search,
  Sparkles,
  ChevronDown,
  Laptop,
  Shirt,
  Home,
  BookOpen,
  Dumbbell,
  Baby,
  Tag,
  LayoutGrid,
} from "lucide-react";

const categories = [
  { name: "Electronics", icon: Laptop, href: "/explore?cat=electronics" },
  { name: "Fashion", icon: Shirt, href: "/explore?cat=fashion" },
  { name: "Home & Living", icon: Home, href: "/explore?cat=home" },
  { name: "Books", icon: BookOpen, href: "/explore?cat=books" },
  { name: "Sports", icon: Dumbbell, href: "/explore?cat=sports" },
  { name: "Baby & Kids", icon: Baby, href: "/explore?cat=kids" },
  { name: "Deals", icon: Tag, href: "/explore?cat=deals" },
  { name: "All Categories", icon: LayoutGrid, href: "/explore" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const catRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Close category dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100 dark:border-gray-800"
            : "bg-white dark:bg-gray-950 py-4 border-b border-gray-100 dark:border-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-6">

            {/* ── Logo ─────────────────── */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-1.5 rounded-xl shadow-md group-hover:shadow-primary-500/40 transition-all">
                <Sparkles size={18} />
              </div>
              <span className="text-[1.35rem] font-extrabold tracking-tight text-gray-900 dark:text-white">
                Nexa<span className="text-primary-500">Mart</span>
              </span>
            </Link>

            {/* ── Categories Dropdown ───── */}
            <div ref={catRef} className="hidden md:block relative">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all border ${
                  catOpen
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-800"
                    : "text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-700 dark:hover:text-primary-400"
                }`}
              >
                <LayoutGrid size={16} />
                Categories
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Panel */}
              {catOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {categories.map(({ name, icon: Icon, href }) => (
                    <Link
                      key={name}
                      href={href}
                      onClick={() => setCatOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                        <Icon size={16} />
                      </div>
                      {name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ── Search Bar (Desktop) ──── */}
            <div className="hidden md:flex flex-1 max-w-md items-center bg-gray-100 dark:bg-gray-800 rounded-full border border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 dark:focus-within:ring-primary-900/30 transition-all px-4 py-2 gap-2">
              <Search size={17} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none min-w-0"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* ── Nav Links ─────────────── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* ── Right Actions ─────────── */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Mobile search toggle */}
              <button
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-500 transition-all relative"
              >
                <Heart size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-500 transition-all"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-0.5 -right-0.5 bg-primary-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow">
                  2
                </span>
              </Link>

              {/* Login / Signup Buttons */}
              <div className="hidden md:flex items-center gap-2 ml-2">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold rounded-full shadow-md hover:shadow-primary-500/30 hover:shadow-lg transition-all"
                >
                  <User size={15} />
                  Sign Up
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* ── Mobile Search Bar ─────── */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              searchOpen ? "max-h-20 mt-3" : "max-h-0"
            }`}
          >
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2.5 gap-2 border border-gray-200 dark:border-gray-700">
              <Search size={17} className="text-gray-400 shrink-0" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ──────────────── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 border-t border-gray-100 dark:border-gray-800 ${
            mobileOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-gray-100 dark:border-gray-800 my-1" />

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 pt-1">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {categories.slice(0, 6).map(({ name, icon: Icon, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Icon size={15} className="text-primary-500" />
                  {name}
                </Link>
              ))}
            </div>

            <hr className="border-gray-100 dark:border-gray-800 my-1" />

            <div className="flex gap-3 pt-1">
              <Link
                href="/login"
                className="flex-1 text-center py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-primary-400 hover:text-primary-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="flex-1 text-center py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold transition-colors shadow-md"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
