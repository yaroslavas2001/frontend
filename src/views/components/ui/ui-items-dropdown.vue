<template>
  <ui-dropdown
    v-if="innerItems"
    class="ui-items-dropdown"
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
import ItemShortResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/ItemService/ItemShortResponse";
import { Options, Vue } from "vue-class-component";
import ListViewItem from "../list-view/ListViewItem";
@Options<UiItemsDropdown>({
  props: {
    tabindex: { type: Number, default: 100 },

    countryId: Number,
  },
  emits: ["changeItem"],
})
export default class UiItemsDropdown extends Vue {
  readonly tabindex = 100;
  readonly countryId: Number = null;
  search: string = "";
  innerItems: ListViewItem<DefaultModel>[] = [];
  items: any[] = [];
  created() {
    this.getItems();
  }
  /**
   * 
   * CityIds: Array<number> = null;
	StoreIds: Array<number> = null;
	Filter: FilterRequest = null;
	constructor(obj?: Partial<ItemsRequest>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
  */
  async getItems() {
    let items = await api.getInstance().ItemService.getItemsAsync({
      Filter: {
        Pagination: { Skip: 0, Take: 30 },
        Search: [{ FieldName: "Name", SearchValue: this.search }],
        Sort: null,
      },
      CityIds: null,
      StoreIds: null,
    });
    this.items = items.Items;
    this.innerItems = items.Items.map(
      (el) => new ListViewItem(new DefaultModel(el.Id, el.Name), false, false)
    );
  }
  addItem() {}
  refresh() {}
  onChange(item: ListViewItem<DefaultModel>[]) {
    if (!item[0]) {
      return;
    }
    const element: ItemResponse = this.items.find(
      (el) => el.Id == (item[0].Value as DefaultModel).id
    );

    this.$emit("changeItem", element);
  }
  time: number = null;
  update() {
    console.log("autocomplite");
    this.search = this.autocompl;
    this.getItems();
    clearTimeout(this.time);
  }
  autocompl = "";
  changeAutocomlite(value: string) {
    this.autocompl = value;

    if (this.time) {
      clearTimeout(this.time);
    }
    this.time = setTimeout(this.update, 2000);
  }
}
</script>

<style lang="less">
.ui-items-dropdown {
  &.ui-dropdown {
    font-size: 14px;
  }
}
</style>
