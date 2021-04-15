import UpdateWordMatchRequest from '../../../../../Pharmacies/Admin/Interfaces/Models/SearchService/UpdateWordMatchRequest';

export default class UpdateSearchWordRequest  {
	Id?: number = null;
	Word?: string = '';
	Matches: Array<UpdateWordMatchRequest> = null;
	MatchesToDelete: Array<number> = null;
	constructor(obj?: Partial<UpdateSearchWordRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
