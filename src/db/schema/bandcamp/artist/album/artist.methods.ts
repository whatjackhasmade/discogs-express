import { IArtistDocument } from "./artist.types";

export async function setUpdatedAt(artist: IArtistDocument): Promise<void> {
  const now = new Date().toISOString();

  const shouldUpdate: boolean = !artist?.updatedAt || artist?.updatedAt < now;
  if (!shouldUpdate) return;

  artist.updatedAt = now;
  await artist.save();
}
