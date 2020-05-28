<template>
  <div class="plot-wrapper">
    <div v-if="show" class="wrapper">
      <div class="item-wrapper">
        <div class="title">{{nameArr[0].name}}占比</div>
        <div class="content content1">
          <el-progress :text-inside="false" :stroke-width="14" :percentage="nameArr[0].proportion"></el-progress>
          <span>{{nameArr[0].count}}次</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">{{nameArr[1].name}}占比</div>
        <div class="content content2">
          <el-progress :text-inside="false" :stroke-width="14" :percentage="nameArr[1].proportion"></el-progress>
          <span>{{nameArr[1].count}}次</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">{{nameArr[2].name}}占比</div>
        <div class="content content3">
          <el-progress :text-inside="false" :stroke-width="14" :percentage="nameArr[2].proportion"></el-progress>
          <span>{{nameArr[2].count}}次</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">{{nameArr[3].name}}占比</div>
        <div class="content content4">
          <el-progress :text-inside="false" :stroke-width="14" :percentage="nameArr[3].proportion"></el-progress>
          <span>{{nameArr[3].count}}次</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">干衣占比</div>
        <div class="content content5">
          <el-progress :text-inside="false" :stroke-width="14" :percentage="nameArr[3].proportion"></el-progress>
          <span>{{nameArr[3].count}}次</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">休息占比</div>
        <div class="content content6">
          <el-progress :text-inside="false" :stroke-width="14" :percentage="nameArr[3].proportion"></el-progress>
          <span>{{nameArr[3].count}}次</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">按摩占比</div>
        <div class="content content7">
          <el-progress :text-inside="false" :stroke-width="14" :percentage="nameArr[3].proportion"></el-progress>
          <span>{{nameArr[3].count}}次</span>
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
  height: pxtovh(286)
  background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop2/qietu_08.png") no-repeat
  -webkit-background-size: 100% pxtovh(286)
  background-size: 100% pxtovh(286)
  padding-top pxtovh(56)
  margin-bottom pxtovh(15)
  .wrapper {
    margin 0 pxtovw(50)
    .item-wrapper {
      display flex
      margin-bottom pxtovh(12)
      .title {
        text-align left
        font-size: pxtovw(12)
        color: #ffffff
        margin-right vw(13)
      }
      .content {
        display flex
        flex 1
        /deep/ .el-progress {
          flex 1
          margin-right pxtovw(23.9)
          line-height vh(15)
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
            line-height 15px
            font-weight: 400!important
            color: rgba(255,255,255,1)!important
          }
        }
        span {
          font-size: pxtovw(12)
          font-weight: 400
          color: rgba(255,255,255,1)
        }
      }
      .content1 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(60,225,227,0.19) 0%, rgba(60,171,226,1) 100%)
        }
      }
      .content2 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(177,227,98,0.19) 0%, rgba(190,161,53,1) 100%)
        }
      }
      .content3 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(135,74,227,0.19) 0%, rgba(74,106,227,1) 100%)
        }
      }
      .content4 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(68,168,129,0.19) 0%, rgba(68,168,129,1) 100%)
        }
      }
      .content5 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(164,71,198,0.19) 0%, rgba(164,71,198,1) 100%)
        }
      }
      .content6 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(55,25,238,0.19) 0%, rgba(55,25,238,1) 100%)
        }
      }
      .content7 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(92,116,209,0.19) 0%, rgba(92,116,209,1) 100%)
        }
      }
    }
  }
}
</style>
