

export default class PromotionShortResponse  {
	Id: number = 0;
	Title?: string = '';
	DateFrom: Date = null;
	DateTo: Date = null;
	constructor(obj?: Partial<PromotionShortResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
