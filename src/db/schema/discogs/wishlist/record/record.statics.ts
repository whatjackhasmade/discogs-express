import { IRecordDocument, IRecordModel } from "./record.types";

declare type Args = {
  artists: string;
  bandcamp: string;
  discogsID: string;
  labels: string;
  title: string;
  updatedAt: string;
};

export async function findOneOrCreate(model: IRecordModel, args: Args): Promise<IRecordDocument> {
  const { discogsID } = args;
  const record = await model.findOne({ discogsID });

  // If we found a record, return it;
  if (record) return record;

  // Otherwise, create one
  return await model.create(args);
}

export async function findByDiscogsID(
  model: IRecordModel,
  args: { discogsID: string },
): Promise<IRecordDocument | undefined> {
  const { discogsID } = args;
  const record = await model.findOne({ discogsID });

  // If we found a record, return it;
  if (record) return record;
}
