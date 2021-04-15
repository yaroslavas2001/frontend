import WordMatchResponse from '../../../../../Pharmacies/Admin/Interfaces/Models/SearchService/WordMatchResponse';

export default class SearchWordResponse  {
	Id: number = 0;
	Word?: string = '';
	Matches: Array<WordMatchResponse> = null;
	constructor(obj?: Partial<SearchWordResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
