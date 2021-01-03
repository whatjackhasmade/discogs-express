// Controllers - Bandcamp
import { getBandcampArtist } from "./bandcamp";
import { getBandcampAlbum } from "./bandcamp";

// Controllers - Database
import { getBandcampSingle } from "./database";
import { getWishlist } from "./database";
import { getWishlistSingle } from "./database";
import { postWishlist } from "./database";
import { putWishlistSingle } from "./database";

// Controllers - Posts
import { getPosts } from "./database";

const api = {
  getBandcampArtist,
  getBandcampAlbum,

  getBandcampSingle,

  getWishlist,
  getWishlistSingle,
  postWishlist,
  putWishlistSingle,

  getPosts,
};

export { api };
export default api;
