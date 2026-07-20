const { MongoClient } = require("mongodb");
const uri = "mongodb://nexamart:NDfAh666RQedcCUu@ac-huolmtg-shard-00-00.2dquivk.mongodb.net:27017,ac-huolmtg-shard-00-01.2dquivk.mongodb.net:27017,ac-huolmtg-shard-00-02.2dquivk.mongodb.net:27017/nexamart?ssl=true&replicaSet=atlas-1jm0nn-shard-0&authSource=admin&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const db = client.db();
  const session = await db.collection("session").findOne({ userId: "6a5ccf5f58228748ea864a0e" });
  console.log("Session:", session);
  const user = await db.collection("user").findOne({ _id: session.userId });
  console.log("User by session userId:", user);
  process.exit(0);
}
run();
