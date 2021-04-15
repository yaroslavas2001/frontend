<template>
  <header class="header">
    <div class="header__update">
      <div class="icon"><span class="icon-apteka-database"></span></div>
    </div>
    <div class="header__user-panel">
      <div class="header__user-photo" @click="changeProfile">
        <!-- <span class="icon-apteka-photo"></span> -->
        <img src="@assets/img/no_image.svg" alt="" class="ico-image" />
      </div>
      <div class="header__user-text">
        <div class="user__name" @click="changeProfile" title="Войти в профиль">
          {{ userName }}
        </div>
        <div class="user" @click.stop="onLogout">
          <a href="#" title="Выход из учетной записи">Выход</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import api from "@/api";
import { Options, Vue } from "vue-class-component";

export default class LayoutHeader extends Vue {
  userName = "";
  async created() {
    // console.log("LayoutComponent created");
    try {
      const res = await api.getInstance().AccountService.getUserInfoAsync();
      this.userName = res.Login;
    } catch (error) {
      this.$router.push({ name: "login" });
    }
  }

  changeProfile() {
    this.$router.push({ name: "profile" });
    this.$emit("changeProfile");
  }
  async onLogout() {
    this.$router.push({ name: "login" });
    try {
      const result = await api.getInstance().AccountService.logoutAsync();
    } catch (error) {
      throw Error(error);
    }

    this.$router.push({ name: "login" });
  }
}
</script>

<style lang="less">
header {
  height: 74px;
  background: #0f4d4c;
  display: flex;
  color: #fff;
  .header__update {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 30px;
    padding-left: 30px;
    border-right: 1px solid #176363;
    cursor: pointer;
    .icon {
      width: 41px;
      height: 41px;
      border-radius: 50%;
      background: #0c3030;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #23a4a2;
    }
  }
  .header__user-panel {
    padding-right: 30px;
    padding-left: 30px;
    min-width: 195px;
    display: flex;
    align-items: center;
    .header__user-photo {
      flex: 41px 0 0;
      width: 41px;
      height: 41px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0c3030;
      border-radius: 50%;
      margin-right: 14px;
      .ico-image {
        height: 100%;
        width: 100%;
        cursor: pointer;
      }
    }
    .header__user-text {
      overflow: hidden;
      a {
        color: #fff;
      }
      .user__name {
        color: #bac6da;
        cursor: pointer;
      }
    }
  }
}
</style>