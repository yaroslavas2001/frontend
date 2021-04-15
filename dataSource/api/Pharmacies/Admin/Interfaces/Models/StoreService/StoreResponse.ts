import ScheduleInfo from '../../../../../Pharmacies/Admin/Interfaces/Models/StoreService/ScheduleInfo';

export default class StoreResponse  {
	Id: number = 0;
	ImageUrl?: string = '';
	Name?: string = '';
	Address?: string = '';
	Phone?: string = '';
	Latitude: number = 0;
	Longitude: number = 0;
	CityId: number = 0;
	HasCosmetics: boolean = false;
	HasOptics: boolean = false;
	HasGoodsForDisabled: boolean = false;
	IsAroundTheClock: boolean = false;
	Schedules: Array<ScheduleInfo> = null;
	constructor(obj?: Partial<StoreResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
