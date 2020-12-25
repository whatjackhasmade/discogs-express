import connect from "./connect";

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const getPosts = async (): Promise<any[]> => {
	try {
		const db = await connect();

		// Select the "posts" collection from the database
		const collection = await db.collection("posts");

		// Select the posts collection from the database
		const posts = await collection.find({}).toArray();
		return posts;
	} catch (error) {
		console.error(error);
	}
};

export { getPosts };
export default getPosts;
