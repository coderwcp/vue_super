<template>
  <nav-bar class="nav_bar">
    <div slot="center">我的</div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "ProfileNavBar",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.nav_bar{
  position: relative;
  height: 44px;
  background-color: var(--color-tint);
  color: #FFF;
  border-bottom: 1px solid #EEE;
}
</style>