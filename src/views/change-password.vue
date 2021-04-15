<template>
  <page noApi noFilter noPagination class="change-password" name="Смена пароля">
    <template #title></template>
    <template #filter></template>
    <template v-slot:content>
      <control-validator-group ref="validator">
        <bs-row class="align-items-center" :mb="2">
          <bs-col>
            <label class="label">{{
              $locale.getTranslate("Старый пароль")
            }}</label>
            <div class="mb-2 ui-input">
              <input
                v-model="oldPass"
                class="pass"
                required
                type="password"
                placeholder="..."
                :show-error="false"
              />
            </div>
          </bs-col>
        </bs-row>
        <bs-row :mb="2">
          <bs-col>
            <label class="label">
              {{ $locale.getTranslate("Новый пароль") }}</label
            >
            <div class="mb-2 ui-input">
              <input
                v-model="newPass"
                class="pass"
                type="password"
                required
                placeholder="..."
                :show-error="false"
              />
            </div>
          </bs-col>
        </bs-row>
        <bs-row :mb="2">
          <bs-col>
            <label class="label">
              {{ $locale.getTranslate("Подтвердить новый пароль") }}</label
            >
            <div class="mb-2 ui-input">
              <input
                v-model="newPass2"
                class="pass"
                type="password"
                required
                placeholder="..."
                :show-error="false"
              />
            </div>
          </bs-col>
        </bs-row>
      </control-validator-group>
      <bs-row :my="2">
        <bs-col class="col-auto">
          <ui-button
            :disabled="oldPass && newPass && newPass != newPass2"
            @onClick="onChangePass"
          >
            Сменить пароль</ui-button
          >
        </bs-col>
      </bs-row>
    </template>
  </page>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import ListViewItem from "list-view/src/listviewitem";
import DefaultModel from "@views/a-model/default-model";
import Page from "@views/components/page.vue";
import ControlValidatorGroup from "./components/control-validator-group.vue";
import api from "@/api";

@Options({
  props: {},
  components: { Page },
  watch: {},
  emits: [],
})
export default class ChangePasswordComponent extends Vue {
  oldPass = "";
  newPass = "";
  newPass2 = "";

  created() {
    document.title = this.$route.meta.title;
    this.oldPass = "";
    this.newPass = "";
  }

  isValid(): boolean {
    let passErr = false;
    if (this.newPass2 != this.newPass) {
      passErr = true;
      throw Error("Новые пароли не совпадают!");
    }
    return passErr && (this.$refs.validator as ControlValidatorGroup).isValid();
  }

  onChangePass() {
    if (!this.isValid()) {
      return;
    }

    // api.getInstance().AccountService.ChangePasswordEvent.once((response) => {
    //   // if (!response.IsSuccess) {
    //   //   this.$notification.error("Ошибка при изменении пароля!");
    //   //   return;
    //   // }
    //   (this as any).$notification.success("Пароль успешно изменен");
    // });
    // api.getInstance().AccountService.ChangePassword({
    //   OldPassword: this.oldPass,
    //   NewPassword: this.newPass,
    // });
  }
}
</script>
<style lang="less">
.change-password {
  .pass {
    max-width: 200px;
  }
}
</style>
