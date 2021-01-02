import { IRecordDocument, IRecordModel } from "./record.types";

export async function findOneOrCreate(
  this: IRecordModel,
  {
    artists,
    bandcamp,
    discogsID,
    labels,
    title,
    updatedAt,
  }: { artists: string; bandcamp: string; discogsID: string; labels: string; title: string; updatedAt: string },
): Promise<IRecordDocument> {
  const record = await this.findOne({ artists, bandcamp, discogsID, labels, title, updatedAt });
  if (record) {
    return record;
  } else {
    return this.create({ artists, bandcamp, discogsID, labels, title, updatedAt });
  }
}

export async function findByDiscogsID(this: IRecordModel, value?: string): Promise<IRecordDocument[]> {
  return this.find({ discogsID: { $eq: value } });
}
