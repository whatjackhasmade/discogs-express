import * as Mongoose from "mongoose";
import ArtistSchema from "./artist.schema";
import { IArtistDocument, IArtistModel } from "./artist.types";

export const ArtistModel = Mongoose.model<IArtistDocument>("bandcamp", ArtistSchema) as IArtistModel;
