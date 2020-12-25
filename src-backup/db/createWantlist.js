require("dotenv").config();
const connect = require("./connect");
const logger = require("../log");

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const createWantlist = async (args) => {
	let response = "";

	try {
		const db = await connect();

		// Select the "wantlist" collection from the database
		const newItem = await db
			.collection("wantlist")
			.updateOne(args, { $setOnInsert: args }, { upsert: true });

		const message = "Created wantlist item: " + args.title;
		logger.log({ message, level: "info" });

		response = newItem;
	} catch (error) {
		console.error(error);
		response = error.message;
	}

	return response;
};

export default createWantlist;
