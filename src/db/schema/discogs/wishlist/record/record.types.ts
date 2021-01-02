import { Document, Model } from "mongoose";

export interface IRecordRequired {
  artists: string;
  discogsID: string;
  labels: string;
  title: string;
}

export interface IRecord extends IRecordRequired {
  bandcamp?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRecordDocument extends IRecord, Document {
  setUpdatedAt: (postDocument: IRecordDocument) => Promise<void>;
}

export interface IRecordModel extends Model<IRecordDocument> {
  findOneOrCreate: (postModel: IRecordModel, args: IRecord) => Promise<IRecordDocument>;
}
