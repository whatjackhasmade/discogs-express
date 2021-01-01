declare type RedditPost = {
  permalink: string;
  title: string;
};

declare type FormattedPost = {
  title: string;
  url: string;
};

export const formatMatches = (item: RedditPost): FormattedPost => {
  const permalink: string = item.permalink;
  const title: string = item.title;
  const url: string = "https://reddit.com" + permalink;

  const detail = {
    title,
    url,
  };

  return detail;
};
