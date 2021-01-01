import { IArtistDocument } from "./artist.types";

export async function setUpdatedAt(artist: IArtistDocument): Promise<void> {
  const now = new Date().toISOString();

  const hasNoUpdatedAt = !artist?.updatedAt;

  // @ts-ignore
  const updatedAtIsOld: boolean = artist?.updatedAt < now;
  const shouldUpdate = hasNoUpdatedAt || updatedAtIsOld;

  if (shouldUpdate) {
    artist.updatedAt = now;
    await artist.save();
  }
}
