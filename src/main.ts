import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
import http from "http";
dotenv.config();

// Common
import { app } from "track";
import { connect } from "track";
import { logger } from "track";

// Database models
import { PostModel } from "track";
import { RecordModel } from "track";

// Services - Client functions
import { getAlbumBandcamp } from "track";
import { getArtistBandcamp } from "track";

// Services - CRON
import { scanBandcamp } from "track";
import { scanReddit } from "track";
import { updateWantlist } from "track";

// Type definitions
import type { Request, Response } from "express";
import type { IPost } from "track";
import type { IRecord } from "track";

const PORT: number = Number(process.env.PORT) || 5000;
const env = process.env.NODE_ENV || "dev";
const startMessage = `${env} server up listening on http://localhost:${PORT}`;

const server = http.createServer(app);

const auth: any[] = [process.env.URL_FRONTEND, process.env.URL_LOCAL];

const corsConfig = {
  credentials: true,
  origin: auth,
};

// Open our connection to MongoDB
connect();

app.use(cors(corsConfig));

app.get("/", async (req: Request, res: Response) => {
  await connect();

  const data: IPost[] = await PostModel.find({});

  res.json({ data });
});

app.get("/album/:bandcampAlbumURL", async (req: Request, res: Response) => {
  const url: string = req.params.bandcampAlbumURL;

  try {
    const data = await getAlbumBandcamp(url);

    res.json({ data });
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.json({ error });
  }
});

app.get("/artist/:bandcampArtistURL", async (req: Request, res: Response) => {
  const url: string = req.params.bandcampArtistURL;

  try {
    const albums = await getArtistBandcamp(url);

    const data = {
      artist: url,
      albums,
    };

    res.json({ data });
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.json({ error });
  }
});

app.get("/posts", async (req: Request, res: Response) => {
  await connect();

  const data: IPost[] = await PostModel.find({});

  res.json({ data });
});

app.get("/wantlist", async (req: Request, res: Response) => {
  await connect();

  const data: IRecord[] = await RecordModel.find({});

  res.json({ data });
});

app.post("/wantlist", async (req: Request, res: Response) => {
  const data = await updateWantlist();
  res.json({ data });
});

server.listen(PORT);

server.on("listening", () => {
  logger.info(startMessage);

  // Run every 15 seconds
  cron.schedule("*/15 * * * * *", async () => {
    await scanReddit();
  });

  // Run every minute
  cron.schedule("*/1 * * * *", async () => {
    await scanBandcamp();
  });

  // Run every day
  // cron.schedule("* * * */1 * *", async () => {
  // await updateWantlist();
  // });
});
