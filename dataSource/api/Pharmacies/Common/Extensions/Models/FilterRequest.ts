import PaginationRequest from '../../../../Common/RequestModels/PaginationRequest';
import SearchRequest from '../../../../Pharmacies/Common/Extensions/Models/SearchRequest';
import SortRequest from '../../../../Pharmacies/Common/Extensions/Models/SortRequest';

export default class FilterRequest  {
	Pagination: PaginationRequest = null;
	Search: Array<SearchRequest> = null;
	Sort: SortRequest = null;
	constructor(obj?: Partial<FilterRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
