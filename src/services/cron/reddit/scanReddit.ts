import { createPost } from "track";
import { getWantlist } from "track";
import { getPosts } from "track";

import { logger } from "track";

import { reddit } from "track";

import { isMatch } from "track";

declare type RedditPost = {
	permalink: string;
	title: string;
};

const formatMatches = (item: RedditPost) => {
	const permalink: string = item.permalink;
	const link: string = "https://reddit.com" + permalink;
	const title: string = item.title;

	const detail = {
		link,
		title,
	};
	return detail;
};

export const scanReddit = async (): Promise<any[]> => {
	const wishlist: any[] = await getWantlist();
	const hasWishlist = wishlist.length > 0;

	if (!hasWishlist) {
		logger.error("No watchlist set");
		return;
	}

	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const subreddit = await reddit.getSubreddit("VinylReleases");
		const posts: RedditPost[] = await subreddit.getNew({ limit: 100 });

		const matches = posts.filter((post) => {
			const title = post.title;
			const match = isMatch(wishlist, title);
			return match;
		});

		const hasMatches = matches.length > 0;
		if (!hasMatches) console.log("No matches found");
		if (!hasMatches) return;

		const details = matches.map(formatMatches);

		const hasDetails = details.length > 0;
		if (!hasDetails) return;

		// Get the existing posts in our Database
		const existing = await getPosts();

		const notRecorded = details.filter((item) => {
			const link = item.link;

			const match: boolean = existing.some((record) => {
				const matchDatabase: boolean = record.link === link;
				return matchDatabase;
			});

			return !match;
		});

		const hasNewPosts: boolean = notRecorded?.length > 0;
		if (!hasNewPosts) console.log("No new matches found");
		if (!hasNewPosts) return;

		notRecorded.forEach(async (record) => {
			const { link } = record;
			const { title } = record;

			logger.info(`Matched: ${title} at ${link}`);

			await createPost(record);
		});
	} catch (error) {
		console.error(error);
	}
};
