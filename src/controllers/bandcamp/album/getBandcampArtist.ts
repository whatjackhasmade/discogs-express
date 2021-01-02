// Type definitions
import type { Request, Response } from "express";

// Common
import { logger } from "track";

// Services - Client functions
import { getAlbumBandcamp } from "track";

const getBandcampAlbum = async (req: Request, res: Response): Promise<void> => {
  const url: string = req.params.bandcampAlbumURL;

  try {
    const data = await getAlbumBandcamp(url);

    res.json({ data });
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.json({ error });
  }
};

export { getBandcampAlbum };
export default getBandcampAlbum;
