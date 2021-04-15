import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import ItemsRequest from '../../../Pharmacies/Admin/Interfaces/Models/ItemService/ItemsRequest';
import UpdateItemRequest from '../../../Pharmacies/Admin/Interfaces/Models/ItemService/UpdateItemRequest';
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';
import PaginationResponse from '../../../Common/ResponseModels/PaginationResponse';
import ItemResponse from '../../../Pharmacies/Admin/Interfaces/Models/ItemService/ItemResponse';

export default class ItemService {
	webApiService: WebApiService;
	GetItemsEvent = new Events<WsResponseModel<PaginationResponse<ItemResponse>>>();
	UpdateItemEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('ItemService', 'GetItems', (res: WsResponseModel<PaginationResponse<ItemResponse>>) => {
			self.GetItemsEvent.trigger(res);
		});
		webApiService.on('ItemService', 'UpdateItem', (res: WsResponseModel<Boolean>) => {
			self.UpdateItemEvent.trigger(res);
		});
	}
	GetItems(request: ItemsRequest = null) { 	
        this.webApiService.send('ItemService', 'GetItems' , request);
    }
	UpdateItem(request: UpdateItemRequest = null) { 	
        this.webApiService.send('ItemService', 'UpdateItem' , request);
    }
	 // async methods
	async getItemsAsync(request: ItemsRequest = null): Promise<PaginationResponse<ItemResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetItems.bind(this), this.GetItemsEvent)(request);
	}
	async updateItemAsync(request: UpdateItemRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.UpdateItem.bind(this), this.UpdateItemEvent)(request);
	}
}