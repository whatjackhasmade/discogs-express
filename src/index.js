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

const formatMatches = (item) => {
	const permalink = item.permalink;
	const link = "https://reddit.com" + permalink;
	const title = item.title;

	const detail = {
		link,
		title,
	};
	return detail;
};

function hasOnlySpecialCharater(val) {
	var pattern = /^[^a-zA-Z0-9]+$/;
	return pattern.test(val);
}

function isShort(val) {
	return val.length < 4;
}

const regexSplit = /(?:,| )+/;

const isMatch = (array, text) => {
	if (!array) return false;
	if (!text) return false;

	const lowerText = text.toLowerCase();

	const match = array.some((item) => {
		if (!item) return false;

		let artists = item.artists.toLowerCase().split(regexSplit);
		let labels = item.labels.toLowerCase().split(regexSplit);
		let title = item.title.toLowerCase().split(regexSplit);

		artists = artists.filter((a) => !hasOnlySpecialCharater(a));
		labels = labels.filter((l) => !hasOnlySpecialCharater(l));
		title = title.filter((t) => !hasOnlySpecialCharater(t));

		artists = artists.filter((a) => !isShort(a));
		labels = labels
			.filter((l) => !isShort(l))
			.filter((l) => l !== "recordings");
		title = title.filter((t) => !isShort(t));

		const matchArtists = artists.some((a) => a.includes(lowerText));
		const matchLabels = labels.some((l) => l.includes(lowerText));
		const matchTitle = title.some((t) => t.includes(lowerText));
		const matchWantlist = matchArtists || matchLabels || matchTitle;

		return matchWantlist;
	});

	return match;
};

const scanReddit = async () => {
	const wishlist = await getWantlist();
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
			const match = isMatch(wishlist, title);
			return match;
		});

		const hasMatches = matches.length > 0;
		if (!hasMatches) return;

		logger.log({
			message: `Matches: ${JSON.stringify(matches, null, 4)}`,
			level: "error",
		});

		const details = matches.map(formatMatches);

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
