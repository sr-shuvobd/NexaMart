import { auth } from "./lib/auth";

async function createAdmin() {
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: "srs@gmail.com",
        password: "S1234567",
        name: "SRS Admin",
      },
    });
    console.log("Created admin user:", user);
  } catch (error: any) {
    console.error("Error creating admin (might exist):", error.message);
  }

  // Then ensure role is admin directly via MongoDB
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(process.env.MONGO_DB_URL!);
  await client.connect();
  const db = client.db();
  await db.collection("user").updateOne(
    { email: "srs@gmail.com" },
    { $set: { role: "admin" } }
  );
  console.log("Ensured srs@gmail.com is admin.");
  process.exit(0);
}

createAdmin();
