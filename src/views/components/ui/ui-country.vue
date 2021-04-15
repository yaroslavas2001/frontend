<template>
  <ui-dropdown
    v-if="innerItems"
    class="ui-country"
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
import CityResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/GeographyService/CityResponse";
import CountryResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/GeographyService/CountryResponse";
import ItemResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/ItemService/ItemResponse";
import { Options, Vue } from "vue-class-component";
import ListViewItem from "../list-view/ListViewItem";
@Options<UiCountry>({
  props: {
    tabindex: { type: Number, default: 100 },

    countryId: Number,
  },
  emits: ["changeCountry"],
  watch: {
    countryId(value) {},
  },
})
export default class UiCountry extends Vue {
  readonly tabindex = 100;
  readonly countryId: Number = null;

  innerItems: ListViewItem<DefaultModel>[] = [];
  created() {
    this.innerItems = [];

    this.getItems();
  }
  items: CountryResponse[] = [];
  async getItems() {
    const items = await api.getInstance().GeographyService.getCountriesAsync({
      Pagination: { Skip: 0, Take: 100 },
      Search: null,
      Sort: null,
    });

    this.items = items.Items;
    this.innerItems = items.Items.map(
      (el) =>
        new ListViewItem(
          new DefaultModel(el.Id, el.Name),
          el.Id == this.countryId,
          false
        )
    );
  }
  addItem() {}
  refresh() {}

  onChange(item: ListViewItem<DefaultModel>) {
    const el = this.items.filter(
      (e) => e.Id == (item[0].Value as DefaultModel).id
    );
    this.$emit("changeCountry", el[0]);
  }
}
</script>

<style lang="less">
.ui-country {
  font-size: 14px;
}
</style>
