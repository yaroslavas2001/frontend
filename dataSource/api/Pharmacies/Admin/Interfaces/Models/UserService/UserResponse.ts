

export default class UserResponse  {
	Id: number = 0;
	Name?: string = '';
	City?: string = '';
	Phone?: string = '';
	Role?: string = '';
	constructor(obj?: Partial<UserResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
