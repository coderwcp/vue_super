<template>
  <div>
    <nav-bar class="nav_bar">
      <!-- <div slot="center">购物车({{cartLength}})</div> -->
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar class="cart_bottom_bar" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComponents/CartList.vue";
import CartBottomBar from "./childComponents/CartBottomBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 1.普通方法
    // cartLength(){
    //   return this.$store.getters.cartLength
    // }

    // 2.Vuex进阶方法，将 getter 映射到 computed => 把Veux中的getters中的代码转为计算属性(两种方法)
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.nav_bar {
  background-color: var(--color-tint);
  color: #fff;
}

</style>
