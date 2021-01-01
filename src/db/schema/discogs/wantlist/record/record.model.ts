import * as Mongoose from "mongoose";
import RecordSchema from "./record.schema";
import { IRecordDocument, IRecordModel } from "./record.types";

export const RecordModel = Mongoose.model<IRecordDocument>("record", RecordSchema) as IRecordModel;
export type { IRecordDocument };
