import { IPostDocument, IPostModel } from "./post.types";

import { messageSMS } from "track";

export async function findOneOrCreate(postModel: IPostModel, title: string, url: string): Promise<IPostDocument> {
  const record = await postModel.findOne({ url });

  // If we found a record, return it;
  if (record) return record;

  await messageSMS(`Creating new Reddit post ${title} in DB`);

  // Otherwise, create one
  return postModel.create({ title, url });
}
