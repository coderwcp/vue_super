<template>
  <div id="detail">
    <detail-nav-bar class="nav_bar" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar class="bottom_bar" @addCart="addToCart" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from "./childComponents/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";

// 公共组件
import Scroll from "components/common/scroll/Scroll";
// 导入网络请求函数
import {
  getDetail,
  getRecommend,
  GoodsInfo,
  Shop,
  GoodsParam,
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

// 将Vuex中的 actions 映射到组件中
import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    // Toast,
  },

  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message: "",
      show: false,
    };
  },
  created() {
    // 每点击不同的GoodListItem进入的都是一样的，是因为Detail组件不会被频繁的创建（created）和销毁（destroyed）
    // 需要在App.vue中排除Detail组件的keepalive
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.保存数据
      // console.log(res);
      const data = res.result;
      // 2.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 3.获取商品信息
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 6.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7.获取评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      /*
      // 第一次获取,值不对
      // 原因在于 this.$refs.params.$el 没有被渲染
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);

      // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      this.$nextTick(() => {
        // 2.第二次获取,值不对
        // 原因在于 图片没有被计算在里面只有DOM的高度
        // 点击标题滚动到对应内容 因为DOM元素在拿到数据后无法马上渲染会延迟一会，所以在mounted中无法获取对应组件所在的DOM元素
        // 而在update中更新比较频繁,所以不推荐在update中执行
        // 虽然DOM以及被渲染出来了,但是还是会出现图片还没有加载完成的bug
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      });
      
      */
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    this.getThemeTopY = debounce(() => {
      // console.log("-------");

      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.POSITIVE_INFINITY);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {},
  updated() {
    // // 点击标题滚动到对应内容  因为更新比较频繁所以在第二次更新的时候,将原有的数组清空
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y;

      // 2.positionY和themeTopYs中的值进行对比
      // 在 themeTopYs[0] 和 themeTopYs[1] 之间 index = 0
      // 在 themeTopYs[1] 和 themeTopYs[2] 之间 index = 1
      // 在 themeTopYs[2] 和 themeTopYs[3] 之间 index = 2
      // 超过 themeTopYs[3] 时 index = 3
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          // (this.currentIndex !== i &&
          //   i < this.themeTopYs.length - 1 &&
          //   positionY >= this.themeTopYs[i] &&
          //   positionY < this.themeTopYs[i + 1]) ||
          // (i === this.themeTopYs.length - 1 && positionY > this.themeTopYs[i])

          // 在添加一个无穷大
          // 在 themeTopYs[3] 和 无穷大 之间 index = 3
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 是否显示返回顶部 BackTop组件
      this.ListenShowBackTop(position);
    },
    addToCart() {
      // console.log("加入购物车");
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车
      // this.$store.commit('addCart',product) // 提交到mutations中

      // 提交到actions中
      // this.$store.dispatch("addCart", product).then((res) => {
      //   // 弹出添加购物车成功模态框
      //   console.log(res);
      // });
      // 将vuex中的actions方法addCart映射到本组件中时
      this.addCart(product).then((res) => {
        // this.show = true;
        // this.message = res;
        // setTimeout(()=>{
        //   this.show = false;
        //   this.message = ''
        // },1000);
        this.$toast.show(res, 2000)
        console.log(this.$toast);
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}
.nav_bar {
  position: relative;
  z-index: 11;
  background-color: #fff;
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
</style>