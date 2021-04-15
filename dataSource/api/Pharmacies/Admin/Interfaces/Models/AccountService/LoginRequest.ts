

export default class LoginRequest  {
	Login?: string = '';
	Password?: string = '';
	constructor(obj?: Partial<LoginRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}
