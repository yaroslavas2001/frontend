import AddPhotoRequest from '../../../../../Pharmacies/Admin/Interfaces/Models/AddPhotoRequest';

export default class UpdateSlideRequest  {
	Id?: number = null;
	Text?: string = '';
	AddPhotoRequest: AddPhotoRequest = null;
	IndexNumber: number = 0;
	constructor(obj?: Partial<UpdateSlideRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
