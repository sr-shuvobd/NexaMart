"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { Package, ShoppingBag, DollarSign, ArrowUpRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";

export default function SellerDashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ totalProducts: 0, activeProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      api.get(`/api/stats/seller/${session.user.id}`)
        .then(res => {
          if (res.data.success) setStats(res.data.stats);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [session]);

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

      {loading ? (
        <div className="flex justify-center py-12">
          <RefreshCw size={28} className="animate-spin text-primary-500" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-neutral-500">Total Revenue</span>
              <DollarSign size={16} className="text-neutral-400" />
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">${stats.totalRevenue.toFixed(2)}</h3>
              <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                <ArrowUpRight size={14} /> Live
              </div>
            </div>
          </div>

          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-neutral-500">Active Products</span>
              <Package size={16} className="text-neutral-400" />
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.activeProducts}</h3>
              <span className="text-xs text-neutral-400">{stats.totalProducts} total</span>
            </div>
          </div>

          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-neutral-500">Total Orders</span>
              <ShoppingBag size={16} className="text-neutral-400" />
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.totalOrders}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="card-base p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Quick Actions</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/seller/add-product" className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group">
            <Package size={20} className="text-primary-500 mb-2" />
            <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors">Add New Product</h3>
            <p className="text-xs text-neutral-500 mt-1">List a new product in the store.</p>
          </Link>
          <Link href="/seller/products" className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group">
            <ShoppingBag size={20} className="text-primary-500 mb-2" />
            <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors">View My Products</h3>
            <p className="text-xs text-neutral-500 mt-1">Manage your existing inventory.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
