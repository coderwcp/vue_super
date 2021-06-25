<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imgLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    // 因为首页和商品详情页传入GoodsList中的goods数据结构不一样，所以需要判断处理
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    // 1.监听图片加载事件
    imgLoad() {
      // console.log(11);
      // 通过事件总线将事件直接传递到home组件中，需要在main.js中添加原型并赋值一个Vue实例
      // this.$bus.$emit("itemImageLoad");

      // 方法一
      // 因为商品详情页面也需要对图片监听，且事件需要传递到detail组件中，所以需要进行判断
      // if (this.$route.path.indexOf("/home")) {
      //   this.$bus.$emit("homeItemImageLoad");
      // } else if(this.$route.path.indexOf("/detail")){
      //   this.$bus.$emit("detailItemImageLoad");
      // }

      //方法二
      // 通过全局事件解除来分别对home组件和detail组件进行解除
      this.$bus.$emit("itemImageLoad");
    },

    // 2.监听每一个GoodsListItem的点击跳转到详情页
    itemClick() {
      // console.log('跳转到详情页');
      // console.log(this.goodsItem);
      this.$router.push("/detail/" + this.goodsItem.iid);
      // console.log(
      //   this.$router.push("/detail/" + this.goodsItem.iid)
      // );
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>