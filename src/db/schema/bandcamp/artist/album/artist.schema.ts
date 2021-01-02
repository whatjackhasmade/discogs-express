import * as Mongoose from "mongoose";

import { findOneOrCreate } from "./artist.statics";
import { setUpdatedAt } from "./artist.methods";

export const ArtistSchema = new Mongoose.Schema({
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

ArtistSchema.statics.findOneOrCreate = findOneOrCreate;

ArtistSchema.methods.setUpdatedAt = setUpdatedAt;

export default ArtistSchema;
