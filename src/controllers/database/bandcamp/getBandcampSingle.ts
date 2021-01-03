// Type definitions
import type { Request, Response } from "express";

// Common
import { connect } from "track";

// Database models
import { AlbumModel } from "track";

const getBandcampSingle = async (req: Request, res: Response): Promise<void> => {
  const discogsID: string = req.params.discogsID;

  await connect();

  const data = await AlbumModel.findByDiscogsID(AlbumModel, { discogsID });

  res.json({ data });
};

export { getBandcampSingle };
export default getBandcampSingle;
