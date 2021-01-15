import { discogs } from "track";
import sw from "stopword";

declare type DiscogsItem = {
  artists: string;
  id: string;
  labels: string;
  title: string;
};

declare type Args = {
  page?: number;
  per_page?: number;
  username?: string;
};

declare type WantsItemFormat = {
  name: string;
  qty: string;
  descriptions: any[];
};

declare type WantsItemLabel = {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
};

declare type WantsItemArtist = {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
};

declare type WantsItem = {
  id: number;
  resource_url: string;
  rating: number;
  date_added: string;
  basic_information: {
    id: number;
    master_id: number;
    master_url: string;
    resource_url: string;
    title: string;
    year: number;
    format: WantsItemFormat[];
    labels: WantsItemLabel[];
    artists: WantsItemArtist[];
    thumb: string;
    cover_image: string;
    genres: string[];
    styles: string[];
  };
};

const queryDiscogs = async ({ page = 1, per_page = 50, username = "jack.davies" }: Args): Promise<DiscogsItem[]> => {
  try {
    const user = await discogs.user();
    const wishlist = await user.wantlist();
    const releases = await wishlist.getReleases(username, 0, { page, per_page });

    const wants: WantsItem[] = releases.wants;

    const items: DiscogsItem[] = wants.map(item => {
      const id = String(item.id);
      const basic = item.basic_information;
      const artistsObjects = basic.artists;
      const labelsObjects = basic.labels;
      const title = sw.removeStopwords([basic.title]);

      const hasArtists: boolean = artistsObjects?.length > 0;
      const hasLabels: boolean = labelsObjects?.length > 0;

      let artists = "";
      let labels = "";

      if (hasArtists) artists = sw.removeStopwords(artistsObjects.map(artist => artist.name)).join(", ");
      if (hasLabels) labels = sw.removeStopwords(labelsObjects.map(label => label.name)).join(", ");

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
