import { Document, Model } from "mongoose";

import { IArtist } from "./artist.schema";

export interface IArtistDocument extends IArtist, Document {
  setUpdatedAt: (artist: IArtistDocument) => Promise<void>;
}

export interface IArtistModel extends Model<IArtistDocument> {
  findOneOrCreate: (artist: IArtistModel) => Promise<IArtistDocument>;
}
