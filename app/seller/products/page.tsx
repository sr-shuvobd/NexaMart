"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const initialProducts = [
  { id: "PRD-501", name: "Wireless Charging Pad", category: "Electronics", price: "$29.99", stock: 80, status: "Active" },
  { id: "PRD-502", name: "Ergonomic Office Chair", category: "Home", price: "$199.99", stock: 15, status: "Active" },
  { id: "PRD-503", name: "Bluetooth Sports Earbuds", category: "Electronics", price: "$49.99", stock: 0, status: "Out of Stock" },
];

export default function SellerProductsPage() {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">My Products</h1>
          <p className="text-sm text-neutral-500">Manage and update products listed on NexaMart.</p>
        </div>
        <Link href="/seller/add-product" className="btn-primary py-2 px-4 flex items-center gap-2">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="flex bg-white dark:bg-[#0a0a0a] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto bg-neutral-100 dark:bg-neutral-900 rounded-lg px-3 py-2 border border-transparent focus-within:border-neutral-300 dark:focus-within:border-neutral-700 transition-all">
          <Search size={16} className="text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search my products..." 
            className="bg-transparent border-none outline-none text-sm text-neutral-900 dark:text-white placeholder-neutral-500 w-full sm:w-64"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-medium text-neutral-500">Product Name</th>
                <th className="px-6 py-4 font-medium text-neutral-500">Category</th>
                <th className="px-6 py-4 font-medium text-neutral-500">Price</th>
                <th className="px-6 py-4 font-medium text-neutral-500">Stock</th>
                <th className="px-6 py-4 font-medium text-neutral-500">Status</th>
                <th className="px-6 py-4 font-medium text-neutral-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-neutral-900 dark:text-white">{product.name}</p>
                    <p className="text-xs text-neutral-500">{product.id}</p>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">{product.category}</td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-white font-medium">{product.price}</td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
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
                        onClick={() => handleDelete(product.id)}
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
    </div>
  );
}
