import { InsertOneWriteOpResult } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const from = process.env.TWILIO_FROM;
const to = process.env.TWILIO_TO;

import * as twilio from "twilio";
import * as TwilioClient from "twilio/lib/rest/Twilio";
const client: TwilioClient = twilio.default(accountSid, authToken);

import connect from "./connect";
import logger from "../startup/logger";

const environment = process.env.NODE_ENV;
const isProduction = environment === "production";

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const createPost = async (args: any) => {
	let response: string | InsertOneWriteOpResult<any> = "";

	const itemWithTimestamp = {
		...args,
		updatedAt: new Date().toISOString,
	};

	try {
		const db = await connect();

		// Select the "posts" collection from the database
		const newItem = await db.collection("posts").insertOne(itemWithTimestamp);

		const textBody = `${itemWithTimestamp.title} - ${itemWithTimestamp.link}`;

		let body = textBody;

		if (isProduction) {
			const textArgs = { body: textBody, from, to };
			const message = await client.messages.create(textArgs);

			body = message.body;
		}

		logger.info(body);

		response = newItem;
	} catch (error) {
		logger.error(error.message);
		response = error.message;
	}

	return response;
};

export { createPost };
export default createPost;
