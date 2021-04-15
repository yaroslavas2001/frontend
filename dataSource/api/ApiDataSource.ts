import { WebApiService } from './plugins/webApiService';
import AuthPlugin from './plugins/authPlugin';
import { IUserResponse } from './plugins/authPlugin';
import AccountService from './Pharmacies/Admin/Services/AccountService';
import CardService from './Pharmacies/Admin/Services/CardService';
import CategoryService from './Pharmacies/Admin/Services/CategoryService';
import DoctorService from './Pharmacies/Admin/Services/DoctorService';
import DocumentService from './Pharmacies/Admin/Services/DocumentService';
import GeographyService from './Pharmacies/Admin/Services/GeographyService';
import ItemService from './Pharmacies/Admin/Services/ItemService';
import PromotionService from './Pharmacies/Admin/Services/PromotionService';
import SearchService from './Pharmacies/Admin/Services/SearchService';
import SlideService from './Pharmacies/Admin/Services/SlideService';
import StoreService from './Pharmacies/Admin/Services/StoreService';
import UserService from './Pharmacies/Admin/Services/UserService';
import WsCallbacks from './WebSocketControllers/Core/WsCallbacks'

export default class ApiDataSource {
	webApiService: WebApiService;
	private authPlugin: AuthPlugin;
	AccountService: AccountService;
	CardService: CardService;
	CategoryService: CategoryService;
	DoctorService: DoctorService;
	DocumentService: DocumentService;
	GeographyService: GeographyService;
	ItemService: ItemService;
	PromotionService: PromotionService;
	SearchService: SearchService;
	SlideService: SlideService;
	StoreService: StoreService;
	UserService: UserService;
	WsCallbacks: WsCallbacks;
	constructor(webApiUrl: string) {
		this.webApiService = new WebApiService(webApiUrl);
		this.AccountService = new AccountService(this.webApiService);
		this.CardService = new CardService(this.webApiService);
		this.CategoryService = new CategoryService(this.webApiService);
		this.DoctorService = new DoctorService(this.webApiService);
		this.DocumentService = new DocumentService(this.webApiService);
		this.GeographyService = new GeographyService(this.webApiService);
		this.ItemService = new ItemService(this.webApiService);
		this.PromotionService = new PromotionService(this.webApiService);
		this.SearchService = new SearchService(this.webApiService);
		this.SlideService = new SlideService(this.webApiService);
		this.StoreService = new StoreService(this.webApiService);
		this.UserService = new UserService(this.webApiService);
		this.WsCallbacks = new WsCallbacks(this.webApiService);
		// плагин авторизации
		this.authPlugin = new AuthPlugin(this.AccountService as any);
	}

	public get User(): IUserResponse {
		return this.authPlugin.User;
	}
	public get isLoggedIn(): boolean {
		return this.authPlugin.isLoggedIn;
	}
	public SetUser(user: IUserResponse) {
		this.authPlugin.setUser(user);
	}
}
