"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Users, ShoppingBag, DollarSign, MoreHorizontal, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
  { name: 'Aug', revenue: 4000 },
  { name: 'Sep', revenue: 3000 },
  { name: 'Oct', revenue: 2000 },
  { name: 'Nov', revenue: 2780 },
  { name: 'Dec', revenue: 3890 },
];

export default function AdminDashboardPage() {
  const [timeframe, setTimeframe] = useState("7d");
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/stats/admin")
      .then(res => {
        if (res.data.success) {
          setStats(res.data.stats);
          setRecentOrders(res.data.recentOrders);
        }
      })
      .catch(() => toast.error("Failed to load dashboard stats"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-sm text-neutral-500">
            Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}! Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
            className="input-base !py-2 !w-auto cursor-pointer"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="1y">Last 1 Year</option>
          </select>
          <button className="btn-primary-green !py-2">Download Report</button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <RefreshCw size={28} className="animate-spin text-primary-500" />
        </div>
      ) : (
        <>
          {/* ── Stats Grid ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="card-base p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-neutral-500">Total Revenue</span>
                <DollarSign size={16} className="text-neutral-400" />
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">${stats?.totalRevenue?.toFixed(2) || '0.00'}</h3>
                <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                  <ArrowUpRight size={14} /> Live
                </div>
              </div>
            </div>

            <div className="card-base p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-neutral-500">Orders</span>
                <ShoppingBag size={16} className="text-neutral-400" />
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{stats?.totalOrders || 0}</h3>
                <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                  <ArrowUpRight size={14} /> Live
                </div>
              </div>
            </div>

            <div className="card-base p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-neutral-500">Pending Orders</span>
                <TrendingUp size={16} className="text-neutral-400" />
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{stats?.pendingOrders || 0}</h3>
              </div>
            </div>

            <div className="card-base p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-neutral-500">Total Products</span>
                <Users size={16} className="text-neutral-400" />
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{stats?.totalProducts || 0}</h3>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* ── Chart Placeholder ── */}
            <div className="lg:col-span-2 card-base p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Revenue Overview</h2>
                <button className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div className="flex-1 w-full h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dx={-10} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#10b981' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ── Recent Sales ── */}
            <div className="card-base p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Recent Sales</h2>
                <Link href="/admin/orders" className="text-sm text-primary-500 font-medium hover:text-primary-600">View all</Link>
              </div>
              <div className="space-y-6">
                {recentOrders.length === 0 ? (
                  <div className="text-center py-6 text-neutral-500">No recent sales.</div>
                ) : recentOrders.map((order: any, i) => (
                  <div key={order._id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-sm font-bold text-neutral-600 dark:text-neutral-300">
                      {order.customerName ? order.customerName.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{order.customerName || 'Guest User'}</p>
                      <p className="text-xs text-neutral-500 truncate">{order.orderNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">${order.totalAmount.toFixed(2)}</p>
                      <p className={`text-[10px] font-medium px-2 py-0.5 rounded-full inline-block mt-1 ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        order.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
