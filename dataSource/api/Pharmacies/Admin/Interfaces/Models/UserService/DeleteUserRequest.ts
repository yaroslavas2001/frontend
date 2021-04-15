

export default class DeleteUserRequest  {
	Password?: string = '';
	Id: number = 0;
	constructor(obj?: Partial<DeleteUserRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
