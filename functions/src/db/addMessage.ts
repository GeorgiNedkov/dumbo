// import { InsertOneResult, MongoClient } from "mongodb";

// export async function addMessages(
//   obj: any,
//   mongoClient: MongoClient
// ): Promise<InsertOneResult<Document> | undefined> {
//   try {
//     const db = mongoClient.db("million");
//     const collection = db.collection("videos");
//     const insertedItem = await collection.insertOne(obj);
//     return insertedItem;
//   } catch (e) {}

//   return;
// }
