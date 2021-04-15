<template>
  <ui-dropdown
    v-if="innerItems"
    class="ui-city"
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
import ItemResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/ItemService/ItemResponse";
import { Options, Vue } from "vue-class-component";
import ListViewItem from "../list-view/ListViewItem";
@Options<UiCity>({
  props: {
    tabindex: { type: Number, default: 100 },
    name: { default: "", type: String },
    countryId: Number,
    cityId: { default: 0, type: Number },
  },
  emits: ["changeCity"],
  watch: {
    name(value) {
      this.innerItems.forEach((el) => {
        el.Selected = el.Value.name == value;
      });
    },
    cityId(value) {
      this.innerItems.forEach((el) => {
        el.Selected = el.Value.id == value;
      });
    },
  },
})
export default class UiCity extends Vue {
  readonly tabindex = 100;
  readonly countryId: Number = null;
  readonly name: string = "";
  readonly cityId;
  innerItems: ListViewItem<DefaultModel>[] = [];
  created() {
    this.getItems();
  }
  items: CityResponse[] = [];
  async getItems() {
    const items = await api.getInstance().GeographyService.getCitiesAsync({
      Pagination: { Skip: 0, Take: 100 },
      Search: null,
      Sort: null,
    });
    this.items = items.Items;

    this.innerItems = items.Items.map(
      (el) => new ListViewItem(new DefaultModel(el.Id, el.Name), false, false)
    );

    this.innerItems.unshift(
      new ListViewItem(new DefaultModel(0, "Все города"), true, false)
    );
    this.items.unshift({ Id: 0, Name: "Все города", CountryId: 0 });

    this.innerItems.forEach((el) => {
      el.Selected =
        (el.Value as any).Name == this.name
          ? true
          : (el.Value as any).id == this.cityId
          ? true
          : false;
    });
  }
  addItem() {}
  refresh() {}
  onChange(item: ListViewItem<DefaultModel>) {
    const el = this.items.filter(
      (e) => e.Id == (item[0].Value as DefaultModel).id
    );
    this.$emit("changeCity", el[0]);
  }
}
</script>

<style lang="less">
.ui-city {
  font-size: 14px;
}
</style>
