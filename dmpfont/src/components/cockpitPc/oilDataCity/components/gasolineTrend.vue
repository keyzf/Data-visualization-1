<template>
  <div class="gasoline-wrapper">
    <div id="gasoline1" class="gasoline"></div>
  </div>
</template>

<script>
export default {
  name: 'gasolineTrend',
  props: {
    cityCode: String
  },
  data () {
    return {
      monthDay: '', // 当前月天数
      theMGasolineName: [],
      theMGasolineCount: [],
      lastMGasolineCount: []
    }
  },
  created () {
    this.monthDay = this.$util.getDaysOfMonth(this.$util.isLeapYear(), this.$util.getMonth())
    this.selfOperatedRetailTrends()
  },
  methods: {
    getMyMonth () {
      var myDate = new Date()
      let a = `今年${myDate.getMonth() + 1}月`
      let b = `去年${myDate.getMonth() + 1}月`
      let arr = []
      arr.push(a)
      arr.push(b)
      return arr// 获取当前日(1-31)
    },
    drawCharts () {
      let myDate = new Date()
      let year = myDate.getFullYear()
      let month = myDate.getMonth() + 1
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('gasoline1'))
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
          },
          formatter (params) {
            var result = params[0].name
            params.forEach(function (item) {
              if (item.data) {
                result += '<br/>' + item.seriesName + ' : ' + item.data
              }
            })
            return result
          }
        },
        legend: {
          // data: ['当月', '上月'],
          data: _this.getMyMonth(),
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
          left: '6%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: _this.theMGasolineName,
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false,
            interval: 0,
            textStyle: {
              color: '#97A8F7'
            },
            formatter (value) {
              return value.slice(0, 2) // 显示日期，去掉“号”
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
          splitNumber: 3
        },
        series: [
          {
            name: _this.getMyMonth()[0],
            type: 'line',
            data: _this.theMGasolineCount.slice(0, this.getMyDate() - 1),
            barGap: 0.2,
            // smooth: true, // 设置折线图平滑
            symbol: 'circle', // 折点设定为实心点
            symbolSize: 5, // 设定实心点的大小
            label: { /* 柱子上面的数字 */
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '10',
            // itemStyle: {
            //   normal: {
            //     barBorderRadius: [5, 5, 0, 0],
            //     // 颜色渐变
            //     color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //       offset: 0,
            //       color: '#371CEE'
            //     }, {
            //       offset: 1,
            //       color: '#44A1F3'
            //     }])
            //   }
            // }
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                color: 'rgba(239,215,9,1)',
                areaStyle: {
                  type: 'default',
                  // 渐变色实现
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
                    [ {
                      offset: 0,
                      color: 'rgba(239,215,9,0.6)'
                    }, {
                      offset: 1,
                      color: 'rgba(239,215,9,0)'
                    } ])
                }
              }
            }
          },
          {
            name: _this.getMyMonth()[1],
            type: 'line',
            // smooth: true, // 设置折线图平滑
            symbol: 'circle', // 折点设定为实心点
            symbolSize: 5, // 设定实心点的大小
            data: _this.lastMGasolineCount.slice(0, this.getLastMonthDays(year, month)),
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '10', // 宽度设置
            // 柱形图圆角，初始化效果
            // itemStyle: {
            //   normal: {
            //     barBorderRadius: [5, 5, 0, 0],
            //     // 颜色渐变
            //     color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //       offset: 0,
            //       color: '#FFF99D'
            //     }, {
            //       offset: 1,
            //       color: '#B79411'
            //     }])
            //   }
            // }
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                color: 'rgba(20,74,180,1)',
                areaStyle: {
                  type: 'default',
                  // 渐变色实现
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
                    [ {
                      offset: 0,
                      color: 'rgba(20,74,180,0.6)'
                    }, {
                      offset: 1,
                      color: 'rgba(20,74,180,0)'
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
      return myDate.getDate()// 获取当前日(1-31)
    },
    getLastMonthDays (year, month) {
      var dayCount
      let now = new Date(year, month, 0)
      dayCount = now.getDate()
      return dayCount
    },
    selfOperatedRetailTrends () {
      let that = this
      that.lastMGasolineCount = []
      that.theMGasolineName = []
      that.theMGasolineCount = []
      that.$http.get('/webapi/bdview/oilDataBS/selfOperatedRetailTrends', {
        cityCode: this.cityCode
      }).then(res => {
        if (res.result) {
          let lastMonthGasoline = res.data.lastMonthGasoline
          let theMonthGasoline = res.data.theMonthGasoline
          lastMonthGasoline.filter(item => {
            that.lastMGasolineCount.push(item.count)
          })
          theMonthGasoline.filter(item => {
            if (item.name <= this.monthDay) {
              that.theMGasolineName.push(item.name + '号')
              that.theMGasolineCount.push(item.count)
            }
          })
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.selfOperatedRetailTrends()
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
    cityCode: {
      handler (newValue, oldValue) {
        this.cityCode = newValue
        this.clearTimeout()
        console.log('clearTimeout' + this.cityCode)
        this.selfOperatedRetailTrends()
      },
      deep: true
    }
  }
  // watch: {
  //   cityCode (val) {
  //     if (this.cityCode !== '') {
  //       this.clearTimeout()
  //       this.selfOperatedRetailTrends()
  //       console.log('clearTimeout' + this.timer)
  //     }
  //   }
  // }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .gasoline-wrapper {
    height: pxtovh(270)
    width: pxtovw(934)
    margin-right pxtovw(18)
    // background: url("https://img.gdoil.cn/cockpit/static/images/oilData/_06.png") no-repeat
    background: url("https://img.gdoil.cn/cockpit/static/images/oilData/icon_oildata4.png") no-repeat
    -webkit-background-size: 100% pxtovh(270)
    background-size: 100% pxtovh(270)
    .gasoline {
      width: 100%
      height: 100%
    }
  }
</style>
