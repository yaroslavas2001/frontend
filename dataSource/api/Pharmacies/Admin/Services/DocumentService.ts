import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';

export default class DocumentService {
	webApiService: WebApiService;
	GetTermsOfUseEvent = new Events<WsResponseModel<String>>();
	SaveTermsOfUseEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('DocumentService', 'GetTermsOfUse', (res: WsResponseModel<String>) => {
			self.GetTermsOfUseEvent.trigger(res);
		});
		webApiService.on('DocumentService', 'SaveTermsOfUse', (res: WsResponseModel<Boolean>) => {
			self.SaveTermsOfUseEvent.trigger(res);
		});
	}
	GetTermsOfUse() { 	
        this.webApiService.send('DocumentService', 'GetTermsOfUse' );
    }
	SaveTermsOfUse(text: string = '') { 	
        this.webApiService.send('DocumentService', 'SaveTermsOfUse' , text);
    }
	 // async methods
	async getTermsOfUseAsync(): Promise<String> {
		return EventToAsyncDecorator.getInstance().bind(this.GetTermsOfUse.bind(this), this.GetTermsOfUseEvent)();
	}
	async saveTermsOfUseAsync(text: string = ''): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.SaveTermsOfUse.bind(this), this.SaveTermsOfUseEvent)(text);
	}
}