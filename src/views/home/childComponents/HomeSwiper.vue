<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.image">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  data(){
    return {
      isLoad: true
    }
  },
  props: {
      banners:{
          type: Array,
          default() {
            return []
          }
      }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad(){
      // 只需要加载完成一次就可以获取到tabControl的offsetTop
      if(this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = false
      }
    }
  }
};
</script>

<style scoped>
</style>