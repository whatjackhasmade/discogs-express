import { reddit } from "track";

declare type RedditPost = {
  permalink: string;
  title: string;
};

export const latestFromSubreddit = async (subredditName: string): Promise<RedditPost[] | undefined> => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const subreddit = await reddit.getSubreddit(subredditName);
    const posts: RedditPost[] = await subreddit.getNew({ limit: 100 });
    return posts;
  } catch (error) {
    console.error(error);
  }
};
