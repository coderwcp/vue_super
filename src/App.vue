<template>
  <div id="app">
    <!-- exclude 排除 Detail组件 -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar class="main_tab_bar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar.vue";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
.main_tab_bar {
  z-index: 10;
}
</style>
