import { Document, Model } from "mongoose";

export interface IPostRequired {
  title: string;
  url: string;
}

export interface IPost extends IPostRequired {
  createdAt?: string;
  updatedAt?: string;
}

export interface IPostDocument extends IPost, Document {
  setUpdatedAt: (postDocument: IPostDocument) => Promise<void>;
}

export interface IPostModel extends Model<IPostDocument> {
  findOneOrCreate: (postModel: IPostModel, args: IPost) => Promise<IPostDocument>;
}
