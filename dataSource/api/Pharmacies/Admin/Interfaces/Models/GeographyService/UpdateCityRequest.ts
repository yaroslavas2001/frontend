

export default class UpdateCityRequest  {
	Id?: number = null;
	Name?: string = '';
	CountryId: number = 0;
	constructor(obj?: Partial<UpdateCityRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
