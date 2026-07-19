"use client";

import { useState, useEffect } from "react";
import { Search, Eye, RefreshCw, Package } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";
import { toast } from "react-toastify";

export default function SellerOrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const res = await api.get(`/api/orders/seller/${session.user.id}`);
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch {
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchOrders();
    }
  }, [session]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await api.put(`/api/orders/${id}/status`, { status: newStatus });
      if (res.data.success) {
        setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
        toast.success("Order status updated.");
      }
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const filtered = orders.filter(o => 
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    (o.customerName && o.customerName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Customer Orders</h1>
        <p className="text-sm text-neutral-500">Track and fulfill orders placed for your products.</p>
      </div>

      <div className="flex bg-white dark:bg-[#0a0a0a] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto bg-neutral-100 dark:bg-neutral-900 rounded-lg px-3 py-2 border border-transparent focus-within:border-neutral-300 dark:focus-within:border-neutral-700 transition-all">
          <Search size={16} className="text-neutral-400" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..." 
            className="bg-transparent border-none outline-none text-sm text-neutral-900 dark:text-white placeholder-neutral-500 w-full sm:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="card-base p-16 flex flex-col items-center justify-center text-center">
          <RefreshCw size={28} className="animate-spin text-primary-500 mb-4" />
          <p className="text-neutral-500">Loading orders...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-base p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4">
            <Package size={28} className="text-neutral-300 dark:text-neutral-700" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">No orders found</h2>
          <p className="text-neutral-500 max-w-sm mb-6">No orders match your search criteria or you haven't received any orders yet.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0a0a0a] rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-medium text-neutral-500">Order ID</th>
                  <th className="px-6 py-4 font-medium text-neutral-500">Customer</th>
                  <th className="px-6 py-4 font-medium text-neutral-500">Date</th>
                  <th className="px-6 py-4 font-medium text-neutral-500">Amount</th>
                  <th className="px-6 py-4 font-medium text-neutral-500">Status</th>
                  <th className="px-6 py-4 font-medium text-neutral-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {filtered.map((order) => (
                  <tr key={order._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-neutral-900 dark:text-white">{order.customerName || 'Guest'}</td>
                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900 dark:text-white">${order.totalAmount.toFixed(2)}</p>
                      <p className="text-xs text-neutral-500">{order.items?.length || 0} items</p>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer outline-none ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200' :
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
