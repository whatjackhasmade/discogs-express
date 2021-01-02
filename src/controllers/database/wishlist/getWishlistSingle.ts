// Type definitions
import type { Request, Response } from "express";

// Common
import { connect } from "track";

// Database models
import { RecordModel } from "track";

const getWishlistSingle = async (req: Request, res: Response): Promise<void> => {
  const discogsID: string = req.params.discogsID;

  await connect();

  const data = await RecordModel.findByDiscogsID(RecordModel, { discogsID });

  res.json({ data });
};

export { getWishlistSingle };
export default getWishlistSingle;
