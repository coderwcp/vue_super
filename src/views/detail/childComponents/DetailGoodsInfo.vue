<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods_info">
    <div class="info_desc clear_fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info_key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info_list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :src="item"
        :key="index"
        @load="imgLoad"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  methods: {
    imgLoad() {
      // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了.
      //   this.counter += 1;
      //   // 当加载完成的图片等于总的图片数量时，执行发出一次事件
      //   if (this.counter === this.imagesLength) {
      //     this.$emit("imageLoad");
      //   }

      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
    },
  },
  //   watch 用来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
  watch: {
    detailInfo() {
      // 获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
.goods_info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info_desc {
  padding: 0 15px;
}

.info_desc .start,
.info_desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info_desc .start {
  float: left;
}

.info_desc .end {
  float: right;
}

.info_desc .start::before,
.info_desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info_desc .end::after {
  right: 0;
}

.info_desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info_key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info_list img {
  width: 100%;
}
</style>