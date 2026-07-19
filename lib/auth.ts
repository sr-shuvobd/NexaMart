import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URL!;
const mongoClient = new MongoClient(uri);

export const auth = betterAuth({
  database: mongodbAdapter(mongoClient.db()),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
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
  trustedOrigins: [
    "http://localhost:3001",
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL || "",
    process.env.BETTER_AUTH_URL || "",
  ].filter(Boolean),
});
