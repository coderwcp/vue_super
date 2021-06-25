// Vuex中代码的重构
import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutationsTypes'

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 解决加入购物车显示数量的问题

            // 1.查找之前的数组是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            // 2.判断oldProduct
            if (oldProduct) { // 重复商品添加数量
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前商品数量+1')
            } else { // 添加新的商品
                payload.count = 1
                // state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('您添加了新的商品')
            }

        })
    }
}