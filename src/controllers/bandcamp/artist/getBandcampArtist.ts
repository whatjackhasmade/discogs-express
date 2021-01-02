// Type definitions
import type { Request, Response } from "express";

// Common
import { logger } from "track";

// Services - Client functions
import { getArtistBandcamp } from "track";

const getBandcampArtist = async (req: Request, res: Response): Promise<void> => {
  const url: string = req.params.bandcampArtistURL;

  try {
    const data = await getArtistBandcamp(url);
    res.json({ data });
  } catch (error) {
    logger.error(error);

    res.status(500);
    res.json({ error });
  }
};

export { getBandcampArtist };
export default getBandcampArtist;
