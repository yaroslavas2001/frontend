<template>
  <div :class="GetClass()">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options<BsContainer>({
  props: {
    light: { default: false, type: Boolean },
    dark: { default: false, type: Boolean },
    fluid: { default: null, type: Boolean },
    h100: { default: false, type: Boolean },
    ml: { type: Number, default: null },
    mr: { type: Number, default: null },
    mt: { type: Number, default: null },
    mb: { type: Number, default: null },
    mx: { type: Number, default: null },
    my: { type: Number, default: null },
    pl: { type: Number, default: null },
    pr: { type: Number, default: null },
    pt: { type: Number, default: null },
    pb: { type: Number, default: null },
    px: { type: Number, default: null },
    py: { type: Number, default: null },
  },
})
export default class BsContainer extends Vue {
  readonly light: boolean;
  readonly dark: boolean;
  readonly fluid: boolean;
  readonly h100: boolean;
  readonly ml: number;
  readonly mr: number;
  readonly mt: number;
  readonly mb: number;
  readonly mx: number;
  readonly my: number;
  readonly pl: number;
  readonly pr: number;
  readonly pt: number;
  readonly pb: number;
  readonly px: number;
  readonly py: number;

  // @Prop({ default: false }) light!: boolean;
  // @Prop({ default: false }) dark!: boolean;
  // @Prop({ default: null }) fluid!: boolean;
  // @Prop({ default: false }) h100!: boolean;

  // @Prop({ type: Number, default: null }) ml: Number;

  // @Prop({ type: Number, default: null }) mr: Number;

  // @Prop({ type: Number, default: null }) mt: Number;

  // @Prop({ type: Number, default: null }) mb: Number;

  // @Prop({ type: Number, default: null }) mx: Number;

  // @Prop({ type: Number, default: null }) my: Number;

  // @Prop({ type: Number, default: null }) pl: Number;

  // @Prop({ type: Number, default: null }) pr: Number;

  // @Prop({ type: Number, default: null }) pt: Number;

  // @Prop({ type: Number, default: null }) pb: Number;

  // @Prop({ type: Number, default: null }) px: Number;

  // @Prop({ type: Number, default: null })   py: Number;

  GetClass() {
    var css: any = {};
    css.light = this.light;
    css.dark = this.dark;
    css["h-100"] = this.h100;
    css.container = this.fluid == false || null;

    css["container-fluid"] = this.fluid == true;

    css[`ml-${this.ml}`] = this.ml != null;
    css[`mt-${this.mt}`] = this.mt != null;
    css[`mr-${this.mr}`] = this.mr != null;
    css[`mb-${this.mb}`] = this.mb != null;
    css[`my-${this.my}`] = this.my != null;
    css[`mx-${this.mx}`] = this.mx != null;

    css[`pl-${this.pl}`] = this.pl != null;
    css[`pt-${this.pt}`] = this.pt != null;
    css[`pr-${this.pr}`] = this.pr != null;
    css[`pb-${this.pb}`] = this.pb != null;
    css[`py-${this.py}`] = this.py != null;
    css[`px-${this.px}`] = this.px != null;
    return css;
  }
}
</script>
<style lang="less">
@bgColorLight: #21324f;
@bgColorDark: #1d2b44;
.container,
.container-fluid {
  &.light {
    background-color: @bgColorLight;
  }
  &.dark {
    background-color: @bgColorDark;
  }
  &.h-100 {
    height: 100%;
  }
}
</style>
