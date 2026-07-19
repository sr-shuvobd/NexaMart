import { Star, Truck, Shield, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.product : null;
  } catch (error) {
    return null;
  }
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-[80vh] bg-white dark:bg-black py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-primary-500">Home</Link>
          <span>/</span>
          <Link href="/explore" className="hover:text-primary-500">Explore</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-white dark:bg-black text-neutral-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < Math.floor(product.rating || 5) ? "fill-amber-400 text-amber-400" : "fill-neutral-200 text-neutral-200 dark:fill-neutral-800 dark:text-neutral-800"} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                {product.rating?.toFixed(1) || "5.0"}
              </span>
              <span className="text-sm text-neutral-500">
                ({product.reviews || 0} reviews)
              </span>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-neutral-400 line-through mb-1">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              {product.description || "No description provided for this product. It is a highly rated item in our store."}
            </p>

            <div className="flex items-center gap-4 mb-10">
              <button className="btn-primary flex-1 py-4 text-lg rounded-xl flex items-center justify-center gap-2">
                <ShoppingBag size={20} />
                Add to Cart
              </button>
              <button className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900/30 transition-colors">
                <Heart size={24} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-500 shrink-0">
                  <Truck size={18} />
                </div>
                <span>Free worldwide shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-500 shrink-0">
                  <Shield size={18} />
                </div>
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
