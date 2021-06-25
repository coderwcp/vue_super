<template>
  <div id="home">
    <nav-bar class="home_nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab_control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- @click.native="backClick" 监听组件点击 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 首页子组件
import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommend from "./childComponents/HomeRecommend";
import HomeFeature from "./childComponents/HomeFeature";
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
// 导入网络数据请求
import { getHomeMultidata, getHomeGoods } from "network/home";

// 滚动插件
import Scroll from "components/common/scroll/Scroll";

// // 引入防抖节流函数
// import { debounce } from "common/utils";

// 混入
import {itemListenerMixin,backTopMixin } from 'common/mixin'

export default {
  name: "Home",
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },

  created() {
    // 1.当首页被创建就请求数据
    this.getHomeMultidata();

    // 2.当组件被创建就获取流行、新款、精选中的数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // this.$bus.$on('itemImageLoad',()=>{
    //   // console.log(111);
    //   // 在create中获取组件有可能会找不到，因此需要写到mounted
    //   this.$refs.scroll.refresh()
    //   console.log(11);
    // })
  },
  destroyed() {
    // console.log("home-destroyed");
  },
  activated() {
    // 回到首页时自动滚动到上次浏览的位置
    // console.log("activated");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 回到首页时，刷新一次
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 离开首页时保存上次浏览的位置
    // console.log("deactivated");
    this.saveY = this.$refs.scroll.getScrollY();

    // 取消全局事件的监听
    // this.$bus.$off(参数一，参数二)
    // 参数一是需要取消全局事件名称
    // 参数二是需要取消对应的函数
    this.$bus.$off("itemImgLoad", this.itemImgListener)
  },
  mounted() {
    // // 1.图片加载完成事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 200);

    // // 对监听事件保存
    // this.itemImgListener = () => {
    //   // console.log(111);
    //   // 在create中获取组件有可能会找不到，因此需要写到mounted
    //   // this.$refs.scroll.refresh();
    //   // console.log(11);

    //   refresh();
    // }
    // this.$bus.$on("itemImageLoad", this.itemImgListener );
  },
  computed: {
    // 1.展示所tabControl所点击的商品
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /*
     * 事件监听方法
     */
    // 1.商品栏导航切换
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      // 让两个tabControl组件中的currentIndex保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 2.回到顶部 (以抽离至mixin.js文件中)
    // backClick() {
    //   // console.log(11);
    //   // console.log(this.$refs.scroll.scroll);
    //   // this.$refs.scroll.scroll 获取scroll组件中的scroll对象
    //   // this.$refs.scroll.scroll.scrollTo(0,0,100);

    //   // 访问scroll组件中的方法，此时没有传递时间，就会使用组件中该方法的默认时间
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    // 3.监听content区域的滚动，接收scroll组件传递过来的位置参数position
    contentScroll(position) {
      // 1.判断backTop是否显示
      // console.log(-position.y);
      // 具体逻辑在mixin.js中
      this.ListenShowBackTop(position)

      // 2.决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 4.监听上拉加载
    loadMore() {
      // console.log(11);
      // 使用getHomeGoods给当前选中的currentType加载更多数据
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh()
    },

    // 5.防抖节流函数，已抽离到src下common中的utils.js中
    // debounce(func, delay) {
    //   let timer = null;

    //   return function (...args) {
    //     if (timer) clearTimeout(timer);

    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },

    // 6.监听轮播图加载完成
    swiperImageLoad() {
      // 2.获取tabControl的offsetTop
      // $el 获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
     * 网络请求方法
     */
    // 1.封装一个网络请求函数，且保存banner 和 recommends的数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // 保存请求的banners和recommends数据
        // console.log(res.data);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    // 2.获取首页tabControl中的数据且保存，在多次需要上拉加载时可以直接调用这个函数
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page)
        .then((res) => {
          // console.log(res.data.list);
          // ...res.data.list 解构数组依次放入搭配goods[type.list中
          this.goods[type].list.push(...res.data.list);
          // console.log(this.goods[type].list);
          this.goods[type].page += 1;

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
        .catch((err) => err);
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home_nav {
  /* 
  * 当使用浏览器原生滚动时，为了让导航不跟随一起滚动
  */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
  color: #fff;
  background-color: var(--color-tint);
}
.tab_control {
  position: relative;
  top: -1px;
  z-index: 9;
  background-color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  background-color: #fff;
}
</style>
