import * as Mongoose from "mongoose";

import { findByDiscogsID } from "./record.statics";
import { findOneOrCreate } from "./record.statics";

import { setUpdatedAt } from "./record.methods";

export const RecordSchema = new Mongoose.Schema({
  artists: String,
  bandcamp: String,
  discogsID: { type: String, index: { unique: true }, required: false },
  labels: String,
  title: String,
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

RecordSchema.statics.findByDiscogsID = findByDiscogsID;
RecordSchema.statics.findOneOrCreate = findOneOrCreate;

RecordSchema.methods.setUpdatedAt = setUpdatedAt;

export default RecordSchema;
