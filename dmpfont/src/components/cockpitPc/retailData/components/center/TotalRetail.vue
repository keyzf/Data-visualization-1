<template>
  <div class="total-retail">
    <div id="beanMakeChart" class="chart"></div>
  </div>
</template>

<script>
export default {
  name: 'TotalRetail',
  mounted () {
    this.drawMonthChart()
  },
  methods: {
    drawMonthChart (nameMakeData, countMakeData, countNoOilData, countServeData) {
      var charts = {
        names: ['预计全月', '当月', '同期全月', '日均同比'],
        value: [
          [4553, 3050, 3812, 6300, 4300, 1300],
          [5553, 4050, 4812, 7300, 5300, 2300],
          [5652, 4050, 3812, 7300, 4300, 3300],
          [5553, 4250, 4312, 5300, 3300, 4300]
        ]
      }
      var color = [
        {
          color0: '#C8DA35',
          color1: '#C8DA35'
        },
        {
          color0: '#5149FA',
          color1: '#B838E8'
        },
        {
          color0: '#00BEE6',
          color1: '#3D6BE1'
        },
        {
          color0: '#00BEE6',
          color1: '#3D6BE1'
        }
      ]
      let lineY = []
      let data = {}
      // 循环处理图表数据
      for (var i = 0; i < charts.names.length; i++) {
        var x = i
        if (x > color.length - 1) {
          x = color.length - 1
        }
        if (x === 0 || x === 1) {
          data = {
            name: charts.names[i],
            type: 'bar',
            stack: '总量', // 让柱状图叠起来
            data: charts.value[i],
            label: { // 设置柱状图上文字
              show: false,
              position: 'top',
              textStyle: {
                color: '#97A8F7',
                fontSize: '10'
              }
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [0, 0, 0, 0],
                color: { // 图表渐变色设置
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0, // 1渐变从左向右，0渐变从上向下
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: color[x].color0 // 0% 处的颜色
                  }, {
                    offset: 1, color: color[x].color1 // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }
        } else if (x === 2) {
          data = {
            name: charts.names[x],
            type: 'bar',
            color: color[x].color0,
            smooth: true,
            symbol: 'circle', // 曲线折点设置
            symbolSize: 5,
            showAllSymbol: true,
            barWidth: 10,
            data: charts.value[i],
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          }
        } else if (x === 3) {
          data = {
            name: charts.names[x],
            type: 'line',
            color: color[x].color0,
            symbol: 'circle', // 曲线折点设置
            symbolSize: 5,
            showAllSymbol: true,
            data: charts.value[i]
          }
        }
        lineY.push(data)
      }
      // 上下坐标对齐，y轴预留6位数空间
      function yk (val) {
        return 7 - val.toString().length
      }
      function alignment (val) {
        let val1 = val.toString()
        if (val1 != null) {
          let len = yk(val1)
          return String.fromCharCode(8194).repeat(len) + val1
        }
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('beanMakeChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['预计全月', '当月', '同期全月', '日均同比'],
          textStyle: {
            color: '#97A8F7'
          },
          top: 20,
          right: 'center',
          itemGap: 20,
          icon: 'circle', // 这个字段控制形状类型包括circle,rect,roundRect等
          itemWidth: 6, // 设置宽度
          itemHeight: 6 // 设置高度
        },
        grid: {
          left: '0%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // data: nameMakeData,
          data: ['总量', '汽油', '柴油'],
          axisLabel: { // 设置x轴字体
            inside: false,
            textStyle: {
              align: 'center',
              color: 'rgba(151, 168, 247, 1)',
              fontSize: '14'
            },
            interval: 0 // 让文字垂直显示
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.5)',
              width: 1
            }
          }
        },
        yAxis: [{
          name: '销量(吨)',
          boundaryGap: [ 0.1, 0 ], // 网格间距
          splitNumber: 5, // 设置y轴刻度线数量
          nameTextStyle: {
            fontSize: '12',
            align: 'right',
            color: 'rgba(92, 116, 209, 1)'
          },
          type: 'value',
          axisLabel: { // 设置y轴字体
            show: true,
            formatter: function (params) { // 设置y轴文字一样宽度
              return alignment(params)
            },
            textStyle: {
              color: '#97A8F7',
              fontSize: '14'
            }
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.5)',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: true,
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.25)',
              width: 1,
              type: 'solid'
            }
          }
        }, {
          name: '增减幅(%)',
          min: 0,
          boundaryGap: [ 0.1, 0 ], // 网格间距
          splitNumber: 5, // 设置y轴刻度线数量
          nameTextStyle: {
            fontSize: '12',
            align: 'right',
            color: 'rgba(92, 116, 209, 1)'
          },
          type: 'value',
          axisLabel: { // 设置y轴字体
            show: true,
            formatter: function (params) { // 设置y轴文字一样宽度
              return alignment(params)
            },
            textStyle: {
              color: '#97A8F7',
              fontSize: '14'
            }
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.5)',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: true,
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.25)',
              width: 1,
              type: 'solid'
            }
          }
        }],
        series: lineY
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../../assets/css/mixin.styl'
.total-retail{
  height: vh(270)
  width: vw(461)
  margin-right vw(15)
  background: url("../../../../../../static/images/retail/total-retail.png") no-repeat
  -webkit-background-size: 100% vh(270)
  background-size: 100% vh(270)
  padding:vh(47) vw(15) vh(15) vw(15)
  .chart {
    width: 100%
    height: 100%
  }
}
</style>
