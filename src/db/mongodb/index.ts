// Import Dependencies
import mongoose from "mongoose";

// Import Schemas
import { AlbumModel } from "track";
import { PostModel } from "track";
import { RecordModel } from "track";

// Create cached connection variable
let database: mongoose.Connection;

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
export const connect = (): any => {
  if (database) return database;

  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  let uri = "";
  if (process.env.MONGODB_URI) uri = process.env.MONGODB_URI;

  mongoose.connect(uri, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  database = mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.error("Error connecting to database");
  });

  return {
    AlbumModel,
    PostModel,
    RecordModel,
  };
};

export const disconnect = async (): Promise<undefined> => {
  if (!database) return;

  mongoose.disconnect();
};

export default connect;
