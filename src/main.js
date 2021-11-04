import Vue from 'vue'
import App from './App.vue'
import echart from './plugin/echart.js'
import './assets/css/global.css'
import axios from 'axios'
axios.defaults.baseURL = 'https://py-gitcalendar-git-master-rr210.vercel.app/api?/'
Vue.prototype.$echarts = echart
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
