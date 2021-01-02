// Controllers - Bandcamp
import { getBandcampArtist } from "./bandcamp";
import { getBandcampAlbum } from "./bandcamp";

// Controllers - Database
import { getWishlist } from "./database";
import { getWishlistSingle } from "./database";
import { postWishlist } from "./database";

// Controllers - Posts
import { getPosts } from "./database";

const api = {
  getBandcampArtist,
  getBandcampAlbum,

  getWishlist,
  getWishlistSingle,
  postWishlist,

  getPosts,
};

export { api };
export default api;
