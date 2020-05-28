<template>
  <div class="gasoline-wrapper">
    <top-header>
      <div class="top_bg_img"></div>
    </top-header>
    <div class="main-content" v-if="status">
      <gasoline-top></gasoline-top>
      <gasoline-center></gasoline-center>
      <gasoline-bottom></gasoline-bottom>
    </div>
  </div>
</template>

<script>
import topHeader from '../common/top-header'
import gasolineTop from './components/gasolineTop'
import gasolineCenter from './components/gasolineCenter'
import gasolineBottom from './components/gasolineBottom'
export default {
  name: 'gasolineIndex',
  components: {
    topHeader,
    gasolineTop,
    gasolineCenter,
    gasolineBottom
  },
  data () {
    return {
      status: false
    }
  },
  created () {
    window.document.title = '汽油会员数据大屏'
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
          this.$nextTick(function () {
            // 此时已经渲染完成
            this.$util.set('bs_accode_token', res.accode, res.actimes)
            // this.status = true
            this.$router.push({path: '/cockpitPc/home/homeIndex'})
          })
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
  .top-header {
    margin-bottom: pxtovh(19)!important
  }
  .gasoline-wrapper {
    height: 100vh
    overflow: hidden
    max-width pxtovw(1920);
    max-height pxtovh(1080)
    background-color: #000530
    margin 0 auto
    padding 0 pxtovw(18) pxtovh(18)
  }
  .top_bg_img {
    height: pxtovh(53)
    width: 100%
    max-width pxtovw(1920)
    background: url("https://img.gdoil.cn/cockpit/static/images/gasoline/top_03.png") no-repeat
    background-size: 100% pxtovh(53)
    overflow hidden
  }
</style>
