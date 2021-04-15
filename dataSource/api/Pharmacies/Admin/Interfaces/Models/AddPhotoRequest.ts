

export default class AddPhotoRequest  {
	Width: number = 0;
	Height: number = 0;
	Top: number = 0;
	Left: number = 0;
	Base64Image?: string = '';
	constructor(obj?: Partial<AddPhotoRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
