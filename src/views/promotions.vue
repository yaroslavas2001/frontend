
<template>
  <page
    name="Акции"
    class="promotions"
    :getDataFuncAsync="getDataFuncAsync"
    :filter="filter"
    :defaultSearchField="'Title'"
    @onAdd="onAddPromo"
    ref="page"
  >
    <template v-slot:filter> </template>
    <template #content="innerItems">
      <ui-table
        :items="innerItems.items"
        template-columns="100px auto auto auto 50px 50px"
        style="overflow-x: auto"
      >
        <template #header>
          <ui-table-header-item> #</ui-table-header-item>
          <ui-table-header-item
            :sort-name="'Title'"
            default-sort="'asc'"
            @onSort="onSort"
            >Название</ui-table-header-item
          >

          <ui-table-header-item
            :sort-name="'DateFrom'"
            default-sort="'asc'"
            @onSort="onSort"
            >Начало</ui-table-header-item
          >

          <ui-table-header-item
            :sort-name="'DateTo'"
            default-sort="'asc'"
            @onSort="onSort"
            >Конец</ui-table-header-item
          >
          <ui-table-header-item />
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
            {{ moment(data.item.DateFrom) }}
          </ui-table-body-item>

          <ui-table-body-item>
            {{ moment(data.item.DateTo) }}
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
        :title="item.Title"
        :visible="isVisibleModalWindow"
        width="650px"
        @close="closeModalWindow"
      >
        <template #default>
          <ui-scroll :style="{ height: '400px' }">
            <control-validator-group ref="validator">
              <div class="row">
                <div class="col-5 mb-4">
                  <ui-image-preview v-model="image" required :el-hight="200" />
                </div>
                <div class="col-6">
                  <label>Название:</label>
                  <div class="ui-input mb-3">
                    <input
                      v-model="item.Title"
                      placeholder="Название"
                      tabindex="10"
                      required
                    />
                  </div>

                  <label>Текст:</label>
                  <textarea
                    style="width: 100%"
                    class="ui-textarea mb-4"
                    v-model="item.Text"
                    placeholder="..."
                    tabindex="10"
                    rows="8"
                  >
                  </textarea>
                </div>
              </div>
            </control-validator-group>
            <div class="row mb-3">
              <div class="col">
                <label>Начало:</label>
                <ui-date-picker
                  :tabindex="13"
                  minimumView="days"
                  maximumView="years"
                  initialView="days"
                  v-model="item.DateFrom"
                ></ui-date-picker>
              </div>
              <div class="col">
                <label>Конец:</label>
                <ui-date-picker
                  :tabindex="14"
                  minimumView="days"
                  maximumView="years"
                  initialView="days"
                  v-model="item.DateTo"
                ></ui-date-picker>
              </div>
            </div>
            <bs-row v-for="(item, key) in item.Items" :key="key">
              <bs-col class="d-flex">
                <div class="items__item">
                  {{ item.Name }}
                </div>
                <div
                  class="icon-apteka-delete pointer ml-auto"
                  @click="onRemoveProduct(item)"
                ></div>
              </bs-col>
            </bs-row>
            <bs-row>
              <bs-col>
                <div class="items">
                  <div
                    class="items__item"
                    v-for="(item, key) in products"
                    :key="key"
                  >
                    <ui-items-dropdown
                      @changeItem="onChangeItems($event, item)"
                    ></ui-items-dropdown>
                  </div>
                  <div
                    v-if="item.Items == 0"
                    class="items__add"
                    @click="addProduct"
                  >
                    <div class="icon icon-apteka-more"></div>
                    <div class="text">Добавить товар</div>
                  </div>
                </div>
              </bs-col>
            </bs-row>
          </ui-scroll>
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
              <ui-button @onClick="onCancel" :width="100">Отменить</ui-button>
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
import PromotionResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/PromotionService/PromotionResponse";

import UiItemsDropdown from "@views/components/ui/ui-items-dropdown.vue";
import DefaultModel from "@views/a-model/default-model";
import ItemResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/ItemService/ItemResponse";
import UpdatePromotionRequest from "dataSource/api/Pharmacies/Admin/Interfaces/Models/PromotionService/UpdatePromotionRequest";
import ControlValidatorGroup from "./components/control-validator-group.vue";
import notification from "@/plugins/notification/plugin.notification";
import dialog from "@/plugins/dialog/plugin.dialog";
import UiScroll from "@/views/components/ui-scroll.vue";
import ImagePreviewModel from "./components/ui-crop-image/ImagePreviewModel";

@Options({
  components: {
    Page,
    UiItemsDropdown,
    UiScroll,
  },
  // watch:{
  //   count:(value)=>{console.log("count=",value)},
  //   size:(value)=>{console.log("size=",value)}
  // }
})
export default class Promotions extends Vue {
  isVisibleModalWindow: boolean = false;

  getDataFuncAsync = api
    .getInstance()
    .PromotionService.getPromotionsAsync.bind(
      api.getInstance().PromotionService
    );
  filter: FilterRequest = new FilterRequest({
    Pagination: { Skip: 0, Take: 10 },
    Search: [],
    Sort: null,
  });

  item: PromotionResponse = {
    Id: null,
    DateFrom: new Date(),
    DateTo: new Date(),
    Title: "",
    Text: "",
    Items: [],
  };
  image: ImagePreviewModel = {
    Width: 0,
    Height: 0,
    Top: 0,
    Left: 0,
    ImageSrc: "",
  };
  current = 0;
  products: { Id: number; Name: string }[] = [];

  innerItems: Object[] = [];
  created() {
    // (this.$refs.page as Page).defaultSearchField = "Title";
    // throw Error("test");
  }
  onSort(sortName: string, sortType: string) {
    if (this.$refs.page) {
      (this.$refs.page as Page).sort(sortName, sortType);
    }
  }
  isValid(): boolean {
    const valid = (this.$refs.validator as ControlValidatorGroup).isValid;
    return true;
  }

  m(value: Date) {
    return moment(value).format("DD.MM.YYYY");
  }
  async onSave() {
    let products: number[] = [];
    if (!this.isValid()) {
      return;
    }
    const ar1 = this.products ? this.products.map((el) => el.Id) : [];
    const ar2 = this.item.Items ? this.item.Items.map((el) => el.Id) : [];
    products = [...ar1, ...ar2];
    const _item: PromotionResponse = this.item;
    const curDate = new Date().getTimezoneOffset() / 60;

    let tmp: UpdatePromotionRequest = {
      Id: _item.Id ? _item.Id : null,
      DateFrom: _item.DateFrom,
      DateTo: _item.DateTo,
      Text: _item.Text,
      Title: _item.Title,
      ItemIds: products,
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

    await api.getInstance().PromotionService.updatePromotionAsync(tmp);
    (this.$refs.page as Page).refresh();
    this.closeModalWindow();
  }
  initItem() {
    this.item = {
      Id: null,
      DateFrom: new Date(),
      DateTo: new Date(),
      Title: "",
      Text: "",
      Items: [],
    };
  }
  moment(date: Date) {
    return moment(date).format("DD.MM.YYYY");
  }
  onCancel() {
    this.closeModalWindow();
  }
  closeModalWindow() {
    this.isVisibleModalWindow = false;
  }

  onDelete(item: any) {
    var res = (this as any).$dialog
      .confirm("Вы дествительно хотите удалить?")
      .then((res: boolean) => {
        if (res) {
          api.getInstance().PromotionService.deletePromotionAsync(item.Id);
          (this.$refs.page as Page).refresh();
        }
      });
  }
  onAddPromo() {
    this.initItem();
    this.isVisibleModalWindow = true;
  }
  async onEdit(item: PromotionResponse) {
    // throw Error("test");
    const element = await api
      .getInstance()
      .PromotionService.getPromotionAsync(item.Id);
    this.isVisibleModalWindow = true;

    item = element;
    const sek = new Date().getUTCMilliseconds().toString();

    const img = item.ImageUrl ? item.ImageUrl + "?" + sek : "";

    this.item = item;
    this.image.ImageSrc = img;
  }

  addProduct() {
    if (
      this.products &&
      this.products.length > 0 &&
      this.products[this.products.length - 1].Id == 0
    ) {
      return;
    }
    this.itemProduct = { Id: 0, Name: "" };
    this.products.push(this.itemProduct);
  }
  itemProduct: { Id: number; Name: string } = null;

  onRemoveProduct(item: any) {
    this.item.Items = this.item.Items.filter((el) => el.Id != item.Id);
  }
  onChangeItems(item: ItemResponse, currentItem: { Id: number; Name: string }) {
    // [this.itemProduct.Id, this.itemProduct.Name] = [item.Id, item.Name];
    const doubleItem = this.item.Items.find((el) => el.Id == item.Id);
    if (!doubleItem) {
      this.item.Items.push({
        Id: item.Id,
        Name: item.Name,
        Producer: item.Producer,
      });
    }
    this.products = [];
  }
}
</script>

<style lang="less">
.promotions {
  .items {
    // .items__item

    &__item {
      margin: 5px 0;

      align-items: center;
      display: flex;
      > div {
        flex: 1 0 95%;
      }
      .icon {
        &.icon-apteka-delete {
          font-size: 14px;
        }
        margin-left: 7px;
      }
    }

    // .items__add

    &__add {
      padding: 5px 0;
      max-width: 145px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
      border-bottom: 1px solid #23a4a2;
      color: #23a4a2;
      .text {
      }
      .icon {
        margin-right: 5px;
      }
    }
  }
  .icon-apteka-more {
  }
}
</style>