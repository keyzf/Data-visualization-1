<template>
  <div class="customernumber-wrapper">
    <div id="membership" class="membership"></div>
  </div>
</template>

<script>
export default {
  name: 'CustomerNumber',
  data () {
    return {
      customerConsumptionArrName: [],
      customerConsumptionArrCount: [],
      gasolineMemberArrName: [],
      gasolineMemberArrCount: []
    }
  },
  created () {
    this.gasolineMember()
  },
  methods: {
    drawCharts () {
      var that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('membership'))
      // 绘制图表
      myChart.setOption({
        grid: {
          left: '8%',
          right: '3%',
          bottom: '3%',
          containLabel: true
          // top: '25%',
          // bottom: '18%'// 也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          data: ['销量', '会员数'],
          top: '15%',
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: {
          data: that.customerConsumptionArrName,
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
        yAxis: [{
          type: 'value',
          name: '会员数（人）',
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
        {
          type: 'value',
          name: '销量（吨）',
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
        {
          type: 'value',
          gridIndex: 0,
          splitNumber: 8,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
            }
          }
        }
        ],
        series: [{
          name: '会员数 ',
          type: 'line',
          yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: true, // 平滑曲线显示
          showAllSymbol: true, // 显示所有图形。
          symbol: 'circle', // 标记的图形为实心圆
          symbolSize: 6, // 标记的大小
          itemStyle: {
            // 折线拐点标志的样式
            color: '#FA6400'
          },
          lineStyle: {
            color: '#FA6400'
          },
          areaStyle: {
            color: 'rgba(5,140,255, 0.2)'
          },
          data: that.gasolineMemberArrCount
        },
        {
          name: '销量',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: [8, 8, 0, 0],
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FFFFFF'
              },
              {
                offset: 1,
                color: '#10B37E'
              }
              ])
            }
          },
          data: that.customerConsumptionArrCount
        }
        ]
      })
    },
    gasolineMember () {
      let that = this
      that.customerConsumptionArrName = []
      that.customerConsumptionArrCount = []
      this.$http.post('/webapi/bdview/gasolineDataBS/gasolineMember').then(res => {
        if (res.result === true) {
          let customerConsumption = res.data.customerConsumption
          customerConsumption.filter(item => {
            that.customerConsumptionArrName.push((item.name + '').slice(4).replace(/^0/, '') + '月')
            that.customerConsumptionArrCount.push(item.count)
          })
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
  .customernumber-wrapper {
    flex 1
    height: vh(240)
    margin-right vw(10)
    background: url("https://img.gdoil.cn/cockpit/static/images/carMember/center_bg3.png") no-repeat
    -webkit-background-size: 100% vh(240)
    background-size: 100% vh(240)
    .membership {
      width: 100%
      height: 100%
    }
  }
</style>
