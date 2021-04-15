<template>
  <div class="row" :class="GetClass()">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options<BsRow>({
  props: {
    noGutters: Boolean,
    h100: Boolean,
    justifyContentEnd: { default: null, type: Boolean },
    justifyContentCenter: { default: null, type: Boolean },
    alignItemsCenter: { default: null, type: Boolean },
    alignItemsBaseline: { default: null, type: Boolean },
    ml: Number,
    mr: Number,
    mt: Number,
    mb: Number,
    mx: Number,
    my: Number,
    pt: Number,
    pl: Number,
    pr: Number,
    pb: Number,
    px: Number,
    py: Number,
    dXlBlock: Boolean,
    dLgBlock: Boolean,
    dMdBlock: Boolean,
    dSmBlock: Boolean,
    dXlNone: Boolean,
    dLgNone: Boolean,
    dMdNone: Boolean,
    dSmNone: Boolean,
  },
})
export default class BsRow extends Vue {
  noGutters: Boolean = false;
  h100: Boolean = false;
  justifyContentEnd: Boolean = false;
  justifyContentCenter: Boolean = false;
  alignItemsCenter: Boolean = false;
  alignItemsBaseline: Boolean = false;
  ml: Number = null;
  mr: Number = null;
  mt: Number = null;
  mb: Number = null;
  mx: Number = null;
  my: Number = null;
  pt: Number = null;
  pl: Number = null;
  pr: Number = null;
  pb: Number = null;
  px: Number = null;
  py: Number = null;
  dXlBlock: Boolean = null;
  dLgBlock: Boolean = null;
  dMdBlock: Boolean = null;
  dSmBlock: Boolean = null;
  dXlNone: Boolean = null;
  dLgNone: Boolean = null;
  dMdNone: Boolean = null;
  dSmNone: Boolean = null;
  GetClass() {
    var css: any = {};
    css["h-100"] = this.h100;
    css["no-gutters"] = this.noGutters;
    css["justify-content-end"] = this.justifyContentEnd != null;
    css["justify-content-center"] = this.justifyContentCenter != null;
    css["align-items-center"] = this.alignItemsCenter != null;
    css["align-items-baseline"] = this.alignItemsBaseline != null;
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

    css["d-xl-block"] = this.dXlBlock;
    css["d-lg-block"] = this.dLgBlock;
    css["d-md-block"] = this.dMdBlock;
    css["d-sm-block"] = this.dSmBlock;

    css["d-xl-none"] = this.dXlNone;
    css["d-lg-none"] = this.dLgNone;
    css["d-md-none"] = this.dMdNone;
    css["d-sm-none"] = this.dSmNone;

    return css;
  }
}
</script>
<style lang="less">
.row {
  &.h-100 {
    height: 100%;
  }
  &.justify-content-end {
    justify-content: flex-end;
  }
}
</style>