"use strict";
require("dotenv").config();
const Snoowrap = require("snoowrap");

const credentials = {
	userAgent: process.env.USER_AGENT,
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
};

// Create a new snoowrap requester with OAuth credentials.
// For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper
const reddit = new Snoowrap(credentials);

module.exports = reddit;
