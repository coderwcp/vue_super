<template>
  <div class="cart_bottom_bar">
    <div class="check_content">
      <check-button
        class="check_button"
        :is-checked="isSelectAll"
        @click.native="checkedAll"
      />
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去结算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // return this.$store.state.cartList.length===0?false:!this.cartList.find(item=> !item.checked) // 不选中的为空时

      if (this.$store.state.cartList.length === 0) return false;
      // 使用filter函数
      // // return !(this.cartList.filter((item) => !item.checked).length); // 需要遍历全部的商品，性能较差

      // 使用数组find函数
      // return !this.cartList.find(item=> !item.checked) // 查找时，只要不选中为空(即结果为false)时则取反  返回true

      // 直接使用遍历对象
      for (let item of this.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    checkedAll() {
      // 当 this.isSelectAll 为true时 把全部的checked属性修改为false ，否则相反
      if (this.isSelectAll) {
        // 全部选中
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择需要购买的商品', 1000)
      }
    }
  },
};
</script>

<style scoped>
.cart_bottom_bar {
  position: relative;
  display: flex;
  bottom: 0;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  background-color: #eee;
}
.check_content {
  display: flex;
  width: 60px;
  align-items: center;
}
.check_button {
  width: 18px;
  height: 18px;
  margin: 0 5px;
  line-height: 18px;
}
.price {
  flex: 1;
  text-align: center;
}
.calculate {
  width: 90px;
  color: #fff;
  text-align: center;
  background-color: var(--color-tint);
}
</style>