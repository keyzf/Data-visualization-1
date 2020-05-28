<template>
  <div class="guns-wrapper">
    <div>
      <div class="item-wrapper">
        <div class="title">汽油提枪数</div>
        <div class="content content1" v-if="isLoad">
          <el-progress :text-inside="true" :show-text="false" :stroke-width="17" :percentage="gasolinePercentage"></el-progress>
          <span>{{gasolinePistolCount}}次</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">柴油提枪数</div>
        <div class="content content2" v-if="isLoad">
          <el-progress :text-inside="true" :show-text="false" :stroke-width="17" :percentage="dieselPercentage"></el-progress>
          <span>{{dieselPistolCount}}次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'numGuns',
  props: {
    cityCode: String
  },
  data () {
    return {
      dieselPistolCount: 0,
      dieselPistolCount1: 0,
      gasolinePistolCount: 0,
      gasolinePistolCount1: 0,
      dieselPercentage: 0,
      gasolinePercentage: 0,
      isLoad: false
    }
  },
  created () {
    this.bigScreenDetails()
  },
  methods: {
    // 大屏明细数
    bigScreenDetails () {
      // this.isLoad = false
      this.dataObj = {}
      let that = this
      that.$http.get('/webapi/bdview/oilDataBS/bigScreenDetails', {
        cityCode: this.cityCode
      }).then(res => {
        if (res.result) {
          that.dataObj = res.data
          if (that.dataObj.dieselPistolCount > 10000) {
            this.dieselPistolCount = this.$util.fixedFunc(that.dataObj.dieselPistolCount / 10000) + '万'
            this.dieselPistolCount1 = that.dataObj.dieselPistolCount
          } else if (that.dataObj.dieselPistolCount > 1000000) {
            this.dieselPistolCount = parseInt(this.$util.fixedFunc(that.dataObj.dieselPistolCount / 1000000)) + '百万'
            this.dieselPistolCount1 = that.dataObj.dieselPistolCount
          } else {
            this.dieselPistolCount = that.dataObj.dieselPistolCount
            this.dieselPistolCount1 = that.dataObj.dieselPistolCount
          }
          if (that.dataObj.gasolinePistolCount > 10000) {
            this.gasolinePistolCount = this.$util.fixedFunc(that.dataObj.gasolinePistolCount / 10000) + '万'
            this.gasolinePistolCount1 = that.dataObj.gasolinePistolCount
          } else if (that.dataObj.gasolinePistolCount > 1000000) {
            this.gasolinePistolCount = parseInt(this.$util.fixedFunc(that.dataObj.gasolinePistolCount / 1000000)) + '百万'
            this.gasolinePistolCount1 = that.dataObj.gasolinePistolCount
          } else {
            this.gasolinePistolCount = that.dataObj.gasolinePistolCount
            this.gasolinePistolCount1 = that.dataObj.gasolinePistolCount
          }
          if (this.dieselPistolCount1) {
            this.dieselPercentage = (this.dieselPistolCount1 / (this.dieselPistolCount1 + this.gasolinePistolCount1)) * 100
          } else {
            this.dieselPercentage = 0
          }
          if (this.gasolinePistolCount1) {
            this.gasolinePercentage = (this.gasolinePistolCount1 / (this.dieselPistolCount1 + this.gasolinePistolCount1)) * 100
          } else {
            this.gasolinePercentage = 0
          }
          this.isLoad = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.bigScreenDetails()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    clearTimeout () {
      if (this.timer) {
        window.clearTimeout(this.timer)
        console.log('clearTimeout')
      }
    }
  },
  beforeDestroy () {
    this.clearTimeout()
  },
  watch: {
    cityCode (val) {
      if (this.cityCode !== '') {
        this.clearTimeout()
        console.log('clearTimeout' + this.cityCode)
        this.bigScreenDetails()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .guns-wrapper {
    height: 100%
    width: pxtovw(500)
    margin-right pxtovw(15)
    // background: url("https://img.gdoil.cn/cockpit/static/images/oilData/qietu_03.png") no-repeat
    background: url("https://img.gdoil.cn/cockpit/static/images/oilData/icon_oildata1.png") no-repeat
    -webkit-background-size: 100% pxtovh(200)
    background-size: 100% pxtovh(200)
    padding pxtovh(55) pxtovw(59) pxtovh(0)
    .item-wrapper {
      margin-bottom pxtovh(20)
      .title {
        text-align left
        font-size: pxtovw(15)
        color: #ffffff
        margin-bottom pxtovh(11.95)
      }
      .content {
        display flex
        /deep/ .el-progress {
          flex 1
          margin-right pxtovw(23.9)
          line-height: vh(20)
          .el-progress-bar__outer {
            background-color: #0D1A56
          }
        }
        span {
          font-size: pxtovw(15)
          color: #ffffff
          line-height vh(17)
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
          background: linear-gradient(90deg,rgba(60,225,227,0.19) 0%, rgba(60,171,226,1) 100%)
        }
      }
    }
  }
</style>
