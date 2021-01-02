import { discogs } from "track";

declare type DiscogsItem = {
  artists: string;
  id: string;
  labels: string;
  title: string;
};

const queryDiscogs = async (): Promise<DiscogsItem[]> => {
  try {
    const res = await discogs.user().wishlist().getReleases("jack.davies", 0, { page: 1, per_page: 50 });

    const wants: any[] = res.wants;

    const items: DiscogsItem[] = wants.map(item => {
      const id = item.id;
      const basic = item.basic_information;
      const artistsObjects: any[] = basic.artists;
      const labelsObjects: any[] = basic.labels;
      const title = basic.title;

      const hasArtists = artistsObjects?.length > 0;
      const hasLabels = labelsObjects?.length > 0;

      let artists = "";
      let labels = "";

      if (hasArtists) artists = artistsObjects.map(artist => artist.name).join(", ");
      if (hasLabels) labels = labelsObjects.map(label => label.name).join(", ");

      const object: DiscogsItem = { id, artists, labels, title };
      return object;
    });

    return items;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export { queryDiscogs };
export default queryDiscogs;
