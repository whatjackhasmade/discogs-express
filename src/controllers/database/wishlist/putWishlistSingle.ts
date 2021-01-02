// Type definitions
import type { Request, Response } from "express";

// Common
import { connect } from "track";
import { logger } from "track";

// Database models
import { RecordModel } from "track";

// this option instructs the method to not create a document if no documents match the filter
const options = { upsert: false };

const putWishlistSingle = async (req: Request, res: Response): Promise<void> => {
  const discogsID: string = req?.params?.discogsID;
  const body = req?.body;

  console.log(body);

  await connect();

  try {
    const current = await RecordModel.findByDiscogsID(RecordModel, { discogsID });
    if (!current) throw new Error(`Could not find wishlist item for ${discogsID}`);

    // create a filter for a movie to update
    const filter = { discogsID };

    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        ...body,
      },
    };

    const data = await RecordModel.updateOne(filter, updateDoc, options);

    res.json({ data });
  } catch (error) {
    logger.error(error);

    res.status(500);
    res.json({ error });
  }
};

export { putWishlistSingle };
export default putWishlistSingle;
