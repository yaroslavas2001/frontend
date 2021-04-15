<template>
  <div class="form-group">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "bs-form-group"
})
export default class BsFormGroupComponent extends Vue {
 
}
</script>
<style lang="less" scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>