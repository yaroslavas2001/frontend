

export default class UpdateWordMatchRequest  {
	Id?: number = null;
	Match?: string = '';
	constructor(obj?: Partial<UpdateWordMatchRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
