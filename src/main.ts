import http from "http";
import cron from "node-cron";

import { Request, Response } from "express";

import { app } from "./app";
import { scanReddit } from "./services";
import { updateWantlist } from "./services";
import winstonLogger from "./startup/logger";

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
	res.json({ greet: "hello" });
});

server.listen(PORT);

const env = process.env.NODE_ENV || "dev";
const startMessage = `${env} server up listening on PORT ${PORT}`;

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
