import { App } from "vue";
import Dialog from "./dialog";

const install = (app: App) => {
  const dialog = new Dialog();

  // Vue.prototype.$dialog = dialog;

  // (Vue as any).$dialog = dialog;
  app.config.globalProperties.$dialog = dialog;
};

const dialog = {
  install,
};

export default dialog;
