import http from "http";
import cron from "node-cron";

import { Request, Response } from "express";

import { app } from "./app";
import { getPosts } from "./db";
import { getWantlist } from "./db";
import { scanReddit } from "./services";
import { updateWantlist } from "./services";
import winstonLogger from "./startup/logger";

const PORT: number = Number(process.env.PORT) || 5000;
const env = process.env.NODE_ENV || "dev";
const startMessage = `${env} server up listening on http://localhost:${PORT}`;

const server = http.createServer(app);

app.get("/", (req: Request, res: Response) => {
	res.json({ greet: "hello" });
});

app.get("/posts", async (req: Request, res: Response) => {
	const data = await getPosts();
	res.json({ data });
});

app.get("/wantlist", async (req: Request, res: Response) => {
	const data = await getWantlist();
	res.json({ data });
});

server.listen(PORT);

server.on("listening", () => {
	winstonLogger.info(startMessage);

	// Run every 15 seconds
	cron.schedule("*/15 * * * * *", () => {
		scanReddit();
	});

	// Run every day
	// cron.schedule("* * * */1 * *", () => {
	// 	updateWantlist();
	// });
});
