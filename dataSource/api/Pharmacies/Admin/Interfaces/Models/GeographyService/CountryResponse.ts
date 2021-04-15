

export default class CountryResponse  {
	Id: number = 0;
	Name?: string = '';
	constructor(obj?: Partial<CountryResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
