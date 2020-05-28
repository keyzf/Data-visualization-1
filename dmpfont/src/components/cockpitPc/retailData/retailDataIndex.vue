<template>
  <div class="retail-data-wrapper">
    <top-header>
      <div class="top_bg_img"></div>
    </top-header>
    <div class="main-content">
      <top-com></top-com>
      <center-com></center-com>
      <bottom-com></bottom-com>
    </div>
  </div>
</template>

<script>
import topHeader from '../common/top-header'
import TopCom from './components/TopCom'
import CenterCom from './components/CenterCom'
import BottomCom from './components/BottomCom'
export default {
  name: 'retailData',
  components: {
    topHeader,
    TopCom,
    CenterCom,
    BottomCom
  },
  data () {
    return {
    }
  },
  created () {
    window.document.title = '零售数据分析大屏'
  },
  methods: {
    login (UserID, Mac) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/ssoLogin', {
        'userId': UserID,
        'mac': Mac
      }).then(res => {
        console.log(res)
        this.$dialog.loading.close()
        if (res.result === true) {
          this.$util.set('bs_accode_token', res.accode, res.actimes)
          // this.status = true
          this.$router.push({path: '/cockpitPc/home/homeIndex'})
        } else {
          this.$router.push({
            name: 'login'
          })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../../assets/css/mixin.styl'
.retail-data-wrapper {
  .top-header {
    margin-bottom: pxtovh(22)!important
    .top_bg_img {
      height: pxtovh(53)
      width: 100%
      max-width pxtovw(1920)
      background: url("../../../../static/images/retail/top-title.png") no-repeat
      background-size: 100% pxtovh(53)
      overflow hidden
    }
  }
  height: 100vh
  overflow: hidden
  max-width pxtovw(1920)
  max-height pxtovh(1080)
  background-color: #000530
  margin 0 auto
  padding 0 pxtovw(20) pxtovh(18)
  color: #97a8f7
  .main-content {
    width: 100%
    display flex
    flex-direction column
  }
}
</style>
