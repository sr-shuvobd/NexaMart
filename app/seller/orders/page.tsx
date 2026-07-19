"use client";

import { useState } from "react";
import { Search, Eye } from "lucide-react";

const initialOrders = [
  { id: "ORD-9382", customer: "Jackson Lee", date: "Oct 24, 2026", amount: "$39.00", status: "Pending", items: 1 },
  { id: "ORD-9384", customer: "William Kim", date: "Oct 22, 2026", amount: "$99.00", status: "Processing", items: 1 },
];

export default function SellerOrdersPage() {
  const [orders] = useState(initialOrders);

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
            placeholder="Search orders..." 
            className="bg-transparent border-none outline-none text-sm text-neutral-900 dark:text-white placeholder-neutral-500 w-full sm:w-64"
          />
        </div>
      </div>

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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">{order.id}</td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-white">{order.customer}</td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">{order.date}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-neutral-900 dark:text-white">{order.amount}</p>
                    <p className="text-xs text-neutral-500">{order.items} items</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {order.status}
                    </span>
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
    </div>
  );
}
