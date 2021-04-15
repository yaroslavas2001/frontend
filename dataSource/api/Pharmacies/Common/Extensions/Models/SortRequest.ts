

export default class SortRequest  {
	FieldName?: string = '';
	Desc: boolean = false;
	constructor(obj?: Partial<SortRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
