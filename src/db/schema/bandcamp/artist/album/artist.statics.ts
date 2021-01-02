import { IArtistDocument, IArtistModel } from "./artist.types";

declare type Args = {
  url: string;
};

export async function findOneOrCreate(model: IArtistModel, { url }: Args): Promise<IArtistDocument> {
  const artist = await model.findOne({ url });

  // If we found a artist, return it;
  if (artist) return artist;

  // Otherwise, create one
  return await model.create({ url });
}
