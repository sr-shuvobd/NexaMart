"use client";

import { useSession } from "@/lib/auth-client";
import { Package, ShoppingBag, DollarSign, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function SellerDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Seller Dashboard</h1>
          <p className="text-sm text-neutral-500">
            Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}! Here's how your store is doing.
          </p>
        </div>
        <Link href="/seller/add-product" className="btn-primary py-2 px-4">Add New Product</Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">Total Sales</span>
            <DollarSign size={16} className="text-neutral-400" />
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">$0.00</h3>
            <div className="flex items-center gap-1 text-sm font-medium text-neutral-500">
              <ArrowUpRight size={14} /> 0%
            </div>
          </div>
        </div>

        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">Active Products</span>
            <Package size={16} className="text-neutral-400" />
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">0</h3>
          </div>
        </div>

        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">Pending Orders</span>
            <ShoppingBag size={16} className="text-neutral-400" />
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">0</h3>
          </div>
        </div>
      </div>

      <div className="card-base p-6">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-6">Recent Orders</h2>
        <div className="text-center py-12 text-neutral-500">
          You don't have any recent orders.
        </div>
      </div>
    </div>
  );
}
