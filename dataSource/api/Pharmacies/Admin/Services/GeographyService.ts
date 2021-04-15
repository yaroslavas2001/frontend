import { WebApiService } from '../../../plugins/webApiService'
import { Events } from '../../../plugins/events'
import EventToAsyncDecorator from '../../../plugins/eventToAsyncDecorator'
import FilterRequest from '../../../Pharmacies/Common/Extensions/Models/FilterRequest';
import UpdateCityRequest from '../../../Pharmacies/Admin/Interfaces/Models/GeographyService/UpdateCityRequest';
import UpdateCountryRequest from '../../../Pharmacies/Admin/Interfaces/Models/GeographyService/UpdateCountryRequest';
import WsResponseModel from '../../../SchemaBuilderServer/Models/WsResponseModel';
import PaginationResponse from '../../../Common/ResponseModels/PaginationResponse';
import CityResponse from '../../../Pharmacies/Admin/Interfaces/Models/GeographyService/CityResponse';
import CountryResponse from '../../../Pharmacies/Admin/Interfaces/Models/GeographyService/CountryResponse';

export default class GeographyService {
	webApiService: WebApiService;
	DeleteCityEvent = new Events<WsResponseModel<Boolean>>();
	DeleteCountryEvent = new Events<WsResponseModel<Boolean>>();
	GetCitiesEvent = new Events<WsResponseModel<PaginationResponse<CityResponse>>>();
	GetCountriesEvent = new Events<WsResponseModel<PaginationResponse<CountryResponse>>>();
	UpdateCityEvent = new Events<WsResponseModel<Boolean>>();
	UpdateCountryEvent = new Events<WsResponseModel<Boolean>>();
	constructor(webApiService: WebApiService) {
		const self = this;
		this.webApiService = webApiService;
		webApiService.on('GeographyService', 'DeleteCity', (res: WsResponseModel<Boolean>) => {
			self.DeleteCityEvent.trigger(res);
		});
		webApiService.on('GeographyService', 'DeleteCountry', (res: WsResponseModel<Boolean>) => {
			self.DeleteCountryEvent.trigger(res);
		});
		webApiService.on('GeographyService', 'GetCities', (res: WsResponseModel<PaginationResponse<CityResponse>>) => {
			self.GetCitiesEvent.trigger(res);
		});
		webApiService.on('GeographyService', 'GetCountries', (res: WsResponseModel<PaginationResponse<CountryResponse>>) => {
			self.GetCountriesEvent.trigger(res);
		});
		webApiService.on('GeographyService', 'UpdateCity', (res: WsResponseModel<Boolean>) => {
			self.UpdateCityEvent.trigger(res);
		});
		webApiService.on('GeographyService', 'UpdateCountry', (res: WsResponseModel<Boolean>) => {
			self.UpdateCountryEvent.trigger(res);
		});
	}
	DeleteCity(id: number = 0) { 	
        this.webApiService.send('GeographyService', 'DeleteCity' , id);
    }
	DeleteCountry(id: number = 0) { 	
        this.webApiService.send('GeographyService', 'DeleteCountry' , id);
    }
	GetCities(request: FilterRequest = null) { 	
        this.webApiService.send('GeographyService', 'GetCities' , request);
    }
	GetCountries(request: FilterRequest = null) { 	
        this.webApiService.send('GeographyService', 'GetCountries' , request);
    }
	UpdateCity(request: UpdateCityRequest = null) { 	
        this.webApiService.send('GeographyService', 'UpdateCity' , request);
    }
	UpdateCountry(request: UpdateCountryRequest = null) { 	
        this.webApiService.send('GeographyService', 'UpdateCountry' , request);
    }
	 // async methods
	async deleteCityAsync(id: number = 0): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.DeleteCity.bind(this), this.DeleteCityEvent)(id);
	}
	async deleteCountryAsync(id: number = 0): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.DeleteCountry.bind(this), this.DeleteCountryEvent)(id);
	}
	async getCitiesAsync(request: FilterRequest = null): Promise<PaginationResponse<CityResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetCities.bind(this), this.GetCitiesEvent)(request);
	}
	async getCountriesAsync(request: FilterRequest = null): Promise<PaginationResponse<CountryResponse>> {
		return EventToAsyncDecorator.getInstance().bind(this.GetCountries.bind(this), this.GetCountriesEvent)(request);
	}
	async updateCityAsync(request: UpdateCityRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.UpdateCity.bind(this), this.UpdateCityEvent)(request);
	}
	async updateCountryAsync(request: UpdateCountryRequest = null): Promise<Boolean> {
		return EventToAsyncDecorator.getInstance().bind(this.UpdateCountry.bind(this), this.UpdateCountryEvent)(request);
	}
}