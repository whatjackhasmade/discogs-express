import dotenv from "dotenv";
dotenv.config();

import connect from "./connect";
import logger from "../startup/logger";

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const createWantlist = async (args: any) => {
	const itemWithTimestamp = {
		...args,
		updatedAt: new Date().toISOString(),
	};

	try {
		const db = await connect();

		// Select the "wantlist" collection from the database
		const collection = await db.collection("wantlist");
		const newItem = await collection.updateOne(
			itemWithTimestamp,
			{ $setOnInsert: itemWithTimestamp },
			{ upsert: true }
		);

		const message = "Created wantlist item: " + itemWithTimestamp.title;
		console.log(message);

		return newItem;
	} catch (error) {
		logger.error(error.message);
	}
};

export { createWantlist };
export default createWantlist;
