import CategoryResponse from '../../../../../Pharmacies/Admin/Interfaces/Models/CategoryService/CategoryResponse';

export default class CategoryResponse  {
	Id: number = 0;
	Name?: string = '';
	ImageUrl?: string = '';
	ParentId?: number = null;
	ChildCategories: Array<CategoryResponse> = null;
	constructor(obj?: Partial<CategoryResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
