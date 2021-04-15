import AddPhotoRequest from '../../../../../Pharmacies/Admin/Interfaces/Models/AddPhotoRequest';

export default class AddDoctorInfoRequest  {
	Id?: number = null;
	Title?: string = '';
	Link?: string = '';
	Text?: string = '';
	IsActive: boolean = false;
	AddPhotoRequest: AddPhotoRequest = null;
	constructor(obj?: Partial<AddDoctorInfoRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
