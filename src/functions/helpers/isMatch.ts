import { hasOnlySpecial } from "./hasOnlySpecial";
import { isShorterThan } from "./isShorterThan";

const regexSplit = /(?:,| )+/;

export const isMatch = (array: any[], text: string): boolean => {
	if (!array) return false;
	if (!text) return false;

	const lowerText = text.toLowerCase();

	array = array[0];

	const match = array.some((item) => {
		if (!item) return false;

		let artists: string[] = item.artists.toLowerCase().split(regexSplit);
		let labels: string[] = item.labels.toLowerCase().split(regexSplit);
		let title: string[] = item.title.toLowerCase().split(regexSplit);

		artists = artists.filter((a) => !hasOnlySpecial(a));
		labels = labels.filter((l) => !hasOnlySpecial(l));
		title = title.filter((t) => !hasOnlySpecial(t));

		artists = artists.filter((a) => !isShorterThan(a, 4));

		labels = labels.filter((l) => !isShorterThan(l, 4));
		labels = labels.filter((l) => l !== "recordings");

		title = title.filter((t) => !isShorterThan(t, 4));

		console.log(title);

		const matchArtists: boolean = artists.some((a) => a.includes(lowerText));
		const matchLabels: boolean = labels.some((l) => l.includes(lowerText));
		const matchTitle: boolean = title.some((t) => t.includes(lowerText));
		const matchWantlist: boolean = matchArtists || matchLabels || matchTitle;

		return matchWantlist;
	});

	return match;
};
