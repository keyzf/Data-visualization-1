<template>
  <div class="day-beans-wrapper">
    <div class="item">
      <div id="dayBeans3" class="diesel-beans"></div>
      <p class="text">产生柴油豆(万个)</p>
    </div>
    <div class="item">
      <div id="dayBeans1" class="diesel-beans"></div>
      <p class="text">兑换非油品(万元)</p>
    </div>
    <div class="item">
      <div id="dayBeans2" class="diesel-beans"></div>
      <p class="text">兑换加油金(万元)</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'centerTop',
  data () {
    return {
      tmNoOil: 0, // 兑换非油品
      tmDieselBean: 0, // 兑换柴油豆
      tdServer: 0 // 兑换服务
    }
  },
  mounted () {
    this.dieselBeanSituation()
    // this.drawCharts1()
    // this.drawCharts2()
    // this.drawCharts3()
  },
  methods: {
    // 本日柴油豆情况
    dieselBeanSituation () {
      this.$http.post('/webapi/bdview/thDataBS/dieselBeanSituation').then(res => {
        if (res.result === true) {
          let rs = res.data.theMonth
          this.tmNoOil = this.$util.fixedFunc(rs.tmNoOil) || 0
          this.tmDieselBean = this.$util.fixedFunc(rs.tmDieselBean) || 0
          this.tdServer = this.$util.fixedFunc(rs.tdServer) || 0

          this.drawCharts1()
          this.drawCharts2()
          this.drawCharts3()
          // 是否启动轮询1
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.dieselBeanSituation()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    drawCharts1 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('dayBeans1'))
      // 绘制图表
      myChart.setOption({
        series: [
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 200, // 仪表盘起始角度,默认 225。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
            endAngle: -20,
            detail: {
              formatter: '{value}',
              offsetCenter: [0, '75%'],
              color: '#FFFFFF', // 文字的颜色,默认 auto。
              fontSize: 18, // 文字的字体大小,默认 15。
              fontWeight: 400
            },
            data: [
              {
                value: this.tmNoOil
              }
            ],
            // 仪表盘轴线(轮廓线)相关配置。
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认true
              lineStyle: {
                color: [[0.2, '#43A0F1'], [0.8, '#43A0F1'], [1, '#43A0F1']],
                width: 2,
                shadowBlur: 16, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
                shadowColor: '#fff'
              }
            },
            // 分割线
            splitLine: {
              show: true,
              length: 6,
              lineStyle: {
                color: 'auto'
              }
            },
            // 刻度线
            axisTick: {
              show: true,
              length: 4,
              splitNumber: 5,
              lineStyle: {
                color: 'auto'
              }
            },
            pointer: {// 仪表盘指针。
              show: true, // 是否显示指针,默认 true。
              length: '65%', // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
              width: 3 // 指针宽度,默认 8。
            },
            itemStyle: {// 仪表盘指针样式。
              color: '#43A0F1' // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            axisLabel: {// 刻度标签。
              show: false
            }
          }
        ]
      })
    },
    drawCharts2 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('dayBeans2'))
      // 绘制图表
      myChart.setOption({
        series: [
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 200, // 仪表盘起始角度,默认 225。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
            endAngle: -20,
            detail: {
              formatter: '{value}',
              offsetCenter: [0, '75%'],
              color: '#FFFFFF', // 文字的颜色,默认 auto。
              fontSize: 18, // 文字的字体大小,默认 15。
              fontWeight: 400
            },
            data: [
              {
                value: this.tdServer
              }
            ],
            // 仪表盘轴线(轮廓线)相关配置。
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认true
              lineStyle: {
                color: [[0.2, '#B59312'], [0.8, '#B59312'], [1, '#B59312']],
                width: 2,
                shadowBlur: 16, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
                shadowColor: '#fff'
              }
            },
            // 分割线
            splitLine: {
              show: true,
              length: 6,
              lineStyle: {
                color: 'auto'
              }
            },
            // 刻度线
            axisTick: {
              show: true,
              length: 4,
              splitNumber: 5,
              lineStyle: {
                color: 'auto'
              }
            },
            pointer: {// 仪表盘指针。
              show: true, // 是否显示指针,默认 true。
              length: '65%', // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
              width: 3 // 指针宽度,默认 8。
            },
            itemStyle: {// 仪表盘指针样式。
              color: '#B59312' // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            axisLabel: {// 刻度标签。
              show: false
            }
          }
        ]
      })
    },
    drawCharts3 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('dayBeans3'))
      // 绘制图表
      myChart.setOption({
        series: [
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 200, // 仪表盘起始角度,默认 225。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
            endAngle: -20,
            detail: {
              formatter: '{value}',
              offsetCenter: [0, '75%'],
              color: '#FFFFFF', // 文字的颜色,默认 auto。
              fontSize: 18, // 文字的字体大小,默认 15。
              fontWeight: 400
            },
            data: [
              {
                value: this.tmDieselBean
              }
            ],
            // 仪表盘轴线(轮廓线)相关配置。
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认true
              lineStyle: {
                color: [[0.2, '#43A680'], [0.8, '#43A680'], [1, '#43A680']],
                width: 2,
                shadowBlur: 16, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
                shadowColor: '#fff'
              }
            },
            // 分割线
            splitLine: {
              show: true,
              length: 6,
              lineStyle: {
                color: 'auto'
              }
            },
            // 刻度线
            axisTick: {
              show: true,
              length: 4,
              splitNumber: 5,
              lineStyle: {
                color: 'auto'
              }
            },
            pointer: {// 仪表盘指针。
              show: true, // 是否显示指针,默认 true。
              length: '65%', // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
              width: 3 // 指针宽度,默认 8。
            },
            itemStyle: {// 仪表盘指针样式。
              color: '#43A680' // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            axisLabel: {// 刻度标签。
              show: false
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .day-beans-wrapper {
    width: 100%
    height: 100%
    background: url("https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/top_bg3.png?1") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    color: #5C74D1
    font-size: vw(15)
    padding: vh(30) vw(15) 0 vw(15)
    display flex
    justify-content center
    align-items center
    justify-content: space-between
    .item {
      background-color: rgba(26,50,180,.14)
      width: vw(140)
      height: vh(139)
      padding vh(8) vw(0)
      display flex
      flex-direction column
      justify-content center
      align-items center
      margin: 0 vw(30)
      .text {
        color:rgba(169,184,255,1);
        font-size: vw(12)
      }
    }
    .item1 {
      margin 0 vw(70)
    }
    .diesel-beans {
      width: 100%
      height: 100%
    }
  }
</style>
