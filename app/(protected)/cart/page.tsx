"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("nexamart_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
    setLoaded(true);
  }, []);

  const saveCart = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem("nexamart_cart", JSON.stringify(newCart));
  };

  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map(item => 
      (item.id === id || item._id === id) 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    );
    saveCart(newCart);
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter(item => item.id !== id && item._id !== id);
    saveCart(newCart);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (!loaded) return null; // Avoid hydration mismatch

  return (
    <div className="min-h-[80vh] bg-neutral-50 dark:bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-[1000px] mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center gap-3">
          <ShoppingBag size={28} className="text-primary-500" />
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="card-base p-16 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-neutral-300 dark:text-neutral-700" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-3">Your cart is empty</h2>
            <p className="text-neutral-500 max-w-md mb-8 leading-relaxed">Looks like you haven't added anything to your cart yet. Browse our products and find something you love!</p>
            <Link href="/explore" className="btn-primary px-8 py-3 rounded-full text-base font-medium">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id || item._id} className="card-base p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center relative group">
                  <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1 text-lg">{item.name}</h3>
                    <p className="font-bold text-primary-500">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-lg p-1 border border-neutral-200 dark:border-neutral-800">
                      <button onClick={() => updateQuantity(item.id || item._id, -1)} className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-800 rounded-md transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-neutral-900 dark:text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id || item._id, 1)} className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-800 rounded-md transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id || item._id)} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" aria-label="Remove item">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="card-base p-6 sticky top-24">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Subtotal</span>
                    <span className="font-medium text-neutral-900 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Estimated Tax</span>
                    <span className="font-medium text-neutral-900 dark:text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Shipping</span>
                    <span className="font-medium text-green-500">Free</span>
                  </div>
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-neutral-900 dark:text-white">Total</span>
                    <span className="text-2xl font-extrabold text-neutral-900 dark:text-white">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="btn-primary w-full py-4 text-base rounded-xl flex items-center justify-center gap-2 group">
                  Proceed to Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
