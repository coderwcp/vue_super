<template>
  <div id="profile">
    <profile-nav-bar class="nav_bar"></profile-nav-bar>
    <profile-user-info></profile-user-info>

    <section class="account">
      <div class="account_item">
        <div class="number"><span class="balance">0.00</span>元</div>
        <div class="account_info">我的余额</div>
      </div>
      <div class="account_item">
        <div class="number"><span class="balance">0</span>个</div>
        <div class="account_info">我的优惠</div>
      </div>
      <div class="account_item">
        <div class="number"><span class="balance">0</span>分</div>
        <div class="account_info">我的积分</div>
      </div>
    </section>

    <profile-list-view :list-data="orderList" class="order-list" />
    <profile-list-view :list-data="serviceList" class="service-list" />
  </div>
</template>

<script>
import ProfileNavBar from "./childComponents/ProfileNavBar";
import ProfileUserInfo from "./childComponents/ProfileUserInfo";
import ProfileListView from "./childComponents/ProfileListView";

export default {
  name: "Profile",
  components: {
    ProfileNavBar,
    ProfileUserInfo,
    ProfileListView,
  },
  data: function () {
    return {
      orderList: [
        {
          icon: "#order",
          iconImage: require('../../assets/img/profile/message.png'),
          info: "我的消息",
        },
        {
          icon: "#point",
          iconImage: require('../../assets/img/profile/points.png'),
          info: "积分商城",
        },
        {
          icon: "#vip",
          iconImage: require('../../assets/img/profile/vip.png'),
          info: "会员卡",
        },
      ],
      serviceList: [
        {
          icon: "#service",
          iconImage: require('../../assets/img/profile/shopcar.png'),
          info: "我的购物车",
        },
        {
          icon: "#download",
          iconImage: require('../../assets/img/profile/download.png'),
          info: "下载购物APP",
        },
      ],
    };
  },
};
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}
.account {
  display: flex;
}

.account_item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}
.account_item:last-of-type {
  margin-right: 0;
}

.account_item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}

.account_item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.account_info {
  margin-top: 6px;
}

.order-list,
.service-list {
  margin-top: 12px;
}
</style>
