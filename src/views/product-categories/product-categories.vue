<template>
  <page
    class="product-categories"
    name="Категории товаров"
    noApi
    noFilter
    noPagination
  >
    <template #title></template>
    <template #filter></template>
    <template #content>
      <ui-loading :loading="isLoading"></ui-loading>
      <sub-category showIcons :items="innerItems"></sub-category>
    </template>
  </page>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Page from "@views/components/page.vue";
import UiModalWindow from "@views/components/ui-modal-window/ui-modal-window.vue";
import api from "@/api";
import CategoryResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/CategoryService/CategoryResponse";
import SubCategory from "./sub-category.vue";
@Options({
  components: { Page, UiModalWindow, SubCategory },
})
export default class ProductCategories extends Vue {
  innerItems: CategoryResponse[] = [];
  currentId: number = 0;
  isLoading: boolean = false;
  created() {
    this.getCategory();
  }
  async getCategory() {
    this.isLoading = true;
    this.innerItems = await api
      .getInstance()
      .CategoryService.getCategoriesAsync();
    this.isLoading = false;
  }
  currentCategory(item: CategoryResponse) {
    if (item.ChildCategories && item.ChildCategories.length == 0) {
      return;
    }
    this.currentId = item.Id;
    // console.log(`this.currentId`, this.currentId);
  }
}
</script>
<style lang="less"  >
.product-categories {
}
</style>
