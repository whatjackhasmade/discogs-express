import { Schema } from "mongoose";

import { findOneOrCreate } from "./post.statics";

import { setUpdatedAt } from "./post.methods";

export interface IPost {
  title: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
}

export const PostSchema = new Schema({
  title: String,
  url: String,
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

PostSchema.statics.findOneOrCreate = findOneOrCreate;
PostSchema.methods.setUpdatedAt = setUpdatedAt;

export default PostSchema;
