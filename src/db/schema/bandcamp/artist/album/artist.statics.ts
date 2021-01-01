import { IArtistDocument, IArtistModel } from "./artist.types";

export async function findOneOrCreate(artistModel: IArtistModel, url: string): Promise<IArtistDocument> {
  const artist = await artistModel.findOne({ url });

  // If we found a artist, return it;
  if (artist) return artist;

  // Otherwise, create one
  return artistModel.create({ url });
}
