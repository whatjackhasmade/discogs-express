import { Document, Model } from "mongoose";

export interface IArtistRequired {
  url: string;
}

export interface IArtist extends IArtistRequired {
  createdAt?: string;
  updatedAt?: string;
}

export interface IArtistDocument extends IArtist, Document {
  setUpdatedAt: (postDocument: IArtistDocument) => Promise<void>;
}

export interface IArtistModel extends Model<IArtistDocument> {
  findOneOrCreate: (postModel: IArtistModel, args: IArtist) => Promise<IArtistDocument>;
}
