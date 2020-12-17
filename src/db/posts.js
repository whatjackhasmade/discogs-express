// Import Dependencies
const MongoClient = require("mongodb").MongoClient;
const url = require("url");

// Create cached connection variable
let cachedDb = null;

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase(uri) {
	// If the database connection is cached,
	// use it instead of creating a new connection
	if (cachedDb) {
		return cachedDb;
	}

	try {
		// If no connection is cached, create a new one
		const client = await MongoClient.connect(uri, { useNewUrlParser: true });

		// Select the database through the connection,
		// using the database path of the connection string
		const collectionName = url.parse(uri).pathname.substr(1);
		const db = await client.db(collectionName);

		// Cache the database connection and return the connection
		cachedDb = db;
		return db;
	} catch (error) {
		console.error(error);
	}
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
const dbPosts = async () => {
	let response = "";

	try {
		// Get a database connection, cached or otherwise,
		// using the connection string environment variable as the argument
		const db = await connectToDatabase(process.env.MONGODB_URI);

		// Select the "posts" collection from the database
		const collection = await db.collection("posts");

		// Select the posts collection from the database
		const posts = await collection.find({}).toArray();
		response = posts;
	} catch (error) {
		console.error(error);
		response = error.message;
	}

	// Respond with a JSON string of all posts in the collection
	res.status(200).json({ response });
};

module.exports = dbPosts;
