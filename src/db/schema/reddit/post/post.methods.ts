import { IPostDocument } from "./post.types";

export async function setUpdatedAt(post: IPostDocument): Promise<void> {
  const now = new Date().toISOString();

  const hasNoUpdatedAt = !post?.updatedAt;

  // @ts-ignore
  const updatedAtIsOld: boolean = post?.updatedAt < now;
  const shouldUpdate = hasNoUpdatedAt || updatedAtIsOld;

  if (shouldUpdate) {
    post.updatedAt = now;
    await post.save();
  }
}
