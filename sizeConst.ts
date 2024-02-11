import { SizeConstType } from '@/types/sizeconst.type';

function sizeConst() {
	let res: SizeConstType = {};

	for (let i = 0; i < 3000; i++) {
		res[`${i}`] = `${i}px`;
	}

	return res;
}

export default sizeConst;
