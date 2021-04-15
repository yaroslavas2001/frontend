<template>
  <div :class="GetClass()" @click="click">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  colAuto: Boolean,
  colSmAuto: Boolean,
  colMdAuto: Boolean,
  colLgAuto: Boolean,
  colXlAuto: Boolean,
  formGroup: Boolean,
  col: Number,
  colSm: Number,
  colMd: Number,
  colLg: Number,
  colXl: Number,
  offset: Number,
  offsetSm: Number,
  offsetMd: Number,
  offsetLg: Number,
  offsetXl: Number,
  order: Number,
  ml: Number,
  mr: Number,
  mt: Number,
  mb: Number,
  mx: Number,
  mxSm: Number,
  mxMd: Number,
  mxLg: Number,
  my: Number,
  pl: Number,
  pr: Number,
  pt: Number,
  pb: Number,
  px: Number,
  py: Number,
  mlSmAuto: Boolean,
  mlMdAuto: Boolean,
  mlLgAuto: Boolean,
  mlXlAuto: Boolean,
  mrAuto: Boolean,
  mrSmAuto: Boolean,
  mrMdAuto: Boolean,
  mrLgAuto: Boolean,
  mrXlAuto: Boolean,
  dXlBlock: Boolean,
  dLgBlock: Boolean,
  dMdBlock: Boolean,
  dSmBlock: Boolean,
  dBlock: Boolean,
  dXlNone: Boolean,
  dLgNone: Boolean,
  dMdNone: Boolean,
  dSmNone: Boolean,
  dNone: Boolean,
})
export default class BsCol extends Vue {
  //   @Prop({ default: null }) colAuto!: boolean;
  //   @Prop({ default: null }) colSmAuto!: boolean;
  //   @Prop({ default: null }) colMdAuto!: boolean;
  //   @Prop({ default: null }) colLgAuto!: boolean;
  //   @Prop({ default: null }) colXlAuto!: boolean;
  //   @Prop({ default: false }) formGroup!: boolean;
  //   @Prop({ type: Number }) col: Number;
  //   @Prop({ type: Number, default: null }) colSm: Number;
  //   @Prop({ type: Number, default: null }) colMd: Number;
  //   @Prop({ type: Number, default: null }) colLg: Number;
  //   @Prop({ type: Number, default: null }) colXl: Number;
  //   @Prop({ type: Number, default: null }) offset: Number;
  //   @Prop({ type: Number, default: null }) offsetSm: Number;
  //   @Prop({ type: Number, default: null }) offsetMd: Number;
  //   @Prop({ type: Number, default: null }) offsetLg: Number;
  //   @Prop({ type: Number, default: null }) offsetXl: Number;
  //   @Prop({ type: Number, default: null }) order: Number;
  //   @Prop({ type: Number, default: null }) ml: Number;
  //   @Prop({ type: Number, default: null }) mr: Number;
  //   @Prop({ type: Number, default: null }) mt: Number;
  //   @Prop({ type: Number, default: null }) mb: Number;
  //   @Prop({ type: Number, default: null }) mx: Number;
  //   @Prop({ type: Number, default: null }) mxSm: Number;
  //   @Prop({ type: Number, default: null }) mxMd: Number;
  //   @Prop({ type: Number, default: null }) mxLg: Number;
  //   @Prop({ type: Number, default: null }) mxXl: Number;
  //   @Prop({ type: Number, default: null }) my: Number;
  //   @Prop({ type: Number, default: null }) pl: Number;
  //   @Prop({ type: Number, default: null }) pr: Number;
  //   @Prop({ type: Number, default: null }) pt: Number;
  //   @Prop({ type: Number, default: null }) pb: Number;
  //   @Prop({ type: Number, default: null }) px: Number;
  //   @Prop({ type: Number, default: null }) py: Number;
  //   @Prop({ default: null }) mlAuto: boolean;

  // @Prop({ default: null})
  // mlAuto:boolean;

  //   @Prop({ default: null }) mlSmAuto: boolean;
  //   @Prop({ default: null }) mlMdAuto: boolean;
  //   @Prop({ default: null }) mlLgAuto: boolean;
  //   @Prop({ default: null }) mlXlAuto: boolean;
  //   @Prop({ default: null }) mrAuto: boolean;
  //   @Prop({ default: null }) mrSmAuto: boolean;
  //   @Prop({ default: null }) mrMdAuto: boolean;
  //   @Prop({ default: null }) mrLgAuto: boolean;
  //   @Prop({ default: null }) mrXlAuto: boolean;
  //   @Prop({ default: null }) dXlBlock: boolean;
  //   @Prop({ default: null }) dLgBlock: boolean;
  //   @Prop({ default: null }) dMdBlock: boolean;
  //   @Prop({ default: null }) dSmBlock: boolean;
  //   @Prop({ default: null }) dBlock: boolean;
  //   @Prop({ default: null }) dXlNone: boolean;
  //   @Prop({ default: null }) dLgNone: boolean;
  //   @Prop({ default: null }) dMdNone: boolean;
  //   @Prop({ default: null }) dSmNone: boolean;
  //   @Prop({ default: null }) dNone: boolean;
  colAuto: boolean = null;
  colSmAuto: boolean = null;
  colLgAuto: boolean = null;
  colMdAuto: boolean = null;
  colXlAuto: boolean = null;
  formGroup: boolean = false;
  col: number = null;
  colSm: number = null;
  colMd: number = null;
  colLg: number = null;
  colXl: number = null;
  offset: number = null;
  offsetSm: number = null;
  offsetMd: number = null;
  offsetLg: number = null;
  offsetXl: number = null;
  order: number = null;
  ml: number = null;
  mr: number = null;
  mt: number = null;
  mb: number = null;
  mx: number = null;
  mxSm: number = null;
  mxMd: number = null;
  mxLg: number = null;
  mxXl: number = null;
  mlAuto: number = null;
  my: number = null;
  pl: number = null;
  pr: number = null;
  pt: number = null;
  pb: number = null;
  px: number = null;
  py: number = null;
  mlSmAuto: boolean = null;
  mlMdAuto: boolean = null;
  mlLgAuto: boolean = null;
  mlXlAuto: boolean = null;
  mrAuto: boolean = null;
  mrSmAuto: boolean = null;
  mrMdAuto: boolean = null;
  mrLgAuto: boolean = null;
  mrXlAuto: boolean = null;
  dXlBlock: boolean = null;
  dLgBlock: boolean = null;
  dMdBlock: boolean = null;
  dSmBlock: boolean = null;
  dBlock: boolean = null;
  dXlNone: boolean = null;
  dLgNone: boolean = null;
  dMdNone: boolean = null;
  dSmNone: boolean = null;
  dNone: boolean = null;
  GetClass() {
    var css: any = {};
    css["col-auto"] = this.colAuto;
    css["col-sm-auto"] = this.colSmAuto;
    css["col-md-auto"] = this.colMdAuto;
    css["col-lg-auto"] = this.colLgAuto;

    css["d-xl-block"] = this.dXlBlock;
    css["d-lg-block"] = this.dLgBlock;
    css["d-md-block"] = this.dMdBlock;
    css["d-sm-block"] = this.dSmBlock;
    css["d-block"] = this.dBlock != null;

    css["d-xl-none"] = this.dXlNone != null;
    css["d-lg-none"] = this.dLgNone != null;
    css["d-md-none"] = this.dMdNone != null;
    css["d-sm-none"] = this.dSmNone != null;
    css["d-none"] = this.dNone != null;

    css.formGroup = this.formGroup;
    css.col =
      (this.colAuto == null || this.colAuto == false) &&
      this.col == null &&
      this.colSm == null &&
      this.colMd == null &&
      this.colLg == null &&
      this.colXl == null;

    css[`ml-${this.ml}`] = this.ml != null;
    css[`mt-${this.mt}`] = this.mt != null;
    css[`mr-${this.mr}`] = this.mr != null;
    css[`mb-${this.mb}`] = this.mb != null;
    css[`my-${this.my}`] = this.my != null;
    css[`mx-${this.mx}`] = this.mx != null;

    css[`mx-sm-${this.mxSm}`] = this.mxSm != null;
    css[`mx-md-${this.mxMd}`] = this.mxMd != null;
    css[`mx-lg-${this.mxLg}`] = this.mxLg != null;
    css[`mx-xl-${this.mxXl}`] = this.mxXl != null;

    css[`pl-${this.pl}`] = this.pl != null;
    css[`pt-${this.pt}`] = this.pt != null;
    css[`pr-${this.pr}`] = this.pr != null;
    css[`pb-${this.pb}`] = this.pb != null;
    css[`py-${this.py}`] = this.py != null;
    css[`px-${this.px}`] = this.px != null;

    css["ml-auto"] = this.mlAuto != null;
    css["ml-sm-auto"] = this.mlSmAuto != null;
    css["ml-md-auto"] = this.mlMdAuto != null;
    css["ml-lg-auto"] = this.mlLgAuto != null;
    css["ml-xl-auto"] = this.mlXlAuto != null;

    css["mr-auto"] = this.mrAuto != null;
    css["mr-sm-auto"] = this.mrSmAuto != null;
    css["mr-md-auto"] = this.mrMdAuto != null;
    css["mr-lg-auto"] = this.mrLgAuto != null;
    css["mr-xl-auto"] = this.mrXlAuto != null;

    css[`col-${this.col}`] = this.col != null;
    css[`col-sm-${this.colSm}`] = this.colSm != null;
    css[`col-md-${this.colMd}`] = this.colMd != null;
    css[`col-lg-${this.colLg}`] = this.colLg != null;
    css[`col-xl-${this.colXl}`] = this.colXl != null;

    css[`offset-${this.offset}`] = this.offset != null;
    css[`offset-sm-${this.offsetSm}`] = this.offsetSm != null;
    css[`offset-md-${this.offsetMd}`] = this.offsetMd != null;
    css[`offset-lg-${this.offsetLg}`] = this.offsetLg != null;
    css[`offset-xl-${this.offsetXl}`] = this.offsetXl != null;

    css[`order-${this.order}`] = this.order != null;

    return css;
  }

  click() {
    this.$emit("click");
  }
}
</script>
