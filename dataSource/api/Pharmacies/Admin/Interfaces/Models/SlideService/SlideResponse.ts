

export default class SlideResponse  {
	Id: number = 0;
	Text?: string = '';
	ImageUrl?: string = '';
	IndexNumber: number = 0;
	constructor(obj?: Partial<SlideResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
