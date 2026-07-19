"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Package, RefreshCw } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "react-toastify";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/products");
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch {
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await api.delete(`/api/products/${id}`);
      if (res.data.success) {
        setProducts(products.filter((p) => p._id !== id));
        toast.success("Product deleted successfully.");
      }
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Products</h1>
          <p className="text-sm text-neutral-500">Manage all store inventory and products.</p>
        </div>
      </div>

      {/* ── Filters & Search ── */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#0a0a0a] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto bg-neutral-100 dark:bg-neutral-900 rounded-lg px-3 py-2 border border-transparent focus-within:border-neutral-300 dark:focus-within:border-neutral-700 transition-all">
          <Search size={16} className="text-neutral-400" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..." 
            className="bg-transparent border-none outline-none text-sm text-neutral-900 dark:text-white placeholder-neutral-500 w-full sm:w-64"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="btn-outline !py-2 !px-3 w-full sm:w-auto flex items-center justify-center gap-2 text-sm">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* ── Products Table ── */}
      {loading ? (
        <div className="card-base p-16 flex flex-col items-center justify-center text-center">
          <RefreshCw size={28} className="animate-spin text-primary-500 mb-4" />
          <p className="text-neutral-500">Loading products...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-base p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4">
            <Package size={28} className="text-neutral-300 dark:text-neutral-700" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">No products found</h2>
          <p className="text-neutral-500 max-w-sm mb-6">No products match your search criteria or the store is empty.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0a0a0a] rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-medium text-neutral-500">Product</th>
                  <th className="px-6 py-4 font-medium text-neutral-500">Category</th>
                  <th className="px-6 py-4 font-medium text-neutral-500">Price</th>
                  <th className="px-6 py-4 font-medium text-neutral-500">Stock</th>
                  <th className="px-6 py-4 font-medium text-neutral-500">Status</th>
                  <th className="px-6 py-4 font-medium text-neutral-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {filtered.map((product) => (
                  <tr key={product._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">{product.name}</p>
                          <p className="text-xs text-neutral-500">{product._id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300 capitalize">{product.category}</td>
                    <td className="px-6 py-4 text-neutral-900 dark:text-white font-medium">${product.price}</td>
                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        product.status === 'Draft' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-neutral-400 hover:text-blue-500 transition-colors" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors" 
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
