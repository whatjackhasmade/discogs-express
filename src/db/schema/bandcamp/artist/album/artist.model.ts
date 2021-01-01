import { model } from "mongoose";

import { IArtistDocument } from "./artist.types";
import { IArtistModel } from "./artist.types";

import { ArtistSchema } from "./artist.schema";
export { IArtist } from "./artist.schema";

export const ArtistModel = model<IArtistDocument, IArtistModel>("artist", ArtistSchema);
