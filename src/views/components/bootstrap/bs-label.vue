<template>
  <label>
    <slot></slot>
  </label>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "bs-label"
})
export default class BsLabelComponent extends Vue {
 
}
</script>
<style lang="less" scoped>
label {
    color: #b8c3e0;
    display: inline-block;
    margin-bottom: 0.5rem;
}
</style>