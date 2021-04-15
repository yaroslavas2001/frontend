import ScheduleInfo from '../../../../../Pharmacies/Admin/Interfaces/Models/StoreService/ScheduleInfo';

export default class UpdateStoreRequest  {
	Id: number = 0;
	CityId: number = 0;
	Latitude: number = 0;
	Longitude: number = 0;
	HasGoodsForDisabled: boolean = false;
	HasOptics: boolean = false;
	HasCosmetics: boolean = false;
	Schedules: Array<ScheduleInfo> = null;
	constructor(obj?: Partial<UpdateStoreRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
