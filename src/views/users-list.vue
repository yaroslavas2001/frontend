<template>
  <page
    name="Список пользователей"
    class="users-list"
    :getDataFuncAsync="getDataFuncAsync"
    :filter="filter"
    @onAdd="onAdd"
    ref="page"
  >
    <template v-slot:filter> </template>
    <template #content="innerItems">
      <ui-table
        :items="innerItems.items"
        template-columns="100px auto auto auto auto 50px 50px"
        style="overflow-x: auto"
      >
        <template #header>
          <ui-table-header-item> #</ui-table-header-item>
          <ui-table-header-item
            :sort-name="'Name'"
            default-sort="'asc'"
            @onSort="onSort"
            >ФИО</ui-table-header-item
          >
          <ui-table-header-item
            :sort-name="'City'"
            default-sort="'asc'"
            @onSort="onSort"
            >Страна, город</ui-table-header-item
          >
          <ui-table-header-item>Телефон</ui-table-header-item>
          <ui-table-header-item>Роль</ui-table-header-item>

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
            {{ data.item.City }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Phone }}
          </ui-table-body-item>
          <ui-table-body-item>
            {{ data.item.Role }}
          </ui-table-body-item>
          <ui-table-body-item>
            <div
              v-if="data.item.Role == 'Admin'"
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
        title="Введите свой пароль"
        :visible="isVisibleModalWindow"
        width="600px"
        @close="closeModalWindow"
      >
        <template #default>
          <div class="row">
            <!-- <div class="col-5 mb-4">
              <ui-image-preview
                v-model="image"
                required
                :aspect-ratio="1"
                :el-hight="200"
              />
            </div> -->
            <div class="col">
              <label>ФИО:</label>
              <div class="ui-input mb-3">
                <input v-model="item.Name" placeholder="ФИО" tabindex="10" />
              </div>
              <!-- <div class="my-2">
                <label>Страна</label>
                <ui-country @changeCountry="onChangeCountry"></ui-country>
              </div> -->

              <div class="my-2">
                <label>Город</label>
                <ui-city :name="item.City" @changeCity="onChangeCity"></ui-city>
              </div>

              <label>Телефон</label>
              <div class="mb-2 ui-input">
                <input v-model="item.Phone" placeholder="..." tabindex="13" />
              </div>
              <label>Логин</label>
              <div class="mb-2 ui-input">
                <input
                  v-model="updateItem.Login"
                  placeholder="..."
                  tabindex="14"
                />
              </div>
              <label>Пароль</label>
              <br />
              <label>новый</label>
              <div class="mb-2 ui-input">
                <input
                  v-model="password"
                  placeholder="..."
                  tabindex="15"
                  type="password"
                />
              </div>

              <label>еще раз</label>
              <div class="mb-2 ui-input">
                <input
                  v-model="updateItem.Password"
                  placeholder="..."
                  tabindex="16"
                  type="password"
                />
              </div>
            </div>
          </div>
          <div class="row"></div>

          <!-- <div class="row">
            <div class="col">
              <label>Роль</label><br />
              {{ innerItems }}
              <ui-dropdown v-if="roles" :items="roles" @change="onChangeRole">
              </ui-dropdown>
            </div>
          </div> -->
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
      <ui-modal-window
        :autoClose="false"
        :title="item.Name"
        :visible="isVisibleModalWindowConfirm"
        width="600px"
        @close="closeModalWindowConfirm"
      >
        <template #default>
          <div class="row">
            <bs-col>
              <label>Пароль</label>

              <div class="mb-2 ui-input">
                <input
                  v-model="confirmedAdminPassword"
                  placeholder="..."
                  tabindex="15"
                  type="password"
                />
              </div>
            </bs-col>
          </div>
        </template>
        <template #button>
          <div class="row py-3">
            <div class="col d-flex justify-content-center">
              <ui-button @onClick="passwordConfirmed" :width="100" active>
                Сохранить</ui-button
              >
              <ui-button
                style="margin-right: 10px"
                @onClick="onCancelConfirm"
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

import Page from "@views/components/page.vue";

import ListViewItem from "@views/components/list-view/ListViewItem";

import defaultModel from "@views/a-model/default-model";

import FilterRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/FilterRequest";

import api from "@/api";

import SearchRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/SearchRequest";
import SortRequest from "dataSource/api/Pharmacies/Common/Extensions/Models/SortRequest";
import UserResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/UserService/UserResponse";
import UiCity from "@/views/components/ui/ui-city.vue";
import UiCountry from "@/views/components/ui/ui-country.vue";
import ImagePreviewModel from "./components/ui-crop-image/ImagePreviewModel";
import UpdateAdminRequest from "dataSource/api/Pharmacies/Admin/Interfaces/Models/UserService/UpdateAdminRequest";

@Options({
  components: {
    Page,
    UiCity,
    UiCountry,
  },
  // watch:{
  //   count:(value)=>{console.log("count=",value)},
  //   size:(value)=>{console.log("size=",value)}
  // }
})
export default class UsersList extends Vue {
  isVisibleModalWindow: boolean = false;
  isVisibleModalWindowConfirm: boolean = false;
  password = "";
  getDataFuncAsync = api
    .getInstance()
    .UserService.getUsersAsync.bind(api.getInstance().UserService);
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
  item: UserResponse = {
    Id: null,
    Name: "",
    City: "",
    Phone: "",
    Role: "",
  };
  updateItem: UpdateAdminRequest = {
    CityId: 0,
    Password: "",
    Phone: "",
    Name: "",
    Login: "",
    Id: 0,
  };
  roles: ListViewItem<defaultModel>[] = [
    new ListViewItem(new defaultModel(1, "User"), false, false),
    new ListViewItem(new defaultModel(2, "Admin"), false, false),
  ];
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
      Name: "",
      City: "",
      Phone: "",
      Role: "",
    };
    this.updateItem = {
      CityId: 0,
      Id: 0,
      Login: "",
      Name: "",
      Phone: "",
      Password: "",
    };
    this.password = "";
  }

  onSort(sortName: string, sortType: string) {
    if (this.$refs.page) {
      (this.$refs.page as Page).sort(sortName, sortType);
    }
  }
  onChangeCity(city: any) {
    this.item.City = city.Name;
    this.updateItem.CityId = city.Id;
  }
  onChangeCountry(items: any) {
    // console.log(`items`, items);
  }
  onChangeRole(items: ListViewItem<defaultModel>) {
    this.item.Role = (items[0].Value as any).name;
  }
  async onSave() {
    // если нет ошибок

    const item = this.item;
    // const itemAdmin:UpdateAdminRequest={CityId:item.CityId,Phone:item.Phone,Name:item.Name,Id:item.Id,Login:item.}
    this.updateItem.Id = item.Id;
    this.updateItem.Name = item.Name;
    this.updateItem.Phone = item.Phone;

    const res = await api
      .getInstance()
      .UserService.UpdateAdmin(this.updateItem);
    this.closeModalWindow();
  }

  onCancel() {
    this.closeModalWindow();
  }
  closeModalWindow() {
    this.isVisibleModalWindow = false;
  }
  closeModalWindowConfirm() {
    this.confirmedAdminPassword = "";
    this.confirmedUserId = 0;
    this.isVisibleModalWindowConfirm = false;
  }
  // для удаления нужен не только id пользователя но и пароль того кто удаляет
  // пока удаление не работает
  onDelete(item: UserResponse) {
    var res = (this as any).$dialog
      .confirm(`Вы дествительно хотите удалить пользователя ${item.Name}?`)
      .then((res: boolean) => {
        if (res) {
          this.confirmedUserId = item.Id;
          this.isVisibleModalWindowConfirm = true;
        }
      });
  }
  onAdd() {
    this.isVisibleModalWindow = true;
  }
  onEdit(item: UserResponse) {
    this.init();
    this.isVisibleModalWindow = true;
    this.roles.forEach(
      (el) => (el.Selected = (el.Value as any).name == item.Role)
    );
    this.item = item;
  }
  confirmedUserId = 0;
  confirmedAdminPassword = "";
  async passwordConfirmed() {
    await api.getInstance().UserService.deleteUserAsync({
      Id: this.confirmedUserId,
      Password: this.confirmedAdminPassword,
    });
    (this.$refs.page as Page).refresh();
    this.closeModalWindowConfirm();
  }

  onCancelConfirm() {
    this.closeModalWindowConfirm();
  }
}
</script>

<style lang="less">
</style>