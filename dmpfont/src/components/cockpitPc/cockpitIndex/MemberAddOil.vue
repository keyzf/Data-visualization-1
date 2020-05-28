<template>
  <div >
    <section class="member">
      <div id="dayChart" class="chart"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MemberAddOil',
  data () {
    return {
      msg: ''
    }
  },
  props: {
    monthRefuelData: Array,
    monthRefuel: Array
  },
  mounted () {
    this.drawCharts()
  },
  methods: {
    drawCharts () {
      var barColor = ['#00A0E9', '#00FFFF']
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('dayChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '会员月度加油情况',
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: {
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '1%',
          top: '26',
          containLabel: true
        },
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: [
          {
            type: 'category', // y轴显示内容，x轴显示图表
            data: ['当日月均值', '当日销量'],
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: { // 设置y轴
              lineStyle: {
                color: 'rgba(95,82,160,0)',
                width: 0
              }
            }
          },
          {
            axisTick: 'none',
            axisLine: 'none',
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '13'
              }
            },
            data: this.monthRefuelData
            // data: ['10K', '9']
          }
        ],
        series: [
          {
            // color: '#00FFFF', // 柱颜色
            name: '加油情况',
            type: 'bar',
            // data: ['157', '77'],
            data: this.monthRefuel,
            label: {
              show: false, // 是否显示数值
              position: 'right',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '10',
            itemStyle: {
              normal: {
                color: function (params) { // 柱颜色
                  var num = barColor.length
                  return barColor[params.dataIndex % num]
                }
              }
            }
          },
          {
            name: '外框',
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: 3,
                color: 'rgba(143, 130, 188, 1)'
              }
            },
            barGap: '-100%',
            z: 0,
            barWidth: 10,
            data: [1000, 1000]
          }
        ]
      })
    }
  },
  watch: {
    monthRefuel (val) {
      this.drawCharts()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../assets/css/mixin.styl'
  .member{
    height: vh(120);
    padding: vh(10) vw(35) 0 vw(35);
    border-left: vw(3) solid #0CEBF8;
    color: #ffffff;
    font-size: vw(15);
    .chart{
      width: 100%
      height: vh(135)
    }
  }
</style>
