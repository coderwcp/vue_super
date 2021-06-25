<template>
  <div class="cart_list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    // 刷新解决无法滚动
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.content {
  overflow: hidden;
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  height: calc(100vh - 93px - 40px);
}
</style>