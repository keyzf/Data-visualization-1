import {URL} from '@/api/url.config'
import axios from 'axios'
import Qs from 'qs'

axios.defaults.timeout = 60000
axios.defaults.baseURL = URL
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}

// 定义全局变量clearRequest，在route.js中要用到
const clearRequest = {
  source: {
    token: null,
    cancel: null
  }
}
// 强行中断请求要用到的
const CancelToken = axios.CancelToken
const source = CancelToken.source()

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // if(token){
    //  config.params = {'token':token}
    // }
    config.cancelToken = clearRequest.source.token // 这句很重要
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode === 2) {
      this.$router.push({
        path: '/',
        querry: {redirect: this.$router.currentRoute.fullPath}// 从哪个页面跳转
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
let api = {
  get (url, params = {}, timeout) {
    // const CancelToken = axios.CancelToken;
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params,
        cancelToken: source.token,
        timeout: timeout
      }).then(response => {
        resolve(response.data)
      }).catch(err => {
        if (axios.isCancel(err)) {
          console.log('get取消请求传递的消息', err)
        } else {
          console.log('GETerror', err)
          reject(err)
        }
      })
    })
  },
  post (url, params = {}, timeout) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        timeout: timeout,
        cancelToken: source.token,
        transformRequest: [function (data) {
          data = Qs.stringify(JSON.parse(JSON.stringify(params)))
          return data
        }]
      }).then(response => {
        resolve(response.data)
      }, err => {
        if (axios.isCancel(err)) {
          console.log('post取消请求传递的消息', err)
        } else {
          console.log('POSTerror', err)
          reject(err)
        }
      })
    })
  },
  clearRequest,
  CancelToken
}
export default api
