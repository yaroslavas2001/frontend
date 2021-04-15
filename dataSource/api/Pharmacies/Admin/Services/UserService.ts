import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import UpdateAdminRequest from '../../../Pharmacies/Admin/Interfaces/Models/UserService/UpdateAdminRequest';
import UpdateUserRequest from '../../../Pharmacies/Admin/Interfaces/Models/UserService/UpdateUserRequest';
import DeleteUserRequest from '../../../Pharmacies/Admin/Interfaces/Models/UserService/DeleteUserRequest';
import FilterRequest from '../../../Pharmacies/Common/Extensions/Models/FilterRequest';
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';
import PaginationResponse from '../../../Common/ResponseModels/PaginationResponse';
import UserResponse from '../../../Pharmacies/Admin/Interfaces/Models/UserService/UserResponse';

export default class UserService {
	webApiService: WebApiService;
	UpdateAdminEvent = new Events<WsResponseModel<Boolean>>();
	UpdateUserEvent = new Events<WsResponseModel<Boolean>>();
	DeleteUserEvent = new Events<WsResponseModel<Boolean>>();
	GetUsersEvent = new Events<WsResponseModel<PaginationResponse<UserResponse>>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('UserService', 'UpdateAdmin', (res: WsResponseModel<Boolean>) => {
			self.UpdateAdminEvent.trigger(res);
		});
		webApiService.on('UserService', 'UpdateUser', (res: WsResponseModel<Boolean>) => {
			self.UpdateUserEvent.trigger(res);
		});
		webApiService.on('UserService', 'DeleteUser', (res: WsResponseModel<Boolean>) => {
			self.DeleteUserEvent.trigger(res);
		});
		webApiService.on('UserService', 'GetUsers', (res: WsResponseModel<PaginationResponse<UserResponse>>) => {
			self.GetUsersEvent.trigger(res);
		});
	}
	UpdateAdmin(request: UpdateAdminRequest = null) { 	
        this.webApiService.send('UserService', 'UpdateAdmin' , request);
    }
	UpdateUser(request: UpdateUserRequest = null) { 	
        this.webApiService.send('UserService', 'UpdateUser' , request);
    }
	DeleteUser(request: DeleteUserRequest = null) { 	
        this.webApiService.send('UserService', 'DeleteUser' , request);
    }
	GetUsers(request: FilterRequest = null) { 	
        this.webApiService.send('UserService', 'GetUsers' , request);
    }
	 // async methods
	async updateAdminAsync(request: UpdateAdminRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.UpdateAdmin.bind(this), this.UpdateAdminEvent)(request);
	}
	async updateUserAsync(request: UpdateUserRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.UpdateUser.bind(this), this.UpdateUserEvent)(request);
	}
	async deleteUserAsync(request: DeleteUserRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.DeleteUser.bind(this), this.DeleteUserEvent)(request);
	}
	async getUsersAsync(request: FilterRequest = null): Promise<PaginationResponse<UserResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetUsers.bind(this), this.GetUsersEvent)(request);
	}
}