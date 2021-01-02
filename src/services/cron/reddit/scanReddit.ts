// Common
import { connect } from "track";
import { logger } from "track";

// Database models
import { PostModel } from "track";
import { RecordModel } from "track";

// Helpers
import { isMatch } from "track";

// Services
import { latestFromSubreddit } from "track";

// Type definitions
import type { IPost } from "track";
import type { IRecord } from "track";

// Local functions
import { formatMatches } from "./formatMatches";

export const scanReddit = async (): Promise<any> => {
  await connect();

  const wishlist: IRecord[] = await RecordModel.find({});
  const hasWishlist: boolean = wishlist.length > 0;

  if (!hasWishlist) {
    logger.error("No wishlist set");
    return;
  }

  try {
    const posts = await latestFromSubreddit("VinylReleases");
    if (!posts) return;

    const hasPosts: boolean = posts.length > 0;
    if (!hasPosts) return;

    const matches = posts.filter(post => {
      const title = post.title;
      const match = isMatch(wishlist, title);
      return match;
    });

    const hasMatches: boolean = matches.length > 0;
    if (!hasMatches) console.log("No matches found");
    if (!hasMatches) return;

    const details = matches.map(formatMatches);

    const hasDetails: boolean = details.length > 0;
    if (!hasDetails) return;

    // Get the existing posts in our Database
    const existing: IPost[] = await PostModel.find({});
    const hasExisting: boolean = existing.length > 0;

    let notRecorded = details;

    if (hasExisting) {
      notRecorded = details.filter(item => {
        const url = item.url;

        const match: boolean = existing.some(record => {
          const matchDatabase: boolean = record.url === url;
          return matchDatabase;
        });

        return !match;
      });
    }

    const hasNewPosts: boolean = notRecorded?.length > 0;
    if (!hasNewPosts) console.log("🔦 No new matches found");
    if (!hasNewPosts) return;

    notRecorded.forEach(async record => await PostModel.findOneOrCreate(PostModel, record));
  } catch (error) {
    console.error(error);
  }
};
