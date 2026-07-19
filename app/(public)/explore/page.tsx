"use client";

import { useState, useMemo } from "react";
import {
  Search, SlidersHorizontal, X, Star, Heart,
  ChevronDown, Grid2x2, List, Sparkles, Tag,
  Laptop, Shirt, Home, BookOpen, Dumbbell, Baby
} from "lucide-react";

const categories = [
  { id: "all", name: "All Products", icon: Sparkles },
  { id: "electronics", name: "Electronics", icon: Laptop },
  { id: "fashion", name: "Fashion", icon: Shirt },
  { id: "home", name: "Home", icon: Home },
  { id: "books", name: "Books", icon: BookOpen },
  { id: "sports", name: "Sports", icon: Dumbbell },
  { id: "kids", name: "Kids", icon: Baby },
  { id: "deals", name: "Deals", icon: Tag },
];

const products = [
  { id: 1, name: "Apple AirPods Pro (2nd Gen)", price: 249, originalPrice: 329, rating: 4.8, reviews: 2341, category: "electronics", image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&q=80", badge: "Best Seller" },
  { id: 2, name: "Premium Leather Jacket", price: 189, originalPrice: 280, rating: 4.6, reviews: 892, category: "fashion", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80", badge: null },
  { id: 3, name: "Smart LED Desk Lamp", price: 59, originalPrice: 89, rating: 4.7, reviews: 1103, category: "home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80", badge: "New" },
  { id: 4, name: "Sony WH-1000XM5 Headphones", price: 328, originalPrice: 399, rating: 4.9, reviews: 5621, category: "electronics", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80", badge: null },
  { id: 5, name: "Minimalist Running Sneakers", price: 95, originalPrice: 140, rating: 4.5, reviews: 677, category: "sports", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", badge: null },
  { id: 6, name: "Atomic Habits – James Clear", price: 18, originalPrice: 27, rating: 4.9, reviews: 9874, category: "books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80", badge: "Popular" },
  { id: 7, name: "Baby Soft Play Mat Set", price: 44, originalPrice: 65, rating: 4.7, reviews: 432, category: "kids", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80", badge: null },
  { id: 8, name: "Mechanical Gaming Keyboard", price: 129, originalPrice: 179, rating: 4.6, reviews: 2109, category: "electronics", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80", badge: null },
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("popular");
  const [gridView, setGridView] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let items = products.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (p.price > priceRange[1]) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    if (sortBy === "price_low") items = [...items].sort((a, b) => a.price - b.price);
    else if (sortBy === "price_high") items = [...items].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") items = [...items].sort((a, b) => b.rating - a.rating);

    return items;
  }, [search, activeCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* ── Header ── */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0a0a0a] pt-12 pb-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-6">Explore Products</h1>
          <div className="flex items-center gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 max-w-xl shadow-subtle focus-within:ring-1 focus-within:ring-neutral-400 transition-all">
            <Search size={18} className="text-neutral-400 shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-white outline-none placeholder-neutral-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-neutral-400 hover:text-neutral-600">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-10 flex gap-10">
        {/* ── Sidebar ── */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0a0a0a] border-r border-neutral-200 dark:border-neutral-800 p-6 overflow-y-auto transition-transform duration-300
            lg:static lg:z-auto lg:w-60 lg:shrink-0 lg:translate-x-0 lg:p-0 lg:border-none lg:bg-transparent
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex items-center justify-between lg:hidden mb-6">
            <h2 className="font-semibold text-neutral-900 dark:text-white">Filters</h2>
            <button className="text-neutral-500" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="space-y-8">
            {/* Categories */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">Categories</p>
              <div className="flex flex-col gap-1">
                {categories.map(({ id, name }) => (
                  <button
                    key={id}
                    onClick={() => { setActiveCategory(id); setSidebarOpen(false); }}
                    className={`text-sm font-medium text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === id
                        ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">Max Price</p>
              <div className="flex items-center justify-between text-sm font-medium text-neutral-900 dark:text-white mb-2">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range" min={0} max={500} step={10}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, +e.target.value])}
                className="w-full accent-neutral-900 dark:accent-white"
              />
            </div>
          </div>
        </aside>

        {/* Backdrop */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 pb-20">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300"
                onClick={() => setSidebarOpen(true)}
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <p className="text-sm text-neutral-500 hidden sm:block">
                Showing <span className="font-medium text-neutral-900 dark:text-white">{filtered.length}</span> results
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-200 pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
              <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden bg-white dark:bg-[#0a0a0a]">
                <button onClick={() => setGridView(true)} className={`p-1.5 ${gridView ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white" : "text-neutral-400 hover:text-neutral-600"}`}>
                  <Grid2x2 size={16} />
                </button>
                <button onClick={() => setGridView(false)} className={`p-1.5 ${!gridView ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white" : "text-neutral-400 hover:text-neutral-600"}`}>
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Search size={32} className="text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white">No products found</h3>
              <p className="text-sm text-neutral-500 mt-1">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className={gridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
              {filtered.map((product) => (
                gridView ? (
                  <div key={product.id} className="group flex flex-col bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                    <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-[10px] font-semibold px-2 py-1 rounded">
                          {product.badge}
                        </span>
                      )}
                      <button
                        onClick={() => setWishlist(p => p.includes(product.id) ? p.filter(i => i !== product.id) : [...p, product.id])}
                        className={`absolute top-3 right-3 p-1.5 rounded-full bg-white dark:bg-black border transition-colors shadow-sm ${wishlist.includes(product.id) ? "border-red-200 text-red-500" : "border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
                      >
                        <Heart size={14} className={wishlist.includes(product.id) ? "fill-current" : ""} />
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-1 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-1.5 mb-3">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{product.rating}</span>
                        <span className="text-xs text-neutral-400">({product.reviews})</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="text-sm font-semibold text-neutral-900 dark:text-white">${product.price}</span>
                        <button className="text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white px-3 py-1.5 rounded-md transition-colors">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={product.id} className="flex gap-4 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                    <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-900 relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1 justify-center">
                      <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-1">{product.name}</h3>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{product.rating}</span>
                      </div>
                      <span className="text-sm font-semibold text-neutral-900 dark:text-white">${product.price}</span>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <button
                        onClick={() => setWishlist(p => p.includes(product.id) ? p.filter(i => i !== product.id) : [...p, product.id])}
                        className={`p-1.5 rounded-full border transition-colors ${wishlist.includes(product.id) ? "border-red-200 text-red-500 bg-red-50 dark:bg-red-900/10" : "border-transparent text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"}`}
                      >
                        <Heart size={16} className={wishlist.includes(product.id) ? "fill-current" : ""} />
                      </button>
                      <button className="text-xs font-medium bg-neutral-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
