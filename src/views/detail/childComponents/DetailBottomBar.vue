<template>
  <div class="bottom_bar">
    <div class="bar_item bar_left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar_item bar_right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
      addToCart(){
          this.$emit('addCart')
      }
  }
};
</script>

<style scoped>
.bottom_bar {
  display: flex;
  position: relative;
  bottom: 0;
  right: 0;
  left: 0;
  height: 49px;
  background-color: #fff;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  text-align: center;
  z-index: 12;
}

.bar_item{
    flex: 1;
    display: flex;
}
.bar_item>div{
    flex: 1;
}
.bar_left .text{
    font-size: 13px;
}
.bar_left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background: url(~assets/img/detail/detail_bottom.png) 0 0/100%;
}
.bar_left .service{
    background-position: 0 -54px;
}
.bar_left .shop{
    background-position: 0 -98px;
}
.bar_right{
    font-size: 15px;
    color: #FFF;
    line-height: 49px;
}
.bar_right .cart{
    background-color: #FFE817;
    color: #333;
}
.bar_right .buy{
    background-color: #F69;
}
.sport_ball{
    position: absolute;
    left: 225px;
    bottom: 20px;
}
</style>