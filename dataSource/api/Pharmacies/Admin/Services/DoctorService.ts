import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import AddPhotoRequest from '../../../Pharmacies/Admin/Interfaces/Models/AddPhotoRequest';
import FilterRequest from '../../../Pharmacies/Common/Extensions/Models/FilterRequest';
import AddDoctorInfoRequest from '../../../Pharmacies/Admin/Interfaces/Models/DoctorService/AddDoctorInfoRequest';
import PaginationRequest from '../../../Common/RequestModels/PaginationRequest';
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';
import PaginationResponse from '../../../Common/ResponseModels/PaginationResponse';
import DoctorInfoResponse from '../../../Pharmacies/Admin/Interfaces/Models/DoctorService/DoctorInfoResponse';

export default class DoctorService {
	webApiService: WebApiService;
	AddImagesEvent = new Events<WsResponseModel<Boolean>>();
	DeleteImagesEvent = new Events<WsResponseModel<Boolean>>();
	GetDoctorInfosEvent = new Events<WsResponseModel<PaginationResponse<DoctorInfoResponse>>>();
	ChangeDoctorInfoActivityEvent = new Events<WsResponseModel<Boolean>>();
	UpdateDoctorInfoEvent = new Events<WsResponseModel<Boolean>>();
	GetImagesEvent = new Events<WsResponseModel<PaginationResponse<String>>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('DoctorService', 'AddImages', (res: WsResponseModel<Boolean>) => {
			self.AddImagesEvent.trigger(res);
		});
		webApiService.on('DoctorService', 'DeleteImages', (res: WsResponseModel<Boolean>) => {
			self.DeleteImagesEvent.trigger(res);
		});
		webApiService.on('DoctorService', 'GetDoctorInfos', (res: WsResponseModel<PaginationResponse<DoctorInfoResponse>>) => {
			self.GetDoctorInfosEvent.trigger(res);
		});
		webApiService.on('DoctorService', 'ChangeDoctorInfoActivity', (res: WsResponseModel<Boolean>) => {
			self.ChangeDoctorInfoActivityEvent.trigger(res);
		});
		webApiService.on('DoctorService', 'UpdateDoctorInfo', (res: WsResponseModel<Boolean>) => {
			self.UpdateDoctorInfoEvent.trigger(res);
		});
		webApiService.on('DoctorService', 'GetImages', (res: WsResponseModel<PaginationResponse<String>>) => {
			self.GetImagesEvent.trigger(res);
		});
	}
	AddImages(images: Array<AddPhotoRequest> = null) { 	
        this.webApiService.send('DoctorService', 'AddImages' , images);
    }
	DeleteImages(images: Array<string> = null) { 	
        this.webApiService.send('DoctorService', 'DeleteImages' , images);
    }
	GetDoctorInfos(request: FilterRequest = null) { 	
        this.webApiService.send('DoctorService', 'GetDoctorInfos' , request);
    }
	ChangeDoctorInfoActivity(id: number = 0) { 	
        this.webApiService.send('DoctorService', 'ChangeDoctorInfoActivity' , id);
    }
	UpdateDoctorInfo(request: AddDoctorInfoRequest = null) { 	
        this.webApiService.send('DoctorService', 'UpdateDoctorInfo' , request);
    }
	GetImages(request: PaginationRequest = null) { 	
        this.webApiService.send('DoctorService', 'GetImages' , request);
    }
	 // async methods
	async addImagesAsync(images: Array<AddPhotoRequest> = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.AddImages.bind(this), this.AddImagesEvent)(images);
	}
	async deleteImagesAsync(images: Array<string> = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.DeleteImages.bind(this), this.DeleteImagesEvent)(images);
	}
	async getDoctorInfosAsync(request: FilterRequest = null): Promise<PaginationResponse<DoctorInfoResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetDoctorInfos.bind(this), this.GetDoctorInfosEvent)(request);
	}
	async changeDoctorInfoActivityAsync(id: number = 0): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.ChangeDoctorInfoActivity.bind(this), this.ChangeDoctorInfoActivityEvent)(id);
	}
	async updateDoctorInfoAsync(request: AddDoctorInfoRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.UpdateDoctorInfo.bind(this), this.UpdateDoctorInfoEvent)(request);
	}
	async getImagesAsync(request: PaginationRequest = null): Promise<PaginationResponse<String>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetImages.bind(this), this.GetImagesEvent)(request);
	}
}