import * as Mongoose from "mongoose";
import PostSchema from "./post.schema";
import { IPostDocument, IPostModel } from "./post.types";

export const PostModel = Mongoose.model<IPostDocument>("reddit", PostSchema) as IPostModel;
