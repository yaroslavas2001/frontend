<template>
  <!-- <layout> -->
  <router-view></router-view>
  <!-- </layout> -->
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
// import Layout from '@layouts/layout.vue';

// @Options({
//   components: {
//     Layout
//   }
// })
export default class AppComponent extends Vue {
  created() {
    // console.log('app create');
  }
}
</script>
<style>
@import "./assets/styles/reset.css";
@import "./assets/styles/bootstrap/bootstrap-grid.min.css";
@import "./assets/styles/tirscript/style.css";
@import "./assets/styles/apteka/style.css";
</style>