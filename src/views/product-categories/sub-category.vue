<template>
  <div
    v-for="(item, index) in innerItems"
    :key="index"
    class="col item"
    :class="[
      { active: item.Id == currentId },
      { nopointer: item.ChildCategories == 0 },
    ]"
    :style="size(item)"
  >
    <div class="col-12 d-flex" @click="currentCategory(item, this.$el)">
      <div class="item__icon icon-apteka-archive mr-4"></div>
      <div class="item__text" :class="{ red: item.ChildCategories.length > 0 }">
        {{ item.Name }}
      </div>
    </div>

    <sub-category :items="item.ChildCategories"></sub-category>
  </div>
</template>
<script lang="ts">
import CategoryResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/CategoryService/CategoryResponse";
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    items: [],
    showIcons: Boolean,
  },
  watch: {
    items(value) {
      this.innerItems = this.items;
    },
  },
})
export default class SubCategory extends Vue {
  readonly items: [];
  readonly noIcons: Boolean = false;
  currentId: number = 0;
  innerItems: CategoryResponse[] = [];

  created() {
    this.innerItems = this.items;
  }
  count = 0;
  currentCategory(item: CategoryResponse, content: any) {
    // const element = (content as HTMLElement).parentNode as HTMLElement;
    // console.log(`content`, content, element.offsetHeight - element.offsetTop);

    this.count = item.ChildCategories.length;

    if (item.ChildCategories && item.ChildCategories.length == 0) {
      return;
    }
    if (this.currentId == item.Id) {
      this.currentId = 0;
      return;
    }
    this.currentId = item.Id;
    // console.log(`this.currentId`, this.currentId);
  }
  size(item: CategoryResponse): Object {
    return {
      height:
        this.currentId != item.Id || item.ChildCategories.length == 0
          ? 2 + "rem"
          : "max-content",
      // : (item.ChildCategories.length + 1) * 2 + "rem",
    };
  }
}
</script>
<style lang="less">
.item {
  //   border-bottom: 1px solid #e8e8e8;
  overflow: hidden;
  padding: 10px 0;
  margin-left: 1.4rem;
  //   border-left: 1px solid #e8e8e8;
  transition: all 1.5s;
  height: fit-content;

  .item {
    border-left: 1px solid #e8e8e8;
    transition: all 1.5s;
    padding: 10px 0 10px 1rem;
    height: 2rem;
  }

  .item:last-of-type {
    padding-bottom: 0;
  }
  .item__icon {
    color: #23a4a2;
  }
  .item__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &.active {
    > div > .item__text {
      color: #23a4a2;
      margin-bottom: 0.5rem;
    }
  }
  //   .item__sub-group {
  //     margin-left: 1.4rem;
  //     // margin-top: 1rem;
  //     padding-left: 2rem;
  //     .item__sub {
  //       padding: 5px 0px;
  //     }
  //   }
  .red {
    // text-decoration: underline;
    border-bottom: #23a4a2 1px solid;
    cursor: pointer;
  }
}
</style>