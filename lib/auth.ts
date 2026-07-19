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
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
    },
  },
  trustedOrigins: [
    "http://localhost:3001",
    "http://localhost:3000",
  ],
});
