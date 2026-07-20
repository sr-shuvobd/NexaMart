"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AutoRedirect() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && session?.user) {
      const role = (session.user as any).role;
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "seller") {
        router.push("/seller");
      }
    }
  }, [session, isPending, router]);

  return null;
}
