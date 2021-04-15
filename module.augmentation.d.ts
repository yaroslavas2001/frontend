// 1. Обязательно импортируйте Vue перед объявлением расширенных типов
import Vue from "vue";

import Api from "./dataSource/api/apiDataSource";
import Dialog from "./src/plugins/dialog/dialog";
import LocaleProvider from "./src/plugins/localization/localization";
import Notification from "./src/plugins/notification/notification";

// import DataSource from 'scripts/DataSource/dataSource';

// 2. Укажите файл с типами, которые вы хотите расширить
//    Vue имеет тип конструктора в types/vue.d.ts
declare module "vue/types/vue" {
  // 3. Объявите расширение для Vue
  interface Vue {
    // $dataSource: DataSource
    $api: Api;
    $dialog: Dialog;
    $notification: Notification;
    // $locale: LocaleProvider;

    // $store: Store;
  }
  interface VueConstructor {
    $api: Api;
    $dialog: Dialog;
    $notification: Notification;
    // $locale: LocaleProvider;

    // $store: Store;

    // $dataSource: DataSource
  }
}
