import { App } from "vue";
import LocaleProvider from "./localization";

const install = (app: App) => {
  const locale = LocaleProvider;

  app.config.globalProperties.$locale = locale;
};

const locale = {
  install,
};

export default locale;
