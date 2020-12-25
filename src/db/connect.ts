// Import Dependencies
import { MongoClient } from "mongodb";
import { Db } from "mongodb";
import url from "url";

// Create cached connection variable
let cachedDb: Db | null = null;

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connect() {
	// Get a database connection, cached or otherwise,
	// using the connection string environment variable as the argument
	const uri = process.env.MONGODB_URI;

	// If the database connection is cached,
	// use it instead of creating a new connection
	if (cachedDb) {
		return cachedDb;
	}

	try {
		// If no connection is cached, create a new one
		const client = await MongoClient.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

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

export { connect };
export default connect;
