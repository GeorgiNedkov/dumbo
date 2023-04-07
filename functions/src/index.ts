import * as functions from "firebase-functions";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { getMessages } from "./db/getMessages";
import { config } from "dotenv";
// import { addMessages } from "./db/addMessage";
import { prisma } from "./db/prismaClient";

config();
const server = express();
server.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionsSuccessStatus: 200,
  })
);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/some-data", (_, response: express.Response) => {
  response.send({ msg: "Hello world" });
});

server.get("/", (_, response: express.Response) => {
  response.send({ msg: "Hello world" });
});

server.post("/notify", async (req, res: express.Response) => {
  const { location, renderId } = req.body;
  console.log(location, renderId);

  if (location == undefined || renderId == undefined) {
    res.status(404).send({ msg: "fail" });
    return;
  }

  await prisma.render.update({
    where: {
      id: renderId,
    },
    data: {
      isReady: true,
      url: location,
    },
  });

  res.status(200).send({ msg: "success" });
  return;
});

server.get("/video/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let obj = await getMessages((id + "").trim(), prisma);
    if (obj != undefined) {
      res.status(200).send(obj);
    } else {
      res.status(404).send({});
    }
  } catch (e) {
    res.send(e);
  }
});

server.get("/renders/:id", async (req, res) => {
  const { id } = req.params;
  const renders = await prisma.render.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      messagingVideoId: true,
    },
  });

  res.status(200).send({ data: renders });
});

// ("clg2m4t7b00b7bu9b0einnxnm");

// server.post("/createVideo", async (req, res) => {
//   const { type, videoInfo } = req.body;

//   addMessages({ type, videoInfo }, dbClient).then((item) => {
//     if (item == undefined) {
//       res.status(403).send({
//         message: `failed`,
//       });

//       return;
//     }
//     res.status(200).send({
//       message: `Saved`,
//       id: item?.insertedId,
//     });
//   });
// });

exports.app = functions.https.onRequest(server);
