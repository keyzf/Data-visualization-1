<template>
  <div class="plot-wrapper">
    <div v-if="show" class="wrapper">
      <div class="item-wrapper">
        <div class="title">{{nameArr[0].name}}占比</div>
        <div class="content content1">
          <el-progress :text-inside="false" :stroke-width="17" :percentage="nameArr[0].proportion"></el-progress>
          <span class="detail">{{nameArr[0].count}}次</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">{{nameArr[1].name}}占比</div>
        <div class="content content2">
          <el-progress :text-inside="false" :stroke-width="17" :percentage="nameArr[1].proportion"></el-progress>
          <span class="detail">{{nameArr[1].count}}次</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">{{nameArr[2].name}}占比</div>
        <div class="content content3">
          <el-progress :text-inside="false" :stroke-width="17" :percentage="nameArr[2].proportion"></el-progress>
          <span class="detail">{{nameArr[2].count}}次</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">{{nameArr[3].name}}占比</div>
        <div class="content content4">
          <el-progress :text-inside="false" :stroke-width="17" :percentage="nameArr[3].proportion"></el-progress>
          <span class="detail">{{nameArr[3].count}}次</span>
        </div>
      </div>
    </div>
    <p class="tip">备注：占比=当月设备使用刺手占卡车之家柴油加油笔数</p>
  </div>
</template>

<script>
import Vue from 'vue'
import { Progress } from 'element-ui'
Vue.use(Progress)
export default {
  name: 'plotDiagram',
  data () {
    return {
      nameArr: [],
      show: false
    }
  },
  created () {
    this.theMonthDeviceUseEffectAnalysis()
  },
  methods: {
    // 当月使用效果分析
    theMonthDeviceUseEffectAnalysis () {
      this.show = false
      this.nameArr = []
      let that = this
      that.$http.get('/webapi/bdview/thNetWorkDevelopmentBS/theMonthDeviceUseEffectAnalysis').then(res => {
        if (res.result) {
          that.nameArr = res.rows
          this.show = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.theMonthDeviceUseEffectAnalysis()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  },
  beforeDestroy () {
    if (this.timer) {
      window.clearTimeout(this.timer)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.plot-wrapper {
  .tip {
    font-size: pxtovw(15)
    color: #5c74d1
  }
  text-align center
  width: 100%
  height: pxtovh(476)
  background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop/bg6.png") no-repeat
  -webkit-background-size: 100% pxtovh(476)
  background-size: 100% pxtovh(476)
  padding-top pxtovh(95)
  .wrapper {
    margin 0 pxtovw(50)
    .item-wrapper {
      margin-bottom pxtovh(27)
      .title {
        text-align left
        font-size: pxtovw(15)
        color: #ffffff
        margin-bottom pxtovh(11.95)
      }
      .content {
        display flex
        position relative
        padding-right vw(40)
        /deep/ .el-progress {
          flex 1
          margin-right pxtovw(23.9)
          line-height vh(20)
          .el-progress-bar {
            margin-right 0
            .el-progress-bar__outer {
              background-color: #0D1A56
              width: 120%
            }
          }
          .el-progress__text {
            position absolute
            right 5px
            font-size: pxtovw(11)!important
            line-height 22px
            font-weight: 400!important
            color: rgba(255,255,255,1)!important
          }
        }
        .detail {
          font-size: pxtovw(15)
          color: #ffffff
          font-weight:400;
          text-align left
          position: absolute
          right -20px
          top: vw(-3)
          width: vw(52)
        }
      }
      .content1 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(177,227,98,0.19) 0%,rgba(190,161,53,1) 100%)
        }
      }
      .content2 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(135,74,227,0.19) 0%,rgba(74,106,227,1) 100%)
        }
      }
      .content3 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(60,225,227,0.19) 0%,rgba(60,171,226,1) 100%)
        }
      }
      .content4 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(68,168,129,0.19) 0%,rgba(68,168,129,1) 100%)
        }
      }
    }
  }
}
  @media screen and (max-height: 1079px) {
    .plot-wrapper {
      padding-top pxtovh(60)
      .wrapper {
        margin 0 pxtovw(30)
        .item-wrapper {
          .content {
            /deep/ .el-progress {
              .el-progress__text {
                top: -2px
                right 12px
              }
            }
          }
        }
      }
    }
  }
</style>
