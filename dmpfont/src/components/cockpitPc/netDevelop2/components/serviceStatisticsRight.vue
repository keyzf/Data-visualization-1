<template>
  <div class="service-right-wrapper">
    <div id="serviceRight" class="service-right"></div>
  </div>
</template>

<script>
export default {
  name: 'serviceStatisticsRight',
  data () {
    return {
      clothes: [], // 干衣
      clothesName: [], // 干衣
      clothesCount: [], // 干衣
      knead: [], // 按摩
      kneadCount: [], // 按摩
      rest: [], // 休息
      restCount: [] // 休息
    }
  },
  created () {
    this.pastTwelveMonthsServiceStatistics()
  },
  methods: {
    drawLine () {
      let _this = this
      let myChart2 = this.$echarts.init(document.getElementById('serviceRight'))
      myChart2.setOption({
        color: ['#ed9d3c', '#4fd7fd'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['干衣', '休息', '按摩'],
          x: 'right', // 居右显示
          padding: [0, 40, 0, 0],
          y: '48',
          textStyle: {
            fontSize: '12',
            color: '#97A8F7'
          },
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6
        },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: _this.clothesName,
            // data: ['2月', '1月', '12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月'],
            axisLabel: {
              textStyle: {
                fontSize: '12',
                color: '#97A8F7'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: { // 设置x轴
              lineStyle: {
                color: '#5C74D1',
                width: 1
              }
            }
          }
        ],
        yAxis: [
          {
            name: '人数(次)',
            type: 'value',
            axisLabel: {
              textStyle: {
                fontSize: '12',
                color: '#97A8F7'
              }
            },
            nameTextStyle: { // y轴标题
              color: '#5C74D1',
              fontSize: 12,
              align: 'right'
            },
            axisLine: { // 设置y轴
              lineStyle: {
                color: '#5C74D1',
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: { // 设置网格线
              show: true,
              lineStyle: {
                color: ['rgba(92,116,209,0.25)'],
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
        series: [
          {
            name: '干衣',
            type: 'line',
            data: _this.clothesCount,
            // data: [3131, 3453, 4534, 1212, 2331, 2321, 1212, 2323, 1233, 2312, 1233, 1223],
            barWidth: 14,
            itemStyle: {
              normal: {
                color: '#F28D32'
              }
            }
          },
          {
            name: '按摩',
            type: 'bar',
            data: _this.kneadCount,
            // data: [3031, 2344, 4531, 4312, 1233, 1231, 2311, 1233, 1231, 2313, 3121, 2312],
            barWidth: 14,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(32,189,255,1)'
                }, {
                  offset: 1,
                  color: 'rgba(84,51,255,1)'
                }])
              }
            }
          },
          {
            name: '休息',
            type: 'bar',
            data: _this.restCount,
            // data: [2312, 3341, 1234, 1243, 1255, 1244, 4121, 4123, 3412, 1231, 3123, 1321],
            barWidth: 14,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(68,168,129,1)'
                }, {
                  offset: 1,
                  color: 'rgba(81,215,248,1)'
                }])
              }
            }
          }
        ]
      })
    },
    pastTwelveMonthsServiceStatistics () {
      let that = this
      that.clothesCount = []
      that.clothesName = []
      that.kneadCount = []
      that.restCount = []
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thNetWorkDevelopmentBS/pastTwelveMonthsServiceStatistics', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          let clothesAll = res.data.clothes
          let kneadAll = res.data.knead
          let restAll = res.data.rest
          clothesAll.filter(item => {
            that.clothesCount.push(item.count)
            that.clothesName.push(item.name.slice(4).replace(/^0/, '') + '月')
          })
          kneadAll.filter(item => {
            that.kneadCount.push(item.count)
          })
          restAll.filter(item => {
            that.restCount.push(item.count)
          })
          this.drawLine()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.pastTwelveMonthsServiceStatistics()
            }, this.$store.state.stationData.timeIntervals)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .service-right-wrapper {
    width: vw(676)
    height: vh(259)
    background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop2/qietu_17.png") no-repeat
    -webkit-background-size: 100% pxtovh(259)
    background-size: 100% pxtovh(259)
    .service-right {
      width: 100%
      height: 100%
    }
  }
</style>
