import bearerToken from "express-bearer-token";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron";
import dotenv from "dotenv";
import helmet from "helmet";
import http from "http";
dotenv.config();

// Common
import { app } from "track";
import { connect } from "track";
import { logger } from "track";

// Controllers
import { api } from "track";

// Services - CRON
import { scanBandcamp } from "track";
import { scanReddit } from "track";

const PORT: number = Number(process.env.PORT) || 5000;
const env: string = process.env.NODE_ENV || "dev";
const urlFrontend: string = process.env.URL_FRONTEND || "";
const urlLocal: string = process.env.URL_LOCAL || "";

const server = http.createServer(app);

const auth: string[] = [urlFrontend, urlLocal];

const corsConfig = {
  credentials: true,
  origin: auth,
};

// Open our connection to MongoDB
connect();

app.use(cors(corsConfig));

// Set helemet
app.use(helmet());

// Accept bearer token authentication
app.use(bearerToken());

// Accept form data in requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookie sent in requests
app.use(cookieParser());

// Controllers - Index
app.get("/", api.getPosts);

// Controllers - Bandcamp
app.get("/bandcamp/:discogsID", api.getBandcampSingle);
app.get("/bandcamp/album/:bandcampAlbumURL", api.getBandcampAlbum);
app.get("/bandcamp/artist/:bandcampArtistURL", api.getBandcampArtist);

// Controllers - Reddit Posts
app.get("/posts", api.getPosts);

// Controllers - Discogs Wishlist/Wantlist
app.get("/wishlist", api.getWishlist);
app.get("/wishlist/:discogsID", api.getWishlistSingle);
app.post("/wishlist", api.postWishlist);
app.put("/wishlist/:discogsID", api.putWishlistSingle);

server.listen(PORT);

server.on("listening", () => {
  logger.info(`${env} server up listening on http://localhost:${PORT}`);

  // Run every 15 seconds
  cron.schedule("*/15 * * * * *", async () => {
    await scanReddit();
  });

  // Run every minute
  cron.schedule("*/1 * * * *", async () => {
    await scanBandcamp();
  });

  // Run every day
  // cron.schedule("* * * */1 * *", async () => {
  // await updateWishlist();
  // });
});
