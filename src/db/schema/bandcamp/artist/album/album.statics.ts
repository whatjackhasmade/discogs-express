import { IAlbumDocument, IAlbumModel } from "./album.types";

declare type Args = {
  discogsID: string;
  url: string;
};

export async function findOneOrCreate(model: IAlbumModel, args: Args): Promise<IAlbumDocument> {
  const { discogsID, url } = args;

  // Does it exist in the database?
  const album = await model.findOne({ url });

  // If we found a album, return it;
  if (album) return album;

  console.log(`Created a new artist album from bandcamp: ${url}`);

  // Otherwise, create one
  return await model.create({ discogsID, url });
}

export async function findByDiscogsID(
  model: IAlbumModel,
  args: { discogsID: string },
): Promise<IAlbumDocument[] | undefined> {
  const { discogsID } = args;

  const albums = await model.find({ discogsID });

  // If we found a record, return it;
  if (albums) return albums;
}
