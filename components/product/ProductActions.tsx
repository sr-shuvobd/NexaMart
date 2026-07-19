"use client";
import { ShoppingBag, Heart } from "lucide-react";
import { useStore } from "@/providers/CartWishlistProvider";

export default function ProductActions({ product }: { product: any }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  return (
    <div className="flex items-center gap-4 mb-10">
      <button 
        onClick={() => addToCart(product)}
        className="btn-primary flex-1 py-4 text-lg rounded-xl flex items-center justify-center gap-2"
      >
        <ShoppingBag size={20} />
        Add to Cart
      </button>
      <button 
        onClick={() => toggleWishlist(product)}
        className={`p-4 rounded-xl border transition-colors ${
          isInWishlist(product._id || product.id)
            ? "border-red-200 text-red-500 bg-red-50 dark:bg-red-900/10"
            : "border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900/30"
        }`}
      >
        <Heart size={24} className={isInWishlist(product._id || product.id) ? "fill-current" : ""} />
      </button>
    </div>
  );
}
