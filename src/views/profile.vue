<template>
  <page name="Профиль" noApi noFilter noPagination class="map">
    <template #title></template>
    <template #content>
      <div class="row">
        <div class="col-auto mb-4">
          <ui-image-preview
            v-model="image"
            required
            :aspect-ratio="1"
            :el-hight="200"
          />
        </div>
        <div class="col">
          <label>{{ $locale.getTranslate("ФИО") }}</label>
          <div class="ui-input mb-3">
            <input v-model="profile.FIO" placeholder="..." tabindex="10" />
          </div>

          <label>Страна</label>
          <div class="ui-input mb-3">
            <input v-model="profile.Country" placeholder="..." tabindex="10" />
          </div>
          <!-- <ui-maker></ui-maker> -->
          <label>Город</label>
          <div class="ui-input mb-3">
            <input v-model="profile.City" placeholder="..." tabindex="10" />
          </div>
          <!-- <ui-maker></ui-maker> -->
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label>Номер телефона</label>
          <div class="mb-2 ui-input">
            <input
              placeholder="XXX-X-XX-XX"
              tabindex="13"
              v-input-mask="'###-###-###'"
              v-model="profile.Phone"
            />
          </div>
          <!-- <ui-notification></ui-notification> -->
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-auto btn-save mt-3">
          <ui-button @onClick="saveProfil" active>Сохранить</ui-button>
        </div>
      </div>
    </template>
  </page>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Page from "@views/components/page.vue";
import City from "@views/components/ui/ui-city.vue";
import api from "@/api";
import ImagePreviewModel from "./components/ui-crop-image/ImagePreviewModel";
// import UiNotification from "../plugins/notification/ui-notification.vue";

@Options({
  components: { Page, City },
})
export default class Profile extends Vue {
  image: ImagePreviewModel = {
    Width: 0,
    Height: 0,
    Top: 0,
    Left: 0,
    ImageSrc: "",
  };
  profile: {
    FIO: string;
    Country: string;
    City: string;
    Phone: string;
    Photo: string;
  };
  phone = "123456789";
  created() {
    this.profile = {
      FIO: "Иванов Иван Иванович",
      Country: "ПМР",
      City: "Тирасполь",
      Phone: "123456789",
      Photo: "",
    };
  }
  mounted() {
    // (this as any).$notification.error("ddd");
  }
  saveProfil() {
    // throw Error("saveProfil");
  }
}
</script>
<style lang="less">
.map {
  max-width: 600px;
  height: max-content;
  padding-bottom: 5px;
  .btn-save {
    .ui-button {
      max-width: 100px;
    }
  }
}
</style>
