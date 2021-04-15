<template>
  <div
    class="ui-button"
    v-bind:class="{ active: active, disabled: disabled, border: border }"
    @click.native="emitClick"
    :tabindex="tabindex"
    :style="innerStyle"
  >
    <span :class="icon" class="icon"></span>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options<UiButton>({
  props: {
    padding: { type: String, default: "0.40em 0.75em" },
    color: { type: String, default: "" },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
    width: { type: Number, default: 100 },
    icon: { type: String, default: "" },
    tabindex: { type: String, default: "" },
  },
})
export default class UiButton extends Vue {
  private disabled: boolean = false;
  private active: boolean = false;
  private border: boolean = false;
  private color: string = "";
  private width: number = 100;
  private icon: string = "";
  private tabindex: string = "";
  private padding: string = "0.40em 0.75em";
  emitClick() {
    if (!this.disabled) this.$emit("onClick");
  }
  get innerStyle(): Object {
    return {
      backgroundColor: this.color,
      padding: this.padding,
      minWidth: this.width + "px",
    };
  }
}
</script>

<style lang="less">
@uiBtnColor: #000;
@uiBtnBgColor: #eeeeee;
@uiBtnBorder: #23a4a2;
@uiBtnBorderRadius: 0px;
@uiBtnActiveColor: #ffffff;
@uiBtnActiveBgColor: #23a4a2;
@uiBtnActiveBorder: #23a4a2;

@uiBtnDisabledActiveColor: #fff;
@uiBtnDisabledActiveBgColor: #23a4a2;
@uiBtnDisabledActiveBorder: #0677b2;

@uiBtnDisabledColor: #fff;
@uiBtnDisabledBgColor: #ccc;
@uiBtnDisabledBorder: #ccc;

@uiBtnLinkColor: #ffffff;

.ui-button {
  padding: 0.35em 0.75em;
  user-select: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: @uiBtnColor;
  white-space: nowrap;
  cursor: pointer;
  background-color: @uiBtnBgColor;
  // font-size: inherit;
  display: flex;
  text-decoration: none;
  white-space: nowrap;
  border: 1px solid @uiBtnBorder;
  border-radius: @uiBtnBorderRadius;
  &.border {
  }
  &:hover,
  &:focus {
    filter: brightness(110%);
  }
  &.disabled {
    cursor: not-allowed;

    background-color: @uiBtnDisabledBgColor;
    border: 1px solid @uiBtnDisabledBorder;
    &:hover {
      filter: unset;
    }
    &.active {
      background-color: @uiBtnDisabledActiveBgColor;
    }
  }
  &.active {
    background-color: @uiBtnActiveBgColor;
    border: 1px solid @uiBtnActiveBorder;
    color: @uiBtnActiveColor;
  }
  a {
    color: @uiBtnLinkColor;
    text-decoration: none;
  }
}
</style>
