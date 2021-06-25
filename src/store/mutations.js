import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutationsTypes'

export default {
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每一个方法尽可能完成的事情较为单一一点
    [ADD_COUNTER](state, payload) {
        payload.count += 1
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}