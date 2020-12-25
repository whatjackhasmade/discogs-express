const connect = require("./connect");

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const getWantlist = async () => {
	let response = "";

	try {
		const db = await connect();

		// Select the "wantlist" collection from the database
		const collection = await db.collection("wantlist");

		// Select the wantlist collection from the database
		const wantlist = await collection.find({}).toArray();
		response = wantlist;
	} catch (error) {
		console.error(error);
		response = error.message;
	}

	return response;
};

export default getWantlist;
