<template>
  <div
    :tabindex="disabled ? -1 : 0"
    @focus="onGetFocus"
    @blur="onBlur"
    @click="toggle"
    ref="root"
    class="ui-toggle-switcher"
    :class="[{ disabled: disabled, checked: yesValue === innerValue }, type]"
  >
    <div class="slider"></div>
  </div>
</template>
<script lang="ts">
import BaseInputComponent from "component-models/src/baseInputModel";
import { Options, Vue } from "vue-class-component";
@Options<UiToggleSwitcherComponent>({
  props: {
    yesValue: {
      default: true,
      type: [Boolean, String, Number, Number, Date, Object, Array],
    },
  },
})
const rounded = "rounded";
const rectangle = "rectangle";
export default class UiToggleSwitcherComponent extends BaseInputComponent {
  @Prop({
    default: true,
    type: [Boolean, String, Number, Number, Date, Object, Array],
  })
  yesValue?: any | any[] | Boolean | String | Number | string | number | Date;
  @Prop({
    default: false,
    type: [Boolean, String, Number, Number, Date, Object, Array],
  })
  noValue?: any | any[] | Boolean | String | Number | string | number | Date;
  @Prop({
    default: rounded,
    validator: (x: string) => {
      return x == rounded || x == rectangle;
    },
  })
  type: string;
  hasFocus = false;
  toggle() {
    if (this.disabled) {
      return;
    }
    this.innerValue =
      this.innerValue == this.yesValue ? this.noValue : this.yesValue;
  }
  mounted() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown.bind(this));
  }
  onGetFocus() {
    this.hasFocus = true;
  }
  onBlur() {
    this.hasFocus = false;
  }
  onKeyDown(ev: KeyboardEvent) {
    var key = ev.key.toLowerCase();
    if (this.hasFocus && key == "enter") {
      return this.toggle();
    }
  }
}
</script>
<style lang="less" scoped>
@uiToggleSwitcherBorder: none;
@uiToggleSwitcherHeight: 1em;
@uiToggleSwitcherWidth: 2em;
@uiToggleSwitcherSliderHeight: 0.8em;
@uiToggleSwitcherSliderWidth: 0.8em;
@uiToggleSwitcherSliderDisabledBgColor: #794424;
@uiToggleSwitcherSliderNoBgColor: #a75524;
@uiToggleSwitcherSliderYesBgColor: #f37021;
@uiToggleSwitcherDisabledBgColor: gray;
@uiToggleSwitcherYesBgColor: #f0f0f0;
@uiToggleSwitcherNoBgColor: #b7b7b7;
@uiToggleSwitcherTransitionTime: 0.4s;

.ui-toggle-switcher {
  outline: none;
  display: inline-block;
  height: 1em;
  width: 2em;
  cursor: pointer;
  position: relative;
  user-select: none;
  background-color: @uiToggleSwitcherNoBgColor;
  transition: @uiToggleSwitcherTransitionTime;
  border: @uiToggleSwitcherBorder;
  &.checked {
    background-color: @uiToggleSwitcherYesBgColor;
    .slider {
      left: calc(
        @uiToggleSwitcherWidth - @uiToggleSwitcherSliderWidth -
          (@uiToggleSwitcherHeight - @uiToggleSwitcherSliderHeight) / 2
      );
      background-color: @uiToggleSwitcherSliderYesBgColor;
    }
  }
  &.disabled {
    cursor: not-allowed;
    background-color: @uiToggleSwitcherDisabledBgColor;
    .slider {
      background-color: @uiToggleSwitcherSliderDisabledBgColor;
    }
  }
  .slider {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: calc((@uiToggleSwitcherHeight - @uiToggleSwitcherSliderHeight) / 2);
    background-color: @uiToggleSwitcherSliderNoBgColor;
    height: @uiToggleSwitcherSliderHeight;
    width: @uiToggleSwitcherSliderWidth;
    transition: @uiToggleSwitcherTransitionTime;
  }
  &.rounded {
    border-radius: calc(@uiToggleSwitcherHeight / 2);
    .slider {
      border-radius: 50%;
    }
  }
}
</style>