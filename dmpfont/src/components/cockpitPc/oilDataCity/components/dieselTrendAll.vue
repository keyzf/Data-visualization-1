<template>
  <div class="diesel-all-wrapper">
    <div id="dieselAll1" class="diesel-all"></div>
  </div>
</template>

<script>
export default {
  name: 'dieselTrendAll',
  props: {
    cityCode: String
  },
  data () {
    return {
      monthDay: '', // 当前月天数
      theMDieselNameAll: [],
      theMDieselCountAll: [],
      lastMDieselCountAll: []
    }
  },
  created () {
    this.monthDay = this.$util.getDaysOfMonth(this.$util.isLeapYear(), this.$util.getMonth())
    this.fullCaliberRetailTrends()
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
      var myDate = new Date()
      let year = myDate.getFullYear()
      let month = myDate.getMonth() + 1
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('dieselAll1'))
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
          data: _this.theMDieselNameAll,
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
          splitNumber: 5
        },
        series: [
          {
            name: _this.getMyMonth()[0],
            type: 'line',
            symbol: 'circle', // 折点设定为实心点
            symbolSize: 5, // 设定实心点的大小
            data: _this.theMDieselCountAll.slice(0, this.getMyDate() - 1),
            barGap: 0.2,
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
            //       color: '#44A1F3'
            //     }, {
            //       offset: 1,
            //       color: '#371CEE'
            //     }])
            //   }
            // }
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                color: 'rgba(81,215,248,1)',
                areaStyle: {
                  type: 'default',
                  // 渐变色实现
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, // 变化度
                    [ {
                      offset: 0,
                      color: 'rgba(81,215,248,0.6)'
                    }, {
                      offset: 1,
                      color: 'rgba(81,215,248,0)'
                    } ])
                }
              }
            }
          },
          {
            name: _this.getMyMonth()[1],
            type: 'line',
            symbol: 'circle', // 折点设定为实心点
            symbolSize: 5, // 设定实心点的大小
            data: _this.lastMDieselCountAll.slice(0, this.getLastMonthDays(year, month)),
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
            //       color: '#51D7F8'
            //     }, {
            //       offset: 1,
            //       color: '#44A881'
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
                      color: 'rgba(20,74,180,0.7)'
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
    fullCaliberRetailTrends () {
      let that = this
      that.lastMDieselCountAll = []
      that.theMDieselNameAll = []
      that.theMDieselCountAll = []
      that.$http.get('/webapi/bdview/oilDataBS/fullCaliberRetailTrends', {
        cityCode: this.cityCode
      }).then(res => {
        if (res.result) {
          let lastMonthDieselAll = res.data.lastMonthDiesel
          let theMonthDieselAll = res.data.theMonthDiesel
          lastMonthDieselAll.filter(item => {
            that.lastMDieselCountAll.push(item.count)
          })
          theMonthDieselAll.filter(item => {
            if (item.name <= this.monthDay) {
              that.theMDieselNameAll.push(item.name + '号')
              that.theMDieselCountAll.push(item.count)
            }
          })
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.fullCaliberRetailTrends()
            }, this.$store.state.stationData.timeIntervals)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        // that.$alert('温馨提示<br>网络异常，请检查网络')
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
        this.fullCaliberRetailTrends()
      },
      deep: true
    }
  }
  // watch: {
  //   cityCode (val) {
  //     if (this.cityCode !== '') {
  //       this.clearTimeout()
  //       this.fullCaliberRetailTrends()
  //     }
  //   }
  // }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .diesel-all-wrapper {
    height: pxtovh(270)
    width: pxtovw(934)
    // background: url("https://img.gdoil.cn/cockpit/static/images/oilData/_13.png") no-repeat
    background: url("https://img.gdoil.cn/cockpit/static/images/oilData/icon_oildata7.png") no-repeat
    -webkit-background-size: 100% pxtovh(270)
    background-size: 100% pxtovh(270)
    .diesel-all {
      width: 100%
      height: 100%
    }
  }
</style>
