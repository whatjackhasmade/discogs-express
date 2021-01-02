// Type definitions
import type { Request, Response } from "express";
import type { IRecord } from "track";

// Common
import { connect } from "track";

// Database models
import { RecordModel } from "track";

const getWishlist = async (_: Request, res: Response): Promise<void> => {
  await connect();

  const data: IRecord[] = await RecordModel.find({});

  res.json({ data });
};

export { getWishlist };
export default getWishlist;
