import { MongoClient, ObjectId } from "mongodb";
import { config } from "dotenv";

export async function connectToCluster(uri: string) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

export async function getMessages(
  msgID: string,
  mongoClient: MongoClient
): Promise<any> {
  config();
  let massages;
  if (process.env.DB_URI && ObjectId.isValid(msgID)) {
    try {
      const db = mongoClient.db("million");
      const collection = db.collection("videos");
      massages = await collection.findOne({
        _id: new ObjectId(msgID),
      });
    } finally {
      await mongoClient.close();
    }
  }

  return massages?.messages;
}
