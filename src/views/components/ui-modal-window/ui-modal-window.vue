<template>
  <div
    class="ui-modal-window"
    id="modal-wrapper"
    v-if="innerVisible"
    @mouseup="mouseUpWrapper"
    @mousedown="mouseDownWrapper"
  >
    <div class="window" :style="{ width: width }">
      <div class="header" v-if="showHeaderTitle" style="">
        <slot name="header">
          <div class="name">
            <div
              class="icon"
              v-if="icon"
              style="display: flex; padding-right: 10px"
            >
              <span v-if="type == 2" class="icon-icon_error">
                <span class="path1"></span><span class="path2"></span>
                <span class="path3"></span>
              </span>
              <span v-if="type == 3" class="icon-icon_warning">
                <span class="path1"></span><span class="path2"></span>
              </span>
              <span v-if="type == 4" class="icon-icon_info">
                <span class="path1"></span><span class="path2"></span
                ><span class="path3"></span>
              </span>
            </div>
            <div class="title align-self-center">{{ title }}</div>
          </div>
        </slot>
        <div class="bnt-close" v-if="showCloseBtn" @click="closeWindow">
          &times;
        </div>
      </div>
      <div class="body mt-3">
        <slot name="default"></slot>

        <slot name="button" v-if="!noButton">
          <div class="row py-3">
            <div class="col d-flex justify-content-end">
              <ui-button
                @onClick="onOk"
                :width="100"
                active
                :tabindex="'102'"
                style="margin-right: 5px"
                >Да</ui-button
              >
              <ui-button @onClick="onCancel" :width="100" :tabindex="'101'">
                Нет
              </ui-button>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import StatusWindow from "./status-window";
import BsRow from "@views/components/bootstrap/bs-row.vue";
import UiButton from "@views/components/ui-button.vue";
import UiScroll from "@/views/components/ui-scroll.vue";

@Options<UiModalWindow>({
  components: {
    StatusWindow,
    BsRow,
    UiButton,
    UiScroll,
  },
  props: {
    title: { default: "", type: String },
    visible: { default: false, type: Boolean },
    showCloseBtn: { default: true, type: Boolean },
    width: { default: "600px", type: String },
    type: { default: StatusWindow.Text, type: Number },
    noButton: { default: false, type: Boolean },
    showHeaderTitle: { default: true, type: Boolean },
    autoClose: { default: true, type: Boolean },
    icon: { default: false, type: Boolean },
  },
  watch: {
    visible(value) {
      this.innerVisible = this.visible;
    },
  },
})
export default class UiModalWindow extends Vue {
  // @Prop({ default: "title" }) title: string;
  // @Prop({ default: false, type: Boolean }) visible: boolean;
  // @Prop({ default: true, type: Boolean }) showCloseBtn: boolean;
  // @Prop({ default: "300px", type: String }) width: string;
  // @Prop({ default: StatusWindow.Text, type: Number }) type: StatusWindow;

  // @Prop({ default: false, type: Boolean }) noButton: boolean;
  // @Prop({ default: true, type: Boolean }) showHeaderTitle: boolean;
  // @Prop({ default: true, type: Boolean }) autoClose: boolean;
  title: string = "";
  visible: boolean = false;
  showCloseBtn: boolean = true;
  width: string = "300px";
  type: StatusWindow = StatusWindow.Text;
  noButton: boolean = false;
  showHeaderTitle: boolean = true;
  autoClose: boolean = true;
  icon: boolean = false;

  innerVisible = this.visible;
  elementClick: HTMLElement = null;

  // @Watch("visible")
  // onChangeVisible() {
  //   this.innerVisible = this.visible;
  // }
  // @Watch("innerVisible")
  // onChangeVisible(visible: boolean) {
  //   this.innerVisible = visible;
  // }
  created() {
    // console.log(`this.visible`, this.visible);
  }
  hasSlotData() {
    return this.$slots.button;
  }
  closeWindow() {
    this.innerVisible = false;
    this.$emit("close");
    return false;
  }
  onCancel() {
    this.$emit("cancel");
    this.closeWindow();
    return false;
  }
  onOk() {
    this.$emit("ok");
    if (this.autoClose) {
      this.closeWindow();
    }
    return false;
  }
  onKeyDown(evt: any) {
    if (this.innerVisible) {
      evt = evt || window.event;
      var isEscape = false;
      if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
      } else {
        isEscape = evt.keyCode === 27;
      }
      if (isEscape) {
        this.onCancel();
      }
    }
  }
  getWindowsType(type: StatusWindow) {
    var value = "";
    switch (type) {
      case 1:
        //text
        value = "";
        break;
      case 2:
        //error
        value = "icon-icon_error";
        break;
      case 3:
        //warning
        value = "icon-icon_warning";
        break;
      case 4:
        //info
        value = "icon-icon_info";
        break;
      default:
        break;
    }

    return value;
  }
  mouseDownWrapper(ev: MouseEvent) {
    this.elementClick = ev.target as HTMLElement;
  }
  mouseUpWrapper(ev: MouseEvent) {
    const wrapper = document.getElementById("modal-wrapper");
    if (this.elementClick == wrapper && ev.target == wrapper) {
      this.$emit("clickOutside");
    }
  }
}
</script>
<style lang="less" scoped>
@modalWindowWrapperBgColor: rgba(0, 0, 0, 0.7);
@modalWindowBgColor: #fff;
@modalWindowHeaderBgColor: #fff;
@modalWindowTitleColor: #343545;
@modalWindowHeaderColor: #162a47;
@modalWindowBodyColor: #7a7878;
@modalWindowHeaderMargin: 0;
@modalWindowHeaderBorderBottom: none;
@modalWindowCloseButtonColor: #99a4c0;
.ui-modal-window {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: @modalWindowWrapperBgColor;
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  .window {
    background: @modalWindowBgColor;
    outline: none;
    // border: 1px solid #4d648b;
    .header {
      display: grid;
      grid-template-columns: auto 40px;
      align-content: center;
      background: @modalWindowHeaderBgColor;
      margin: @modalWindowHeaderMargin;
      border-bottom: @modalWindowHeaderBorderBottom;
      color: @modalWindowHeaderColor;
      font-size: 17px;
      border-bottom: 1px solid #23a4a2;
      .name {
        display: flex;
        align-items: center;
        padding-left: 20px;

        cursor: unset;
      }

      .title {
        color: @modalWindowTitleColor;
        display: flex;
        font-size: 18px;
        // font-weight: bold;
        align-items: center;
        padding: 0 20px 0 0;
        height: 48px;
      }
      .bnt-close {
        font-size: 30px;
        align-items: center;
        display: flex;
        cursor: pointer;
        color: @modalWindowCloseButtonColor;
      }
    }
    .icon {
      font-size: 24px;
    }
    .body {
      padding: 0 20px 0 20px;
      color: @modalWindowBodyColor;
      .button-wrapper {
        display: flex;
        justify-content: flex-end;
        padding: 10px 0;
      }
    }
  }
}
</style>