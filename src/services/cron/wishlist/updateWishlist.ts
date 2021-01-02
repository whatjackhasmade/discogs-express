// Common
import { connect } from "track";
import { logger } from "track";

// Services
import { queryDiscogs } from "track";

import { RecordModel } from "track";

declare type DiscogsItem = {
  artists: string;
  id: string;
  labels: string;
  title: string;
};

export const updateWishlist = async (): Promise<void | undefined> => {
  await connect();

  const apiWishlist: DiscogsItem[] = await queryDiscogs({});
  const hasWishlist: boolean = apiWishlist?.length > 0;

  if (!hasWishlist) console.log("No wishlist found");
  if (!hasWishlist) return;

  apiWishlist.forEach(async record => {
    const { artists, id, labels, title } = record;
    const bandcamp = "";

    logger.info(`Creating wishlist item: ${title}`);

    await RecordModel.findOneOrCreate(RecordModel, {
      artists,
      bandcamp,
      discogsID: id,
      labels,
      title,
    });
  });
};

export default updateWishlist;
