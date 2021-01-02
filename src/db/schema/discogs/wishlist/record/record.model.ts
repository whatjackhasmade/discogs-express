import * as Mongoose from "mongoose";
import RecordSchema from "./record.schema";
import { IRecordDocument, IRecordModel } from "./record.types";

export const RecordModel = Mongoose.model<IRecordDocument>("wishlist", RecordSchema) as IRecordModel;
