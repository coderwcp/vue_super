<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //   创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad,
    });

    // 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        // 将滚动事件发出给home组件以及传递滚动的位置参数
        this.$emit("scroll", position);
      });
    }

    // 监听上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log(11);
        // 将上拉加载事件传递给home组件
        this.$emit("pullingUp");
      });
    }

    // console.log(this.scroll);
  },
  watch: {
    data(){
      setTimeout(this.refresh,20)
    }
  },
  methods: {
    // 回到顶部
    // time = 300 设置默认值为300毫秒
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 完成上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    // 页面刷新
    refresh() {
      this.scroll && this.scroll.refresh();
    },

    // 离开当前页面时记录浏览的位置
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>