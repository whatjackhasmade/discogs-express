import * as Mongoose from "mongoose";

import { findOneOrCreate } from "./post.statics";
import { setUpdatedAt } from "./post.methods";

export const PostSchema = new Mongoose.Schema({
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
