<template>
  <div class="page">
    <div class="page-header">
      <div class="page-header__name">
        <h1>{{ name }}</h1>
      </div>
      <slot name="title">
        <div class="page-header__bnts">
          <ui-button @click="onClick" tabindex="1" active>Добавить</ui-button>
        </div>
      </slot>
    </div>
    <div class="page-content">
      <bs-row v-if="!noFilter" class="align-items-center mx-0">
        <slot name="filter"></slot>

        <div class="col my-2 page-content__panel">
          <div class="ui-input">
            <input
              v-model="search"
              :placeholder="searchPlaceholder"
              tabindex="2"
              @keydown.enter="onSearch"
            />
            <div class="ui-input__btn" tabindex="3" @click="onSearch">
              <span class="icon-apteka-search"></span>
            </div>
          </div>
        </div>
      </bs-row>
      <div class="row">
        <div class="col">
          <ui-loading :loading="isLoading" />
          <slot name="content" :items="innerItems"></slot>
        </div>
      </div>
      <div
        v-show="!noPagination && innerItems && innerItems.length > 0"
        class="panel"
      >
        <div class="row align-items-center">
          <div class="col-auto ml-auto">
            <ui-pagination
              ref="pagination"
              :size="countPerPage"
              :count="totalItems"
              class="mt-4"
              @onChange="onPaginationChanged"
            >
            </ui-pagination>
          </div>
        </div>
      </div>
      <div
        class="row"
        v-if="
          !noPagination &&
          innerItems &&
          innerItems.length == 0 &&
          isLoading == false
        "
      >
        <div class="pb-2 pt-4 col-12" style="text-align: center">
          Нет данных
        </div>
      </div>
    </div>

    <slot name="modal-window"> </slot>
  </div>
</template>

<script lang="ts">
import { reactive, ref, provide } from "vue";
import { Options, Vue } from "vue-class-component";

import PaginationResponse from "../../../dataSource/api/Common/ResponseModels/PaginationResponse";
import FilterRequest from "../../../dataSource/api/Pharmacies/Common/Extensions/Models/FilterRequest";

import SortRequest from "../../../dataSource/api/Pharmacies/Common/Extensions/Models/SortRequest";
import DefaultModel from "@views/a-model/default-model";
import ListViewItem from "./list-view/ListViewItem";

import SearchRequest from "../../../dataSource/api/Pharmacies/Common/Extensions/Models/SearchRequest";
import UiPaginationComponent from "./ui-table/ui-pagination.vue";

@Options<Page>({
  props: {
    searchPlaceholder: { default: "Поиск", type: String },
    noApi: { default: false, type: Boolean },
    noFilter: { default: false, type: Boolean },
    defaultSearchField: String,
    noPagination: { default: false, type: Boolean },
    name: {
      type: String,
      default: "Название страницы",
    },
    getDataFuncAsync: { type: Function, requared: true },
    filter: {
      required: true,
      type: FilterRequest,
      default: new FilterRequest({
        Pagination: { Skip: 0, Take: 10 },
        Search: [],
        Sort: { FieldName: "", Desc: false },
      }),
    },
  },
  watch: {
    filter(value) {
      this.innerItems = this.filter;
    },
  },
  emits: ["onAdd"],
})
export default class Page extends Vue {
  readonly getDataFuncAsync: (
    filter: FilterRequest
  ) => Promise<PaginationResponse<Object>>;
  readonly searchPlaceholder: string = "Поиск";
  readonly name: string = "Название страницы";
  readonly noApi: boolean = false;
  readonly noFilter: boolean = false;
  readonly noPagination: boolean = false;
  readonly filter: FilterRequest = new FilterRequest({
    Pagination: { Skip: 0, Take: 10 },
    Search: [],
    Sort: { FieldName: "", Desc: false },
  });
  readonly defaultSearchField = "Name";

  innerFilter: FilterRequest = new FilterRequest({
    Pagination: { Skip: 0, Take: 10 },
    Search: [],
    Sort: { FieldName: "", Desc: false },
  });

  isLoading = false;
  totalItems = 0;
  currentPage = 1;
  innerItems: any[] = [];

  hasFilter = false;

  countPerPage = 10;
  pagination = true;
  search = "";

  onClick() {
    this.$emit("onAdd");
  }

  async created() {
    if (this.noApi) {
      return;
    }
    await this.refresh();
  }

  mounted() {
    this.hasFilter = this.$slots.filter != null;
  }

  addSearch(item: SearchRequest) {
    const find = this.innerFilter.Search.find((el) => {
      return el.FieldName == item.FieldName;
    });
    if (find) {
      find.SearchValue = item.SearchValue;
      find.SearchFrom ? (find.SearchFrom = item.SearchFrom) : null;
      find.SearchTo ? (find.SearchTo = item.SearchTo) : null;
      return;
    }
    this.innerFilter.Search.push(item);
  }

  sort(sortName: string, sortType: string) {
    if (sortName != "" && this.innerFilter.Sort == null) {
      this.innerFilter.Sort = { FieldName: "", Desc: false };
    }
    this.innerFilter.Sort.FieldName = sortName;
    this.innerFilter.Sort.Desc = sortType == "1";
    (this.$refs.pagination as UiPaginationComponent).currentPage = 1;

    this.refresh();
  }

  async refresh() {
    this.isLoading = true;
    let response;
    if (this.innerFilter.Sort && this.innerFilter.Sort.FieldName == "") {
      this.innerFilter.Sort = null;
    }

    try {
      response = await this.getDataFuncAsync(this.innerFilter);
    } catch (error) {
    } finally {
      this.isLoading = false;
    }

    this.totalItems = response.Count;
    this.innerItems = response.Items;
  }

  get pageSize(): number {
    const x = this.innerFilter.Pagination.Take;
    return x;
  }

  resetPagination() {
    this.innerFilter.Pagination.Skip = 0;
    this.currentPage = 1;
    this.totalItems = 0;
  }
  onSort(sortName: string, sortType: string) {
    // console.log("sortType", sortType);
    this.resetPagination();
    this.filter.Sort = new SortRequest({
      FieldName: sortName,
      Desc: sortType == "1",
    });
    this.refresh();
  }

  onChangePagePerPage(item: ListViewItem<DefaultModel>[]) {
    this.innerFilter.Pagination.Take = Number(
      (item[0].Value as DefaultModel).name
    );
    this.resetPagination();
    this.refresh();
  }

  onPaginationChanged(currentPage: number) {
    this.currentPage = currentPage;
    this.innerFilter.Pagination.Skip =
      (currentPage - 1) * this.innerFilter.Pagination.Take;
    this.refresh();
  }

  onSearch() {
    this.addSearch(
      new SearchRequest({
        FieldName: this.defaultSearchField,
        SearchValue: this.search,
      })
    );

    this.innerFilter.Pagination.Skip = 0;
    this.currentPage = 1;
    this.refresh();
  }
}
</script>
<style lang="less">
@BaseColor: #23a4a2;
.page {
  background: white;
  height: 100%;
  label {
    font-size: 13px;
  }
  h1 {
    font-size: 18px;
    line-height: 22px;
    color: #262838;
    font-weight: 400;
  }
  .page-header {
    display: flex;
    border-bottom: 1px solid @BaseColor;
    padding: 18px 26px;
    font-size: 18px;
    line-height: 22px;
    color: #262838;
    padding-bottom: 12px;
    align-items: center;
    margin-bottom: 10px;
    min-height: 69px;

    .page-header__bnts {
      margin-left: auto;
      .ui-button {
        height: 36px;
        font-size: 1rem;
      }
    }
  }
  .page-content {
    margin: 30px;
  }
  .page-content__panel {
    margin-bottom: 10px;
    background: #f8f8f8;
    padding: 8px 16px;
  }
  .ui-input {
    display: flex;
    input {
      background: #fcfcfc;
      font-family: ProximaNova;
      border: 1px solid #d2d2d2;
      box-sizing: border-box;
      padding: 5px 10px 5px 10px;
      font-size: 14px;
      width: 100%;
      &::placeholder {
        color: #787878;
      }
      &:focus {
        outline: none;
        border: solid 1px @BaseColor;
      }
    }
    .ui-input__btn {
      background: @BaseColor;
      min-width: 27px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
    }
  }
  .ui-textarea {
    background: #fff;
    border: 1px solid #d2d2d2;
    font-size: 14px;
    padding: 10px;
    font-family: ProximaNova;
    resize: none;

    &:focus {
      border: 1px solid @BaseColor;
    }
  }
  .ui-dropdown {
    ui-input input:focus &:focus {
      .ui-select {
        border: 1px solid @BaseColor;
      }
      .ui-box-menu {
        border: 1px solid @BaseColor;
      }
    }

    .ui-box-menu {
      background: #fff;
      border: 1px solid #d2d2d2;
      top: 1px;
    }
    .ui-list-view-item.selected {
      background: #e2e2e2;
    }
    .ui-list-view-item:hover {
      background: #e2e2e2;
      color: #000;
      font-weight: 600;
    }
  }
  .pointer {
    cursor: pointer;
  }
  @-webkit-keyframes fadeInOut {
    0% {
      opacity: 0;
      top: -0.5em;
    }
    25% {
      opacity: 1;
      top: 0;
    }
    75% {
      opacity: 0;
      top: 0.5em;
    }
    100% {
      opacity: 0;
      top: 0.5em;
    }
  }
  @keyframes fadeInOut {
    0% {
      opacity: 0;
      top: -0.5em;
    }
    25% {
      opacity: 1;
      top: 0;
    }
    75% {
      opacity: 0;
      top: 0.5em;
    }
    100% {
      opacity: 0;
      top: 0.5em;
    }
  }
  .add {
    .add__btn::before {
      color: @BaseColor;
      cursor: pointer;
    }
    .add__text {
      text-decoration: underline;
      cursor: pointer;
      color: #000;
    }
  }
  input.ui-checkbox {
    transform: scale(1.3);
    &:checked {
    }
  }
  .ui-date-picker {
    input {
      border: 1px solid #d2d2d2;
    }
    input,
    input:focus {
      background: #fff;
      color: #414351;
    }
    input:focus {
      border: 1px solid @BaseColor;
    }
    .icon {
      color: #414351;
    }
    .date-time {
      background: #fff;
      color: #414351;
      border: 1px solid @BaseColor;
      transition: all 1s;
      .navigation {
        color: #414351;
        .title_date-picker {
          transition: all 1s;
        }
        .title_date-picker:hover {
          background: @BaseColor;
          color: #fff;
        }
        .backward,
        .next {
          transition: all 1s;
        }
        .backward:hover,
        .next:hover {
          background: @BaseColor;
          color: #fff;
        }
      }
      .minute,
      .hour {
        > div {
          transition: all 1s;
        }
      }
      .minute:hover,
      .hour:hover {
        > div {
          background: @BaseColor;
          color: #fff;
        }
      }
    }
  }
  .icon-apteka-pencil,
  .icon-apteka-delete {
    color: #9e9e9e;
    transition: all 0.5s;
    &:hover {
      color: unset;

      text-shadow: 1px 1px 2px black, 0 0 1em @BaseColor;
    }
  }
  .ui-input {
    .invalid {
      border-color: #dc3545;
    }
  }
  .icon {
    margin-right: 0;
  }
  label {
    line-height: 1.5rem;
  }
}
</style>
