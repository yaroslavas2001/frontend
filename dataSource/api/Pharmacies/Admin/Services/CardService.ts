import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import FilterRequest from '../../../Pharmacies/Common/Extensions/Models/FilterRequest';
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';
import PaginationResponse from '../../../Common/ResponseModels/PaginationResponse';
import CardResponse from '../../../Pharmacies/Admin/Interfaces/Models/CardService/CardResponse';

export default class CardService {
	webApiService: WebApiService;
	GetDiscountCardsEvent = new Events<WsResponseModel<PaginationResponse<CardResponse>>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('CardService', 'GetDiscountCards', (res: WsResponseModel<PaginationResponse<CardResponse>>) => {
			self.GetDiscountCardsEvent.trigger(res);
		});
	}
	GetDiscountCards(request: FilterRequest = null) { 	
        this.webApiService.send('CardService', 'GetDiscountCards' , request);
    }
	 // async methods
	async getDiscountCardsAsync(request: FilterRequest = null): Promise<PaginationResponse<CardResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetDiscountCards.bind(this), this.GetDiscountCardsEvent)(request);
	}
}