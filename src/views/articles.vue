<template>
  <page
    name="Статьи"
    class="articles"
    :getDataFuncAsync="getDataFuncAsync"
    :filter="filter"
    @onAdd="onAdd"
    ref="page"
    defaultSearchField="Title"
  >
    <template v-slot:filter> </template>
    <template #content="innerItems">
      <ui-table
        :items="innerItems.items"
        template-columns="100px auto auto auto 50px"
        style="overflow-x: auto"
      >
        <template #header>
          <ui-table-header-item
            :sort-name="'Id'"
            default-sort="'asc'"
            @onSort="onSort"
          >
            #</ui-table-header-item
          >
          <ui-table-header-item
            :sort-name="'Title'"
            default-sort="'asc'"
            @onSort="onSort"
            >Заголовок</ui-table-header-item
          >
          <ui-table-header-item>Ссылка</ui-table-header-item>
          <ui-table-header-item
            :sort-name="'IsActive'"
            default-sort="'asc'"
            @onSort="onSort"
            >Активные</ui-table-header-item
          >

          <ui-table-header-item />
        </template>

        <template #body="data">
          <ui-table-body-item>
            {{ data.item.Id }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Title }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Link }}
          </ui-table-body-item>
          <ui-table-body-item class="justify-content-center">
            <ui-checkbox
              icon="icon-apteka-tick"
              v-model="data.item.IsActive"
              @update:modelValue="onChangeActive(data.item, $event)"
            ></ui-checkbox>
          </ui-table-body-item>

          <ui-table-body-item>
            <div
              class="icon-apteka-pencil pointer"
              @click="onEdit(data.item)"
            ></div>
          </ui-table-body-item>
          <!-- <ui-table-body-item>
            <div
              class="icon-apteka-delete pointer"
              @click="onDelete(data.item)"
            ></div>
          </ui-table-body-item> -->
        </template>
      </ui-table>
    </template>
    <template #modal-window>
      <ui-modal-window
        :autoClose="false"
        :title="item.Title"
        :visible="isVisibleModalWindow"
        width="600px"
        @close="closeModalWindow"
      >
        <template #default>
          <div class="row">
            <div class="col-5 mb-4">
              <ui-image-preview v-model="image" required :el-hight="200" />
            </div>
            <div class="col">
              <label>Заголовок:</label>
              <div class="ui-input mb-3">
                <input v-model="item.Title" placeholder="..." tabindex="10" />
              </div>

              <label>Текст</label>
              <div class="mb-3 w-100">
                <textarea
                  class="ui-textarea"
                  v-model="item.Text"
                  style="resize: none; width: 100%"
                  placeholder="..."
                  tabindex="11"
                  rows="8"
                  no
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Ссылка</label>
              <div class="mb-2 ui-input">
                <input v-model="item.Link" placeholder="..." tabindex="13" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <ui-checkbox icon="icon-apteka-tick" v-model="item.IsActive">
                <label>Активная</label>
              </ui-checkbox>
            </div>
          </div>
        </template>
        <template #button>
          <div class="row py-3">
            <div class="col d-flex justify-content-center">
              <ui-button
                @onClick="onSave"
                :width="100"
                active
                style="margin-right: 10px"
              >
                Сохранить</ui-button
              >
              <ui-button @onClick="onCancel" :width="100"> Отменить </ui-button>
            </div>
          </div>
        </template>
      </ui-modal-window>
    </template>
  </page>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import moment from "moment";
import Page from "@views/components/page.vue";

import ListViewItem from "@views/components/list-view/ListViewItem";

import defaultModel from "@views/a-model/default-model";

import FilterRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/FilterRequest";

import api from "@/api";

import SearchRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/SearchRequest";
import SortRequest from "dataSource/api/Pharmacies/Common/Extensions/Models/SortRequest";
import UserResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/UserService/UserResponse";
import DoctorInfoResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/DoctorService/DoctorInfoResponse";
import AddDoctorInfoRequest from "dataSource/api/Pharmacies/Admin/Interfaces/Models/DoctorService/AddDoctorInfoRequest";
import CropImageViewModel from "./components/ui-crop-image/cropImageViewModel";
import CropImagePreview from "./components/ui-crop-image/crop-image-preview.vue";
import ImagePreviewModel from "./components/ui-crop-image/ImagePreviewModel";

@Options<Articles>({
  components: {
    Page,
  },
  // watch: {
  //   image(value) {
  //     debugger;
  //     // this.imageChanged = true;
  //   },
  // },
})
export default class Articles extends Vue {
  isVisibleModalWindow: boolean = false;
  // imageChanged = false;
  getDataFuncAsync = api
    .getInstance()
    .DoctorService.getDoctorInfosAsync.bind(api.getInstance().DoctorService);
  filter: FilterRequest = new FilterRequest({
    Pagination: { Skip: 0, Take: 10 },
    Search: [],
    Sort: null,
  });
  image: ImagePreviewModel = {
    Width: 0,
    Height: 0,
    Top: 0,
    Left: 0,
    ImageSrc: "",
  };
  item: DoctorInfoResponse = {
    Id: null,
    IsActive: false,
    Text: "",
    Title: "",
    Link: "",
    ImageUrl: "",
    DateCreate: null,
  };
  innerItems: Object[] = [];
  init() {
    this.image = {
      Width: 0,
      Height: 0,
      Top: 0,
      Left: 0,
      ImageSrc: "",
    };
    this.item = {
      Id: null,
      IsActive: false,
      Text: "",
      Title: "",
      Link: "",
      ImageUrl: "",
      DateCreate: new Date(),
    };
  }
  onSort(sortName: string, sortType: string) {
    if (this.$refs.page) {
      (this.$refs.page as Page).sort(sortName, sortType);
    }
  }

  async onSave() {
    // если нет ошибок

    // throw new Error("Какая-то ошибка");

    const item: AddDoctorInfoRequest = {
      IsActive: this.item.IsActive,
      Id: this.item.Id,
      Link: this.item.Link,
      Title: this.item.Title,
      Text: this.item.Text,
      AddPhotoRequest:
        this.image && this.image.ImageSrc.indexOf("files") == -1
          ? {
              Base64Image: this.image.ImageSrc,
              Left: this.image.Left,
              Top: this.image.Top,
              Height: this.image.Height,
              Width: this.image.Width,
            }
          : null,
    };
    await api.getInstance().DoctorService.updateDoctorInfoAsync(item);
    (this.$refs.page as Page).refresh();

    this.closeModalWindow();
  }

  onCancel() {
    this.closeModalWindow();
  }
  closeModalWindow() {
    this.isVisibleModalWindow = false;
  }

  onDelete(item: any) {
    // ($dialog as any).
  }
  onAdd() {
    // throw new Error("Какая-то ошибка");
    this.init();
    this.isVisibleModalWindow = true;
  }
  onEdit(item: DoctorInfoResponse) {
    this.isVisibleModalWindow = true;
    this.init();

    this.item = {
      Id: item.Id,
      IsActive: item.IsActive,
      ImageUrl: item.ImageUrl,
      Title: item.Title,
      Link: item.Link,
      Text: item.Text,
      DateCreate: item.DateCreate,
    };

    const sek = new Date().getUTCMilliseconds().toString();
    this.item.ImageUrl = this.item.ImageUrl
      ? this.item.ImageUrl + "?" + sek
      : "";

    this.image.ImageSrc = this.item.ImageUrl;
  }
  async onChangeActive(item: DoctorInfoResponse, bool: Boolean) {
    await api
      .getInstance()
      .DoctorService.changeDoctorInfoActivityAsync(item.Id);
    // item.IsActive = !item.IsActive;
    (this.$refs.page as Page).refresh();
  }
  //   onChangeActivel(item: DoctorInfoResponse, bool:Boolean) (){
  //     // item.IsActive = !item.IsActive;
  //   }
}
</script>

<style lang="less">
.articles {
  .ui-checkbox {
    div.point {
      border: 1px solid #e2e2e2;
    }
  }
}
</style>