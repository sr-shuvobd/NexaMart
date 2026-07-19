"use client";

import { useState, useEffect } from "react";
import { Search, Shield, User, UserMinus, ShieldAlert, RefreshCw } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "react-toastify";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/users");
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch {
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserRole = async (id: string, currentRole: string) => {
    const nextRole = currentRole === "user" ? "seller" : currentRole === "seller" ? "admin" : "user";
    try {
      const res = await api.put(`/api/users/${id}/role`, { role: nextRole });
      if (res.data.success) {
        setUsers(users.map(u => u._id === id ? { ...u, role: nextRole } : u));
        toast.success(`User role updated to ${nextRole}`);
      }
    } catch {
      toast.error("Failed to update role");
    }
  };

  const toggleUserStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    try {
      const res = await api.put(`/api/users/${id}/status`, { status: nextStatus });
      if (res.data.success) {
        setUsers(users.map(u => u._id === id ? { ...u, status: nextStatus } : u));
        toast.success(`User status updated to ${nextStatus}`);
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Manage Users</h1>
        <p className="text-sm text-neutral-500">View and manage all registered users, sellers, and administrators.</p>
      </div>

      <div className="flex bg-white dark:bg-[#0a0a0a] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto bg-neutral-100 dark:bg-neutral-900 rounded-lg px-3 py-2 border border-transparent focus-within:border-neutral-300 dark:focus-within:border-neutral-700 transition-all">
          <Search size={16} className="text-neutral-400" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..." 
            className="bg-transparent border-none outline-none text-sm text-neutral-900 dark:text-white placeholder-neutral-500 w-full sm:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="card-base p-16 flex flex-col items-center justify-center text-center">
          <RefreshCw size={28} className="animate-spin text-primary-500 mb-4" />
          <p className="text-neutral-500">Loading users...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-base p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4">
            <User size={28} className="text-neutral-300 dark:text-neutral-700" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">No users found</h2>
          <p className="text-neutral-500 max-w-sm mb-6">No users match your search criteria.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0a0a0a] rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-medium text-neutral-500">User</th>
                  <th className="px-6 py-4 font-medium text-neutral-500">Role</th>
                  <th className="px-6 py-4 font-medium text-neutral-500">Joined Date</th>
                  <th className="px-6 py-4 font-medium text-neutral-500">Status</th>
                  <th className="px-6 py-4 font-medium text-neutral-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {filtered.map((user) => (
                  <tr key={user._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-neutral-500">{user.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                        user.role === 'admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        user.role === 'seller' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' :
                        'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                      }`}>
                        {user.role === 'admin' && <Shield size={12} />}
                        {user.role === 'seller' && <User size={12} />}
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 dark:text-neutral-300">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Active' || !user.status ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {user.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.email !== 'srs@gmail.com' ? (
                          <button 
                            onClick={() => toggleUserRole(user._id, user.role || 'user')}
                            className="p-1.5 text-neutral-400 hover:text-primary-500 transition-colors" 
                            title="Change Role"
                          >
                            <ShieldAlert size={16} />
                          </button>
                        ) : (
                          <div className="p-1.5 text-neutral-300 dark:text-neutral-700 cursor-not-allowed" title="Permanent Admin">
                            <Shield size={16} />
                          </div>
                        )}
                        
                        {user.email !== 'srs@gmail.com' ? (
                          <button 
                            onClick={() => toggleUserStatus(user._id, user.status || 'Active')}
                            className={`p-1.5 transition-colors ${
                              user.status === 'Suspended' ? 'text-green-500 hover:text-green-600' : 'text-neutral-400 hover:text-red-500'
                            }`}
                            title="Suspend / Activate"
                          >
                            <UserMinus size={16} />
                          </button>
                        ) : (
                          <div className="p-1.5 text-neutral-300 dark:text-neutral-700 cursor-not-allowed" title="Permanent Admin">
                            <User size={16} />
                          </div>
                        )}
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
