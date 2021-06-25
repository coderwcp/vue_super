<template>
  <div class="check_button" :class="{ checked: isChecked }">
    <img src="~assets/img/common/check.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check_button {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #aaa;
  
}
.check_button img {
 position: relative;
 top: -1px;
 right: 0;
 left: -1px;
 width: 18px;
 height: 18px;
}
.checked {
  background-color: red;
  border-color: red;
}
</style>