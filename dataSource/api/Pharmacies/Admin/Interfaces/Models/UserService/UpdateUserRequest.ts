import SexEnum from '../../../../../Pharmacies/Entities/Enums/SexEnum';

export default class UpdateUserRequest  {
	Id: number = 0;
	FullName?: string = '';
	Phone?: string = '';
	Age: number = 0;
	Sex: SexEnum = null;
	CityId: number = 0;
	constructor(obj?: Partial<UpdateUserRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
