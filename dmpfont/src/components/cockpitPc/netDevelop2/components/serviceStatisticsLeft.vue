<template>
  <div class="service-left-wrapper">
    <div id="serviceLeft" class="service-left"></div>
  </div>
</template>

<script>
export default {
  name: 'serviceStatisticsLeft',
  data () {
    return {
      water: [],
      waterCount: [],
      waterName: [],
      repast: [], // 就餐
      repastCount: [], // 就餐
      bath: [], // 沐浴
      bathCount: [], // 沐浴
      launder: [], // 洗衣
      launderCount: [] // 洗衣
    }
  },
  created () {
    this.pastTwelveMonthsServiceStatistics()
  },
  methods: {
    drawLine () {
      let _this = this
      let myChart2 = this.$echarts.init(document.getElementById('serviceLeft'))
      myChart2.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['加水', '就餐', '沐浴', '洗衣'],
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
            // data: ['2月', '1月', '12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月'],
            data: _this.waterName,
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
            name: '洗衣',
            type: 'bar',
            data: _this.launderCount,
            // data: [3131, 3453, 4534, 1212, 2331, 2321, 1212, 2323, 1233, 2312, 1233, 1223],
            barWidth: 14,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(245,150,49,1)'
                }, {
                  offset: 1,
                  color: 'rgba(222,61,61,1)'
                }])
              }
            }
          },
          {
            name: '沐浴',
            type: 'bar',
            data: _this.bathCount,
            // data: [3031, 2344, 4531, 4312, 1233, 1231, 2311, 1233, 1231, 2313, 3121, 2312],
            barWidth: 14,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(81,215,248,1)'
                }, {
                  offset: 1,
                  color: 'rgba(68,168,129,1)'
                }])
              }
            }
          },
          {
            name: '就餐',
            type: 'line',
            data: _this.repastCount,
            // data: [2312, 3341, 1234, 1243, 1255, 1244, 4121, 4123, 3412, 1231, 3123, 1321],
            barWidth: 8,
            itemStyle: {
              normal: {
                color: '#1A59EC'
              }
            }
          },
          {
            name: '加水',
            type: 'line',
            data: _this.waterCount,
            // data: [2302, 3041, 1204, 1043, 1205, 1240, 4101, 4103, 3012, 1031, 3103, 1301],
            barWidth: 8,
            itemStyle: {
              normal: {
                color: '#F3E986'
              }
            }
          }
        ]
      })
    },
    pastTwelveMonthsServiceStatistics () {
      let that = this
      that.waterCount = []
      that.waterName = []
      that.repastCount = []
      that.bathCount = []
      that.launderCount = []
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thNetWorkDevelopmentBS/pastTwelveMonthsServiceStatistics', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          let waterAll = res.data.water
          let repastAll = res.data.repast
          let bathAll = res.data.bath
          let launderAll = res.data.launder
          waterAll.filter(item => {
            that.waterCount.push(item.count)
            that.waterName.push(item.name.slice(4).replace(/^0/, '') + '月')
          })
          repastAll.filter(item => {
            that.repastCount.push(item.count)
          })
          bathAll.filter(item => {
            that.bathCount.push(item.count)
          })
          launderAll.filter(item => {
            that.launderCount.push(item.count)
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
  .service-left-wrapper {
    width: vw(676)
    height: vh(259)
    margin-right vw(15)
    background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop2/qietu_17.png") no-repeat
    -webkit-background-size: 100% pxtovh(259)
    background-size: 100% pxtovh(259)
    .service-left {
      width: 100%
      height: 100%
    }
  }
</style>
