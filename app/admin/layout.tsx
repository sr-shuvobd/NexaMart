import type { Metadata } from "next";
import AdminNavigation from "@/components/admin/AdminNavigation";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard | NexaMart",
  description: "NexaMart Admin Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: headers() });

  if (!session?.user || (session.user as any).role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen flex">
      <AdminNavigation />

      {/* ── Main Content Wrapper ── */}
      <div className="flex-1 lg:ml-64 pt-16 flex flex-col min-h-screen">
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
