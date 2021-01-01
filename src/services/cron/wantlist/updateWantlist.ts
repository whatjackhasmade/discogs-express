import { createWantlist } from "track";
import { queryDiscogs } from "track";

export const updateWantlist = async (): Promise<any> => {
	const apiWantlist: any[] = await queryDiscogs();
	const hasWantlist: boolean = apiWantlist?.length > 0;

	if (!hasWantlist) {
		console.log("No wantlist found");
		return;
	}

	apiWantlist.forEach((item) => {
		createWantlist(item);
	});
};

export default updateWantlist;
