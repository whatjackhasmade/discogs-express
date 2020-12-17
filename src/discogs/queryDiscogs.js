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
			const artists = basic.artists;
			const labels = basic.labels;
			const title = basic.title;

			const artistsString = Boolean(artists) && artists.join(", ");
			const labelsString = Boolean(labels) && labels.join(", ");

			const object = { id, artists: artistsString, label: labelsString, title };
			return object;
		});

		return items;
	} catch (err) {
		console.error(err);
		return err;
	}
};

module.exports = queryDiscogs;
