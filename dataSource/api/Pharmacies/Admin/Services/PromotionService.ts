import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import FilterRequest from '../../../Pharmacies/Common/Extensions/Models/FilterRequest';
import UpdatePromotionRequest from '../../../Pharmacies/Admin/Interfaces/Models/PromotionService/UpdatePromotionRequest';
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';
import PromotionResponse from '../../../Pharmacies/Admin/Interfaces/Models/PromotionService/PromotionResponse';
import PaginationResponse from '../../../Common/ResponseModels/PaginationResponse';
import PromotionShortResponse from '../../../Pharmacies/Admin/Interfaces/Models/PromotionService/PromotionShortResponse';

export default class PromotionService {
	webApiService: WebApiService;
	DeletePromotionEvent = new Events<WsResponseModel<Boolean>>();
	GetPromotionEvent = new Events<WsResponseModel<PromotionResponse>>();
	GetPromotionsEvent = new Events<WsResponseModel<PaginationResponse<PromotionShortResponse>>>();
	UpdatePromotionEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('PromotionService', 'DeletePromotion', (res: WsResponseModel<Boolean>) => {
			self.DeletePromotionEvent.trigger(res);
		});
		webApiService.on('PromotionService', 'GetPromotion', (res: WsResponseModel<PromotionResponse>) => {
			self.GetPromotionEvent.trigger(res);
		});
		webApiService.on('PromotionService', 'GetPromotions', (res: WsResponseModel<PaginationResponse<PromotionShortResponse>>) => {
			self.GetPromotionsEvent.trigger(res);
		});
		webApiService.on('PromotionService', 'UpdatePromotion', (res: WsResponseModel<Boolean>) => {
			self.UpdatePromotionEvent.trigger(res);
		});
	}
	DeletePromotion(id: number = 0) { 	
        this.webApiService.send('PromotionService', 'DeletePromotion' , id);
    }
	GetPromotion(id: number = 0) { 	
        this.webApiService.send('PromotionService', 'GetPromotion' , id);
    }
	GetPromotions(request: FilterRequest = null) { 	
        this.webApiService.send('PromotionService', 'GetPromotions' , request);
    }
	UpdatePromotion(request: UpdatePromotionRequest = null) { 	
        this.webApiService.send('PromotionService', 'UpdatePromotion' , request);
    }
	 // async methods
	async deletePromotionAsync(id: number = 0): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.DeletePromotion.bind(this), this.DeletePromotionEvent)(id);
	}
	async getPromotionAsync(id: number = 0): Promise<PromotionResponse> {
		return EventToAsyncDecorator.getInstance().bind(this.GetPromotion.bind(this), this.GetPromotionEvent)(id);
	}
	async getPromotionsAsync(request: FilterRequest = null): Promise<PaginationResponse<PromotionShortResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetPromotions.bind(this), this.GetPromotionsEvent)(request);
	}
	async updatePromotionAsync(request: UpdatePromotionRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.UpdatePromotion.bind(this), this.UpdatePromotionEvent)(request);
	}
}