<template>
  <div class="ui-checkbox" @click="onClick" :class="{ disabled: disabled }">
    <div
      class="point"
      :class="[modelValue ? icon : '', { checked: modelValue }]"
    ></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    modelValue: Boolean,
    disabled: Boolean,
    icon: String,
    checked: Boolean,
  },
  emits: ["modelValue"],
  watch: {
    modelValue(value) {
      this.$emit("change", this.innerChecked);
      this.$emit("update:modelValue", this.innerChecked);
    },
  },
})
export default class UiCheckBoxComponent extends Vue {
  readonly disabled: boolean = false;
  readonly modelValue: boolean = false;
  readonly icon: string = "icon-check";
  readonly checked: boolean = false;

  innerChecked: boolean = this.modelValue;
  created() {
    this.innerChecked = this.modelValue;
  }
  onClick() {
    if (!this.disabled) this.innerChecked = !this.innerChecked;
    // this.$emit("change", this.innerChecked);
    this.$emit("update:modelValue", this.innerChecked);
  }
}
</script>

<style lang="less">
@uiCheckboxBgColor: #f0f0f0;
@uiCheckboxIconColor: #23a4a2;
@uiCheckboxColorLabel: #7a7878;
@uiCheckboxBorderSquareColor: #f0f0f0;

.ui-checkbox {
  display: flex;
  align-items: center;
  margin-right: 1em;
  // justify-content: center;
  position: relative;
  cursor: pointer;
  color: @uiCheckboxColorLabel;
  font-size: 14px;
  user-select: none;
}
div.point {
  border: 1px solid @uiCheckboxBorderSquareColor;
  background: @uiCheckboxBgColor;
  height: 18px;
  width: 18px;
  margin-right: 1em;
  display: flex;
  font-size: 8pt;
  align-items: center;
  justify-content: center;
  min-width: 18px;
}

div.point.checked {
  border: 1px solid @uiCheckboxBorderSquareColor;
  background: @uiCheckboxBgColor;
  height: 18px;
  width: 18px;
  margin-right: 1em;

  color: @uiCheckboxIconColor;
}
.disabled ~ span {
  opacity: 0.6;
  filter: alpha(opacity=60);
  cursor: not-allowed;
  background-color: @uiCheckboxBgColor;
}
</style>
