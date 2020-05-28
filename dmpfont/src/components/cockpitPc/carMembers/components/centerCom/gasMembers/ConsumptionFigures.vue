<template>
  <div class="consumption-wrapper">
    <div id="consumption" class="consumption"></div>
  </div>
</template>

<script>
export default {
  name: 'ConsumptionFigures',
  data () {
    return {
      gasolineMemberArrName: [],
      gasolineMemberArrCount: []
    }
  },
  created () {
    this.gasolineMember()
  },
  methods: {
    drawCharts () {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('consumption'))
      // 绘制图表
      myChart.setOption({
        title: {
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          icon: 'circle',
          align: 'left',
          right: 50,
          top: 20,
          itemHeight: 5,
          textStyle: {
            color: '#97A8F7',
            fontSize: 12
          }
        },
        grid: {
          left: '8%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: _this.gasolineMemberArrName,
          // data: ['2月', '1月', '12月', '11月', '10月', '9月'],
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false,
            interval: 0,
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
          name: '销量(吨)',
          type: 'value',
          axisLabel: { // 设置y轴字体
            textStyle: {
              color: '#97A8F7'
            }
          },
          nameTextStyle: { // y轴标题
            color: '#5C74D1',
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
          },
          splitNumber: 4
        },
        series: [
          {
            type: 'bar',
            data: _this.gasolineMemberArrCount,
            // data: [205, 503, 602, 851, 208, 708],
            barGap: 0.2,
            smooth: true, // 设置折线图平滑
            symbol: 'none',
            label: { /* 柱子上面的数字 */
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '10',
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#4AAEFE'
                }, {
                  offset: 1,
                  color: '#90EEFF'
                }])
              }
            }
          }
        ]
      })
    },
    gasolineMember () {
      let that = this
      that.gasolineMemberArrName = []
      that.gasolineMemberArrCount = []
      this.$http.post('/webapi/bdview/gasolineDataBS/gasolineMember').then(res => {
        if (res.result === true) {
          let gasolineMember = res.data.gasolineMember
          gasolineMember.filter(item => {
            that.gasolineMemberArrName.push((item.name + '').slice(4).replace(/^0/, '') + '月')
            that.gasolineMemberArrCount.push(item.count)
          })
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.gasolineMember()
            }, this.$store.state.stationData.timeIntervals)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
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
  @import '../../../../../../assets/css/mixin.styl'
  .consumption-wrapper {
    flex 1
    height: vh(240)
    background: url("https://img.gdoil.cn/cockpit/static/images/carMember/center_bg4.png") no-repeat
    -webkit-background-size: 100% vh(240)
    background-size: 100% vh(240)
    .consumption {
      width: 100%
      height: 100%
    }
  }
</style>
