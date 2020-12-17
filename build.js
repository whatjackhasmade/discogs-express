const cpr = require("cpr");

cpr("./src", "./build", (err, files) => {
	if (err) console.error(err);
});
