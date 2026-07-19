"use client";

import { useState } from "react";
import { Save, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import { useEffect } from "react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("NexaMart BD");
  const [storeEmail, setStoreEmail] = useState("support@nexamart.com");
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get("/api/settings").then(res => {
      if (res.data.success && res.data.settings) {
        setStoreName(res.data.settings.storeName);
        setStoreEmail(res.data.settings.storeEmail);
        setCurrency(res.data.settings.currency);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put("/api/settings", { storeName, storeEmail, currency });
      if (res.data.success) {
        toast.success("Settings saved successfully!");
      }
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Settings</h1>
        <p className="text-sm text-neutral-500">Configure platform settings, payment gateways, and system parameters.</p>
      </div>

      <div className="card-base p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white">General Information</h2>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Store Name</label>
              <input 
                type="text" 
                value={storeName} 
                onChange={(e) => setStoreName(e.target.value)}
                className="input-base"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">System Support Email</label>
              <input 
                type="email" 
                value={storeEmail} 
                onChange={(e) => setStoreEmail(e.target.value)}
                className="input-base"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Default Currency</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="input-base cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="BDT">BDT (৳)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary py-2 px-4 flex items-center gap-2"
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
