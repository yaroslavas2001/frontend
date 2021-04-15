<template>
  <ui-dropdown
    v-if="innerItems"
    class="ui-category"
    :items="innerItems"
    placeholder="..."
    @change="onChange"
    tabindex="tabindex"
    autocomplete
  >
  </ui-dropdown>
</template>

<script lang="ts">
import DefaultModel from "@/views/a-model/default-model";
import ItemResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/ItemService/ItemResponse";
import { Options, Vue } from "vue-class-component";
import ListViewItem from "../list-view/ListViewItem";
import api from "@/api";
@Options<UiCategory>({
  props: {
    tabindex: { type: Number, default: 100 },
    item: { type: DefaultModel },
  },
})
export default class UiCategory extends Vue {
  tabindex = 100;
  innerItems: ListViewItem<DefaultModel>[] = [];
  item: DefaultModel;

  created() {
    this.getItems();
  }
  async getItems() {
    const tmp = await api
      .getInstance()
      .CategoryService.getCategoriesAsync.bind(
        api.getInstance().CategoryService
      );
  }
  addItem() {}
  refresh() {}
  onChange(item: ItemResponse) {
    this.$emit("change", item);
  }
}
</script>

<style lang="less">
</style>
