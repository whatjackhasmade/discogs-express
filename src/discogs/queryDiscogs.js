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
			const object = { id: item.id, title: item.basic_information.title };

			return object;
		});

		return items;
	} catch (err) {
		console.error(err);
		return err;
	}
};

module.exports = queryDiscogs;
