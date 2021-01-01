import { Document } from "mongoose";
import { IRecordDocument } from "./record.types";

export async function setUpdatedAt(this: IRecordDocument): Promise<void> {
  const now = new Date().toISOString();

  const hasNoUpdatedAt = !this?.updatedAt;

  // @ts-ignore
  const updatedAtIsOld: boolean = this?.updatedAt < now;
  const shouldUpdate = hasNoUpdatedAt || updatedAtIsOld;

  if (shouldUpdate) {
    this.updatedAt = now;
    await this.save();
  }
}

export async function sameDiscogsID(this: IRecordDocument): Promise<Document[]> {
  return this.model("record").find({ discogsID: this.discogsID });
}
