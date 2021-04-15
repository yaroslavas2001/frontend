

export default class ItemResponse  {
	Id: number = 0;
	Name?: string = '';
	Producer?: string = '';
	Categories: Array<string> = null;
	Stores: Array<number> = null;
	IsNew: boolean = false;
	IsBestSeller: boolean = false;
	IsRecomendedToDoctor: boolean = false;
	ImageUrl?: string = '';
	constructor(obj?: Partial<ItemResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
