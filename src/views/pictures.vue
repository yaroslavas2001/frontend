

<template>
  <page
    name="Картинки"
    class="pictures"
    :getDataFuncAsync="getDataFuncAsync"
    :filter="filter"
    :defaultSearchField="'Text'"
    @onAdd="onAdd"
    noFilter
    ref="page"
  >
    <template #content="innerItems">
      <div class="row">
        <div
          class="col-auto p-0 m-2 picture"
          v-for="item in innerItems.items"
          style="width: 200px; height: 200px; overflow: hidden"
          :key="item"
        >
          <img :src="item" alt="" srcset="" style="height: 100%" />
          <div class="btn" @click="onDelete(item)">x</div>
        </div>
      </div>
    </template>

    <template #modal-window>
      <ui-modal-window
        :autoClose="false"
        :title="item.Name"
        :visible="isVisibleModalWindow"
        width="400px"
        @close="closeModalWindow"
      >
        <template #default>
          <div class="row">
            <div class="col mb-4">
              <ui-image-preview v-model="image" required :el-hight="200" />
            </div>
          </div>
          <bs-row v-if="message != ''">
            <bs-col class="error">
              {{ message }}
            </bs-col>
          </bs-row>
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
import SlideResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/SlideService/SlideResponse";
import UpdateSlideRequest from "dataSource/api/Pharmacies/Admin/Interfaces/Models/SlideService/UpdateSlideRequest";
import CropImageViewModel from "./components/ui-crop-image/cropImageViewModel";
import CropImagePreview from "./components/ui-crop-image/crop-image-preview.vue";
import ImagePreviewModel from "./components/ui-crop-image/ImagePreviewModel";
import AddPhotoRequest from "dataSource/api/Pharmacies/Admin/Interfaces/Models/AddPhotoRequest";

@Options({
  components: {
    Page,
  },
})
export default class Pictures extends Vue {
  isVisibleModalWindow: boolean = false;
  mode = "add";
  message = "";
  getDataFuncAsync = api
    .getInstance()
    .DoctorService.getImagesAsync.bind(api.getInstance().DoctorService);
  filter: FilterRequest = new FilterRequest({
    Pagination: { Skip: 0, Take: 10 },
    Search: [],
    Sort: null,
  });

  item: SlideResponse = {
    Id: null,
    ImageUrl: "",
    IndexNumber: 0,
    Text: "",
  };
  innerItems: Object[] = [];

  m(value: Date) {
    return moment(value).format("DD.MM.YYYY");
  }

  image: ImagePreviewModel = {
    Width: 0,
    Height: 0,
    Top: 0,
    Left: 0,
    ImageSrc: "",
  };
  valid(): boolean {
    return true;
  }
  async onSave() {
    // если нет ошибок
    this.message = "";
    if (!this.valid()) {
      return;
    }

    let tmp: AddPhotoRequest = {
      Width: this.image.Width,
      Height: this.image.Height,
      Top: this.image.Top,
      Left: this.image.Left,
      Base64Image: this.image.ImageSrc,
    };
    let tmpArr: AddPhotoRequest[] = [];
    await api.getInstance().DoctorService.addImagesAsync([tmp]);
    (this.$refs.page as Page).refresh();
    this.closeModalWindow();
  }
  onUpdateCropImage(img: ImagePreviewModel) {
    this.image = img;
  }
  init() {
    this.image = {
      Width: 0,
      Height: 0,
      Top: 0,
      Left: 0,
      ImageSrc: "",
    };
    this.item = { Id: null, ImageUrl: "", IndexNumber: 0, Text: "" };
  }

  onCancel() {
    this.init();
    this.closeModalWindow();
  }
  closeModalWindow() {
    this.isVisibleModalWindow = false;
  }

  onDelete(item: string) {
    var res = (this as any).$dialog
      .confirm("Вы дествительно хотите удалить?")
      .then((res: boolean) => {
        if (res) {
          api.getInstance().DoctorService.deleteImagesAsync([item]);
          (this.$refs.page as Page).refresh();
        }
      });
  }
  onAdd() {
    this.init();
    this.isVisibleModalWindow = true;
  }

  onEdit(item: SlideResponse) {
    api.getInstance().SlideService.UpdateSlide;
    this.mode = "edit";
    this.init();
    const sek = new Date().getUTCMilliseconds().toString();

    const img = item.ImageUrl ? item.ImageUrl + "?" + sek : "";

    this.item = item;
    this.image.ImageSrc = img;
    this.isVisibleModalWindow = true;
  }
}
</script>

<style lang="less">
.pictures {
  .error {
    color: red;
  }
  .picture {
    position: relative;
    .btn {
      position: absolute;
      background: black;
      top: 5px;
      right: 5px;
      width: 20px;
      height: 20px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 5px;
      opacity: 0.7;
    }
  }
}
</style>