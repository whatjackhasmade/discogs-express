import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
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

// Controllers - Index
app.get("/", api.getPosts);

// Controllers - Bandcamp
app.get("/bandcamp/album/:bandcampAlbumURL", api.getBandcampAlbum);
app.get("/bandcamp/artist/:bandcampArtistURL", api.getBandcampArtist);

// Controllers - Reddit Posts
app.get("/posts", api.getPosts);

// Controllers - Discogs Wishlist/Wantlist
app.get("/wishlist", api.getWishlist);
app.get("/wishlist/:discogsID", api.getWishlistSingle);
app.post("/wishlist", api.postWishlist);

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
