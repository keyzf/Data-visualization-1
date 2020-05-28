import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    stationData: {
      isInterval: true, // 是否启动轮询
      timeInterval: '120000', // 轮询间隔120s
      timeIntervals: '10000',
      cityCode: '' // 油站编码
    },
    version: '1.0.0', // 版本号
    isLogin: false // 是否已登录
  }
})

export default store
