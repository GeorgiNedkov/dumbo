import * as functions from "firebase-functions";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { getMessages } from "./db/getMessages";

const server = express();
server.get("/some-data", (_, response: express.Response) => {
  response.send("Hello world");
});

server.get("/videoInfo/:id", async (req, res) => {
  const { id } = req.params;
  let obj = await getMessages((id + "").trim(), dbClient);
  console.log(obj);
  if (obj != undefined) {
    res.status(200).send(obj);
  } else {
    res.status(404).send({});
  }
});

server.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionsSuccessStatus: 200,
  })
);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

exports.app = functions.https.onRequest(server);
