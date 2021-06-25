<template>
  <div class="home_recommend">
    <div v-for="item in recommends" :key="item.title" class="recommend_item">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
    .home_recommend{
        display: flex;
        text-align: center;
        font-size: 12px;
        padding: 10px 0 10px;
        border-bottom: 8px solid #EEE;
    }

    .recommend_item{
        flex: 1;
    }
    .recommend_item img{
        width: 75px;
        height: 75px;
        margin-bottom: 5px;
    }
</style>