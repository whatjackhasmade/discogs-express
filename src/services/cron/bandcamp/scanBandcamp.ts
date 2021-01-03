// Common
import { connect } from "track";

// Database models
import { RecordModel } from "track";

// Services
import { getArtistBandcamp } from "track";
import { getAlbumBandcamp } from "track";

// Type definitions
import type { IRecord } from "track";

export const scanBandcamp = async (): Promise<any> => {
  await connect();

  const wishlist: IRecord[] = await RecordModel.find({});

  const hasWishlist: boolean = wishlist.length > 0;
  if (!hasWishlist) return;

  const wishlistBandcampEnabled: IRecord[] = wishlist.filter(item => Boolean(item.bandcamp));

  const hasWishlistBandcamp: boolean = wishlistBandcampEnabled.length > 0;
  if (!hasWishlistBandcamp) return;

  try {
    const artistAlbums = await Promise.all(
      wishlistBandcampEnabled.map(async item => {
        const { bandcamp, discogsID } = item;
        if (!bandcamp || !discogsID) return [];

        const albums: string[] = await getArtistBandcamp(bandcamp);
        const hasAlbums: boolean = albums?.length > 0;
        if (!hasAlbums) return [];

        const data = { discogsID, albums };
        return data;
      }),
    );

    console.log(artistAlbums);

    // const validAlbums: string[][] = artistAlbums.filter(Boolean);
    // const albumLinks: string[] = validAlbums.flat();

    // const hasAlbumLinks: boolean = albumLinks.length > 0;
    // if (!hasAlbumLinks) return;

    // const albums = await Promise.all(
    //   albumLinks.map(async link => {
    //     const album = await getAlbumBandcamp(link);
    //     return album;
    //   }),
    // );

    // const hasAlbums: boolean = albums.length > 0;
    // if (!hasAlbums) return;

    // console.log("Found albums");
    // console.log(albums);
  } catch (error) {
    console.error(error);
  }
};
