<template>
  <div class="wrapper">
    <top-header>
      <div class="top_bg_img">
        <!-- <page-title :titleInfo="titleInfo"></page-title> -->
      </div>
    </top-header>
    <section class="wrap-cont" v-if="isLoaded">
      <!-- 顶部 -->
      <div class="cont-top marbot igs-flex igs-flex6">
        <div class="cont-top-l">
          <div class="top-l-t marbot">
            <topLeftTop></topLeftTop>
          </div>
          <div class="top-l-b igs-flex igs-flex6">
            <div>
              <topLeftBot></topLeftBot>
            </div>
            <div class="marleft">
              <topLeftBot1></topLeftBot1>
            </div>
          </div>
        </div>
        <div class="cont-top-r">
          <topRight></topRight>
        </div>
      </div>
      <!-- 中部 -->
      <div class="cont-center igs-flex igs-flex6 marbot">
        <div>
          <center1></center1>
        </div>
        <div class="marleft">
          <center2></center2>
        </div>
        <div class="marleft">
          <center3></center3>
        </div>
        <div class="marleft">
          <center4></center4>
        </div>
      </div>
      <!-- 底部 -->
      <div class="cont-bot igs-flex igs-flex6">
        <div class="cont-bot-l">
          <botLeft></botLeft>
        </div>
        <div class="cont-bot-c">
          <botCenter></botCenter>
        </div>
        <div class="cont-bot-r">
          <botRight></botRight>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import topHeader from '../common/top-header'
export default {
  name: 'trackHomeScreenIndex',
  components: {
    topHeader,
    topLeftTop: require('@/components/cockpitPc/trackHomeScreen/components/topLeftTop.vue').default,
    topLeftBot: require('@/components/cockpitPc/trackHomeScreen/components/topLeftBot.vue').default,
    topLeftBot1: require('@/components/cockpitPc/trackHomeScreen/components/topLeftBot1.vue').default,
    topRight: require('@/components/cockpitPc/trackHomeScreen/components/topRight.vue').default,
    center1: require('@/components/cockpitPc/trackHomeScreen/components/center1.vue').default,
    center2: require('@/components/cockpitPc/trackHomeScreen/components/center2.vue').default,
    center3: require('@/components/cockpitPc/trackHomeScreen/components/center3.vue').default,
    center4: require('@/components/cockpitPc/trackHomeScreen/components/center4.vue').default,
    botLeft: require('@/components/cockpitPc/trackHomeScreen/components/botLeft.vue').default,
    botCenter: require('@/components/cockpitPc/trackHomeScreen/components/botCenter.vue').default,
    botRight: require('@/components/cockpitPc/trackHomeScreen/components/botRight.vue').default,
    pageTitle: require('@/components/cockpitPc/common/pageTitle.vue').default
  },
  data () {
    return {
      titleInfo: {
        titleName: '卡车之家会员数据大屏',
        titleColor: 'rgba(151,168,247,1)',
        titleColor1: 'rgba(229,232,255,1)'
      },
      isLoaded: false
    }
  },
  created () {
    window.document.title = '卡车之家会员数据大屏'
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
          this.$nextTick(function () {
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
.wrapper {
  width: 100%
  height: 100vh
  overflow: hidden
  padding: 0
  background-color: #000530
  margin: 0 auto
  padding: 0 vw(18)
  color: #ffffff
  .top-header {
    margin-bottom: pxtovh(20)!important
  }
  .top_bg_img {
    height: vh(53)
    width: 100%
    background: url("https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/titles_bg.png") no-repeat
    background-size: 100% auto;
    overflow hidden
  }
  .wrap-cont{
    width: 100%
    height: vh(1007)
    overflow: hidden
    .marbot{
      margin-bottom: vh(15)
    }
    .marleft{
      margin-left: vw(15)
    }
    .cont-top{
      height: vh(382)
      .cont-top-l{
        width: vw(1310)
        .top-l-t{
          height: vh(171)
        }
        .top-l-b{
          height: vh(196)
          div{
            flex: 1
          }
        }
      }
      .cont-top-r{
        width: vw(556)
      }
    }
    .cont-center{
      height: vh(259)
      div{
        flex: 1
      }
    }
    .cont-bot{
      height: vh(317)
      .cont-bot-l{
        width: vw(811)
      }
      .cont-bot-c{
        width: vw(522)
      }
      .cont-bot-r{
        width: vw(522)
      }
    }
  }
  .border{
    border: 1px solid red
  }
}
</style>
