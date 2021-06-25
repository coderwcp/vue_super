<template>
  <div id="user_info">
    <a href="#" class="clear-fix">
      <slot name="user_icon">
        <img src="~assets/img/profile/user.png" class="privateImage left" alt="">
      </slot>
      <div class="login_info left">
        <slot name="user_nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img src="~assets/img/profile/phone.png" alt="" class="icon_mobile">
          </span>
          <slot name="user_phone">暂无绑定手机号</slot>
        </div>
      </div>
      <img class="arrow_right right" src="~assets/img/profile/right.png" alt="">
    </a>
  </div>
</template>

<script>
	export default {
		name: "ProfileUserInfo"
	}
</script>

<style scoped>
  #user_info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user_info .privateImage {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .left {
    float: left;
  }
  .right{
    float: right;
  }

  #user_info .arrow_right {
    width: 22px;
    height: 22px;
    margin-top: 18px;
  }

  #user_info .login_info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user_info .login_info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user_info .login_info .phone .icon_mobile {
    position: absolute;
    width: 14px;
    height: 14px;
    left: -15px;
    top: 0px;
  }
</style>
