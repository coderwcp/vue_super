<template>
  <div class="goods_list">
    <goods-list-item
      v-for="item in goods"
      :key="item.acm"
      :goodsItem="item"
      class="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  name: "GoodsList",
  components: { GoodsListItem },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods_list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-around;
}

.goods_list .item {
  width: 48%;
}
</style>