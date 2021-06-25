<template>
  <div id="category">
    <nav-bar class="nav_bar"><div slot="center">分类</div></nav-bar>
    <div class="content">
      <category-tab-menu
        :categories="categories"
        @selectItem="selectItem"
      ></category-tab-menu>
      <scroll id="tab_content">
        <div>
          <category-tab-content :subcategories="showSubcategory" />
          <!-- <tab-control :title="['综合', '新品', '销量']" @click="tabClick" /> -->
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CategoryTabMenu from "./childComponents/CategoryTabMenu";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import Scroll from "components/common/scroll/Scroll";
import CategoryTabContent from "./childComponents/CategoryTabContent";
import TabControl from "components/content/tabControl/TabControl";

export default {
  name: "Category",
  components: {
    NavBar,
    CategoryTabMenu,
    Scroll,
    CategoryTabContent,
    TabControl,
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
    };
  },
  created() {
    this._getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  mounted() {},
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        this.categories = res.data.category.list;
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
      });
    },
    selectItem(index) {
      this._getSubcategories(index);
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.nav_bar {
  position: relative;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}
#tab_content {
  flex: 1;
  height: 100%;
}
</style>
