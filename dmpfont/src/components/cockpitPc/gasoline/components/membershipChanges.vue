<template>
  <div class="membership-wrapper">
    <div id="membership" class="membership"></div>
  </div>
</template>

<script>
export default {
  name: 'membershipChanges',
  data () {
    return {
      loyalMemberListArrName: [],
      loyalMemberListArrCount: []
    }
  },
  created () {
    this.lastSixMonthDetail()
  },
  methods: {
    drawCharts () {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('membership'))
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
          left: '6%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: _this.loyalMemberListArrName,
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
          name: '人数(万人)',
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
          }
        },
        series: [
          {
            type: 'bar',
            data: _this.loyalMemberListArrCount,
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
                  color: '#C8DA35'
                }, {
                  offset: 1,
                  color: '#C47900'
                }])
              }
            }
          }
        ]
      })
    },
    // 全省忠诚会员变化情况
    lastSixMonthDetail () {
      let that = this
      that.loyalMemberListArrName = []
      that.loyalMemberListArrCount = []
      this.$http.get('/webapi/bdview/gasolineDataBS/lastSixMonthDetail').then(res => {
        if (res.result) {
          let loyalMemberList = res.data.loyalMemberList
          loyalMemberList.filter(item => {
            that.loyalMemberListArrName.push(item.name.slice(4).replace(/^0/, '') + '月')
            that.loyalMemberListArrCount.push(item.count)
          })
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.lastSixMonthDetail()
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
  .membership-wrapper {
    height: vh(315)
    width: vw(604)
    margin-right vw(15)
    background url("https://img.gdoil.cn/cockpit/static/images/gasoline/qie_09.png") no-repeat
    -webkit-background-size: 100% vh(315)
    background-size: 100% vh(315)
    .membership {
      width: 100%
      height: 100%
    }
  }
</style>
