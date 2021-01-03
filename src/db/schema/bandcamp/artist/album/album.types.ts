import { Document, Model } from "mongoose";

export interface IAlbumRequired {
  discogsID: string;
  url: string;
}

export interface IAlbum extends IAlbumRequired {
  createdAt?: string;
  updatedAt?: string;
}

export interface IAlbumDocument extends IAlbum, Document {
  setUpdatedAt: (postDocument: IAlbumDocument) => Promise<void>;
}

export interface IAlbumModel extends Model<IAlbumDocument> {
  findByDiscogsID: (postModel: IAlbumModel, args: { discogsID: string }) => Promise<IAlbumDocument[] | undefined>;
  findOneOrCreate: (postModel: IAlbumModel, args: IAlbum) => Promise<IAlbumDocument>;
}
