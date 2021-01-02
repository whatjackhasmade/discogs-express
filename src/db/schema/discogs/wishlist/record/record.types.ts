import { Document, Model } from "mongoose";

export interface IRecord {
  artists: string;
  bandcamp?: string;
  discogsID: string;
  labels: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRecordDocument extends IRecord, Document {
  setUpdatedAt: (this: IRecordDocument) => Promise<void>;
}

export interface IRecordModel extends Model<IRecordDocument> {
  findOneOrCreate: (
    this: IRecordModel,
    {
      artists,
      bandcamp,
      discogsID,
      labels,
      title,
    }: { artists: string; bandcamp: string; discogsID: string; labels: string; title: string },
  ) => Promise<IRecordDocument>;
  findByAge: (this: IRecordModel, value: string) => Promise<IRecordDocument[]>;
}
