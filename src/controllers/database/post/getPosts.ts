// Type definitions
import type { Request, Response } from "express";
import type { IPost } from "track";

// Common
import { connect } from "track";

// Database models
import { PostModel } from "track";

const getPosts = async (_: Request, res: Response): Promise<void> => {
  await connect();

  const data: IPost[] = await PostModel.find({});

  res.json({ data });
};

export { getPosts };
export default getPosts;
