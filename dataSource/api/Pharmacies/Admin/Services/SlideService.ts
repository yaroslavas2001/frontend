import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import FilterRequest from '../../../Pharmacies/Common/Extensions/Models/FilterRequest';
import UpdateSlideRequest from '../../../Pharmacies/Admin/Interfaces/Models/SlideService/UpdateSlideRequest';
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';
import PaginationResponse from '../../../Common/ResponseModels/PaginationResponse';
import SlideResponse from '../../../Pharmacies/Admin/Interfaces/Models/SlideService/SlideResponse';

export default class SlideService {
	webApiService: WebApiService;
	DeleteSlideEvent = new Events<WsResponseModel<Boolean>>();
	GetSlidesEvent = new Events<WsResponseModel<PaginationResponse<SlideResponse>>>();
	UpdateSlideEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('SlideService', 'DeleteSlide', (res: WsResponseModel<Boolean>) => {
			self.DeleteSlideEvent.trigger(res);
		});
		webApiService.on('SlideService', 'GetSlides', (res: WsResponseModel<PaginationResponse<SlideResponse>>) => {
			self.GetSlidesEvent.trigger(res);
		});
		webApiService.on('SlideService', 'UpdateSlide', (res: WsResponseModel<Boolean>) => {
			self.UpdateSlideEvent.trigger(res);
		});
	}
	DeleteSlide(id: number = 0) { 	
        this.webApiService.send('SlideService', 'DeleteSlide' , id);
    }
	GetSlides(request: FilterRequest = null) { 	
        this.webApiService.send('SlideService', 'GetSlides' , request);
    }
	UpdateSlide(request: UpdateSlideRequest = null) { 	
        this.webApiService.send('SlideService', 'UpdateSlide' , request);
    }
	 // async methods
	async deleteSlideAsync(id: number = 0): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.DeleteSlide.bind(this), this.DeleteSlideEvent)(id);
	}
	async getSlidesAsync(request: FilterRequest = null): Promise<PaginationResponse<SlideResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetSlides.bind(this), this.GetSlidesEvent)(request);
	}
	async updateSlideAsync(request: UpdateSlideRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.UpdateSlide.bind(this), this.UpdateSlideEvent)(request);
	}
}