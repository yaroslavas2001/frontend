

export default class UserInfoResponse  {
	Login?: string = '';
	constructor(obj?: Partial<UserInfoResponse>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
