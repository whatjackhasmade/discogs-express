import { IRecordDocument } from "./record.types";

export async function setUpdatedAt(record: IRecordDocument): Promise<void> {
  const now = new Date().toISOString();

  const shouldUpdate: boolean = !record?.updatedAt || record?.updatedAt < now;
  if (!shouldUpdate) return;

  record.updatedAt = now;
  await record.save();
}
