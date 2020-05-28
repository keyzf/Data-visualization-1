<template>
  <div class="effective-wrapper">
    <div id="effective" class="effective"></div>
  </div>
</template>

<script>
export default {
  name: 'effectiveMember',
  data () {
    return {
      notOil: [],
      oil: [],
      notOilName: [], // 非油日历天数
      notOilCount: [], // 非油数量
      oilCount: [] // 油品数量
    }
  },
  created () {
    this.theMonthActiveMemberTrend()
  },
  methods: {
    // 图表
    drawCharts () {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('effective'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['油品', '非油品', '线上会员'],
          x: 'right', // 居右显示
          padding: [0, 40, 0, 0],
          y: '20',
          textStyle: {
            fontSize: '12',
            color: '#97A8F7'
          },
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: _this.notOilName,
          axisTick: {
            show: false
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#5C74D1',
              width: 1
            }
          }
        },
        yAxis: {
          name: '人数(人)',
          type: 'value',
          nameTextStyle: { // y轴标题
            color: '#5C74D1',
            fontSize: 12,
            align: 'right'
          },
          axisTick: {
            show: false
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
          }
        },
        series: [
          {
            name: '油品',
            type: 'line',
            stack: '总量',
            smooth: true, // 设置折线图平滑
            areaStyle: {},
            symbol: 'none',
            data: _this.oilCount,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  // 渐变色实现
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
                    // 三种由深及浅的颜色
                    [ {
                      offset: 0,
                      color: 'rgba(183,148,17,1)'
                    }, {
                      offset: 1,
                      color: 'rgba(255,249,157,.1)'
                    } ])
                }
              }
            }
          },
          {
            name: '非油品',
            type: 'line',
            stack: '总量',
            smooth: true, // 设置折线图平滑
            areaStyle: {},
            symbol: 'none',
            data: _this.notOilCount,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  // 渐变色实现
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
                    [ {
                      offset: 0,
                      color: 'rgba(15,158,165,1)'
                    }, {
                      offset: 1,
                      color: 'rgba(200,253,255,.1)'
                    } ])
                }
              }
            }
          },
          {
            name: '线上会员',
            type: 'line',
            stack: '总量',
            smooth: true, // 设置折线图平滑
            areaStyle: {},
            symbol: 'none',
            data: _this.onLineCount,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  // 渐变色实现
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
                    [ {
                      offset: 0,
                      color: 'rgba(8,64,193,1)'
                    }, {
                      offset: 1,
                      color: 'rgba(29,94,243,.1)'
                    } ])
                }
              }
            }
          }
        ],
        color: ['#BEA135', '#81D5D9', '#1D5EF3']
      })
    },
    // 有效会员走势
    theMonthActiveMemberTrend () {
      let that = this
      that.notOilName = []
      that.notOilCount = []
      that.oilCount = []
      that.$http.get('/webapi/bdview/customerDataAnalysisBS/theMonthActiveMemberTrend').then(res => {
        if (res.result) {
          this.notOil = res.data.notOil
          this.oil = res.data.oil
          this.notOil.filter(item => {
            that.notOilName.push(item.name)
            that.notOilCount.push(item.count)
          })
          this.oil.filter(item => {
            that.oilCount.push(item.count)
          })
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.theMonthActiveMemberTrend()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
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
  @import '../../../../assets/css/mixin.styl'
  .effective-wrapper {
    width: 100%
    height: pxtovh(295)
    margin-bottom pxtovh(20)
    background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg_06.png") no-repeat
    -webkit-background-size: 100% pxtovh(295)
    background-size: 100% pxtovh(295)
    .effective {
      width: 100%
      height: 100%
    }
  }
</style>
