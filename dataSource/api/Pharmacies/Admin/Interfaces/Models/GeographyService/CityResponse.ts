

export default class CityResponse  {
	Id: number = 0;
	Name?: string = '';
	CountryId: number = 0;
	constructor(obj?: Partial<CityResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
