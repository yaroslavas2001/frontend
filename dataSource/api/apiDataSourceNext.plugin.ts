import ApiDataSource from "./ApiDataSource";

// Для vue 3
export default {
  install: (app, options) => {
    const websocket = new ApiDataSource(options.url);
    if (websocket.webApiService.reconnectEnabled !== undefined)
      websocket.webApiService.reconnectEnabled = options.reconnectEnabled || false;
    app.config.globalProperties.$api = websocket;
  },
};