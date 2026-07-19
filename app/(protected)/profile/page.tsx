"use client";

import { useSession } from "@/lib/auth-client";
import { User } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="section-container min-h-[60vh] py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">My Profile</h1>
      <div className="max-w-2xl">
        <div className="card-base p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-3xl">
              {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={32} />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                {session?.user?.name || "Loading..."}
              </h2>
              <p className="text-neutral-500">{session?.user?.email}</p>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                {(session?.user as any)?.role || "User"} Account
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Account Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-500 mb-1">Full Name</label>
                <div className="text-neutral-900 dark:text-white">{session?.user?.name || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-500 mb-1">Email Address</label>
                <div className="text-neutral-900 dark:text-white">{session?.user?.email || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-500 mb-1">Member Since</label>
                <div className="text-neutral-900 dark:text-white">
                  {session?.user?.createdAt ? new Date(session.user.createdAt).toLocaleDateString() : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
