import { createWantlist } from "../../../db";
import { queryDiscogs } from "../../../services";

export const updateWantlist = async (): Promise<any> => {
	const apiWantlist: any[] = await queryDiscogs();

	const hasWantlist: boolean = apiWantlist?.length > 0;
	if (!hasWantlist) return;

	apiWantlist.forEach((item) => {
		createWantlist(item);
	});
};

export default updateWantlist;
