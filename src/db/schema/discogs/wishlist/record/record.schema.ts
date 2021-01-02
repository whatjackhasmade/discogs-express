import * as Mongoose from "mongoose";
import { findOneOrCreate, findByDiscogsID } from "./record.statics";
import { setUpdatedAt } from "./record.methods";

const RecordSchema = new Mongoose.Schema({
  artists: String,
  bandcamp: { type: String, index: { unique: true }, required: false },
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

RecordSchema.statics.findOneOrCreate = findOneOrCreate;
RecordSchema.statics.findByDiscogsID = findByDiscogsID;

RecordSchema.methods.setUpdatedAt = setUpdatedAt;

export default RecordSchema;
