const connect = require("./connect");

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const getPosts = async () => {
	let response = "";

	try {
		const db = await connect();

		// Select the "posts" collection from the database
		const collection = await db.collection("posts");

		// Select the posts collection from the database
		const posts = await collection.find({}).toArray();
		response = posts;
	} catch (error) {
		console.error(error);
		response = error.message;
	}

	return response;
};

export default getPosts;
