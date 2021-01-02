import { messageSMS } from "track";

import { IPostDocument, IPostModel } from "./post.types";

declare type Args = {
  title: string;
  url: string;
};

export async function findOneOrCreate(model: IPostModel, args: Args): Promise<IPostDocument | undefined> {
  const { title, url } = args;

  // If no URL provided, we can't search
  if (!url) return;

  const post = await model.findOne({ url });

  // If we found a post, return it;
  if (post) return post;

  // If no title provided, we can't create
  if (!title) return;

  // Otherwise, create one
  const newPost = await model.create(args);

  await messageSMS(`New post: ${title} - ${url}`);

  return newPost;
}
