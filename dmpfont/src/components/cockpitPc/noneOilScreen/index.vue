<template>
  <div class="wrapper">
    <top-header>
      <div class="top_bg_img">
        <!-- <page-title :titleInfo="titleInfo"></page-title> -->
      </div>
    </top-header>
    <section class="wrap-cont" v-if="isLoaded">
      <!-- 左边部分 -->
      <el-col :span="6">
        <div class="staff-cont-l">
          <div class="left-top marbot">
            <left-top></left-top>
          </div>
          <div class="left-center marbot">
            <left-center></left-center>
          </div>
          <div class="left-bottom">
            <left-bot></left-bot>
          </div>
        </div>
      </el-col>
      <!-- 中间部分 -->
      <el-col :span="12">
        <div class="staff-cont-c">
          <div class="center-top marbot">
            <center-top></center-top>
          </div>
          <div class="center-top1 marbot">
            <center-top1></center-top1>
          </div>
          <div class="center-bot marbot">
            <center-bot></center-bot>
          </div>
          <div class="center-bot1">
            <center-bot1></center-bot1>
          </div>
        </div>
      </el-col>
      <!-- 右边部分 -->
      <el-col :span="6">
        <div class="staff-cont-r">
          <div class="right-top marbot">
            <right-top></right-top>
          </div>
          <div class="right-center marbot">
            <right-center></right-center>
          </div>
          <div class="right-bot">
            <right-bot></right-bot>
          </div>
        </div>
      </el-col>
    </section>
  </div>
</template>

<script>
import topHeader from '../common/top-header'
export default {
  name: 'noneOilScreenIndex',
  components: {
    topHeader,
    LeftTop: require('@/components/cockpitPc/noneOilScreen/components/leftTop.vue').default,
    LeftCenter: require('@/components/cockpitPc/noneOilScreen/components/leftCenter.vue').default,
    LeftBot: require('@/components/cockpitPc/noneOilScreen/components/leftBot.vue').default,
    centerTop: require('@/components/cockpitPc/noneOilScreen/components/centerTop.vue').default,
    centerTop1: require('@/components/cockpitPc/noneOilScreen/components/centerTop1.vue').default,
    centerBot: require('@/components/cockpitPc/noneOilScreen/components/centerBot.vue').default,
    centerBot1: require('@/components/cockpitPc/noneOilScreen/components/centerBot1.vue').default,
    rightTop: require('@/components/cockpitPc/noneOilScreen/components/rightTop.vue').default,
    rightCenter: require('@/components/cockpitPc/noneOilScreen/components/rightCenter.vue').default,
    rightBot: require('@/components/cockpitPc/noneOilScreen/components/rightBot.vue').default,
    pageTitle: require('@/components/cockpitPc/common/pageTitle.vue').default
  },
  data () {
    return {
      titleInfo: {
        titleName: '非油品数据分析大屏',
        titleColor: 'rgba(195,210,252,1)',
        titleColor1: 'rgba(101,129,209,1)'
      },
      isLoaded: false// 是否渲染页面(页面未带有用户id时，需先单点登录)
    }
  },
  created () {
    window.document.title = '非油品数据分析大屏'
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
      this.isLoaded = true
    }
  },
  methods: {
    // 单点登录
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
.wrapper {
  width: 100%
  height: 100vh
  overflow: hidden
  padding: 0
  background-color: #000530
  margin: 0 auto
  padding: 0 vw(10)
  .top-header {
    margin-bottom: pxtovh(20)!important
  }
  .top_bg_img {
    height: vh(53)
    width: 100%
    background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/top_bg.png") no-repeat
    // background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/top_03.png") no-repeat
    background-size: 100% auto;
    overflow hidden
  }
  .wrap-cont{
    width: 100%
    height: vh(1007)
    overflow: hidden
    .marbot{
      margin-bottom: vh(14)
    }
  }
  .staff-cont-l, .staff-cont-c, .staff-cont-r{
    width: 100%
    height: vh(1000)
    padding: 0 vw(8)
    .left-top{
      width: 100%
      height: vh(164)
    }
    .left-center{
      width: 100%
      height: vh(348)
    }
    .left-bottom{
      width: 100%
      height: vh(446)
    }
    .center-top{
      width: 100%
      height: vh(144)
    }
    .center-top1{
      width: 100%
      height: vh(245)
    }
    .center-bot{
      width: 100%
      height: vh(245)
    }
    .center-bot1{
      width: 100%
      height: vh(310)
    }
    .right-top{
      width: 100%
      height: vh(195)
    }
    .right-center{
      width: 100%
      height: vh(390)
    }
    .right-bot{
      width: 100%
      height: vh(373)
    }
  }
  .border{
    border: none
  }
}
</style>
