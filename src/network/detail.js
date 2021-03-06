import { request } from './request'

// 获取商品信息
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

// 获取商品下的推荐商品
export function getRecommend() {
    return request({
        url: '/recommend'
    })
}

// 将复杂的数据封装到对象中
export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info, rule) {
        // images可能没有值（某些商品有值，某些没有值）
        this.image = info.image ? info.images[0] : '';
        this.infos = info.set
        this.sizes = rule.tables
    }
}

