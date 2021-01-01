import { Document, Model } from "mongoose";

import { IPost } from "./post.schema";

export interface IPostDocument extends IPost, Document {
  setUpdatedAt: (this: IPostDocument) => Promise<void>;
}

export interface IPostModel extends Model<IPostDocument> {
  findOneOrCreate: ({ title, url }: IPost) => Promise<IPostDocument>;
}
