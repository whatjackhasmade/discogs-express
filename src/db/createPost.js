require("dotenv").config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const from = process.env.TWILIO_FROM;
const to = process.env.TWILIO_TO;
const client = require("twilio")(accountSid, authToken);
const connect = require("./connect");
const logger = require("../log");

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const createPost = async (args) => {
	let response = "";

	try {
		const db = await connect();

		// Select the "posts" collection from the database
		const newItem = await db.collection("posts").insertOne(args);

		const textBody = `${args.title} - ${args.link}`;

		const textArgs = { body: textBody, from, to };
		const message = await client.messages.create(textArgs);

		const body = message.body;

		logger.log({ message: body, level: "info" });

		response = newItem;
	} catch (error) {
		console.error(error);
		response = error.message;
	}

	return response;
};

module.exports = createPost;
