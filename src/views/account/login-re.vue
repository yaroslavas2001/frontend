<template>
  <div class="login-re">
    <div style="width: 375px;">
      <div class="row logo">
        <bs-col class="pb-3">M<span>E</span>G<span>O</span></bs-col>
      </div>
      <bs-container class="forma">
        <bs-row class="pt-5">
          <bs-col class="title"> {{ "Восстановить пароль" | locale }}</bs-col>
        </bs-row>
        <!-- <bs-row class="pt-4 px-4">
          <bs-col>
            <ui-dropdown :Items="langItems" @change="onChangeLocale"></ui-dropdown>
          </bs-col>
        </bs-row> -->
        <bs-row class="pt-4 px-4">
          <bs-col>
            <ui-input
              v-model="email"
              :height="''"
              :icon="'icon-mail1'"
              :placeholder="'Email'"
              @keydown.enter="onClick"
            ></ui-input>
          </bs-col>
        </bs-row>
        <!-- <bs-row class="pt-3 px-4">
          <bs-col>
            <ui-input v-model="password" :height="''" :icon="'icon-key'" :placeholder="'Пароль'" :type="'password'" @keydown.enter="onClick"></ui-input>
          </bs-col>
        </bs-row> -->

        <!-- <bs-row class=" px-4">
          <bs-col class="d-flex justify-content-between">
            <ui-checkbox>{{ "Login_checkBox_rememberMe" | locale }}</ui-checkbox>
            <router-link class="re-text" to="/login-re">{{ "Login_forgotYourPassword" | locale }}</router-link>
          </bs-col>
        </bs-row> -->
        <bs-row :pt="5" class="justify-content-center">
          <ui-button :width="100" @onClick="onClick" @keydown.enter="onClick">{{
            "Отправить" | locale
          }}</ui-button>
        </bs-row>
        <!-- <bs-row class="px-4 pb-4">
          <bs-col class="register-new">
            <router-link class="re-text" to="/register">{{ "Login_newUserRegistration" | locale }}</router-link>
          </bs-col>
        </bs-row> -->
        <bs-row
          class="error pb-1 px-4"
          style="color:#f65a48; display:flex; align-items:center; "
        >
          <bs-col
            v-if="errorMessage"
            class="er align-items-center d-flex"
            style="    overflow: hidden;"
          >
            <span
              class="icon-delete"
              style="font-size:20px; padding-right: 10px;"
            ></span>
            <div class="d-flex">
              {{ errorMessage }}
            </div>
          </bs-col>
          <bs-col v-else>
            <span>&nbsp;</span>
          </bs-col>
        </bs-row>
      </bs-container>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import WsResponseModel from "../../dataSource/api/SchemaBuilderServer/Models/WsResponseModel";
import UserResponse from "../../dataSource/api/RunPay/Admin/IServices/Models/Accounts/UserResponse";
import { set } from "js-cookie";
import ListViewItem from "list-view/src/listviewitem";
import DefaultModel from "../a-model/default-model";

// import WsResponseModel from "../../../dataSource/api/SchemaBuilderServer/Models/WsResponseModel";
// import BaseResponse from "../../../dataSource/api/Common/ResponseModels/BaseResponse";
// import UserResponse from "../../../dataSource/api/Users/IdentityService/Models/UserResponse";

// import DictionaryModel from "@dataSource/Models/DictionaryModel";
// import LayoutComponent from "@layouts/layout.vue";
@Component({
  name: "login-re"

  // components: {
  //   layout: LayoutComponent
  // }
})
export default class LoginReComponent extends Vue {
  constructor() {
    super();
  }

  email = "";
  password = "";
  errorMessage: String = null;
  langItems: ListViewItem<DefaultModel>[] = [];

  created() {
    this.getLangItems();
  }

  getLangItems() {
    this.langItems.push(
      new ListViewItem(new DefaultModel(0, "English"), true, false)
    );
    this.langItems.push(
      new ListViewItem(new DefaultModel(1, "Русский"), false, false)
    );
    this.langItems.push(
      new ListViewItem(new DefaultModel(2, "Français"), false, false)
    );
    const currentLang = this.$locale.currentLang || "";
    switch (currentLang) {
      case "en":
        this.langItems.forEach(item => {
          item.Selected = item.Value.id == 0;
        });
        break;
      case "ru":
        this.langItems.forEach(item => {
          item.Selected = item.Value.id == 1;
        });
        break;
      case "fr":
        this.langItems.forEach(item => {
          item.Selected = item.Value.id == 2;
        });
        break;
      case "de":
        this.langItems.forEach(item => {
          item.Selected = item.Value.id == 3;
        });
        break;
      default:
        this.langItems.forEach(item => {
          item.Selected = item.Value.id == 0;
        });
        break;
    }
  }

  onClick() {
    this.$api.AccountService.LoginEvent.once(response => {
      if (response.IsSuccess) {
        // this.$api.AccountWsService.Activate(response.Value);
        this.$api.SetUser({
          Id: parseInt(response.Value.Id.toString()),
          Email: response.Value.Email,
          FullName: response.Value.FullName
        });
        set("Auth-Token", response.Value.SessionToken);

        if (response.Value != null)
          this.$router.push("/" + this.$locale.currentLang);
      }
      this.errorMessage = response.ErrorMessage;
    });

    this.errorMessage = null;
    this.$locale.currentLang = this.getSelectedLang();
    this.$api.AccountService.Login({
      Email: this.email,
      Password: this.password
    });
  }

  getSelectedLang(): string {
    const langIndex = this.langItems.filter(item => item.Selected)[0].Value.id;
    switch (langIndex) {
      case 0:
        return "en";
        break;
      case 1:
        return "ru";
        break;
      case 2:
        return "fr";
        break;
      default:
        return "en";
        break;
    }
  }
  onChangeLocale(resp: ListViewItem<DefaultModel>[]) {
    let val = "";
    switch (resp[0].Value.id) {
      case 0:
        val = "en";
        break;
      case 1:
        val = "ru";
        break;
      case 2:
        val = "fr";
        break;
      case 3:
        val = "de";
        break;
      default:
        break;
    }
    this.$router.replace({
      name: this.$route.name,
      params: Object.assign(this.$route.params, { lang: val }),
      query: this.$route.query
    });
    location.reload();
  }
  test(): string {
    return this.$locale.getTranslate("login");
  }
}
</script>
<style lang="less">
.login-re {
  // background: url("/assets/img/bg.jpg");
  background: #ced4de;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-family: ProximaNova;
  .ui-dropdown {
    .ui-box-menu {
      min-width: 160px;
      background-color: #fff;
      border-color: #ced4de;
    }
    .ui-list-view-item:hover {
      background: #f0f0f0;
    }
  }
  .forma {
    background: #fff;
    -webkit-box-shadow: 0px 0px 18px 0px rgba(163, 163, 163, 1);
    -moz-box-shadow: 0px 0px 18px 0px rgba(163, 163, 163, 1);
    box-shadow: 0px 0px 18px 0px rgba(163, 163, 163, 1);
    .title {
      font-size: 20px;
      line-height: 24px;
      color: #162a47;
      text-align: center;
    }
  }
  .register-new {
    text-align: center;
  }
  .logo {
    // display: flex;
    // justify-content: center;
    // padding-bottom: 80px;
    // background-image: url("/assets/img/logo.svg");
    // background-size: 50%;
    // background-position: top;
    // background-repeat: no-repeat;
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 40px;

    color: #1791fa;
    span {
      color: #ffae21;
    }
    .col {
      text-align: center;
    }
  }
  .re-text {
    // padding-right: 40px;
    color: #1791fa;
    text-decoration: none;
    border-bottom: 1px solid #1791fa;
    cursor: pointer;
  }
  .error {
    min-height: 60px;
    max-height: 60px;
    white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden; /* Обрезаем все, что не помещается в область */

    // padding: 5px; /* Поля вокруг текста */
    text-overflow: ellipsis; /* Добавляем многоточие */
    // overflow: hidden;
  }
  .er {
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    box-orient: vertical;
  }
}
</style>
