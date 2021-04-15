import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import apiDataSourcePlugin from "../dataSource/api/apiDataSourceNext.plugin";
// import apiDataSourcePlugin from "../dataSource/api/apiDataSourceNext.plugin";
import UiModalWindow from "@views/components/ui-modal-window/ui-modal-window.vue";
import UiTable from "@views/components/ui-table/ui-table.vue";
import UiPagination from "@components/ui-table/ui-pagination.vue";
import UiTableHeaderItem from "@views/components/ui-table/ui-table-header-item.vue";
import UiTableBodyItem from "@views/components/ui-table/ui-table-body-item.vue";
import UiDropdown from "@views/components/ui-dropdown/ui-dropdown.vue";
import UiButton from "@components/ui-button.vue";
import UiLoading from "@components/ui-loading.vue";
import CropImagePreview from "@components/ui-crop-image/crop-image-preview.vue";
import UiImagePreview from "@components/ui-crop-image/ui-image-preview.vue";
import UiCropImage from "@components/ui-crop-image/ui-crop-image.vue";
import UiFileInput from "@components/ui-file-input.vue";
import UiCheckbox from "@components/ui-checkbox.vue";
import UiDatePicker from "@components/ui-date-picker/ui-date-picker.vue";
import SubCategory from "@views/product-categories/sub-category.vue";
import ControlValidatorGroup from "@views/components/control-validator-group.vue";
import BsCol from "@views/components/bootstrap/bs-col.vue";
import BsRow from "@views/components/bootstrap/bs-row.vue";
import BsContainer from "@views/components/bootstrap/bs-container.vue";
//plagins
import ErrorHandler from "./plugins/errorHandler";
import UiDialog from "./plugins/dialog/plugin.dialog";
import Notification from "./plugins/notification/plugin.notification";

import Locale from "./plugins/localization/plugin.localization";

import StorageManipulatorPlugin from "@/plugins/storageManipulator";
import { suppressDeprecationWarnings } from "moment";
const app = createApp(App);

app.use(Notification, {});
app.use(UiDialog, {});
app.use(Locale, {});
app.use(ErrorHandler, {
  handler: (err: Error) => {
    app.config.globalProperties.$notification.error(err);
  },
});
// app.use(Locale, {});
function maskerValue(v, m, tkn) {
  debugger;
  const value = v || "";
  const mask = m || "";
  let maskIndex = 0;
  let valueIndex = 0;
  let output = "";
  while (maskIndex < mask.length && valueIndex < value.length) {
    let maskCharacter = mask[maskIndex];
    const masker = tkn[maskCharacter];
    const valueCharacter = value[valueIndex];
    if (masker && !masker.escape) {
      if (masker.pattern.test(valueCharacter)) {
        output += masker.transform ? masker.transform(valueCharacter) : valueCharacter;
        maskIndex += 1;
      }
      valueIndex += 1;
    } else {
      if (masker && masker.escape) {
        maskIndex += 1;
        maskCharacter = mask[maskIndex];
      }
      output += maskCharacter;
      if (valueCharacter === maskCharacter) valueIndex += 1;
      maskIndex += 1;
    }
  }
  let outputRest = "";
  while (maskIndex < mask.length) {
    const maskCharacter = mask[maskIndex];
    if (tkn[maskCharacter]) {
      outputRest = "";
      break;
    }
    outputRest += maskCharacter;
    maskIndex += 1;
  }
  return output + outputRest;
}
//end of maskerValue function
app.directive("input-mask", {
  beforeMount(el, binding, vnode, prevVnode) {
    let x = el.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,3})/);
    el.value = x[1] + (x[2] ? "-" + x[2] : "") + (x[3] ? "-" + x[3] : "");
  },
  mounted(el, binding, vnode, prevVnode) {
    console.log(`input-mask mounted`);

    let x = el.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,3})/);
    el.value = x[1] + (x[2] ? "-" + x[2] : "") + (x[3] ? "-" + x[3] : "");
  },
  beforeUpdate() {}, // new
  updated(el, binding) {
    console.log(`input-mask updated`);

    let x = el.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,3})/);
    el.value = x[1] + (x[2] ? "-" + x[2] : "") + (x[3] ? "-" + x[3] : "");
  },
  beforeUnmount() {}, // new
  unmounted(el) {},
});

// app.use(StorageManipulatorPlugin);
//http://192.168.1.188:7500/
//ws://pmr-medications-admin.tirscript.com/websocke

app.use(router);
// app.use(apiDataSourcePlugin, { url: `ws://${location.host}/websocket`, reconnectEnabled: true });

app.component("ui-modal-window", UiModalWindow);
app.component("ui-table-header-item", UiTableHeaderItem);
app.component("ui-pagination", UiPagination);
app.component("ui-table-body-item", UiTableBodyItem);
app.component("ui-table", UiTable);
app.component("ui-dropdown", UiDropdown);
app.component("ui-button", UiButton);
app.component("ui-checkbox", UiCheckbox);
app.component("ui-loading", UiLoading);
app.component("ui-image-preview", UiImagePreview);
app.component("ui-crop-image", UiCropImage);
app.component("ui-file-input", UiFileInput);
app.component("ui-date-picker", UiDatePicker);
app.component("sub-category", SubCategory);
app.component("control-validation-group", ControlValidatorGroup);
app.component("bs-row", BsRow);
app.component("bs-col", BsCol);
app.component("bs-container", BsContainer);

app.mount("#app");
