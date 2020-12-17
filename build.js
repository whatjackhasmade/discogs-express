const cpr = require("cpr");

cpr("./src", "./public", (err, files) => {
	if (err) console.error(err);
});
