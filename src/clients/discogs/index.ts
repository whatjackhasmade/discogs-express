// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Discogs from "disconnect";
const client = Discogs.Client;
const discogs = new client();

export { discogs };
export default discogs;
