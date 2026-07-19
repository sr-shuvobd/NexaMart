"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

export default function SellerSettingsPage() {
  const { data: session } = useSession();
  const [storeName, setStoreName] = useState("My Store");
  const [storeDesc, setStoreDesc] = useState("Best quality goods online.");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const u = session.user as any;
      if (u.storeName) {
        setStoreName(u.storeName);
      }
    }
  }, [session]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Store settings updated successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Store Settings</h1>
        <p className="text-sm text-neutral-500">Configure your seller profile and store description.</p>
      </div>

      <div className="card-base p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Store Profile</h2>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Store Display Name</label>
              <input 
                type="text" 
                value={storeName} 
                onChange={(e) => setStoreName(e.target.value)}
                className="input-base"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Store Description</label>
              <textarea 
                rows={4}
                value={storeDesc} 
                onChange={(e) => setStoreDesc(e.target.value)}
                className="input-base resize-none !py-3"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary py-2 px-4 flex items-center gap-2"
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
