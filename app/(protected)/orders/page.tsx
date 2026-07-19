"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";
import { RefreshCw, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      api.get(`/api/orders/user/${session.user.id}`)
        .then(res => {
          if (res.data.success) {
            setOrders(res.data.orders);
          }
        })
        .catch(() => toast.error("Failed to load your orders."))
        .finally(() => setLoading(false));
    }
  }, [session]);

  return (
    <div className="min-h-[80vh] bg-neutral-50 dark:bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-[1000px] mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">My Orders</h1>
        
        {loading ? (
          <div className="card-base p-16 text-center flex flex-col items-center justify-center">
            <RefreshCw size={32} className="text-primary-500 animate-spin mb-4" />
            <p className="text-neutral-500">Loading your order history...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="card-base p-16 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-500 dark:bg-blue-950/30 flex items-center justify-center mb-6">
              <Package size={32} />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-3">No orders found</h2>
            <p className="text-neutral-500 max-w-md mb-8 leading-relaxed">
              You haven't placed any orders yet. When you do, they will appear here.
            </p>
            <Link href="/explore" className="btn-primary px-8 py-3 rounded-full text-base font-medium">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="card-base overflow-hidden">
                <div className="bg-neutral-100 dark:bg-neutral-900 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Order Number</p>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">{order.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Date Placed</p>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Total Amount</p>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    order.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="p-6 divide-y divide-neutral-100 dark:divide-neutral-800">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400">
                            <Package size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-1">{item.name}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                          <span>Qty: {item.quantity}</span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-neutral-50 dark:bg-[#0a0a0a] px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                  <Link href={`/explore`} className="text-sm font-medium text-primary-500 hover:text-primary-600 flex items-center gap-1 group">
                    Buy Again <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
