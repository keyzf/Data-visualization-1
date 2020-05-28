<template>
  <div class="net_wrapper">
    <top-header>
      <div class="top_bg_img"></div>
    </top-header>
    <div class="main-content" v-if="status">
      <div class="detail-left">
        <div class="left-content">
          <left-com></left-com>
          <center-com></center-com>
        </div>
        <bottom-com></bottom-com>
      </div>
      <div class="detail-right">
        <right-com></right-com>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../common/top-header'
import leftCom from './components/leftCom'
import rightCom from './components/rightCom'
import centerCom from './components/centerCom'
import bottomCom from './components/bottomCom'
export default {
  name: 'netIndex',
  components: {
    topHeader,
    leftCom,
    rightCom,
    centerCom,
    bottomCom
  },
  data () {
    return {
      status: false
    }
  },
  created () {
    window.document.title = '卡车之家网络发展大屏'
    var accodeToken = this.$util.getValue('bs_accode_token')
    console.log(accodeToken)
    if (!accodeToken) {
      var UserID = this.$route.query.UserID
      var Mac = this.$route.query.mac || this.$route.query.Mac || this.$route.query.MAC
      if (UserID && Mac) {
        this.login(UserID, Mac)
      } else {
        this.$router.push({
          name: 'login'
        })
      }
    } else {
      this.status = true
    }
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
  .net_wrapper {
    max-width pxtovw(1920)
    max-height pxtovh(1080)
    background-color: #000530
    height: 100vh
    overflow: hidden
    margin 0 auto
    .top_bg_img {
      height: pxtovh(53)
      width: 100%
      max-width pxtovw(1920)
      background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop/top.png") no-repeat
      background-size: 100% pxtovh(53)
      overflow hidden
    }
    .main-content {
      width: 100%
      padding pxtovh(8) pxtovw(18) pxtovh(33)
      display flex
      .detail-left {
        .left-content {
          display flex
        }
      }
    }
  }
</style>
