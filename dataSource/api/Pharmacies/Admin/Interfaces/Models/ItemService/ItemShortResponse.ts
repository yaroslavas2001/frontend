

export default class ItemShortResponse  {
	Id: number = 0;
	Name?: string = '';
	Producer?: string = '';
	constructor(obj?: Partial<ItemShortResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
