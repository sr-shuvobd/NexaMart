"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Lock, CreditCard, ShoppingBag, Truck } from "lucide-react";

export default function CheckoutPage() {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  return (
    <div className="min-h-[80vh] bg-neutral-50 dark:bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary-500" : "text-neutral-400"}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-primary-500 text-white" : "bg-neutral-200 dark:bg-neutral-800"}`}>1</span>
            <span className="font-medium">Shipping</span>
          </div>
          <div className={`w-16 h-1 mx-4 rounded-full ${step >= 2 ? "bg-primary-500" : "bg-neutral-200 dark:bg-neutral-800"}`} />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary-500" : "text-neutral-400"}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-primary-500 text-white" : "bg-neutral-200 dark:bg-neutral-800"}`}>2</span>
            <span className="font-medium">Payment</span>
          </div>
          <div className={`w-16 h-1 mx-4 rounded-full ${step >= 3 ? "bg-primary-500" : "bg-neutral-200 dark:bg-neutral-800"}`} />
          <div className={`flex items-center gap-2 ${step >= 3 ? "text-primary-500" : "text-neutral-400"}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-primary-500 text-white" : "bg-neutral-200 dark:bg-neutral-800"}`}>3</span>
            <span className="font-medium">Confirmation</span>
          </div>
        </div>

        {step === 1 && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
              <div className="card-base p-8">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                  <Truck size={20} className="text-primary-500" /> Shipping Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">First Name</label>
                    <input type="text" className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" defaultValue="John" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Last Name</label>
                    <input type="text" className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" defaultValue="Doe" />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Address</label>
                    <input type="text" className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" defaultValue="123 Main St, Apt 4B" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">City</label>
                    <input type="text" className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" defaultValue="New York" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Zip Code</label>
                    <input type="text" className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" defaultValue="10001" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="btn-primary w-full mt-8 py-3.5 text-base rounded-xl">
                  Continue to Payment
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="card-base p-6">
                <h3 className="font-bold text-neutral-900 dark:text-white mb-4">Order Summary</h3>
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="w-16 h-16 rounded-lg bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=200&q=80" alt="Item" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-1">Apple AirPods Pro (2nd Gen)</h4>
                    <p className="text-sm text-neutral-500">Qty: 1</p>
                    <p className="font-bold text-neutral-900 dark:text-white">$249.00</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span className="font-medium">$249.00</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Tax</span><span className="font-medium">$19.92</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span className="text-green-500 font-medium">Free</span></div>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-neutral-200 dark:border-neutral-800 pt-4">
                  <span>Total</span><span>$268.92</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-xl mx-auto card-base p-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <CreditCard size={24} className="text-primary-500" /> Payment Details
            </h2>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg flex items-center gap-3 mb-6 text-blue-700 dark:text-blue-400">
              <Lock size={16} />
              <p className="text-sm font-medium">Your payment is encrypted and secure.</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Card Number</label>
                <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">CVC</label>
                  <input type="text" placeholder="123" className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name on Card</label>
                <input type="text" placeholder="John Doe" className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="px-6 py-3.5 text-neutral-500 font-medium hover:text-neutral-900 dark:hover:text-white transition-colors">
                Back
              </button>
              <button onClick={() => setStep(3)} className="btn-primary flex-1 py-3.5 text-base rounded-xl shadow-lg shadow-primary-500/20">
                Pay $268.92
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-lg mx-auto text-center animate-fade-in py-12">
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)] border border-green-200 dark:border-green-800">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-4">Payment Successful!</h1>
            <p className="text-lg text-neutral-500 mb-8 max-w-md mx-auto">
              Your order #NX-98234 has been placed successfully. We'll send you a confirmation email with tracking details shortly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/orders" className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-full text-base">
                View Orders
              </Link>
              <Link href="/explore" className="btn-outline w-full sm:w-auto px-8 py-3.5 rounded-full text-base">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
