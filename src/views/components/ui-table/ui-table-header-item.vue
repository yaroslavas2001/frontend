<template>
  <div
    class="ui-table-header-item"
    v-bind:style="styleCustom"
    @click="sortExecute"
    v-bind:class="{ 'cursor-pointer': !!sortName }"
  >
    <div>
      <slot> </slot>
    </div>
    <div class="ml-2" v-if="sortType != null">
      <div :class="[{ active: sortType == 1 }, iconAsc]"></div>
      <div style="height: 5px"></div>
      <div :class="[{ active: sortType == 0 }, iconDesk]"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options<UiTableHeaderItemComponent>({
  props: {
    styleCustom: Object,
    sortName: { default: null, type: String },
    defaultSort: { default: null, type: String },
    iconAsc: { default: "asc", type: String },
    iconDesk: { default: "desc", type: String },
  },
  watch: {},
})
export default class UiTableHeaderItemComponent extends Vue {
  readonly styleCustom: Object = {};
  readonly sortName: string = "";
  readonly defaultSort: String = "";
  readonly iconAsc: string = "";
  readonly iconDesk: string = "";

  sortType =
    this.defaultSort === null ? null : this.defaultSort === "asc" ? 0 : 1;

  created() {
    this.sortType =
      this.defaultSort === null ? null : this.defaultSort === "asc" ? 0 : 1;
    this.sortExecute(false);
  }
  sortExecute(value = true) {
    if (!this.sortName) return;
    if (this.sortType === null && !value) return;
    if (this.sortType === null) this.sortType = 0;
    else if (this.sortType === 0) this.sortType = 1;
    else if (this.sortType === 1) this.sortType = 0;

    this.$emit("onSort", this.sortName, this.sortType);
  }
}
</script>

<style lang="less" >
@uiTableHeaderItem: #5197e9;
.ui-table-header-item {
  .icon-cartex-admin-sort-up,
  .icon-cartex-admin-sort-down {
    font-size: 6px;
    cursor: pointer;
    &.active {
      &::before {
        color: @uiTableHeaderItem;
      }
    }
  }
}
.cursor-pointer {
  cursor: pointer;
}

.asc {
  border: 3px solid transparent;
  border-bottom: 7px solid lightblue;
}
.desc {
  border: 3px solid transparent;
  border-top: 7px solid lightblue;
}
.active {
  &.asc {
    border: 3px solid transparent;
    border-bottom: 7px solid #556a71;
  }
  &.desc {
    border: 3px solid transparent;
    border-top: 7px solid #556a71;
  }
}
</style>