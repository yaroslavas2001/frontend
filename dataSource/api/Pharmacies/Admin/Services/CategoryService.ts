import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';
import CategoryResponse from '../../../Pharmacies/Admin/Interfaces/Models/CategoryService/CategoryResponse';

export default class CategoryService {
	webApiService: WebApiService;
	GetCategoriesEvent = new Events<WsResponseModel<Array<CategoryResponse>>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('CategoryService', 'GetCategories', (res: WsResponseModel<Array<CategoryResponse>>) => {
			self.GetCategoriesEvent.trigger(res);
		});
	}
	GetCategories() { 	
        this.webApiService.send('CategoryService', 'GetCategories' );
    }
	 // async methods
	async getCategoriesAsync(): Promise<Array<CategoryResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetCategories.bind(this), this.GetCategoriesEvent)();
	}
}