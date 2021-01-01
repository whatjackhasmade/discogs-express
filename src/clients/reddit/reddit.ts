"use strict";

import dotenv from "dotenv";
dotenv.config();

import Snoowrap from "snoowrap";

const envAgent = process.env.USER_AGENT;
const envClientID = process.env.CLIENT_ID;
const envClientSecret = process.env.CLIENT_SECRET;
const envUsername = process.env.USERNAME;
const envPassword = process.env.PASSWORD;

const userAgent: string = envAgent ? envAgent : "";
const clientId: string = envClientID ? envClientID : "";
const clientSecret: string = envClientSecret ? envClientSecret : "";
const username: string = envUsername ? envUsername : "";
const password: string = envPassword ? envPassword : "";

const credentials = {
	userAgent,
	clientId,
	clientSecret,
	username,
	password,
};

// Create a new snoowrap requester with OAuth credentials.
// For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper
const reddit = new Snoowrap(credentials);

export { reddit };
export default reddit;
