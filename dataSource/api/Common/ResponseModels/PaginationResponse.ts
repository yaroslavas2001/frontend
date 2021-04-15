

export default class PaginationResponse<T>  {
	Count: number = 0;
	Items: Array<T> = null;
	constructor(obj?: Partial<PaginationResponse<T>>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
