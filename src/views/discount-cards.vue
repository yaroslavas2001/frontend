

<template>
  <page
    name="Дисконтные карты"
    class="discount-cards"
    :getDataFuncAsync="getDataFuncAsync"
    :filter="filter"
    @onAdd="onAdd"
    ref="page"
    defaultSearchField="Number"
    search-placeholder="Номер дисконтной карты"
  >
    <template #title></template>

    <template #content="innerItems">
      <ui-table
        :items="innerItems.items"
        template-columns="100px auto auto auto"
        style="overflow-x: auto"
      >
        <template #header>
          <ui-table-header-item
            :sort-name="'Number'"
            default-sort="'asc'"
            @onSort="onSort"
          >
            #</ui-table-header-item
          >
          <ui-table-header-item>ФИО</ui-table-header-item>
          <ui-table-header-item
            :sort-name="'DateCreate'"
            default-sort="'asc'"
            @onSort="onSort"
            >Дата создания</ui-table-header-item
          >
          <ui-table-header-item
            :sort-name="'SumDiscount'"
            default-sort="'asc'"
            @onSort="onSort"
            >Сумма скидки</ui-table-header-item
          >
        </template>

        <template #body="data">
          <ui-table-body-item>
            {{ data.item.Number }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Owner }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ m(data.item.DateCreate) }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.SumDiscount }}
          </ui-table-body-item>

          <!-- <ui-table-body-item>
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
              <label>ФИО:</label>
              <div class="ui-input mb-3">
                <input v-model="item.Name" placeholder="ФИО" tabindex="10" />
              </div>

              <label>Страна</label>
              <ui-dropdown
                class="mb-3"
                tabindex="11"
                :items="itemsList"
                placeholder="Страна"
                @change="onChangeCity"
              ></ui-dropdown>
              <!-- <ui-maker></ui-maker> -->
              <label>Город</label>
              <ui-dropdown
                :items="itemsList"
                tabindex="12"
                class="mb-3"
                placeholder="Город"
                @change="onChangeCity"
              ></ui-dropdown>
              <!-- <ui-maker></ui-maker> -->
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Телефон</label>
              <div class="mb-2 ui-input">
                <input v-model="item.Phone" placeholder="..." tabindex="13" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label>Роль</label><br />
              <ui-dropdown
                tabindex="14"
                :items="itemsList"
                placeholder="Роль"
                @change="onChangeCity"
              ></ui-dropdown>
            </div>
          </div>
        </template>
        <template #button>
          <div class="row py-3">
            <div class="col d-flex justify-content-center">
              <ui-button @onClick="onSave" :width="100" active>
                Сохранить</ui-button
              >
              <ui-button
                style="margin-right: 5px"
                @onClick="onCancel"
                :width="100"
              >
                Отменить
              </ui-button>
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

@Options({
  components: {
    Page,
  },
  // watch:{
  //   count:(value)=>{console.log("count=",value)},
  //   size:(value)=>{console.log("size=",value)}
  // }
})
export default class DiscountСards extends Vue {
  isVisibleModalWindow: boolean = false;

  getDataFuncAsync = api
    .getInstance()
    .CardService.getDiscountCardsAsync.bind(api.getInstance().CardService);
  filter: FilterRequest = new FilterRequest({
    Pagination: { Skip: 0, Take: 10 },
    Search: [],
    Sort: null,
  });

  item: UserResponse = {
    Id: null,
    Name: "",
    City: "",
    Phone: "",
    Role: "",
  };
  innerItems: Object[] = [];
  itemsList: ListViewItem<defaultModel>[] = [
    new ListViewItem(new defaultModel(1, "Name1"), false, false),
    new ListViewItem(new defaultModel(2, "Name2"), false, false),
    new ListViewItem(new defaultModel(3, "Name3"), false, false),
  ];
  onSort(sortName: string, sortType: string) {
    if (this.$refs.page) {
      (this.$refs.page as Page).sort(sortName, sortType);
    }
  }

  m(value: Date) {
    return moment(value).format("DD.MM.YYYY");
  }
  onSave() {
    // если нет ошибок
    this.closeModalWindow();
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
  onEdit(item: UserResponse) {
    this.isVisibleModalWindow = true;
    this.item = item;
  }
}
</script>

<style lang="less">
</style>