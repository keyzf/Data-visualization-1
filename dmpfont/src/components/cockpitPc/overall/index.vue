<template>
  <div class="overallIndex igs-flex igs-flex11">
    <top-header>
      <div class="top_bg_img"></div>
    </top-header>
    <div class="main-content clearfix">
      <left-com v-if="status"></left-com>
      <center-com v-if ="status"></center-com>
      <right-com v-if ="status"></right-com>
    </div>
  </div>
</template>

<script>
import topHeader from './components/top-header'
import leftCom from './components/leftCom'
import rightCom from './components/rightCom'
import centerCom from './components/centerCom'
export default {
  name: 'overallIndex',
  data () {
    return {
      status: false
    }
  },
  created () {
    window.document.title = '卡车之家数据大屏'
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
      this.$dialog.loading.open('登陆中')
      that.$http.get('/webapi/bdview/ssoLogin', {
        'userId': UserID,
        'mac': Mac
      }).then(res => {
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
  },
  components: {
    topHeader,
    leftCom,
    rightCom,
    centerCom
  }
}
</script>

<style scoped lang="stylus">
@import '../../../assets/css/mixin.styl'
.overallIndex
  max-width pxtovw(1920)
  max-height pxtovh(1080)
  background-color #000530
  margin 0 auto
  height 100%
  overflow hidden
  .main-content
    width 100%
    flex 1
    padding 0 pxtovh(20) pxtovh(20) pxtovh(20)
    display flex
</style>
