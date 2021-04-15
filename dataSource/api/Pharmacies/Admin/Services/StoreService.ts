import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import StoresRequest from '../../../Pharmacies/Admin/Interfaces/Models/StoreService/StoresRequest';
import UpdateStoreRequest from '../../../Pharmacies/Admin/Interfaces/Models/StoreService/UpdateStoreRequest';
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';
import PaginationResponse from '../../../Common/ResponseModels/PaginationResponse';
import StoreResponse from '../../../Pharmacies/Admin/Interfaces/Models/StoreService/StoreResponse';

export default class StoreService {
	webApiService: WebApiService;
	GetStoresEvent = new Events<WsResponseModel<PaginationResponse<StoreResponse>>>();
	UpdateStoreEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('StoreService', 'GetStores', (res: WsResponseModel<PaginationResponse<StoreResponse>>) => {
			self.GetStoresEvent.trigger(res);
		});
		webApiService.on('StoreService', 'UpdateStore', (res: WsResponseModel<Boolean>) => {
			self.UpdateStoreEvent.trigger(res);
		});
	}
	GetStores(request: StoresRequest = null) { 	
        this.webApiService.send('StoreService', 'GetStores' , request);
    }
	UpdateStore(request: UpdateStoreRequest = null) { 	
        this.webApiService.send('StoreService', 'UpdateStore' , request);
    }
	 // async methods
	async getStoresAsync(request: StoresRequest = null): Promise<PaginationResponse<StoreResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetStores.bind(this), this.GetStoresEvent)(request);
	}
	async updateStoreAsync(request: UpdateStoreRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.UpdateStore.bind(this), this.UpdateStoreEvent)(request);
	}
}