<template>
  <ui-dropdown
    v-if="innerItems"
    class="ui-roles"
    :items="innerItems"
    placeholder="..."
    @change="onChange"
    tabindex="tabindex"
  >
  </ui-dropdown>
</template>

<script lang="ts">
import api from "@/api";
import DefaultModel from "@/views/a-model/default-model";

import ItemResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/ItemService/ItemResponse";
import { Options, Vue } from "vue-class-component";
import ListViewItem from "../list-view/ListViewItem";
@Options<UiRoles>({
  props: {
    tabindex: { type: Number, default: 100 },

    countryId: Number,
  },
})
export default class UiRoles extends Vue {
  readonly tabindex = 100;
  readonly countryId: Number = null;

  innerItems: ListViewItem<DefaultModel>[] = [];
  created() {
    this.getItems();
  }
  async getItems() {
    let items = await api.getInstance().UserService..getCitiesAsync({
      Pagination: { Skip: 0, Take: 100 },
      Search: null,
      Sort: null,
    });
    this.innerItems = items.Items.map(
      (el) => new ListViewItem(new DefaultModel(el.Id, el.Name), false, false)
    );
  }
  addItem() {}
  refresh() {}
  onChange(item: CityResponse) {
    this.$emit("change", new DefaultModel(item.Id, item.Name));
  }
}
</script>

<style lang="less">
.ui-city {
}
</style>
