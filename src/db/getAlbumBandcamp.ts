import { bandcamp } from "track";

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const getAlbumBandcamp = async (albumURL: string): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      bandcamp.getAlbumProducts(albumURL, (error, albumProducts) => {
        if (error) reject(error);
        resolve(albumProducts);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export { getAlbumBandcamp };
export default getAlbumBandcamp;
