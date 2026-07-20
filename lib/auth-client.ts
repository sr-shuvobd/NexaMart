import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
      storeName: {
        type: "string",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
    },
  },
});

export const { signIn, signUp, useSession, signOut } = authClient;
