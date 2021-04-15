
<template>
  <page noApi noFilter noPagination
    name="Пользовательское соглашение"
    class="search"
    ref="page"
  >
    <ui-loading :loading="isLoading"></ui-loading>
    <vue-editor v-model="content"></vue-editor>

  </page>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { VueEditor } from "vue2-editor";
import api from "@/api";
import Page from "@views/components/page.vue";

@Options({
  components: {
    Page,
    VueEditor
  },
  // watch:{
  //   count:(value)=>{console.log("count=",value)},
  //   size:(value)=>{console.log("size=",value)}
  // }
})
export default class TermsOfUse extends Vue {
  content: string = '';
  isLoading = true;
  async created() {
    this.content = (await api.getInstance().DocumentService.getTermsOfUseAsync()).toString();
    this.isLoading = false;
  }
  async save() {
    this.isLoading = true;
    const res = await api.getInstance().DocumentService.saveTermsOfUseAsync(this.content);
    if (res) {
      
    }
    this.isLoading = false;
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