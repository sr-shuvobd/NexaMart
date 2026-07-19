"use client";

import { useState, useMemo } from "react";
import {
  Search, SlidersHorizontal, X, Star, Heart, ShoppingCart,
  ChevronDown, Grid2x2, List, Sparkles, Tag,
  Laptop, Shirt, Home, BookOpen, Dumbbell, Baby
} from "lucide-react";

const categories = [
  { id: "all", name: "All Products", icon: Sparkles },
  { id: "electronics", name: "Electronics", icon: Laptop },
  { id: "fashion", name: "Fashion", icon: Shirt },
  { id: "home", name: "Home & Living", icon: Home },
  { id: "books", name: "Books", icon: BookOpen },
  { id: "sports", name: "Sports", icon: Dumbbell },
  { id: "kids", name: "Baby & Kids", icon: Baby },
  { id: "deals", name: "Deals", icon: Tag },
];

const products = [
  { id: 1, name: "Apple AirPods Pro (2nd Gen)", price: 249, originalPrice: 329, rating: 4.8, reviews: 2341, category: "electronics", image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&q=80", badge: "Best Seller", discount: 24 },
  { id: 2, name: "Premium Leather Jacket", price: 189, originalPrice: 280, rating: 4.6, reviews: 892, category: "fashion", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80", badge: "Trending", discount: 33 },
  { id: 3, name: "Smart LED Desk Lamp", price: 59, originalPrice: 89, rating: 4.7, reviews: 1103, category: "home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80", badge: "New", discount: 34 },
  { id: 4, name: "Sony WH-1000XM5 Headphones", price: 328, originalPrice: 399, rating: 4.9, reviews: 5621, category: "electronics", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80", badge: "Top Rated", discount: 18 },
  { id: 5, name: "Minimalist Running Sneakers", price: 95, originalPrice: 140, rating: 4.5, reviews: 677, category: "sports", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", badge: null, discount: 32 },
  { id: 6, name: "Atomic Habits – James Clear", price: 18, originalPrice: 27, rating: 4.9, reviews: 9874, category: "books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80", badge: "Bestseller", discount: 33 },
  { id: 7, name: "Baby Soft Play Mat Set", price: 44, originalPrice: 65, rating: 4.7, reviews: 432, category: "kids", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80", badge: "Sale", discount: 32 },
  { id: 8, name: "Mechanical Gaming Keyboard", price: 129, originalPrice: 179, rating: 4.6, reviews: 2109, category: "electronics", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80", badge: "Hot Deal", discount: 28 },
  { id: 9, name: "Yoga & Fitness Mat Pro", price: 38, originalPrice: 55, rating: 4.4, reviews: 551, category: "sports", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80", badge: null, discount: 31 },
  { id: 10, name: "Scented Soy Candle Set", price: 29, originalPrice: 42, rating: 4.8, reviews: 1287, category: "home", image: "https://images.unsplash.com/photo-1602607507005-c30ac6a8b90c?w=400&q=80", badge: "Popular", discount: 31 },
  { id: 11, name: "Samsung Galaxy Tab S9", price: 649, originalPrice: 799, rating: 4.7, reviews: 3342, category: "electronics", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&q=80", badge: "New", discount: 19 },
  { id: 12, name: "Women's Floral Midi Dress", price: 62, originalPrice: 95, rating: 4.5, reviews: 743, category: "fashion", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80", badge: null, discount: 35 },
];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 700]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [gridView, setGridView] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const filtered = useMemo(() => {
    let items = products.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (p.rating < minRating) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    if (sortBy === "price_low") items = [...items].sort((a, b) => a.price - b.price);
    else if (sortBy === "price_high") items = [...items].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") items = [...items].sort((a, b) => b.rating - a.rating);
    else if (sortBy === "newest") items = [...items].reverse();

    return items;
  }, [search, activeCategory, priceRange, minRating, sortBy]);

  const badgeColor: Record<string, string> = {
    "Best Seller": "bg-amber-500",
    "Bestseller": "bg-amber-500",
    "Top Rated": "bg-purple-500",
    "New": "bg-blue-500",
    "Trending": "bg-pink-500",
    "Hot Deal": "bg-red-500",
    "Sale": "bg-red-500",
    "Popular": "bg-indigo-500",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Top Banner ── */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2">Discover</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Explore Products</h1>
          {/* Search */}
          <div className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-2xl px-5 py-3 max-w-xl shadow-lg">
            <Search size={20} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search any product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-gray-800 dark:text-white text-sm outline-none placeholder-gray-400"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex gap-8">
        {/* ── Sidebar ── */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 shadow-2xl p-6 overflow-y-auto transition-transform duration-300
            lg:static lg:z-auto lg:shadow-none lg:w-64 lg:shrink-0 lg:translate-x-0 lg:rounded-2xl lg:h-fit lg:border lg:border-gray-100 lg:dark:border-gray-800
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-primary-500" />
              Filters
            </h2>
            <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Category</p>
            <div className="flex flex-col gap-1">
              {categories.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => { setActiveCategory(id); setSidebarOpen(false); }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                    activeCategory === id
                      ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon size={16} />
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Price Range</p>
            <div className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <input
              type="range" min={0} max={700} step={10}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full accent-primary-500"
            />
          </div>

          {/* Rating */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Min. Rating</p>
            <div className="flex flex-col gap-1">
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                    minRating === r
                      ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  {r === 0 ? "All Ratings" : `${r}+ Stars`}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => { setActiveCategory("all"); setPriceRange([0, 700]); setMinRating(0); setSearch(""); }}
            className="w-full mt-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:border-primary-400 hover:text-primary-500 transition-colors"
          >
            Reset Filters
          </button>
        </aside>

        {/* Backdrop */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 shadow-sm"
                onClick={() => setSidebarOpen(true)}
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> products found
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm outline-none cursor-pointer"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {/* Grid / List toggle */}
              <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setGridView(true)}
                  className={`p-2 ${gridView ? "bg-primary-500 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                  <Grid2x2 size={17} />
                </button>
                <button
                  onClick={() => setGridView(false)}
                  className={`p-2 ${!gridView ? "bg-primary-500 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                  <List size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">No products found</h3>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className={gridView
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              : "flex flex-col gap-4"
            }>
              {filtered.map((product) => (
                gridView ? (
                  // ── Grid Card ──
                  <div key={product.id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.badge && (
                        <span className={`absolute top-3 left-3 ${badgeColor[product.badge] || "bg-gray-700"} text-white text-[11px] font-bold px-2.5 py-1 rounded-full`}>
                          {product.badge}
                        </span>
                      )}
                      <span className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 text-red-500 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        -{product.discount}%
                      </span>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                          wishlist.includes(product.id)
                            ? "bg-pink-500 text-white"
                            : "bg-white dark:bg-gray-800 text-gray-500 hover:text-pink-500 opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <Heart size={16} className={wishlist.includes(product.id) ? "fill-white" : ""} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mb-3">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-extrabold text-primary-500">${product.price}</span>
                          <span className="text-xs text-gray-400 line-through ml-2">${product.originalPrice}</span>
                        </div>
                        <button className="flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md hover:shadow-primary-500/30 transition-all">
                          <ShoppingCart size={14} />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // ── List Card ──
                  <div key={product.id} className="group flex gap-4 bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {product.badge && (
                        <span className={`absolute top-1.5 left-1.5 ${badgeColor[product.badge] || "bg-gray-700"} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full`}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{product.name}</h3>
                        <div className="flex items-center gap-1.5">
                          <Star size={13} className="fill-amber-400 text-amber-400" />
                          <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{product.rating}</span>
                          <span className="text-xs text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-extrabold text-primary-500">${product.price}</span>
                        <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                        <span className="text-xs text-red-500 font-bold">-{product.discount}%</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                          wishlist.includes(product.id)
                            ? "bg-pink-500 border-pink-500 text-white"
                            : "border-gray-200 dark:border-gray-700 text-gray-400 hover:border-pink-400 hover:text-pink-500"
                        }`}
                      >
                        <Heart size={14} className={wishlist.includes(product.id) ? "fill-white" : ""} />
                      </button>
                      <button className="flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all">
                        <ShoppingCart size={14} />
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
