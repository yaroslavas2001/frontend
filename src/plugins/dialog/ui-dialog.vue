<template>
  <ui-modal-window
    :visible="visible"
    :width="'600px'"
    :title="'Удаление'"
    @close="onClose"
  >
    <template #header>
      <div class="d-flex">
        <div
          class="align-self-center bold add-team-user-pop pl-3 p-2"
          style="font-weight: bold; font-size: 17px"
        >
          {{ dialogModal.Title }}
        </div>
      </div>
    </template>
    <div style="font-size: 14px">
      {{ dialogModal.Text }}
    </div>
    <template #button>
      <div v-if="dialogModal.Buttons" class="d-flex justify-content-end py-3">
        <ui-button
          v-for="(item, index) in dialogModal.Buttons"
          :key="index"
          :width="120"
          class="ml-2"
          style="padding: 10px 25px; width: fit-content; font-size: 14px"
          :style="getButtonStyle(item)"
          @onClick="clickButton(item.Value)"
          >{{ item.Title }}</ui-button
        >
      </div>
    </template>
  </ui-modal-window>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import StatusWindow from "modal-window/src/status-window";
import DialogModal, { DialogButton } from "./model/dialogModal";
import UiModalWindow from "@/views/components/ui-modal-window/ui-modal-window.vue";
import { Events } from "../../../dataSource/api/plugins/events";
import UiButton from "@views/components/ui-button.vue";
@Options({
  props: {
    eventBus: Events,
  },
  components: {
    UiModalWindow,
    UiButton,
  },
  emits: ["change"],
})
export default class UiDialog extends Vue {
  type: string = "";
  visible = false;
  eventBus = new Events<DialogModal>();
  dialogModal: DialogModal = new DialogModal();
  created() {
    this.eventBus.on(this.show);
  }
  getButtonStyle(item: DialogButton): Object {
    return {
      background: item.BgColor,
      color: item.Color,
    };
  }
  toModalType(): StatusWindow {
    // switch(this.dialogModal.Type) {
    //     // case
    // }
    return StatusWindow.Text;
  }
  onClose() {
    this.clickButton(undefined);
  }
  clickButton(result: any) {
    this.hide();
    this.$emit("change", result);
    this.dialogModal?.Callback(result);
  }
  hide() {
    this.visible = false;
  }
  show(data: DialogModal) {
    this.dialogModal = data;
    this.visible = true;
  }

  mounted() {
    // console.log("mounted");
  }
}
</script>
<style lang="less">
.dialog {
  font-family: Solomon Sans;
}
</style>
