

<template>
  <page
    name="Слайды"
    class="slides"
    :getDataFuncAsync="getDataFuncAsync"
    :filter="filter"
    :defaultSearchField="'Text'"
    @onAdd="onAdd"
    ref="page"
  >
    <template v-slot:filter> </template>
    <template #content="innerItems">
      <ui-table
        :items="innerItems.items"
        template-columns="100px 1fr 50px 50px"
        style="overflow-x: auto"
      >
        <template #header>
          <ui-table-header-item
            :sort-name="'IndexNumber'"
            default-sort="'asc'"
            @onSort="onSort"
          >
            № слайда
          </ui-table-header-item>
          <ui-table-header-item
            :sort-name="'Text'"
            default-sort="'asc'"
            @onSort="onSort"
            >Текст</ui-table-header-item
          >
          <ui-table-header-item />

          <ui-table-header-item />
        </template>

        <template #body="data">
          <ui-table-body-item>
            {{ data.item.IndexNumber }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Text }}
          </ui-table-body-item>

          <ui-table-body-item>
            <div
              class="icon-apteka-pencil pointer"
              @click="onEdit(data.item)"
            ></div>
          </ui-table-body-item>
          <ui-table-body-item>
            <div
              class="icon-apteka-delete pointer"
              @click="onDelete(data.item)"
            ></div>
          </ui-table-body-item>
        </template>
      </ui-table>
    </template>
    <template #modal-window>
      <ui-modal-window
        :autoClose="false"
        :title="item.Name"
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
              <label>Номер слайда:</label>
              <div class="ui-input mb-3">
                <input
                  v-model="item.IndexNumber"
                  placeholder="..."
                  tabindex="10"
                  type="number"
                  required
                />
              </div>

              <label>Текст (макс. 400 символов)</label>
              <div class="mb-3">
                <textarea
                  v-model="item.Text"
                  class="ui-textarea"
                  style="resize: none; width: 100%"
                  placeholder="..."
                  tabindex="11"
                  rows="5"
                  maxlength="400"
                  no
                />
              </div>
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

@Options({
  components: {
    Page,
  },
})
export default class Slides extends Vue {
  isVisibleModalWindow: boolean = false;
  mode = "add";
  message = "";
  getDataFuncAsync = api
    .getInstance()
    .SlideService.getSlidesAsync.bind(api.getInstance().SlideService);
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

  onSort(sortName: string, sortType: string) {
    if (this.$refs.page) {
      (this.$refs.page as Page).sort(sortName, sortType);
    }
  }

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
    if (this.item.IndexNumber == 0) {
      this.message += "Номер слайда не задан";
      return false;
    }
    if (this.item.Text == "") {
      this.message += "Зполните текст слайда";
      return false;
    }

    if (this.image.ImageSrc == "") {
      this.message += "Задайте картинку";
      return false;
    }
    return true;
  }
  async onSave() {
    // если нет ошибок
    this.message = "";
    if (!this.valid()) {
      return;
    }
    if (this.mode == "add") {
      const rez = await api.getInstance().SlideService.getSlidesAsync({
        Pagination: { Skip: 0, Take: 1 },
        Sort: null,
        Search: [
          {
            FieldName: "IndexNumber",
            SearchValue: this.item.IndexNumber.toString(),
            SearchFrom: null,
            SearchTo: null,
          },
        ],
      });
      if (rez.Items && rez.Items.length > 0) {
        this.message += "слайд с таким номером уже существует";
        return;
      }
    }

    let tmp: UpdateSlideRequest = {
      Id: this.item.Id,
      IndexNumber: this.item.IndexNumber,
      Text: this.item.Text,
      AddPhotoRequest:
        this.image && this.image.ImageSrc.indexOf("files") == -1
          ? {
              Width: this.image.Width,
              Height: this.image.Height,
              Top: this.image.Top,
              Left: this.image.Left,
              Base64Image: this.image.ImageSrc,
            }
          : null,
    };
    await api.getInstance().SlideService.updateSlideAsync(tmp);
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

  onDelete(item: SlideResponse) {
    var res = (this as any).$dialog
      .confirm("Вы дествительно хотите удалить?")
      .then((res: boolean) => {
        if (res) {
          api.getInstance().SlideService.deleteSlideAsync(item.Id);
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
.slides {
  .error {
    color: red;
  }
}
</style>