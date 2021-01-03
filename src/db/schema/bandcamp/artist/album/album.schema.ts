import * as Mongoose from "mongoose";

import { findByDiscogsID } from "./album.statics";
import { findOneOrCreate } from "./album.statics";

import { setUpdatedAt } from "./album.methods";

export const AlbumSchema = new Mongoose.Schema({
  discogsID: { type: String },
  url: { type: String, index: { unique: true } },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

AlbumSchema.statics.findByDiscogsID = findByDiscogsID;
AlbumSchema.statics.findOneOrCreate = findOneOrCreate;

AlbumSchema.methods.setUpdatedAt = setUpdatedAt;

export default AlbumSchema;
