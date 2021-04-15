

export default class PaginationRequest  {
	Skip?: number = null;
	Take?: number = null;
	constructor(obj?: Partial<PaginationRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
