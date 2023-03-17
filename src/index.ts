import express from "express";
import { MongoClient } from "mongodb";
import { connectToCluster, getMessages } from "./db/getMessages";

const port = 8080;
let dbClient!: MongoClient;
const app = express();

if (process.env.DB_URI) {
  dbClient = await connectToCluster(process.env.DB_URI);
}

app.listen(port, () => {
  console.log(`hello world on port: ${port}`);
});
