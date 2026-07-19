"use client";

import Link from "next/link";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/providers/CartWishlistProvider";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <div className="section-container min-h-[60vh] py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card-base p-8 text-center flex flex-col items-center justify-center col-span-full py-16">
            <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-500 dark:bg-pink-950/30 flex items-center justify-center mb-4">
              <span className="text-2xl">❤️</span>
            </div>
            <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-2">No items saved yet</h2>
            <p className="text-neutral-500 mb-6">Save items you love to your wishlist so you can easily find them later.</p>
            <Link href="/explore" className="btn-primary px-6 py-2.5 rounded-xl">
              Explore Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id || product._id} className="group flex flex-col bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
              <Link href={`/products/${product.id || product._id}`} className="block relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
              <button
                onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white dark:bg-black border border-red-200 text-red-500 transition-colors shadow-sm z-10 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <Trash2 size={14} />
              </button>
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/products/${product.id || product._id}`} className="text-sm font-medium text-neutral-900 dark:text-white mb-1 line-clamp-1 hover:text-primary-500">
                  {product.name}
                </Link>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">${product.price}</span>
                  <button 
                    onClick={(e) => { e.preventDefault(); addToCart(product); }}
                    className="text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white px-3 py-1.5 rounded-md transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
