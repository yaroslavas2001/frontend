import AddPhotoRequest from '../../../../../Pharmacies/Admin/Interfaces/Models/AddPhotoRequest';

export default class UpdatePromotionRequest  {
	Id?: number = null;
	Title?: string = '';
	Text?: string = '';
	DateFrom: Date = null;
	DateTo: Date = null;
	ItemIds: Array<number> = null;
	AddPhotoRequest: AddPhotoRequest = null;
	constructor(obj?: Partial<UpdatePromotionRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
