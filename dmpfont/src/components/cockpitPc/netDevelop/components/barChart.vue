<template>
  <div class="bar-wrapper">
    <div id="payTypeChart" class="content"></div>
  </div>
</template>

<script>
export default {
  name: 'barChart',
  data () {
    return {
      theMonth: [], // 当月
      lastMonth: [], // 上月
      nameArr: []
    }
  },
  created () {
    this.deviceUseCountList()
  },
  methods: {
    drawCharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('payTypeChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: {},
        legend: {
          data: ['当月', '上月'],
          center: '0',
          itemHeight: 5,
          textStyle: {
            color: '#8AB5EA',
            fontSize: 18
          }
        },
        grid: {
          left: '10%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.nameArr,
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#97A8F7'
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#5C74D1',
              width: 1
            }
          }
        },
        yAxis: {
          name: '次数(次)',
          type: 'value',
          axisLabel: { // 设置y轴字体
            textStyle: {
              color: '#97A8F7'
            }
          },
          nameTextStyle: { // y轴标题
            color: '#97A8F7',
            fontSize: 14,
            align: 'right'
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: '#5C74D1',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: true,
            lineStyle: {
              color: ['rgba(92,116,209,0.25)'],
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '当月',
            type: 'bar',
            data: this.theMonth,
            barGap: 0,
            label: { /* 柱子上面的数字 */
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '23',
            itemStyle: {
              normal: {
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#44A2F3'
                }, {
                  offset: 1,
                  color: '#3719EE'
                }])
              }
            }
          },
          {
            color: '#44A881',
            name: '上月',
            type: 'bar',
            data: this.lastMonth,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '23', // 宽度设置
            itemStyle: {
              normal: {
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#51D7F8'
                }, {
                  offset: 1,
                  color: '#44A881'
                }])
              }
            }
          }
        ]
      })
    },
    // 设备使用次数
    deviceUseCountList () {
      let that = this
      that.theMonth = []
      that.nameArr = []
      that.lastMonth = []
      this.$http.get('/webapi/bdview/thNetWorkDevelopmentBS/deviceUseCountList').then(res => {
        if (res.result) {
          let monthArr = res.data.theMonth
          let lastMonthArr = res.data.lastMonth
          monthArr.forEach(function (val) {
            that.theMonth.push(val.count)
            that.nameArr.push(val.name)
          })
          lastMonthArr.forEach(function (val) {
            that.lastMonth.push(val.count)
          })
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.deviceUseCountList()
              // }, this.$store.state.stationData.timeInterval)
            }, this.$store.state.stationData.timeIntervals)
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

.bar-wrapper {
  text-align center
  width: 100%
  height: pxtovh(466)
  color: #97a8f7
  background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop/bg3.png") no-repeat
  -webkit-background-size: 100% pxtovh(466)
  background-size: 100% pxtovh(466)
  margin-bottom pxtovh(14)
  padding pxtovh(80) pxtovw(10)
  .content {
    width: 100%
    height: pxtovh(350)
  }
}
</style>
