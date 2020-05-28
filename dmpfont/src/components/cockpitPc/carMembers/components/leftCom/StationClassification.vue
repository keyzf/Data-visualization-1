<template>
  <div class="classification-wrapper">
    <div v-if="show">
      <div class="item-wrapper">
        <div class="title">服务精品站</div>
        <div class="content content3">
          <el-progress :text-inside="true" :stroke-width="13" :percentage="40" :show-text="false"></el-progress>
          <span class="detail">{{boutiqueStation}}座</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">其中：自营洗车</div>
        <div class="content content3">
          <el-progress :text-inside="true" :stroke-width="13" :percentage="sinceCarWashProportion" :show-text="false"></el-progress>
          <span class="detail">{{sinceCarWash}}座</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">其中：综合汽服</div>
        <div class="content content3">
          <el-progress :text-inside="true" :stroke-width="13" :percentage="multipleSteamSuitProportion" :show-text="false"></el-progress>
          <span class="detail">{{multipleSteamSuit}}座</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Progress } from 'element-ui'
Vue.use(Progress)
export default {
  name: 'StationClassification',
  data () {
    return {
      nameArr: [],
      show: false,
      total: 0,
      boutiqueStation: '',
      multipleSteamSuit: '',
      sinceCarWash: '',
      boutiqueStationProportion: '',
      multipleSteamSuitProportion: '',
      sinceCarWashProportion: ''
    }
  },
  created () {
    this.oilStationClassify()
  },
  methods: {
    oilStationClassify () {
      this.$http.post('/webapi/bdview/gasolineDataBS/oilStationClassify').then(res => {
        if (res.result === true) {
          this.boutiqueStation = res.data.boutiqueStation
          this.multipleSteamSuit = res.data.multipleSteamSuit
          this.sinceCarWash = res.data.sinceCarWash
          this.multipleSteamSuitProportion = (this.multipleSteamSuit / (this.multipleSteamSuit + this.sinceCarWash)) * 100
          this.sinceCarWashProportion = (this.sinceCarWash / (this.multipleSteamSuit + this.sinceCarWash)) * 100
          this.boutiqueStationProportion = (this.boutiqueStation / (this.multipleSteamSuit + this.sinceCarWash)) * 100
          this.show = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.oilStationClassify()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../../assets/css/mixin.styl'
  .classification-wrapper {
    width: vw(500)
    height: vh(220.5)
    margin-bottom vh(16)
    background: url("https://img.gdoil.cn/cockpit/static/images/carMember/left_bg1.png") no-repeat
    -webkit-background-size: 100% vh(220.5)
    background-size: 100% vh(220.5)
    padding-top vh(58)
    padding-left vw(22)
    padding-right vw(22)
    .item-wrapper {
      margin-bottom pxtovh(5)!important
      .title {
        margin-left vw(5)
        text-align left
        font-size: pxtovw(12)
        font-weight: 400
        color: #ffffff
      }
      .content {
        display flex
        position relative
        padding-right vw(40)
        margin-top vh(10)
        /deep/ .el-progress {
          flex 1
          margin-right pxtovw(24)
          .el-progress-bar__outer {
            background-color: #0D1A56
            height: vh(18)!important
          }
        }
        .detail {
          font-size: pxtovw(15)
          color: #ffffff
          font-weight:400;
          text-align left
          position: absolute
          right 0
          top: vw(-4)
        }
      }
      .content3 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(60,225,227,0.19) 0%,rgba(60,171,226,1) 100%)
        }
      }
    }
  }
  @media screen and (max-height: 1079px) {
    .classification-wrapper {
      padding-top vh(50)
      .item-wrapper {
        margin-bottom pxtovh(12)
        .content {
          margin-top vh(5)
          /deep/ .el-progress {
            .el-progress-bar__outer {
              height: vh(15)!important
            }
          }
          .detail {
            top: vw(-8)
          }
        }
      }
    }
  }
</style>
