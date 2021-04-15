
<template>
  <page
    name="Адреса аптек"
    class="pharmacy-addresses"
    :getDataFuncAsync="getDataFuncAsync"
    :filter="filter"
    @onAdd="onAdd"
    ref="page"
    searchPlaceholder="Название аптеки..."
  >
    <template #title></template>
    <template v-slot:filter>
      <!-- <div class="col">
        <div class="ui-input"><input /></div>
      </div> -->

      <div class="col pl-0">
        <ui-city
          placeholder="Города"
          @changeCity="onChangeCityFilter"
        ></ui-city>
      </div>
    </template>
    <template #content="innerItems">
      <ui-table
        :items="innerItems.items"
        template-columns="80px 37px auto auto auto auto auto 50px"
        style="overflow-x: auto"
        :key="Id"
      >
        <template #header>
          <ui-table-header-item>#</ui-table-header-item>
          <ui-table-header-item> </ui-table-header-item>
          <ui-table-header-item
            :sort-name="'Name'"
            default-sort="'asc'"
            @onSort="onSort"
          >
            Название</ui-table-header-item
          >
          <ui-table-header-item
            :sort-name="'Address'"
            default-sort="'asc'"
            @onSort="onSort"
            >Адрес</ui-table-header-item
          >
          <ui-table-header-item
            :sort-name="'Phone'"
            default-sort="'asc'"
            @onSort="onSort"
            >Телефон</ui-table-header-item
          >
          <ui-table-header-item>Время работы</ui-table-header-item>
          <ui-table-header-item>Дополнительно</ui-table-header-item>

          <ui-table-header-item />
        </template>

        <template #body="data">
          <ui-table-body-item>
            {{ data.item.Id }}
          </ui-table-body-item>
          <ui-table-body-item class="p-2"
            ><div class="img">
              <img
                style="width: 100%"
                src="@assets/img/logoPP.png"
                alt=""
              /></div
          ></ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Name }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Address }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Phone }}
          </ui-table-body-item>
          <ui-table-body-item>
            <div>
              <div
                v-for="(el, key) in getWorkTime(data.item.Schedules)"
                :key="key"
              >
                {{ el }}
              </div>
            </div>
          </ui-table-body-item>
          <ui-table-body-item class="d-flex">
            <div
              v-if="data.item.HasCosmetics"
              class="icon icon-apteka-hairstyle"
            ></div>
            <div
              v-if="data.item.HasGoodsForDisabled"
              class="icon icon-apteka-disabled"
            ></div>
            <div
              v-if="data.item.HasOptics"
              class="icon icon-apteka-optika"
            ></div>
          </ui-table-body-item>
          <ui-table-body-item>
            <div
              class="icon-apteka-pencil pointer"
              @click="onEdit(data.item)"
              :class="data.item.Id"
            >
              <!-- {{ data.item }} -->
            </div>
          </ui-table-body-item>
        </template>
      </ui-table>
    </template>
    <template #modal-window>
      <ui-modal-window
        :autoClose="false"
        :title="item.Name"
        :visible="isVisibleModalWindow"
        width="648px"
        @close="closeModalWindow"
      >
        <template #default>
          <div class="row">
            <!-- <div class="col-2 mb-3">
              <ui-image-preview
                v-model="image"
                required
                :aspect-ratio="1"
                :el-hight="50"
              />
            </div> -->
            <div class="col">
              <label>Название:</label>
              <div class="ui-input mb-3">
                <input
                  v-model="item.Name"
                  placeholder="ФИО"
                  tabindex="10"
                  disabled
                />
              </div>

              <label>Город</label>
              <ui-city
                class="mb-2"
                :name="cityName"
                :cityId="cityId"
                tabindex="11"
                @changeCity="onChangeCity"
              ></ui-city>
              <!-- <ui-maker></ui-maker> -->

              <!-- <ui-maker></ui-maker> -->
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <label>Широта</label>
              <div class="ui-input">
                <input
                  v-model="item.Latitude"
                  placeholder="..."
                  tabindex="11"
                  type="number"
                />
              </div>
            </div>
            <div class="col">
              <label>Долгота</label>
              <div class="ui-input">
                <input
                  v-model="item.Longitude"
                  placeholder="..."
                  tabindex="11"
                  type="number"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label>Адрес</label>
              <div class="ui-input mb-3">
                <input
                  v-model="item.Address"
                  placeholder="Адрес..."
                  tabindex="11"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Телефон</label>
              <div class="mb-2 ui-input">
                <input
                  v-model="item.Phone"
                  placeholder="..."
                  tabindex="13"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col d-flex align-items-center">
              <div><label>График работы:</label></div>
              <ui-checkbox
                class="ml-auto"
                icon="icon-apteka-tick"
                v-model="aroundTheClock"
                >Круглосуточно</ui-checkbox
              >
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <ui-shedule
                :shedules="item.Schedules"
                @change-schedule="onChangeShedule"
              ></ui-shedule>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <ui-checkbox icon="icon-apteka-tick" v-model="item.HasCosmetics"
                >Косметика</ui-checkbox
              >
            </div>
            <div class="col">
              <ui-checkbox icon="icon-apteka-tick" v-model="item.HasOptics"
                >Оптика</ui-checkbox
              >
            </div>
            <div class="col-6">
              <ui-checkbox
                icon="icon-apteka-tick"
                v-model="item.HasGoodsForDisabled"
                @change="onCheckHasGoodsForDisabled"
                >Для людей сограниченными возможностями
              </ui-checkbox>
            </div>
          </div>
        </template>
        <template #button>
          <div class="row py-3">
            <div class="col d-flex justify-content-center">
              <ui-button @onClick="onSave" :width="100" active class="mr-3">
                Сохранить
              </ui-button>
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

import Page from "@views/components/page.vue";

import ListViewItem from "@views/components/list-view/ListViewItem";

import defaultModel from "@views/a-model/default-model";

import FilterRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/FilterRequest";

import api from "@/api";

import SearchRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/SearchRequest";
import SortRequest from "dataSource/api/Pharmacies/Common/Extensions/Models/SortRequest";
import UserResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/UserService/UserResponse";
import UiCity from "@views/components/ui/ui-city.vue";
import UiShedule from "@views/components/ui/ui-shedule/ui-schedule.vue";
import sheduleModel from "@views/components/ui/ui-shedule/shedule-model";

import UpdateStoreRequest from "dataSource/api/Pharmacies/Admin/Interfaces/Models/StoreService/UpdateStoreRequest";
import StoreResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/StoreService/StoreResponse";
import SheduleModel from "@views/components/ui/ui-shedule/shedule-model";
import moment from "moment";
import ScheduleInfo from "dataSource/api/Pharmacies/Admin/Interfaces/Models/StoreService/ScheduleInfo";
import ViewModelFilter from "./a-model/viewModelFilter";
import CityResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/GeographyService/CityResponse";
import ImagePreviewModel from "./components/ui-crop-image/ImagePreviewModel";

@Options({
  components: {
    Page,
    UiCity,
    UiShedule,
  },
  // watch:{
  //   count:(value)=>{console.log("count=",value)},
  //   size:(value)=>{console.log("size=",value)}
  // }
})
export default class PharmacyAddresses extends Vue {
  isVisibleModalWindow: boolean = false;

  // getDataFuncAsync = api
  //   .getInstance()
  //   .StoreService.getStoresAsync.bind(api.getInstance().StoreService);

  getDataFuncAsync(filter: ViewModelFilter) {
    return api.getInstance().StoreService.getStoresAsync({
      Filter: filter,
      CityIds: this.CityIds,
    });
  }
  cityName = "";
  CityIds: number[] = [];
  cityId = 0;
  image: ImagePreviewModel = {
    Width: 0,
    Height: 0,
    Top: 0,
    Left: 0,
    ImageSrc: "",
  };
  filter: FilterRequest = new FilterRequest({
    Pagination: { Skip: 0, Take: 10 },
    Search: [],
    Sort: null,
  });

  item: StoreResponse = {
    Name: "",
    Latitude: 0,
    Longitude: 0,
    HasCosmetics: false,
    HasOptics: false,
    Id: null,
    HasGoodsForDisabled: false,
    ImageUrl: "",
    Schedules: [],
    Phone: "",
    IsAroundTheClock: false,
    Address: "",
    CityId: null,
  };
  aroundTheClock: boolean = false;
  innerItems: Object[] = [];
  itemsList: ListViewItem<defaultModel>[] = [
    new ListViewItem(new defaultModel(1, "Name1"), false, false),
    new ListViewItem(new defaultModel(2, "Name2"), false, false),
    new ListViewItem(new defaultModel(3, "Name3"), false, false),
  ];
  init() {
    this.item = {
      Name: "",
      Latitude: 0,
      Longitude: 0,
      HasCosmetics: false,
      HasOptics: false,
      Id: null,
      HasGoodsForDisabled: false,
      ImageUrl: "",
      Schedules: [],
      Phone: "",
      IsAroundTheClock: false,
      Address: "",
      CityId: null,
    };
    this.image = {
      Width: 0,
      Height: 0,
      Top: 0,
      Left: 0,
      ImageSrc: "",
    };
  }
  created() {
    this.init();
  }
  onCheckAroundTheClock(value: boolean) {
    this.aroundTheClock = value;
  }
  onSort(sortName: string, sortType: string) {
    if (this.$refs.page) {
      (this.$refs.page as Page).sort(sortName, sortType);
    }
  }
  onCheckHasCosmetic(value: boolean) {
    this.item.HasCosmetics = value;
  }
  onCheckHasGoodsForDisabled(value: boolean) {
    this.item.HasGoodsForDisabled = value;
  }
  onCheckHasOptics(value: boolean) {
    this.item.HasOptics = value;
  }
  Valid() {
    let result = true;
    if (this.item.Latitude > 90 || this.item.Latitude < -90) {
      result = false;
      // (this as any).$notification.error("ddd");
      window.Error("help");
    }
    if (this.item.Longitude > 90 || this.item.Longitude < -90) {
      result = false;
    }
    return result;
  }
  async onSave() {
    //    если нет ошибок
    if (!this.Valid()) {
      return;
    }

    if (!this.item.Schedules) {
      this.item.Schedules = [];
    }
    let schedules = this.item.Schedules.filter((el) => el.From && el.To);
    schedules.forEach((el) => {
      el.From.setUTCHours(el.From.getHours());
      el.To.setUTCHours(el.To.getHours());
    });
    const tmp = {
      HasCosmetics: this.item.HasCosmetics,
      HasOptics: this.item.HasOptics,
      HasGoodsForDisabled: this.item.HasGoodsForDisabled,
      Id: this.item.Id,
      CityId: this.item.CityId,
      Latitude: this.item.Latitude,
      Longitude: this.item.Longitude,
      Schedules: schedules,
    };

    await api.getInstance().StoreService.updateStoreAsync(tmp);
    (this.$refs.page as Page).refresh();
    this.closeModalWindow();
  }
  /**  Id: number = 0;
  WeekDays: number = 0;
  From?: Date = null;
  To?: Date = null;
  IsAroundTheClock: boolean = false;
  constructor(obj?: Partial<ScheduleInfo>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
 */
  days = [
    { Id: 0, Name: "" },
    { Id: 1, Name: "Пн" },
    { Id: 2, Name: "Вт" },
    { Id: 4, Name: "Ср" },
    { Id: 8, Name: "Чт" },
    { Id: 16, Name: "Пт" },
    { Id: 32, Name: "Сб" },
    { Id: 128, Name: "Вс" },
  ];
  //   m(value: Date) {
  //   return moment(value).format("DD.MM.YYYY");
  // }
  getWorkTime(value: ScheduleInfo[]): any {
    if (!value) {
      return [];
    }
    // let tmp1:any[] = null;
    // for (let i = 0; i < value.length; i++) {
    //   const element = value[i];
    //   tmp1.push({id:element.Id, type:})
    //   for (let j = i; j < value.length; j++) {
    //     if()

    //   }
    // }

    let tmp = value
      .map((el) => ({
        Name: this.getWeekDayName(el.WeekDays),
        timeFrom: moment(el.From).format("H.mm"),
        timeTo: moment(el.To).format("H.mm"),
      }))
      .filter((el) => el.Name != "");

    let result = "";
    return tmp.map((el) => `${el.Name}: ${el.timeFrom}-${el.timeTo}`);
  }
  getWeekDayName(value: number) {
    const tmp = this.days.find((day) => value == day.Id);
    return tmp ? tmp.Name : "";
  }
  onChangeShedule(value: SheduleModel[]) {
    this.item.Schedules = value.map((el) => ({
      Id: null,
      WeekDays: el.Id,
      From: el.TimeWork.From,
      To: el.TimeWork.To,
      IsAroundTheClock: this.aroundTheClock,
    }));
  }
  onCancel() {
    this.closeModalWindow();
  }
  closeModalWindow() {
    this.isVisibleModalWindow = false;
  }

  onDelete(item: any) {
    // console.log(`item`, item);
  }
  onAdd() {
    this.isVisibleModalWindow = true;
  }
  onEdit(item: StoreResponse) {
    this.isVisibleModalWindow = true;
    this.init();
    this.cityId = item.CityId;
    const tmp = JSON.stringify(item);
    this.item = JSON.parse(tmp);

    // const temp = JSON.stringify(item);
    // this.item = JSON.parse(temp);
  }

  onChangeCityFilter(item: CityResponse) {
    this.CityIds = [item.Id];
    (this.$refs.page as Page).refresh();
  }
  onChangeCity(item: CityResponse) {
    this.item.CityId = item.Id;
  }
}
</script>

<style lang="less">
.pharmacy-addresses {
  .icon {
    &.icon-apteka-hairstyle,
    &.icon-apteka-disabled,
    &.icon-apteka-optika {
      color: turquoise;
      font-size: 1.6rem;
      margin: 0 5px;
    }
  }
}
</style>