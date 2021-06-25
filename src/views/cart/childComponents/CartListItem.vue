<template>
  <div class="cart_list_item">
    <div class="item_selector">
      <check-button :is-checked="itemInfo.checked" @click.native="checkClick" />
    </div>
    <div class="item_img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item_info">
      <div class="item_title">{{ itemInfo.title }}</div>
      <div class="item_desc">{{ itemInfo.desc }}</div>
      <div class="item_bottom">
        <div class="item_price left">{{ itemInfo.price }}</div>
        <div class="item_count right">{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  components: { CheckButton },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
      checkClick(){
          this.itemInfo.checked = !this.itemInfo.checked
      }
  }
};
</script>

<style scoped>
.cart_list_item {
  display: flex;
  width: 100%;
  padding: 5px;
  font-size: 0;
  border-bottom: 1px solid #ccc;
}
.item_selector {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
}
.item_title,
.item_desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item_img {
  padding: 5px;
}
.item_img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
}
.item_info {
  overflow: hidden;
  position: relative;
  font-size: 17px;
  color: #335;
  padding: 5px 10px;
}
.item_info .item_desc {
  font-size: 14px;
  color: #666;
  margin-top: 20px;
}
.item_bottom {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  margin-top: 10px;
}
.item_bottom .item_price {
  color: orangered;
}
</style>