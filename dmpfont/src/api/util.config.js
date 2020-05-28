/* eslint-disable eol-last */
/**
 * @name 发布配置文件
 * @description 发布需要注意：正式地址URL使用
 * 静态资源 配置文件  文件路径：config/index.js
 * @param {Number} type ---
 * 生产配置: 1=正式 2=测试
 */
const deploy = require('./config')
const URL_1 = 'https://m.gdoil.cn' // 【网络版】正式地址 https://m.gdoil.cn
const URL_2 = 'https://gdwsc.deepermobile.com' // 测试地址

const STATIC_OSS_URL = 'https://img.gdoil.cn/' // 正式包静态资源路径

// 部署配置类型
const type = deploy.type

const config = {
  // api接口请求地址
  getUrl () {
    return this.setUrl().url
  },
  setUrl () {
    let url = ''
    let typeText = ''
    switch (type) {
      case 1:
        // 线上包生产配置
        url = URL_1
        typeText = '生产配置>正式包'
        break
      case 2:
        // 离线包生产配置
        url = URL_2
        typeText = '生产配置>测试包'
        break
    }
    return {url: url, typeText: typeText}
  },
  assetsPath () {
    // 默认正式包资源路径配置
    let path = STATIC_OSS_URL
    if (type === 2) {
      // 测试包资源路径配置
      path = './'
    }
    return path
  }
}

module.exports = config
