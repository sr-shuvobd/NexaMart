"use client";

import { useSession } from "@/lib/auth-client";

export default function DebugClient() {
  const { data: session } = useSession();

  return (
    <pre>
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}
