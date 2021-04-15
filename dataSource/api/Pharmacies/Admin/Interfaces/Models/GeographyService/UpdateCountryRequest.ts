

export default class UpdateCountryRequest  {
	Id?: number = null;
	Name?: string = '';
	constructor(obj?: Partial<UpdateCountryRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
