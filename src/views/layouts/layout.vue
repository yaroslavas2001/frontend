<template>
  <!-- <ui-notification></ui-notification> -->
  <!-- <ui-dialog></ui-dialog> -->
  <div class="layout" v-if="logined">
    <layout-sidebar />

    <div class="container-custom">
      <layout-header />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import LayoutHeader from "@layouts/layout-header.vue";
import LayoutSidebar from "@layouts/layout-sidebar.vue";
import UiNotification from "@/plugins/notification/ui-notification.vue";
import UiDialog from "@/plugins/dialog/ui-dialog.vue";
import api from "@/api";
import { provide, reactive } from "vue";
@Options({
  components: {
    LayoutHeader,
    LayoutSidebar,
    UiNotification,
  },
  setup() {
    console.log("Help");
  },
  provide() {
    return {
      MyDependency: this.MyDependency,
      user: this.user,
      settings: this.settings,
    };
  },
})
export default class Layout extends Vue {
  MyDependency = {
    foo: "bar",
  };
  settings = reactive({ theme: "light" });
  user = "John Doe";

  logined = false;
  async created() {
    // console.log("LayoutComponent created");
    try {
      const res = await api.getInstance().AccountService.getUserInfoAsync();
      if (res.Login) {
        this.logined = true;
      }
    } catch (error) {
      this.logined = false;
      this.$router.push({ name: "login" });
    }
  }
}
</script>
<style lang="less">
body {
  @font-face {
    font-family: ProximaNova;
    src: url("~@assets/styles/proxima-nova/fonts/ProximaNova-Regular.eot?dsqk3s#iefix")
        format("embedded-opentype"),
      url("~@assets/styles/proxima-nova/fonts/ProximaNova-Regular.ttf?dsqk3s")
        format("truetype"),
      url("~@assets/styles/proxima-nova/fonts/ProximaNova-Regular.woff?dsqk3s")
        format("woff");
    font-weight: 100;
    font-style: normal;
  }
  margin: 0;
  font-family: ProximaNova;
  font-style: normal;
  font-weight: normal;
}
.layout {
  display: flex;
  min-height: 100vh;
  .container-custom {
    flex-grow: 1;
    background: #ececec;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .content {
      // background: #ffffff;
      margin: 20px 30px;
      flex-grow: 1;
    }
  }
}
</style>
