<template>
    <swiper class="detail_swiper">
      <swiper-item v-for="item in topImages" :key="item" class="swiper_item">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail_swiper {
  height: 250px;
  overflow: hidden;
}
</style>