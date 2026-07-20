"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, MapPin, Check, X } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressManager() {
  const { data: session } = useSession();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Partial<Address>>({});
  
  useEffect(() => {
    if (session?.user?.id) {
      fetchAddresses();
    }
  }, [session?.user?.id]);

  const fetchAddresses = async () => {
    try {
      const res = await api.get(`/api/users/${session?.user?.id}`);
      const data = res.data;
      if (data.success && data.user.addresses) {
        setAddresses(data.user.addresses);
      }
    } catch (error) {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  const saveAddresses = async (newAddresses: Address[]) => {
    try {
      const res = await api.put(`/api/users/${session?.user?.id}/addresses`, {
        addresses: newAddresses
      });
      const data = res.data;
      if (data.success) {
        setAddresses(newAddresses);
        setIsEditing(false);
        toast.success("Addresses updated successfully");
      } else {
        toast.error("Failed to update addresses");
      }
    } catch (error) {
      toast.error("Failed to update addresses");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAddress.street || !currentAddress.city || !currentAddress.state || !currentAddress.zipCode || !currentAddress.country) {
      toast.error("Please fill all required fields");
      return;
    }

    let newAddresses = [...addresses];
    
    // If setting as default, remove default from others
    if (currentAddress.isDefault || newAddresses.length === 0) {
      newAddresses = newAddresses.map(a => ({ ...a, isDefault: false }));
      currentAddress.isDefault = true;
    }

    if (currentAddress.id) {
      // Edit existing
      newAddresses = newAddresses.map(a => a.id === currentAddress.id ? currentAddress as Address : a);
    } else {
      // Add new
      newAddresses.push({
        ...currentAddress,
        id: Math.random().toString(36).substring(2, 9)
      } as Address);
    }

    saveAddresses(newAddresses);
  };

  const deleteAddress = (id: string) => {
    const newAddresses = addresses.filter(a => a.id !== id);
    // If we deleted the default, set first remaining as default
    if (addresses.find(a => a.id === id)?.isDefault && newAddresses.length > 0) {
      newAddresses[0].isDefault = true;
    }
    saveAddresses(newAddresses);
  };

  const setDefault = (id: string) => {
    const newAddresses = addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    saveAddresses(newAddresses);
  };

  if (loading) return <div className="py-8 text-center text-neutral-500">Loading addresses...</div>;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Delivery Addresses</h3>
        {!isEditing && (
          <button 
            onClick={() => { setCurrentAddress({ isDefault: addresses.length === 0 }); setIsEditing(true); }}
            className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <Plus size={16} /> Add New Address
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-neutral-900 dark:text-white">
              {currentAddress.id ? "Edit Address" : "New Address"}
            </h4>
            <button type="button" onClick={() => setIsEditing(false)} className="text-neutral-500 hover:text-neutral-700">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Street Address</label>
              <input type="text" value={currentAddress.street || ""} onChange={e => setCurrentAddress({...currentAddress, street: e.target.value})} className="input-base" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">City</label>
                <input type="text" value={currentAddress.city || ""} onChange={e => setCurrentAddress({...currentAddress, city: e.target.value})} className="input-base" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">State / Province</label>
                <input type="text" value={currentAddress.state || ""} onChange={e => setCurrentAddress({...currentAddress, state: e.target.value})} className="input-base" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">ZIP / Postal Code</label>
                <input type="text" value={currentAddress.zipCode || ""} onChange={e => setCurrentAddress({...currentAddress, zipCode: e.target.value})} className="input-base" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Country</label>
                <input type="text" value={currentAddress.country || ""} onChange={e => setCurrentAddress({...currentAddress, country: e.target.value})} className="input-base" required />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={currentAddress.isDefault || false}
                onChange={e => setCurrentAddress({...currentAddress, isDefault: e.target.checked})}
                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                disabled={addresses.length === 0} // First address is always default
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Set as default address</span>
            </label>
          </div>
          <div className="pt-2 flex justify-end gap-3">
            <button type="button" onClick={() => setIsEditing(false)} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary">Save Address</button>
          </div>
        </form>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.length === 0 ? (
            <div className="col-span-full py-8 text-center bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700">
              <MapPin className="mx-auto h-12 w-12 text-neutral-400 mb-3" />
              <h3 className="text-sm font-medium text-neutral-900 dark:text-white">No addresses</h3>
              <p className="text-sm text-neutral-500 mt-1">Get started by adding a delivery address.</p>
            </div>
          ) : (
            addresses.map(address => (
              <div key={address.id} className={`p-4 rounded-xl border relative ${address.isDefault ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-neutral-200 dark:border-neutral-800'}`}>
                {address.isDefault && (
                  <span className="absolute top-4 right-4 text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 px-2 py-1 rounded-full flex items-center gap-1">
                    <Check size={12} /> Default
                  </span>
                )}
                <div className="mb-4 pr-20">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white mb-1">{address.street}</p>
                  <p className="text-sm text-neutral-500">{address.city}, {address.state} {address.zipCode}</p>
                  <p className="text-sm text-neutral-500">{address.country}</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <button onClick={() => { setCurrentAddress(address); setIsEditing(true); }} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1">
                    <Edit2 size={14} /> Edit
                  </button>
                  <button onClick={() => deleteAddress(address.id)} className="text-sm text-neutral-500 hover:text-red-500 flex items-center gap-1">
                    <Trash2 size={14} /> Delete
                  </button>
                  {!address.isDefault && (
                    <button onClick={() => setDefault(address.id)} className="text-sm text-primary-600 hover:text-primary-700 ml-auto">
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
