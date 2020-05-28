// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

import axios from '@/axios/api'
import Ydui from './ydui' // eslint-disable-line
// import './sass/index.scss'
import '@/sass/index.styl'
import '../static/font/font.css'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入RSA加密
import JSEncrypt from 'jsencrypt'

// 引入echarts
import echarts from 'echarts'

// 引入util共用方法
import util from './utils/util'
Vue.prototype.$util = util

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$http = axios

// RSA注册方法
Vue.prototype.$getRsaCode = function (pubKey, str) {
  let encryptStr = new JSEncrypt()
  encryptStr.setPublicKey(pubKey) // 设置加密公钥
  let data = encryptStr.encrypt(str.toString()) // 进行加密
  return data
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
