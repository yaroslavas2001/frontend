import FilterRequest from '../../../../../Pharmacies/Common/Extensions/Models/FilterRequest';

export default class StoresRequest  {
	CityIds: Array<number> = null;
	Filter: FilterRequest = null;
	constructor(obj?: Partial<StoresRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
