import * as Mongoose from "mongoose";
import AlbumSchema from "./album.schema";
import { IAlbumDocument, IAlbumModel } from "./album.types";

export const AlbumModel = Mongoose.model<IAlbumDocument>("bandcamp", AlbumSchema) as IAlbumModel;
