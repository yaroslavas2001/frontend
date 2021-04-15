

export default class DoctorInfoResponse  {
	Id: number = 0;
	Title?: string = '';
	Link?: string = '';
	Text?: string = '';
	ImageUrl?: string = '';
	IsActive: boolean = false;
	DateCreate: Date = null;
	constructor(obj?: Partial<DoctorInfoResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
