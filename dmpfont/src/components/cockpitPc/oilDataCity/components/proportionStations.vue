<template>
  <div class="stations-wrapper">
    <div class="item">
      <el-progress type="dashboard"
                   :percentage="percentage1"
                   :color="colors1"
                   :show-text="false"
                   :stroke-width="10"
      ></el-progress>
      <div class="bt-content">
        <div class="bt-num" v-if="isLoad">{{oilStationCount}}</div>
        <div>油站站数合计</div>
      </div>
    </div>
    <div class="item item-center">
      <el-progress type="dashboard"
                   :percentage="percentage2"
                   :color="colors2"
                   :show-text="false"
                   :stroke-width="10"
      ></el-progress>
      <div class="bt-content">
        <div class="bt-num" v-if="isLoad">{{dieselStationCount}}</div>
        <div>柴油站数</div>
      </div>
    </div>
    <div class="item">
      <el-progress type="dashboard"
                   :percentage="percentage3"
                   :color="colors3"
                   :show-text="false"
                   :stroke-width="10"
      ></el-progress>
      <div class="bt-content">
        <div class="bt-num" v-if="isLoad">{{gasolineStationCount}}</div>
        <div>汽油站数</div>
      </div>
    </div>
    <!--<div class="item">-->
      <!--<div id="gauge"></div>-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  name: 'proportionStations',
  props: {
    cityCode: String
  },
  data () {
    return {
      dieselStationCount: 0,
      gasolineStationCount: 0,
      oilStationCount: 0,
      // 这里的百分比写死数据，需求是只要后两者不超过第一个就行
      percentage1: 80, // 油站
      percentage2: 50, // 柴油
      percentage3: 60, // 汽油
      colors1: [
        {color: 'rgba(68,162,243,.1)', percentage1: 20},
        {color: 'rgba(68,162,243,.3)', percentage1: 40},
        {color: 'rgba(68,162,243,.5)', percentage1: 60},
        {color: 'rgba(68,162,243,.7)', percentage1: 80},
        {color: 'rgba(68,162,243,1)', percentage1: 100}
      ],
      colors2: [
        {color: 'rgba(68,168,129,.1)', percentage2: 20},
        {color: 'rgba(68,168,129,.3)', percentage2: 40},
        {color: 'rgba(68,168,129,.5)', percentage2: 60},
        {color: 'rgba(68,168,129,.7)', percentage2: 80},
        {color: 'rgba(68,168,129,1)', percentage2: 100}
      ],
      colors3: [
        {color: 'rgba(183,148,17,.1)', percentage3: 20},
        {color: 'rgba(183,148,17,.3)', percentage3: 40},
        {color: 'rgba(183,148,17,.5)', percentage3: 60},
        {color: 'rgba(183,148,17,.7)', percentage3: 80},
        {color: 'rgba(183,148,17,1)', percentage3: 100}
      ],
      isLoad: false
    }
  },
  created () {
    this.oilStationProportion()
  },
  // mounted () {
  //   this.drawCharts()
  // },
  methods: {
    oilStationProportion () {
      // this.isLoad = false
      this.dieselStationCount = 0
      this.gasolineStationCount = 0
      this.oilStationCount = 0
      let that = this
      that.$http.get('/webapi/bdview/oilDataBS/oilStationProportion', {
        cityCode: this.cityCode
      }).then(res => {
        if (res.result) {
          this.dieselStationCount = res.data.dieselStationCount
          this.gasolineStationCount = res.data.gasolineStationCount
          this.oilStationCount = res.data.oilStationCount
          this.isLoad = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.oilStationProportion()
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
    // drawCharts () {
    //   let _this = this
    //   // 基于准备好的dom，初始化echarts实例
    //   let myChart = this.$echarts.init(document.getElementById('gauge'))
    //   // 绘制图表
    //   myChart.setOption({
    //     series: [
    //       {
    //         name: '业务指标',
    //         type: 'gauge',
    //         radius: '70%',
    //         detail: {
    //           show: false // 是否显示详情,默认 true。
    //         },
    //         data: [{value: 50}],
    //         axisTick: { // 刻度(线)样式。
    //           show: false // 是否显示刻度(线),默认 true。
    //         },
    //         pointer: { // 仪表盘指针。
    //           show: false // 是否显示指针,默认 true。
    //         },
    //         splitLine: { // 分隔线样式。
    //           show: false // 是否显示分隔线,默认 true。
    //         },
    //         axisLabel: { // 刻度标签。
    //           show: false // 是否显示标签,默认 true。
    //         },
    //         axisLine: { // 坐标轴线
    //           lineStyle: { // 属性lineStyle控制线条样式
    //             color: [
    //               [0.6, 'rgba(68,162,243,.2)'],
    //               [1, 'rgba(68,162,243,.1)']
    //             ],
    //             width: 8
    //           }
    //         }
    //       }
    //     ]
    //   })
    // }
    clearTimeout () {
      if (this.timer) {
        window.clearTimeout(this.timer)
      }
    }
  },
  beforeDestroy () {
    this.clearTimeout()
  },
  watch: {
    cityCode: {
      handler (newValue, oldValue) {
        this.cityCode = newValue
        this.clearTimeout()
        console.log('clearTimeout' + this.cityCode)
        this.oilStationProportion()
      },
      deep: true
    }
  }
  // watch: {
  //   cityCode (val) {
  //     if (this.cityCode !== '') {
  //       this.clearTimeout()
  //       this.oilStationProportion()
  //     }
  //   }
  // }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .stations-wrapper {
    height: 100%
    width: pxtovw(500)
    // background: url("https://img.gdoil.cn/cockpit/static/images/oilData/切图_03.png") no-repeat
    background: url("https://img.gdoil.cn/cockpit/static/images/oilData/icon_oildata3.png") no-repeat
    -webkit-background-size: 100% pxtovh(200)
    background-size: 100% pxtovh(200)
    display flex
    justify-content center
    align-items center
    padding-top vh(25)
    .item {
      width: vw(122)
      height: vh(131)
      background: rgba(26,50,180,.14);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /deep/ .el-progress--dashboard{
        .el-progress-circle {
          height: vh(70)!important
          width: vw(70)!important
        }
      }
      >>> svg path:first-child {
        stroke: #0D1A56
      }
      .bt-content {
        text-align center
        color: #a9b8ff
        font-size: vw(12)
        .bt-num {
          font-size: vw(18)
          font-family: LcdD;
          font-weight: 400;
          color: rgba(255,255,255,1);
        }
      }
    }
    .item-center {
      margin 0 vw(36)
    }
  }
</style>
