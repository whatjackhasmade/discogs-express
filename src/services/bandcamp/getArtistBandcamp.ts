import { bandcamp } from "track";

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const getArtistBandcamp = async (artistURL: string): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      bandcamp.getAlbumUrls(artistURL, (error, albumUrls) => {
        if (error) reject(error);
        resolve(albumUrls);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export { getArtistBandcamp };
export default getArtistBandcamp;
