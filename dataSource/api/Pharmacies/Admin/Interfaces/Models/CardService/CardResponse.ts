

export default class CardResponse  {
	Id: string = '';
	Number?: string = '';
	Owner?: string = '';
	DateCreate: Date = null;
	SumDiscount: number = 0;
	constructor(obj?: Partial<CardResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
