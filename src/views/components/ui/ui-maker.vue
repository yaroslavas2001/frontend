<template>
  <ui-dropdown
    v-if="innerItems"
    class="ui-maker"
    :items="innerItems"
    placeholder="..."
    @change="onMaker"
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
@Options<UiMaker>({
  props: {
    tabindex: { type: Number, default: 100 },
    item: { type: DefaultModel },
  },
})
export default class UiMaker extends Vue {
  tabindex = 100;
  innerItems: ListViewItem<DefaultModel>[] = [];
  item: DefaultModel;

  created() {
    this.getItems();
  }
  getItems() {
    for (let index = 0; index < 10; index++) {
      this.innerItems.push(
        new ListViewItem(
          new DefaultModel(index, "Производитель" + index),
          false,
          false
        )
      );
    }
  }
  addItem() {}
  refresh() {}
  onMaker(item: ItemResponse) {
    this.$emit("change", item);
  }
}
</script>

<style lang="less">
</style>
