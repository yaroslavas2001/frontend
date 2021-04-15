
<template>
  <page
    name="Слова поиска"
    class="search"
    :getDataFuncAsync="getDataFuncAsync"
    :filter="filter"
    :defaultSearchField="'Word'"
    @onAdd="onAdd"
    ref="page"
  >
    <template v-slot:filter>
      <!-- <bs-col>
        <ui-dropdown placeholder="..." :items="itemsList"></ui-dropdown
      ></bs-col> -->
    </template>
    <template #content="innerItems">
      <ui-table
        :items="innerItems.items"
        template-columns="100px 1fr 1fr 50px"
        style="overflow-x: auto"
      >
        <template #header>
          <ui-table-header-item> # </ui-table-header-item>
          <ui-table-header-item
            :sort-name="'Word'"
            default-sort="'asc'"
            @onSort="onSort"
            >Слово</ui-table-header-item
          >
          <ui-table-header-item>Варианты</ui-table-header-item>
          <ui-table-header-item></ui-table-header-item>
        </template>

        <template #body="data">
          <ui-table-body-item>
            {{ data.item.Id }}
          </ui-table-body-item>
          <ui-table-body-item>
            <div class="word" @click="onEditWord(data.item)">
              {{ data.item.Word }}
            </div>
          </ui-table-body-item>
          <ui-table-body-item>
            <div>
              <div
                class="match"
                v-for="(word, key) in data.item.Matches"
                :key="key"
              >
                {{ word.Match }}
                <div
                  class="match__remove"
                  @click="removeMatch(data.item, word)"
                >
                  &#215;
                </div>
              </div>
              <span
                class="icon icon-apteka-more"
                title="Добавить варинт"
                @click="addMatch(data.item)"
              ></span>
            </div>

            <!-- {{ data.item.Word }} -->
          </ui-table-body-item>
          <ui-table-body-item>
            <div
              class="icon-apteka-delete pointer"
              @click="removeWord(data.item)"
            ></div
          ></ui-table-body-item>
        </template>
      </ui-table>
    </template>
    <template #modal-window>
      <ui-modal-window
        :autoClose="false"
        :title="type == 'Word' ? 'Добавить слово' : 'Добавить вариант'"
        :visible="isVisibleModalWindow"
        width="600px"
        @close="closeModalWindow"
      >
        <template #default>
          <div class="row">
            <div class="col">
              <label>Слово:</label>
              <div class="ui-input mb-3">
                <input
                  v-model="item.Word"
                  placeholder="..."
                  tabindex="10"
                  autofocus
                  @keypress.enter="onSave"
                />
              </div>
            </div>
          </div>
        </template>
        <template #button>
          <div class="row py-3">
            <div class="col d-flex justify-content-center">
              <ui-button
                @onClick="onSave"
                :width="100"
                active
                style="margin-right: 10px"
              >
                Сохранить</ui-button
              >
              <ui-button @onClick="onCancel" :width="100"> Отменить </ui-button>
            </div>
          </div>
        </template>
      </ui-modal-window>
    </template>
  </page>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import moment from "moment";
import Page from "@views/components/page.vue";

import ListViewItem from "@views/components/list-view/ListViewItem";

import defaultModel from "@views/a-model/default-model";

import FilterRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/FilterRequest";

import api from "@/api";

import SearchRequest from "../../dataSource/api/Pharmacies/Common/Extensions/Models/SearchRequest";
import SortRequest from "dataSource/api/Pharmacies/Common/Extensions/Models/SortRequest";
import UserResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/UserService/UserResponse";
import SlideResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/SlideService/SlideResponse";
import UpdateSlideRequest from "dataSource/api/Pharmacies/Admin/Interfaces/Models/SlideService/UpdateSlideRequest";
import CropImageViewModel from "./components/ui-crop-image/cropImageViewModel";
import CropImagePreview from "./components/ui-crop-image/crop-image-preview.vue";
import ImagePreviewModel from "./components/ui-crop-image/ImagePreviewModel";
import SearchWordResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/SearchService/SearchWordResponse";
import WordMatchResponse from "dataSource/api/Pharmacies/Admin/Interfaces/Models/SearchService/WordMatchResponse";

@Options({
  components: {
    Page,
  },
  // watch:{
  //   count:(value)=>{console.log("count=",value)},
  //   size:(value)=>{console.log("size=",value)}
  // }
})
export default class Saerch extends Vue {
  isVisibleModalWindow: boolean = false;
  mode = "add";
  getDataFuncAsync = api
    .getInstance()
    .SearchService.getSearchWordsAsync.bind(api.getInstance().SearchService);
  filter: FilterRequest = new FilterRequest({
    Pagination: { Skip: 0, Take: 10 },
    Search: [],
    Sort: null,
  });

  SearchWordId = 0;
  SearchWord = "";
  item: SearchWordResponse = {
    Id: null,
    Word: "",
    Matches: [],
  };
  innerItems: Object[] = [];
  itemsList: ListViewItem<defaultModel>[] = [];
  type = "Word";

  created() {
    this.type = "Word";
  }
  onSort(sortName: string, sortType: string) {
    if (this.$refs.page) {
      (this.$refs.page as Page).sort(sortName, sortType);
    }
  }

  async onSave() {
    if (this.type == "Word") {
      await api.getInstance().SearchService.updateSearchWordAsync({
        Id: this.item.Id,
        Word: this.item.Word,
        Matches: [],
        MatchesToDelete: [],
      });
    } else {
      await api.getInstance().SearchService.updateSearchWordAsync({
        Id: this.SearchWordId,
        Matches: [{ Id: null, Match: this.item.Word }],
        Word: this.SearchWord,
        MatchesToDelete: [],
      });
    }
    (this.$refs.page as Page).refresh();
    this.closeModalWindow();
    this.type == "Word";
  }

  onCancel() {
    // this.init();
    this.item = { Id: null, Word: "", Matches: [] };
    this.closeModalWindow();
  }
  closeModalWindow() {
    this.item = { Id: null, Word: "", Matches: [] };
    this.isVisibleModalWindow = false;
  }

  onAdd() {
    this.type = "Word";
    this.isVisibleModalWindow = true;
  }

  onEditWord(item: SearchWordResponse) {
    this.isVisibleModalWindow = true;
    const tempItem = JSON.stringify(item);
    this.item = JSON.parse(tempItem);
  }

  addMatch(item: SearchWordResponse) {
    this.type = "Match";
    this.SearchWordId = item.Id;
    this.SearchWord = item.Word;
    this.isVisibleModalWindow = true;
  }
  removeWord(item: SearchWordResponse) {
    const res = (this as any).$dialog
      .confirm("Вы дествительно хотите удалить слово - '" + item.Word + "'?")
      .then((res: boolean) => {
        if (res) {
          api
            .getInstance()
            .SearchService.DeleteSearchWordEvent.once((response) => {
              if (response.IsSuccess) {
                (this.$refs.page as Page).refresh();
              }
            });
          api.getInstance().SearchService.DeleteSearchWord(item.Id);
        }
      });
  }
  removeMatch(item: SearchWordResponse, word: WordMatchResponse) {
    const res = (this as any).$dialog
      .confirm("Вы дествительно хотите удалить вариант - '" + word.Match + "'?")
      .then((res: boolean) => {
        if (res) {
          api
            .getInstance()
            .SearchService.UpdateSearchWordEvent.once((response) => {
              if (response.IsSuccess) {
                (this.$refs.page as Page).refresh();
              }
            });
          api.getInstance().SearchService.UpdateSearchWord({
            Id: item.Id,
            Word: item.Word,
            MatchesToDelete: [word.Id],
            Matches: [],
          });
        }
      });
  }
}
</script>

<style lang="less">
.search {
  .word {
    color: #23a4a2;
    border-bottom: 1px solid;
    cursor: pointer;
  }
  .match {
    display: flex;
    align-items: center;
  }
  .match__remove {
    margin-left: 5px;
    cursor: pointer;
    font-size: 20px;
    color: #23a4a2;
    &:hover {
      color: red;
    }
  }
  .icon {
    color: #23a4a2;
    cursor: pointer;
  }
}
</style>