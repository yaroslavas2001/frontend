<template>
  <page
    name="Каталог товаров"
    :getDataFuncAsync="getDataFuncAsync"
    :filter="filter"
    @onAdd="onAdd"
    ref="page"
    searchPlaceholder="Название товара..."
  >
    <template #title></template>
    <template v-slot:filter>
      <!-- <div class="col">
        <div class="ui-input"><input /></div>
      </div> -->
      <div class="col pl-0">
        <ui-pharmacy
          placeholder="Все аптеки"
          @changePharm="onChangePharm"
          tabindex="0"
        ></ui-pharmacy>
      </div>
      <div class="col-auto">
        <ui-city
          placeholder="Города"
          @changeCity="onChangeCity"
          :cityId="cityId"
        ></ui-city>
      </div>
    </template>
    <template #content="innerItems">
      <ui-table
        :items="innerItems.items"
        template-columns="100px auto auto auto auto 50px"
        style="overflow-x: auto"
      >
        <template #header>
          <ui-table-header-item> #</ui-table-header-item>
          <ui-table-header-item>Название</ui-table-header-item>
          <ui-table-header-item
            :sort-name="'Producer'"
            default-sort="'asc'"
            @onSort="onSort"
            >Производитель</ui-table-header-item
          >
          <ui-table-header-item>Категория</ui-table-header-item>
          <ui-table-header-item>Stores</ui-table-header-item>

          <ui-table-header-item />
        </template>

        <template #body="data">
          <ui-table-body-item>
            {{ data.item.Id }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Name }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Producer }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Categories.join(", ") }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Stores }}
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
        :title="item.Name"
        :visible="isVisibleModalWindow"
        width="600px"
        @close="closeModalWindow"
      >
        <template #default>
          <div class="row">
            <div class="col-5 mb-4">
              <ui-image-preview
                v-model="image"
                required
                :aspect-ratio="1"
                :el-hight="200"
              />
            </div>
            <div class="col">
              <label>Название</label>
              <div class="ui-input mb-2">
                <input
                  v-model="item.Name"
                  placeholder="Название..."
                  tabindex="10"
                  readonly
                />
              </div>
              <label>Производитель</label>
              <div class="ui-input mb-2">
                <input
                  readonly
                  v-model="item.Producer"
                  placeholder="Название..."
                  tabindex="10"
                />
              </div>

              <ui-checkbox
                class="mb-2"
                icon="icon-apteka-tick"
                v-model="item.IsNew"
                >Новинка
              </ui-checkbox>
              <ui-checkbox
                class="mb-2"
                icon="icon-apteka-tick"
                v-model="item.IsBestSeller"
                >Хит продаж
              </ui-checkbox>
              <ui-checkbox
                class="mb-2"
                icon="icon-apteka-tick"
                v-model="item.IsRecomendedToDoctor"
                >Рекомендовано для врачей
              </ui-checkbox>
              <!-- <ui-maker></ui-maker> -->
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Группа</label>
              <div class="mb-2">
                <textarea
                  readonly
                  class="ui-textarea mb-4"
                  v-model="item.Categories"
                  placeholder="Название..."
                  tabindex="11"
                  style="width: 100%"
                  rows="3"
                />
              </div>
            </div>
          </div>
          <!-- 
          <div class="row">
            <div class="col d-flex align-items-center my-3 add">
              <span class="icon-apteka-more mr-2 add__btn"></span>
              <div class="add__text">Добавить категорию</div>
            </div>
          </div> -->
          <div class="row">
            <div class="col">
              <label>Описание</label><br />
              <textarea
                readonly
                style="width: 100%"
                class="ui-textarea mb-4"
                value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla molestias tenetur minus asperiores cupiditate veniam, suscipit ab voluptatibus ad maiores quibusdam tempore consectetur voluptatum ut? Ea libero alias mollitia provident autem, aspernatur asperiores consectetur aperiam cupiditate ipsa molestias itaque, minima et rerum aut natus? Perspiciatis quo alias nam maiores nulla."
                placeholder="..."
                @change="onChangeCity"
                tabindex="13"
                rows="8"
              >
              </textarea>
            </div>
          </div>
        </template>
        <template #button>
          <div class="row py-3">
            <div class="col d-flex justify-content-center">
              <ui-button @onClick="onSave" :width="100" active class="mr-3">
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

import Page from "@views/components/page.vue";

import ListViewItem from "@views/components/list-view/ListViewItem";

import defaultModel from "@views/a-model/default-model";

import FilterRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/FilterRequest";
import ItemService from "../../dataSource/api/Pharmacies/Admin/Services/ItemService";
import api from "@/api";
import ViewModelFilter from "./a-model/viewModelFilter";
import UiMaker from "@views/components/ui/ui-maker.vue";
import SearchRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/SearchRequest";
import SortRequest from "dataSource/api/Pharmacies/Common/Extensions/Models/SortRequest";
import { reactive, ref } from "vue";
import ItemResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/ItemService/ItemResponse";
import ImagePreviewModel from "./components/ui-crop-image/ImagePreviewModel";
import UiCity from "@components/ui/ui-city.vue";
import DefaultModel from "@views/a-model/default-model";
import CityResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/GeographyService/CityResponse";
import UiPharmacy from "@components/ui/ui-pharmacy.vue";
import UpdateItemRequest from "dataSource/api/Pharmacies/Admin/Interfaces/Models/ItemService/UpdateItemRequest";
@Options({
  components: {
    Page,
    UiMaker,
    UiCity,
    UiPharmacy,
  },
  // watch:{
  //   count:(value)=>{console.log("count=",value)},
  //   size:(value)=>{console.log("size=",value)}
  // }
})
export default class Сatalog extends Vue {
  isVisibleModalWindow: boolean = false;
  image: ImagePreviewModel = {
    Left: 0,
    Top: 0,
    Height: 0,
    Width: 0,
    ImageSrc: "",
  };

  getDataFuncAsync(filter: ViewModelFilter) {
    return api.getInstance().ItemService.getItemsAsync({
      Filter: filter,
      CityIds: this.CityIds,
      StoreIds: this.StoreIds,
    });
  }

  filter: FilterRequest = new FilterRequest({
    Pagination: { Skip: 0, Take: 10 },
    Search: [],
    Sort: null,
  });
  CityIds: number[] = [];
  StoreIds: number[] = [];
  cityId: number = null;
  item: ItemResponse = {
    Id: null,
    Name: "",
    Producer: "",
    Categories: [],
    Stores: [],
    IsNew: false,
    IsBestSeller: true,
    IsRecomendedToDoctor: false,
    ImageUrl: "",
  };
  innerItems: Object[] = [];

  init() {
    this.item = {
      Id: null,
      Name: "",
      Producer: "",
      Categories: [],
      Stores: [],
      IsNew: false,
      IsBestSeller: true,
      IsRecomendedToDoctor: false,
      ImageUrl: "",
    };
    this.image = {
      Left: 0,
      Top: 0,
      Height: 0,
      Width: 0,
      ImageSrc: "",
    };
  }
  onSort(sortName: string, sortType: string) {
    if (this.$refs.page) {
      (this.$refs.page as Page).sort(sortName, sortType);
    }
  }

  onChangePharm(item: any) {
    if (item.id == 0) {
      this.StoreIds = [];
      return;
    }

    this.StoreIds = [item.id];
    this.cityId = 1;
    this.cityId = 0;
    (this.$refs.page as Page).refresh();
  }
  onChangeCity(item: CityResponse) {
    if (item.Id == 0) {
      this.CityIds = [];
      return;
    }
    this.CityIds = [item.Id];
    this.cityId = item.Id;
    (this.$refs.page as Page).refresh();
  }

  async onSave() {
    const item = this.item;
    let itemUpdate: UpdateItemRequest = {
      Id: item.Id,
      IsBestSeller: item.IsBestSeller,
      IsNew: item.IsNew,
      IsRecomendedToDoctors: item.IsRecomendedToDoctor,
      AddPhotoRequest: this.isBase64(this.image.ImageSrc)
        ? {
            Width: this.image.Width,
            Left: this.image.Left,
            Top: this.image.Top,
            Height: this.image.Height,
            Base64Image: this.image.ImageSrc,
          }
        : null,
    };
    await api.getInstance().ItemService.updateItemAsync(itemUpdate);
    // если нет ошибок
    this.init();
    (this.$refs.page as any).refresh();
    this.closeModalWindow();
  }

  isBase64(item: string): boolean {
    const finde = item.indexOf("base64");
    return finde != -1;
  }

  onCancel() {
    this.closeModalWindow();
  }
  closeModalWindow() {
    this.isVisibleModalWindow = false;
  }

  getStories(stores: number[]): string {
    return "";
  }
  onEdit(item: ItemResponse) {
    this.isVisibleModalWindow = true;

    const tmp = JSON.stringify(item);
    this.item = JSON.parse(tmp);
    this.image.ImageSrc = item.ImageUrl ? item.ImageUrl : "";
  }
}
</script>
