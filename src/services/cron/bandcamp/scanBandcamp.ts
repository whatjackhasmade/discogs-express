// Common
import { connect } from "track";

// Database models
import { AlbumModel } from "track";
import { RecordModel } from "track";

// Services
import { getArtistBandcamp } from "track";

// Type definitions
import type { IRecord } from "track";

export const scanBandcamp = async (): Promise<void> => {
  await connect();

  const wishlist: IRecord[] = await RecordModel.find({});

  const hasWishlist: boolean = wishlist.length > 0;
  if (!hasWishlist) return;

  const wishlistBandcampEnabled: IRecord[] = wishlist.filter(item => {
    const hasBandcampURL = Boolean(item.bandcamp);
    const hasDiscogsID = Boolean(item.discogsID);
    return hasBandcampURL && hasDiscogsID;
  });

  const hasWishlistBandcamp: boolean = wishlistBandcampEnabled.length > 0;
  if (!hasWishlistBandcamp) return;

  try {
    const artistAlbums = await Promise.all(
      wishlistBandcampEnabled.map(async item => {
        const { bandcamp, discogsID } = item;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const albums: string[] = await getArtistBandcamp(bandcamp);
        const hasAlbums: boolean = albums?.length > 0;
        if (!hasAlbums) return null;

        const data = { discogsID, albums };
        return data;
      }),
    );

    const validArtistsAlbums = artistAlbums.filter(Boolean);
    const hasAlbumLinks: boolean = validArtistsAlbums.length > 0;
    if (!hasAlbumLinks) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    validArtistsAlbums.forEach(async artistsObject => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { albums, discogsID } = artistsObject;

      albums.forEach(async url => {
        const data = { discogsID, url };
        await AlbumModel.findOneOrCreate(AlbumModel, data);
      });
    });
  } catch (error) {
    console.error(error);
  }
};
