/*
 * @Author: Harry
 * @Date: 2023-07-02 20:10:17
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2023-07-02 20:52:09
 * @FilePath: \github_commit_echarts\src\main.js
 */
import Vue from 'vue'
import App from '@/App.vue'
import echart from '@/plugin/echart.js'
import '@/assets/css/global.css'
import axios from 'axios'
axios.defaults.baseURL = 'https://py-gitcalendar-orcin.vercel.app/'
Vue.prototype.$echarts = echart
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
