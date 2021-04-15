import { Vue } from "vue-class-component";
import ApiDataSource from "../dataSource/api/ApiDataSource";

class api extends ApiDataSource {
  private static _instance: api = null;

  constructor() {
    //ws://192.168.1.188:7500/websocket
    // super("ws://pmr-medications-admin.tirscript.com/websocket");

    super(`ws://${process.env.VUE_APP_BASE_URL}/websocket`);
    if (api._instance) {
      throw new Error("Error: Instantiation failed. Singleton module! Use .getInstance() instead of new.");
    }
    api._instance = this;
    api._instance.webApiService.reconnectEnabled = true;
  }

  public static getInstance(): api {
    if (api._instance === null) {
      api._instance = new api();
    }
    return api._instance;
  }
}
export default api;
