

export default class UpdateAdminRequest  {
	Id?: number = null;
	Name?: string = '';
	Phone?: string = '';
	CityId: number = 0;
	Login?: string = '';
	Password?: string = '';
	constructor(obj?: Partial<UpdateAdminRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
