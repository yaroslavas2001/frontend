<template>
  <ui-dropdown
    v-if="innerItems"
    class="ui-pharmacy"
    :items="innerItems"
    placeholder="..."
    @change="onChange"
    tabindex="tabindex"
    autocomplete
    scroll
    @changeAutocomlite="changeAutocomlite"
  >
  </ui-dropdown>
</template>

<script lang="ts">
import api from "@/api";
import DefaultModel from "@/views/a-model/default-model";
import CityResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/GeographyService/CityResponse";
import ItemResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/ItemService/ItemResponse";
import SearchService from "dataSource/api/Pharmacies/Admin/Services/SearchService";
import SearchRequest from "../../../../dataSource/api/Pharmacies/Common/Extensions/Models/SearchRequest";
// import SearchRequest from "dataSource/api/Pharmacies/Common/Extensions/Models/SearchRequest";
import { Options, Vue } from "vue-class-component";
import ListViewItem from "../list-view/ListViewItem";
@Options<UiPharmacy>({
  props: {
    tabindex: { type: Number, default: 100 },

    countryId: Number,
  },
  emits: ["changePharm"],
})
export default class UiPharmacy extends Vue {
  readonly tabindex = 100;
  readonly countryId: Number = null;

  innerItems: ListViewItem<DefaultModel>[] = [];
  created() {
    this.getItems();
  }
  serach = "";
  items: any[] = [];
  async getItems() {
    const items = await api.getInstance().StoreService.getStoresAsync({
      Filter: {
        Pagination: { Skip: 0, Take: 1000 },
        Search: [
          new SearchRequest({
            FieldName: "Name",
            SearchValue: this.serach,
            SearchFrom: null,
            SearchTo: null,
          }),
        ],
        Sort: null,
      },
      CityIds: null,
    });
    this.items = items.Items;
    this.innerItems = items.Items.map(
      (el) => new ListViewItem(new DefaultModel(el.Id, el.Name), false, false)
    );
    this.innerItems.unshift(
      new ListViewItem(new DefaultModel(0, "Все аптеки"), true, false)
    );

    this.items.unshift({ Id: 0, Name: "Все аптеки" });
  }
  changeAutocomlite(value: string) {
    this.serach = value;
    this.getItems();
  }
  addItem() {}
  refresh() {}
  onChange(item: ListViewItem<DefaultModel>[]) {
    // const el = item.filter(
    //   (e) => (e.Value as DefaultModel).id == (item[0].Value as DefaultModel).id
    // );

    if (!item.length || item.length == 0) {
      return;
    }
    this.$emit("changePharm", item[0].Value);
  }
}
</script>

<style lang="less">
.ui-pharmacy {
  &.ui-dropdown {
    font-size: 14px;
  }
}
</style>
