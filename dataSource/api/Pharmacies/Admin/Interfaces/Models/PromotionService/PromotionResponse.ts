import ItemShortResponse from '../../../../../Pharmacies/Admin/Interfaces/Models/ItemService/ItemShortResponse';

export default class PromotionResponse  {
	Id: number = 0;
	Title?: string = '';
	Text?: string = '';
	DateFrom: Date = null;
	DateTo: Date = null;
	Items: Array<ItemShortResponse> = null;
	ImageUrl?: string = '';
	constructor(obj?: Partial<PromotionResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
