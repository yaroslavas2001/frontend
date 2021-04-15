import FilterRequest from '../../../../../Pharmacies/Common/Extensions/Models/FilterRequest';

export default class ItemsRequest  {
	CityIds: Array<number> = null;
	StoreIds: Array<number> = null;
	Filter: FilterRequest = null;
	constructor(obj?: Partial<ItemsRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
