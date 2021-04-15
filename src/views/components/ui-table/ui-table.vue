<template>
  <div class="ui-table">
    <div v-bind:style="styleObject" @changeCol="changeCol">
      <slot name="header"></slot>

      <template
        v-for="(item, index) in items"
        @changeCol="changeCol"
        :key="getKey(item)"
      >
        <slot
          name="body"
          :item="item"
          :styl="selLine == item.id ? true : false"
        >
        </slot>
        <div class="inner-item" :style="getInnerTableStyle(index * 2 + 1)">
          <slot name="inner" :item="item"></slot>
        </div>
      </template>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UiTableHeaderItem from "@views/components/ui-table/ui-table-header-item.vue";
import UiTableBodyItem from "@views/components/ui-table/ui-table-body-item.vue";
import { warn } from "vue";
import api from "@/api";
@Options<UiTableComponent>({
  components: { UiTableHeaderItem, UiTableBodyItem },
  props: {
    items: { type: Array, default: [] },
    columnGap: { default: 1, type: Number },
    rowGap: { default: 1, type: Number },
    templateColumns: { default: "", type: String },
    selectLine: { type: Number, default: 0 },
    key: { type: String, default: "Id" },
  },
  watch: {
    templateColumns(value) {
      this.onCangeTemplateColumns();
    },
  },
})
export default class UiTableComponent extends Vue {
  items: Object = [];
  readonly columnGap = 1;
  readonly rowGap = 1;
  readonly templateColumns = "";
  readonly selectLine = 0;
  readonly key = "Id";
  // @Prop({ type: Array })                          Items: Object[];
  // @Prop({ default: 2, type: Number }) columnGap: number;
  // @Prop({ default: 2, type: Number }) rowGap: number;
  // @Prop({ default: "", type: String }) templateColumns: string;
  // @Prop({ type: Number, default: 0 }) selectLine: number;
  // @Prop({ default: true }) light: boolean;
  // @Prop({ default: false }) dark: boolean;
  // @Prop({ default: false }) w100: boolean;

  selLine = this.selectLine;
  getKey(item: Object): string {
    // const key = item[this.key];
    // if (!key) {
    //   console.warn(`key ${key} not found`);
    // }
    // return key;
    return this.newGuid();
  }
  newGuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  styleObject: Object = new Object();
  created() {
    this.styleObject = {
      "grid-column-gap": this.columnGap + "px",
      "grid-row-gap": this.rowGap + "px",
      "grid-template-columns": this.templateColumns,
    };
  }
  onCangeTemplateColumns() {
    this.styleObject == new Object();
    this.styleObject = {
      "grid-column-gap": this.columnGap + "px",
      "grid-row-gap": this.rowGap + "px",
      "grid-template-columns": this.templateColumns,
    };
  }
  getInnerTableStyle(idRow: number) {
    let styleInnerObject = {
      "grid-row-start": idRow + 2,
      "grid-row-end": idRow + 2,
      "grid-column-start": 1,
      "grid-column-end": this.templateColumns.split(" ").length + 1,
    };
    return styleInnerObject;
  }

  changeCol(v1: any, v2: any) {
    this.selLine = v1;
  }
}
</script>

<style lang="less">
@uiTablePadding: 18px;
@uiTableHeaderColor: #262838;
@uiTableHeaderBgColor: #e2e2e2;
@uiTableBodyColor: #262838;
@uiTableBodyBgColor: #f8f8f8;
.ui-table {
  // border: 2px solid lightgrey;
  // grid-template-areas: "nav content";
  position: relative;
  overflow-x: auto;
  width: 100%;

  .noitem {
    text-align: center;
    padding: 2rem 0;
  }
  &.w-100 {
    width: 100%;
  }
  > div,
  .ui-table-sort {
    display: grid;
  }
  .ui-table-header-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: #dde0e6;
    padding-left: @uiTablePadding;
    color: @uiTableHeaderColor;
    font-size: 14px;
    height: 40px;
    font-weight: 600;
    background-color: @uiTableHeaderBgColor;
    // border: 1px solid lightgray;

    padding-right: 10px;
  }

  .ui-table-body-item {
    display: flex;
    align-items: center;
    padding-left: @uiTablePadding;
    padding-right: @uiTablePadding;
    background-color: @uiTableBodyBgColor;
    color: @uiTableBodyColor;
    font-size: 14px;
    min-height: 40px;
    padding-top: 5px;
    padding-bottom: 5px;
    // border: 1px solid lightgray;
  }
  .ui-table-footer-item {
    display: flex;
    padding-left: @uiTablePadding;
    padding-right: @uiTablePadding;
    font-size: 14px;
    min-height: 40px;
    align-items: center;
  }
  .sticky {
    position: sticky;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
}
</style>