<template>
  <scroll id="tab_menu">
    <div class="menu_list">
      <div
        class="menu_list_item"
        :class="{ active: index === currentIndex }"
        v-for="(item, index) in categories"
        :key="index"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CategoryTabMenu",
  components: { Scroll },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
      itemClick(index){
          this.currentIndex = index
          this.$emit("selectItem",index)
      }
  }
};
</script>

<style scoped>
#tab_menu{
    height: 100%;
    width: 100px;
    background: #F6F6F6;
    box-sizing: border-box;
}
.menu_list_item{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-style: 14px;
}
.menu_list_item.active{
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #FFF;
    border-left: 3px solid var(--color-high-text);
}
</style>