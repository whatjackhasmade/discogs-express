import { UpdateWriteOpResult } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

import connect from "./connect";
import logger from "../startup/logger";

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const createWantlist = async (args: any) => {
	let response: string | UpdateWriteOpResult = "";

	try {
		const db = await connect();

		// Select the "wantlist" collection from the database
		const newItem = await db
			.collection("wantlist")
			.updateOne(args, { $setOnInsert: args }, { upsert: true });

		const message = "Created wantlist item: " + args.title;
		logger.info(message);

		response = newItem;
	} catch (error) {
		logger.error(error.message);
		response = error.message;
	}

	return response;
};

export { createWantlist };
export default createWantlist;
