// debounce 防抖节流函数
import { debounce } from './utils'

// 导入组件
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        const newRefresh = debounce(this.$refs.scroll.refresh, 200);
        this.itemImgListener = () => {
            newRefresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
    },
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        ListenShowBackTop(position) {
            this.isShowBackTop = -position.y > 1000;
        }
    },
}

export const tabControlMixin = {
    data: function () {
      return {
        currentType: POP
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        console.log(this.currentType);
      }
    }
  }