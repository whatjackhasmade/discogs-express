// Type definitions
import type { Request, Response } from "express";

// Services - CRON
import { updateWishlist } from "track";

const postWishlist = async (_: Request, res: Response) => {
  const data = await updateWishlist();
  res.json({ data });
};

export { postWishlist };
export default postWishlist;
