import AddPhotoRequest from '../../../../../Pharmacies/Admin/Interfaces/Models/AddPhotoRequest';

export default class UpdateItemRequest  {
	Id: number = 0;
	AddPhotoRequest: AddPhotoRequest = null;
	IsBestSeller: boolean = false;
	IsNew: boolean = false;
	IsRecomendedToDoctors: boolean = false;
	constructor(obj?: Partial<UpdateItemRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
