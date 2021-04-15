

export default class WordMatchResponse  {
	Id: number = 0;
	Match?: string = '';
	constructor(obj?: Partial<WordMatchResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
