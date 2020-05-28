<template>
  <div class="employed-wrapper">
    <div id="employed" class="employed"></div>
  </div>
</template>

<script>
export default {
  name: 'selfEmployed',
  props: {
    cityCode: String
  },
  data () {
    return {
      lastYSelfOperatedCount: [],
      theYSelfOperatedName: [],
      theYSelfOperatedCount: []
    }
  },
  created () {
    this.twelvemonthSelfOperatedCompare()
  },
  methods: {
    drawCharts () {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('employed'))
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
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['今年', '上年'],
          icon: 'circle',
          align: 'left',
          right: 15,
          top: 35,
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
          data: _this.theYSelfOperatedName,
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
          name: '销量(万吨)',
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
          splitNumber: 2
        },
        series: [
          {
            name: '今年',
            type: 'line',
            data: _this.theYSelfOperatedCount.slice(0, this.getMyDate()),
            barGap: 0.2,
            label: { /* 柱子上面的数字 */
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '10',
            symbol: 'circle', // 折点设定为实心点
            symbolSize: 5, // 设定实心点的大小
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                // 颜色渐变
                color: 'rgba(129,213,217,1)',
                areaStyle: {
                  type: 'default',
                  // 渐变色实现
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
                    [ {
                      offset: 0,
                      color: 'rgba(129,213,217,0.6)'
                    }, {
                      offset: 1,
                      color: 'rgba(129,213,217,0)'
                    } ])
                }
              }
            }
          },
          {
            color: '#000',
            name: '上年',
            type: 'line',
            data: _this.lastYSelfOperatedCount,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '10', // 宽度设置
            symbol: 'circle', // 折点设定为实心点
            symbolSize: 5, // 设定实心点的大小
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                // 颜色渐变
                color: 'rgba(44,22,203,1)',
                areaStyle: {
                  type: 'default',
                  // 渐变色实现
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
                    [ {
                      offset: 0,
                      color: 'rgba(44,22,203,0.6)'
                    }, {
                      offset: 1,
                      color: 'rgba(44,22,203,0)'
                    } ])
                }
              }
            }
          }
        ]
      })
    },
    getMyDate () {
      var myDate = new Date()
      return myDate.getMonth() + 1
    },
    twelvemonthSelfOperatedCompare () {
      let that = this
      that.lastYSelfOperatedCount = []
      that.theYSelfOperatedName = []
      that.theYSelfOperatedCount = []
      that.$http.get('/webapi/bdview/oilDataBS/twelvemonthSelfOperatedCompare', {
        cityCode: this.cityCode
      }).then(res => {
        if (res.result) {
          let lastYearSelfOperated = res.data.lastYearSelfOperated
          let theYearSelfOperated = res.data.theYearSelfOperated
          lastYearSelfOperated.filter(item => {
            that.lastYSelfOperatedCount.push(item.count)
          })
          theYearSelfOperated.filter(item => {
            that.theYSelfOperatedName.push(item.name)
            that.theYSelfOperatedCount.push(item.count)
          })
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              that.twelvemonthSelfOperatedCompare()
            }, this.$store.state.stationData.timeIntervals)
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
        this.twelvemonthSelfOperatedCompare()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .employed-wrapper {
    height: 100%
    width: pxtovw(574)
    margin-right pxtovw(16)
    // background: url("https://img.gdoil.cn/cockpit/static/images/oilData/切图_07.png") no-repeat
    background: url("https://img.gdoil.cn/cockpit/static/images/oilData/icon_oildata8.png") no-repeat
    -webkit-background-size: 100% pxtovh(205)
    background-size: 100% pxtovh(205)
    .employed {
      width: 100%
      height: 100%
    }
  }
</style>
