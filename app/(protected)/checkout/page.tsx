"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Lock, CreditCard, Truck } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { data: session } = useSession();
  const router = useRouter();

  const [cart, setCart] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("nexamart_cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart(parsed);
        const st = parsed.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
        setSubtotal(st);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (session?.user?.id) {
      api.get(`/api/users/${session.user.id}`)
        .then(res => res.data)
        .then(data => {
          if (data.success && data.user.addresses && data.user.addresses.length > 0) {
            const defAddr = data.user.addresses.find((a: any) => a.isDefault) || data.user.addresses[0];
            const nameParts = session.user.name.split(" ");
            setShipping({
              firstName: nameParts[0] || "",
              lastName: nameParts.slice(1).join(" ") || "",
              address: defAddr.street,
              city: defAddr.city,
              zipCode: defAddr.zipCode
            });
          } else {
            toast.error("Please add a delivery address in your profile before checkout.");
            router.push("/profile");
          }
        })
        .catch(() => {
          // Ignore error
        });
    }
  }, [session?.user?.id, session?.user?.name, router]);

  const handlePayment = async () => {
    if (!session?.user?.id) {
      toast.error("Please log in to complete your order.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsProcessing(true);
    try {
      const orderData = {
        customerId: session.user.id,
        customerName: `${shipping.firstName} ${shipping.lastName}`,
        customerEmail: session.user.email,
        items: cart.map(item => ({
          productId: item.id || item._id, // Support both if modified
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: total,
        shippingAddress: {
          street: shipping.address,
          city: shipping.city,
          state: "",
          zipCode: shipping.zipCode,
          country: "US"
        },
        paymentMethod: "Card"
      };

      const res = await api.post("/api/orders", orderData);
      
      if (res.data.success) {
        setOrderNumber(res.data.order.orderNumber);
        
        // Use CartWishlistProvider to clear cart so navbar updates
        // Since we are not using useStore here directly, we dispatch a custom event
        window.dispatchEvent(new Event("nexamart_cart_cleared"));
        
        setStep(3); // success
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

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
                    <input type="text" value={shipping.firstName} onChange={(e) => setShipping({...shipping, firstName: e.target.value})} className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Last Name</label>
                    <input type="text" value={shipping.lastName} onChange={(e) => setShipping({...shipping, lastName: e.target.value})} className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Address</label>
                    <input type="text" value={shipping.address} onChange={(e) => setShipping({...shipping, address: e.target.value})} className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">City</label>
                    <input type="text" value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Zip Code</label>
                    <input type="text" value={shipping.zipCode} onChange={(e) => setShipping({...shipping, zipCode: e.target.value})} className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (!shipping.firstName || !shipping.address) {
                      toast.error("Please fill in required shipping details.");
                      return;
                    }
                    setStep(2);
                  }} 
                  className="btn-primary w-full mt-8 py-3.5 text-base rounded-xl"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="card-base p-6">
                <h3 className="font-bold text-neutral-900 dark:text-white mb-4">Order Summary</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  {cart.length === 0 ? (
                    <p className="text-sm text-neutral-500 text-center py-4">Cart is empty</p>
                  ) : cart.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-900 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm text-neutral-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Tax</span><span className="font-medium">${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span className="text-green-500 font-medium">Free</span></div>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-neutral-200 dark:border-neutral-800 pt-4">
                  <span>Total</span><span>${total.toFixed(2)}</span>
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
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Card Number (Mock)</label>
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
              <button onClick={() => setStep(1)} disabled={isProcessing} className="px-6 py-3.5 text-neutral-500 font-medium hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50">
                Back
              </button>
              <button onClick={handlePayment} disabled={isProcessing} className="btn-primary flex-1 py-3.5 text-base rounded-xl shadow-lg shadow-primary-500/20 disabled:opacity-50 flex justify-center">
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
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
              Your order <span className="font-semibold text-neutral-900 dark:text-white">#{orderNumber}</span> has been placed successfully.
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
