const Discogs = require("disconnect").Client;

const queryDiscogs = async () => {
	const client = new Discogs();
	try {
		const res = await client
			.user()
			.wantlist()
			.getReleases("jack.davies", 0, { page: 1, per_page: 50 });

		const wants = res.wants;

		const items = wants.map((item) => {
			const id = item.id;
			const basic = item.basic_information;
			const artistsObjects = basic.artists;
			const labelsObjects = basic.labels;
			const title = basic.title;

			const hasArtists = artistsObjects && artistsObjects.length > 0;
			const hasLabels = labelsObjects && labelsObjects.length > 0;

			let artists = "";
			let labels = "";

			if (hasArtists)
				artists = artistsObjects.map((artist) => artist.name).join(", ");
			if (hasLabels)
				labels = labelsObjects.map((label) => label.name).join(", ");

			const object = { id, artists, labels, title };
			return object;
		});

		return items;
	} catch (err) {
		console.error(err);
		return err;
	}
};

module.exports = queryDiscogs;
