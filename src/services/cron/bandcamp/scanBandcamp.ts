import { getWantlist } from "track";

import { getArtistBandcamp } from "track";
import { getAlbumBandcamp } from "track";

export const scanBandcamp = async (): Promise<any> => {
  const wishlist: any[] = await getWantlist();

  const hasWishlist: boolean = wishlist.length > 0;
  if (!hasWishlist) return;

  const wishlistBandcampEnabled: any[] = wishlist.filter(item => Boolean(item.bandcamp));

  const hasWishlistBandcamp: boolean = wishlistBandcampEnabled.length > 0;
  if (!hasWishlistBandcamp) return;

  try {
    const artistAlbums: string[][] = await Promise.all(
      wishlistBandcampEnabled.map(async item => {
        const bandcampURL: string = item.bandcamp;

        const albums: string[] = await getArtistBandcamp(bandcampURL);
        return albums;
      }),
    );

    const validAlbums: string[][] = artistAlbums.filter(Boolean);
    const albumLinks: string[] = validAlbums.flat();

    const hasAlbumLinks = albumLinks.length > 0;
    if (!hasAlbumLinks) return;

    const albums = await Promise.all(
      albumLinks.map(async link => {
        const album = await getAlbumBandcamp(link);
        return album;
      }),
    );

    const hasAlbums = albums.length > 0;
    if (!hasAlbums) return;

    console.log("Found albums");
    console.log(albums);
  } catch (error) {
    console.error(error);
  }
};
