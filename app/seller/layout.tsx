import type { Metadata } from "next";
import SellerNavigation from "@/components/seller/SellerNavigation";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Seller Dashboard | NexaMart",
  description: "NexaMart Seller Dashboard",
};

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: headers() });
  
  if (!session?.user || (session.user as any).role !== "seller") {
    redirect("/login");
  }

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen flex">
      <SellerNavigation />

      {/* ── Main Content Wrapper ── */}
      <div className="flex-1 lg:ml-64 pt-16 flex flex-col min-h-screen">
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
