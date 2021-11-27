<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-11-04 12:38:53
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-11 21:15:49
 * @LastEditors: Harry
-->
<template>
  <div class="themeSelected">
    <div
      class="item_w"
      :style="{ backgroundColor: item[3] }"
      v-for="(item, val, index) in themeList"
      :key="index"
      @click="selectTheme(val)"
    >
      {{ val }}
    </div>
  </div>
</template>

<script>
import CONFIG from '@/assets/js/index.js'
export default {
  data() {
    return {
      themeList: CONFIG.COLORLIST
    }
  },
  emits: ['theme'],
  methods: {
    selectTheme(va) {
      this.$emit('theme', va)
    }
  }
}
</script>

<style lang="less" scoped>
.themeSelected {
  position: absolute;
  bottom: 5%;
  right: 5%;
  border-radius: 20px;
  cursor: pointer;
  .item_w {
    margin: 1px 0;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    // color: #fff;
    font-weight: 550;
    width: 100%;
    height: 100%;
  }
}
</style>
