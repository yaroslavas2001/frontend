import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import LoginRequest from '../../../Pharmacies/Admin/Interfaces/Models/AccountService/LoginRequest';
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';
import UserInfoResponse from '../../../Pharmacies/Admin/Interfaces/Models/AccountService/UserInfoResponse';

export default class AccountService {
	webApiService: WebApiService;
	LoginEvent = new Events<WsResponseModel<String>>();
	LogoutEvent = new Events<WsResponseModel<Boolean>>();
	GetUserInfoEvent = new Events<WsResponseModel<UserInfoResponse>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('AccountService', 'Login', (res: WsResponseModel<String>) => {
			self.LoginEvent.trigger(res);
		});
		webApiService.on('AccountService', 'Logout', (res: WsResponseModel<Boolean>) => {
			self.LogoutEvent.trigger(res);
		});
		webApiService.on('AccountService', 'GetUserInfo', (res: WsResponseModel<UserInfoResponse>) => {
			self.GetUserInfoEvent.trigger(res);
		});
	}
	Login(request: LoginRequest = null) { 	
        this.webApiService.send('AccountService', 'Login' , request);
    }
	Logout() { 	
        this.webApiService.send('AccountService', 'Logout' );
    }
	GetUserInfo() { 	
        this.webApiService.send('AccountService', 'GetUserInfo' );
    }
	 // async methods
	async loginAsync(request: LoginRequest = null): Promise<String> {
		return EventToAsyncDecorator.getInstance().bind(this.Login.bind(this), this.LoginEvent)(request);
	}
	async logoutAsync(): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.Logout.bind(this), this.LogoutEvent)();
	}
	async getUserInfoAsync(): Promise<UserInfoResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetUserInfo.bind(this), this.GetUserInfoEvent)();
	}
}