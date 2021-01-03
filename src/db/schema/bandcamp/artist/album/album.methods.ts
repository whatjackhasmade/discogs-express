import { IAlbumDocument } from "./album.types";

export async function setUpdatedAt(album: IAlbumDocument): Promise<void> {
  const now = new Date().toISOString();

  const shouldUpdate: boolean = !album?.updatedAt || album?.updatedAt < now;
  if (!shouldUpdate) return;

  album.updatedAt = now;
  await album.save();
}
