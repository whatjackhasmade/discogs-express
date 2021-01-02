import { IPostDocument } from "./post.types";

export async function setUpdatedAt(post: IPostDocument): Promise<void> {
  const now = new Date().toISOString();

  const shouldUpdate: boolean = !post?.updatedAt || post?.updatedAt < now;
  if (!shouldUpdate) return;

  post.updatedAt = now;
  await post.save();
}
