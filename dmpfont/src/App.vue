<template>
  <!--<div id="app" @click="showFloatBoxClick">-->
  <div id="app">
    <router-view/>
    <!--<float-icon v-if="isShow" ref="floatXuanFu"></float-icon>-->
    <!-- <float-icon v-if="show" ref="floatXuanFu"></float-icon> -->
  </div>
</template>

<script>
import floatIcon from './components/cockpitPc/common/floatIcon'
import Login from '@/components/cockpitPc/common/login'
export default {
  name: 'App',
  data () {
    return {
      show: false,
      isShow: false
    }
  },
  components: {
    floatIcon,
    Login
  },
  methods: {
    // 判断是否是IE浏览器
    isIE () {
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        this.$dialog.alert({ mes: '暂不支持IE浏览器，请下载谷歌浏览器!', timeout: 1800 })
      } else {
        return false
      }
    },
    // 判断移动端还是pc端
    _isMobile () {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    },
    showFloatBoxClick () {
      if (this.show) {
        this.$refs.floatXuanFu.showFloatBox()
      }
    }
  },
  mounted () {
    // 判断是否是IE浏览器
    this.isIE()
    if (this._isMobile()) {
      this.show = false
    } else {
      this.show = true
    }
  },
  watch: {
    '$route' (to, from) { // 监听路由,区分是否显示菜单按钮
      let fullpath = to.fullPath
      let slicePath = fullpath.slice(1, fullpath.length)
      let path = slicePath.substring(0, slicePath.indexOf('/'))
      if (path === 'cockpitPc') {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
}
</script>

<style>
body,html{
  margin: 0!important;
  height:100%!important;
}
#app {
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
}
</style>
