<template>
  <div class="gasmem-wrapper">
    <top-header>
      <div class="top_bg_img"></div>
    </top-header>
    <div class="main-content" v-if="status">
    <!--<div class="main-content">-->
      <left-com></left-com>
      <center-com></center-com>
      <right-com></right-com>
    </div>
  </div>
</template>

<script>
import topHeader from '../common/top-header'
import leftCom from './components/LeftCom'
import centerCom from './components/CenterCom'
import rightCom from './components/RightCom'
export default {
  name: 'carMembersIndex',
  components: {
    topHeader,
    leftCom,
    centerCom,
    rightCom
  },
  data () {
    return {
      status: false
    }
  },
  created () {
    window.document.title = '汽油会员分析大屏'
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
.gasmem-wrapper {
  .top-header {
    margin-bottom: pxtovh(22)!important
    .top_bg_img {
      height: pxtovh(53)
      width: 100%
      max-width pxtovw(1920)
      background: url("https://img.gdoil.cn/cockpit/static/images/carMember/top-汽油会员分析大屏.png") no-repeat
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
    justify-content space-between
  }
}
</style>
