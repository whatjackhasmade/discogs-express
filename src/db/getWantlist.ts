import connect from "./connect";

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const getWantlist = async (): Promise<any[]> => {
	try {
		const db = await connect();

		// Select the "wantlist" collection from the database
		const collection = await db.collection("wantlist");

		// Select the wantlist collection from the database
		const wantlist = await collection.find({}).toArray();
		return wantlist;
	} catch (error) {
		console.error(error);
	}
};

export { getWantlist };
export default getWantlist;
