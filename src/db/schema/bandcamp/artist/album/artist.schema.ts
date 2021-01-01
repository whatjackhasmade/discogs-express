import { Schema } from "mongoose";

import { findOneOrCreate } from "./artist.statics";

import { setUpdatedAt } from "./artist.methods";

export interface IArtist {
  url: string;
  createdAt?: string;
  updatedAt?: string;
}

export const ArtistSchema = new Schema({
  url: String,
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
