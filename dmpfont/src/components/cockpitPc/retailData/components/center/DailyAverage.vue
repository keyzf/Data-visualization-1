<template>
  <div class="daily-average">
    <div id="dailyAverage" class="daily"></div>
  </div>
</template>

<script>
export default {
  name: 'DailyAverage',
  mounted () {
    this.drawCharts()
  },
  methods: {
    drawCharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('dailyAverage'))
      // 绘制图表
      myChart.setOption({
        title: {
          textStyle: {
            color: '#5C74D1',
            fontWeight: 'normal',
            fontSize: '12'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
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
          data: ['当月日均', '同比幅度', '环比幅度'],
          icon: 'circle',
          align: 'left',
          top: 22,
          itemHeight: 5,
          itemWidth: 6, // 设置宽度
          textStyle: {
            color: '#97A8F7',
            fontSize: 12
          }
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['4月', '3月', '2月', '1月', '12月'],
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
        yAxis: [
          {
            name: '销量(吨)',
            type: 'value',
            axisLabel: { // 设置y轴字体
              textStyle: {
                color: '#97A8F7',
                fontSize: 14
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
          {
            name: '增减幅(%)',
            type: 'value',
            axisLabel: { // 设置y轴字体
              textStyle: {
                color: '#97A8F7',
                fontSize: 14
              }
            },
            nameTextStyle: { // y轴标题
              color: '#5C74D1',
              fontSize: 12,
              align: 'left'
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
          }
        ],
        series: [
          {
            name: '同比幅度',
            type: 'bar',
            yAxisIndex: 0,
            data: [800, 2650, 4520, 1536, 8450],
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
                  color: '#00BEE6'
                }, {
                  offset: 1,
                  color: '#3D6BE1'
                }])
              }
            }
          },
          {
            name: '当月日均',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'circle',
            data: [56, 85, 96, 76, 110],
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '15', // 宽度设置
            // 柱形图圆角，初始化效果
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                // 颜色渐变
                color: '#C8DA35'
              }
            }
          },
          {
            color: '#44A881',
            name: '环比幅度',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'circle',
            data: [88, 75, 15, 86, 92],
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '15', // 宽度设置
            // 柱形图圆角，初始化效果
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                // 颜色渐变
                color: '#B738E8'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../../assets/css/mixin.styl'
.daily-average{
  height: vh(270)
  width: vw(461)
  background: url("../../../../../../static/images/retail/daily-average.png") no-repeat
  -webkit-background-size: 100% vh(270)
  background-size: 100% vh(270)
  padding:vh(47) vw(15) vh(15) vw(15)
  .daily {
    width: 100%
    height: 100%

  }
}
</style>
