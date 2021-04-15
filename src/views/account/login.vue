<template>
  <div class="page-login">
    <div style="width: 375px">
      <div class="row logo pb-3">
        <bs-col class="pb-3 col-auto">
          <img src="@assets/img/logo.svg" />
        </bs-col>
        <bs-col class="title">поиск лекарств в Приднестровье</bs-col>
      </div>
      <bs-container class="forma">
        <bs-row class="pt-5">
          <bs-col class="title">
            {{ $locale.getTranslate("Вход") }}
          </bs-col>
        </bs-row>

        <bs-row class="pt-4 px-4">
          <bs-col>
            <div class="ui-input">
              <input
                v-model="login"
                :height="''"
                :icon="'icon-user-shape'"
                :placeholder="'Логин'"
                @keydown.enter="onClick"
                tabindex="1"
              />
            </div>
          </bs-col>
        </bs-row>
        <bs-row class="pt-3 px-4">
          <bs-col>
            <div class="ui-input">
              <input
                v-model="password"
                :height="''"
                :icon="'icon-key'"
                :placeholder="'Пароль'"
                :type="'password'"
                tabindex="2"
                @keydown.enter="onClick"
              />
            </div>
          </bs-col>
        </bs-row>

        <bs-row :pt="5" class="justify-content-center">
          <ui-button
            active
            @onClick="onClick"
            @keydown.enter="onClick"
            tabindex="3"
          >
            {{ $locale.getTranslate("Ок") }}
          </ui-button>
        </bs-row>

        <bs-row
          class="error pb-1 px-4"
          style="color: #f65a48; display: flex; align-items: center"
        >
          <bs-col
            v-if="errorMessage"
            class="er align-items-center d-flex"
            style="overflow: hidden"
          >
            <span
              class="icon-delete"
              style="font-size: 20px; padding-right: 10px"
            />
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
import { Vue } from "vue-class-component";

import { set } from "js-cookie";
import ListViewItem from "list-view/src/listviewitem";
import DefaultModel from "../a-model/default-model";
import api from "@/api";

// import WsResponseModel from "../../../dataSource/api/SchemaBuilderServer/Models/WsResponseModel";
// import BaseResponse from "../../../dataSource/api/Common/ResponseModels/BaseResponse";
// import UserResponse from "../../../dataSource/api/Users/IdentityService/Models/UserResponse";

// import DictionaryModel from "@dataSource/Models/DictionaryModel";
// import LayoutComponent from "@layouts/layout.vue";

export default class LoginComponent extends Vue {
  login = "admin";
  password = "111111";
  errorMessage: String = null;
  langItems: ListViewItem<DefaultModel>[] = [];

  currentUser: { Id: number; Email: string; FullName: string } = {
    Id: 1,
    Email: "test@test.ru",
    FullName: "Анна Иванова",
  };

  created() {
    // this.getLangItems();
  }

  async onClick() {
    try {
      const result = await api.getInstance().AccountService.loginAsync({
        Login: this.login,
        Password: this.password,
      });
      // api.getInstance().SetUser(this.currentUser);
    } catch (error) {}
    this.$router.push({ name: "catalog" });
  }

  // let responseLogin: String = "";
  // try {
  //   responseLogin = await this.$api.AccountService.loginAsync({
  //     Login: this.login,
  //     Password: this.password,
  //   });
  // } catch (error) {
  //   (this as any).$notification.error(error);
  //   return;
  // }
  // set("Auth-Token", responseLogin);

  // let userRoles: UserInfoResponse = null;
  // try {
  //   userRoles = await this.$api.AccountService.getUserInfoAsync();
  // } catch (error) {
  //   this.$notification.error(error);
  //   return;
  // }
  // const roles = userRoles.Roles;

  // store.commit("setRoles", roles);
  // this.$router.push("/" + this.$locale.currentLang);
  // this.$router.push({ name: "/" });

  // this.$api.AccountService.LoginEvent.once(response => {
  //   if (!response.IsSuccess) {
  //     this.$notification.error(response.ErrorMessage);
  //     return;
  //   }
  //   set("Auth-Token", response.Value);
  //   this.$router.push("/" + this.$locale.currentLang);
  // });

  // this.errorMessage = null;
  // this.$locale.currentLang = this.getSelectedLang();
  // this.$api.AccountService.Login({
  //   Login: this.login,
  //   Password: this.password
  // });
  // const g = new Guid();
  // set("Auth-Token", g);
}
</script>
<style lang="less">
.page-login {
  // font-family: Solomon Sans;
  // background: url("/assets/img/bg.jpg");
  background: url("~@/assets/img/bg.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;

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
    border-radius: 5%;
    .title {
      font-size: 20px;
      line-height: 24px;
      color: #162a47;
      text-align: center;
      font-weight: bold;
      padding-bottom: 40px;
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
    text-transform: uppercase;

    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 20px;
    margin: 0 10px;

    // color: #1791fa;
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

  .control-input {
    input.form-control {
      // font-size: 12px;
      font-family: Solomon Sans;
      padding: 9px 10px 9px 40px;
    }
    .icon {
      font-size: 18px;
    }
  }
  .ui-input {
    display: flex;
    input {
      background: #fcfcfc;
      font-family: ProximaNova;
      border: 1px solid #d2d2d2;
      box-sizing: border-box;
      padding: 5px 16px;
      font-size: 14px;
      width: 100%;
      &::placeholder {
        color: #787878;
      }
      &:focus {
        outline: none;
        border: solid 1px #23a4a2;
      }
    }
  }
  .ui-button {
    height: 36px;
    font-size: 14px;
  }
}
</style>
