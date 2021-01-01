import { model } from "mongoose";

import { IPostDocument } from "./post.types";
import { IPostModel } from "./post.types";

import { PostSchema } from "./post.schema";
export { IPost } from "./post.schema";

export const PostModel = model<IPostDocument, IPostModel>("post", PostSchema);
