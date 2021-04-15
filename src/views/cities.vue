
<template>
  <page
    name="Города"
    class="cities"
    :getDataFuncAsync="getDataFuncAsync"
    :filter="filter"
    @onAdd="onAdd"
    ref="page"
  >
    <!-- :defaultSearchField="'Title'" -->
    <template v-slot:filter> </template>
    <template #content="innerItems">
      <ui-table
        :items="innerItems.items"
        template-columns="100px auto 50px 50px"
        style="overflow-x: auto"
      >
        <template #header>
          <ui-table-header-item> #</ui-table-header-item>
          <ui-table-header-item
            :sort-name="'Name'"
            default-sort="'asc'"
            @onSort="onSort"
            >Название</ui-table-header-item
          >

          <ui-table-header-item />
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
      <!-- user-
      <h1>{{ user }}</h1>
      MyDependency-
      <p>{{ MyDependency }}</p> -->
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
            <div class="col">
              <label>Город:</label>
              <div class="ui-input mb-3">
                <input
                  v-model="item.Name"
                  placeholder="Название"
                  tabindex="10"
                  required
                />
              </div>
            </div>
          </div>
          <bs-row>
            <bs-col>
              <label>Страна:</label>
              <ui-country
                :countryId="countryId"
                @changeCountry="changeCountry"
              ></ui-country>
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
import UiItemsDropdown from "@views/components/ui/ui-items-dropdown.vue";
import UiCountry from "@views/components/ui/ui-country.vue";

import api from "@/api";

import ListViewItem from "@views/components/list-view/ListViewItem";
import defaultModel from "@views/a-model/default-model";
import FilterRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/FilterRequest";

import SearchRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/SearchRequest";
import SortRequest from "dataSource/api/Pharmacies/Common/Extensions/Models/SortRequest";
import UserResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/UserService/UserResponse";
import PromotionResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/PromotionService/PromotionResponse";

import DefaultModel from "@views/a-model/default-model";
import ItemResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/ItemService/ItemResponse";
import UpdatePromotionRequest from "dataSource/api/Pharmacies/Admin/Interfaces/Models/PromotionService/UpdatePromotionRequest";
import ControlValidatorGroup from "./components/control-validator-group.vue";
import notification from "@/plugins/notification/plugin.notification";
import dialog from "@/plugins/dialog/plugin.dialog";
import CityResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/GeographyService/CityResponse";
import CountryResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/GeographyService/CountryResponse";
import { inject } from "vue";

@Options<cities>({
  components: {
    Page,
    UiItemsDropdown,
    UiCountry,
  },
})
export default class cities extends Vue {
  MyDependency = inject("MyDependency");
  user = inject("user");

  isVisibleModalWindow: boolean = false;
  // x = inject("ThemeSymbol", ref(""));
  getDataFuncAsync = api
    .getInstance()
    .GeographyService.getCitiesAsync.bind(api.getInstance().GeographyService);
  filter: FilterRequest = new FilterRequest({
    Pagination: { Skip: 0, Take: 10 },
    Search: [],
    Sort: null,
  });

  item: CityResponse = {
    Id: null,
    Name: "",
    CountryId: 0,
  };
  current = 0;
  countryId = 0;

  innerItems: Object[] = [];
  created() {
    // (this.$refs.page as Page).defaultSearchField = "Title";
    // throw Error("test");
    console.log(`this.user`, this.user);
    console.log(`this.MyDependency`, this.MyDependency);
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
    // if (!this.isValid()) {
    //   return;
    // }

    const item = this.item;

    let tmp: CityResponse = {
      Id: item.Id,
      CountryId: item.CountryId,
      Name: item.Name,
    };

    await api.getInstance().GeographyService.updateCityAsync(tmp);
    (this.$refs.page as Page).refresh();
    this.closeModalWindow();
  }
  initItem() {
    this.item = {
      Id: null,
      CountryId: 0,
      Name: "",
    };
  }

  onCancel() {
    this.closeModalWindow();
  }
  closeModalWindow() {
    this.isVisibleModalWindow = false;
  }

  onDelete(item: CityResponse) {
    var res = (this as any).$dialog
      .confirm(`Вы дествительно хотите город - "${item.Name}" ?`)
      .then((res: boolean) => {
        if (res) {
          api.getInstance().GeographyService.deleteCityAsync(item.Id);
          (this.$refs.page as Page).refresh();
        }
      });
  }
  changeCountry(item: CountryResponse) {
    console.log(`item`, item);
    this.item.CountryId = item.Id;
  }
  onAdd() {
    this.initItem();
    this.isVisibleModalWindow = true;
  }
  async onEdit(item: CityResponse) {
    // throw Error("test");
    // const element = await api
    //   .getInstance()
    //   .GeographyService.updateCityAsync(item);
    this.isVisibleModalWindow = true;
    this.item = item;
    this.countryId = item.CountryId;
    // this.initItem();
  }
}
</script>

<style lang="less">
.cities {
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