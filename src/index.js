require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const cron = require("node-cron");
const fetch = require("node-fetch");

const app = express();

const logger = require("./log");
const createPost = require("./db/createPost");
const getPosts = require("./db/getPosts");
const reddit = require("./reddit");

const createWantlist = require("./db/createWantlist");
const getWantlist = require("./db/getWantlist");
const queryDiscogs = require("./discogs/queryDiscogs");

const scanReddit = async () => {
	const wantlist = await getWantlist();

	const wishlist = wantlist.map((item) => item.title);
	const hasWishlist = wishlist.length > 0;

	if (!hasWishlist) {
		logger.log({ message: "No watchlist set", level: "error" });
		return;
	}

	try {
		const subreddit = await reddit.getSubreddit("VinylReleases");
		const posts = await subreddit.getNew({ limit: 100 });

		const matches = posts.filter((post) => {
			const title = post.title;
			const lowerTitle = title.toLowerCase();
			const match = wishlist.some((item) => {
				const wishlistTitle = item.toLowerCase();
				const matchWishlist = lowerTitle.includes(wishlistTitle);
				return matchWishlist;
			});
			return match;
		});

		const hasMatches = matches.length > 0;
		if (!hasMatches) return;

		const details = matches.map((item) => {
			const permalink = item.permalink;
			const link = "https://reddit.com" + permalink;
			const title = item.title;

			const detail = {
				link,
				title,
			};
			return detail;
		});

		const hasDetails = details.length > 0;
		if (!hasDetails) return;

		// Get the existing posts in our Database
		const existing = await getPosts();

		const notRecorded = details.filter((item) => {
			const link = item.link;

			const match = existing.some((record) => {
				const matchDatabase = record.link === link;
				return matchDatabase;
			});

			return !match;
		});

		const hasNewPosts = notRecorded && notRecorded.length > 0;
		if (!hasNewPosts) return;

		notRecorded.forEach(async (record) => {
			const { title } = record;

			const message = `Creating record in database ${title};`;
			logger.log({ message, level: "info" });

			await createPost(record);
		});
	} catch (error) {
		console.error(error);
	}
};

const updateWantlist = async () => {
	const apiWantlist = await queryDiscogs();

	apiWantlist.forEach((item) => {
		createWantlist(item);
	});
};

app.listen(port, () => {
	const message = `Discogs Express: listening at http://localhost:${port}`;
	logger.log({ message, level: "info" });

	// Run every 15 seconds
	cron.schedule("*/15 * * * * *", () => {
		scanReddit();
	});

	// Run every day
	cron.schedule("* * */1 * *", () => {
		updateWantlist();
	});
});

app.get("/updateWantlist", async (req, res) => {
	// Get the existing posts in our Database
	await updateWantlist();
	const data = { message: "Running wantlist CRON" };

	res.status(200).json({ data });
});

app.get("/", async (req, res) => {
	// Get the existing posts in our Database
	const existing = await getPosts();
	const data = existing;

	res.status(200).json({ data });
});

module.exports = app;
