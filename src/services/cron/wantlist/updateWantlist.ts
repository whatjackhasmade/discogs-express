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

export const updateWantlist = async (): Promise<void | undefined> => {
  await connect();

  const apiWantlist: DiscogsItem[] = await queryDiscogs();
  const hasWantlist: boolean = apiWantlist?.length > 0;

  if (!hasWantlist) console.log("No wantlist found");

  if (!hasWantlist) return;

  apiWantlist.forEach(async record => {
    const { artists, id, labels, title } = record;
    const bandcamp = "";

    logger.info(`Creating wantlist item: ${title}`);

    await RecordModel.findOneOrCreate({
      artists,
      bandcamp,
      discogsID: id,
      labels,
      title,
    });
  });
};

export default updateWantlist;
