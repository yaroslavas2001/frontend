import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import FilterRequest from '../../../Pharmacies/Common/Extensions/Models/FilterRequest';
import UpdateSearchWordRequest from '../../../Pharmacies/Admin/Interfaces/Models/SearchService/UpdateSearchWordRequest';
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';
import PaginationResponse from '../../../Common/ResponseModels/PaginationResponse';
import SearchWordResponse from '../../../Pharmacies/Admin/Interfaces/Models/SearchService/SearchWordResponse';

export default class SearchService {
	webApiService: WebApiService;
	DeleteSearchWordEvent = new Events<WsResponseModel<Boolean>>();
	GetSearchWordsEvent = new Events<WsResponseModel<PaginationResponse<SearchWordResponse>>>();
	UpdateSearchWordEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('SearchService', 'DeleteSearchWord', (res: WsResponseModel<Boolean>) => {
			self.DeleteSearchWordEvent.trigger(res);
		});
		webApiService.on('SearchService', 'GetSearchWords', (res: WsResponseModel<PaginationResponse<SearchWordResponse>>) => {
			self.GetSearchWordsEvent.trigger(res);
		});
		webApiService.on('SearchService', 'UpdateSearchWord', (res: WsResponseModel<Boolean>) => {
			self.UpdateSearchWordEvent.trigger(res);
		});
	}
	DeleteSearchWord(id: number = 0) { 	
        this.webApiService.send('SearchService', 'DeleteSearchWord' , id);
    }
	GetSearchWords(request: FilterRequest = null) { 	
        this.webApiService.send('SearchService', 'GetSearchWords' , request);
    }
	UpdateSearchWord(request: UpdateSearchWordRequest = null) { 	
        this.webApiService.send('SearchService', 'UpdateSearchWord' , request);
    }
	 // async methods
	async deleteSearchWordAsync(id: number = 0): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.DeleteSearchWord.bind(this), this.DeleteSearchWordEvent)(id);
	}
	async getSearchWordsAsync(request: FilterRequest = null): Promise<PaginationResponse<SearchWordResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetSearchWords.bind(this), this.GetSearchWordsEvent)(request);
	}
	async updateSearchWordAsync(request: UpdateSearchWordRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.UpdateSearchWord.bind(this), this.UpdateSearchWordEvent)(request);
	}
}