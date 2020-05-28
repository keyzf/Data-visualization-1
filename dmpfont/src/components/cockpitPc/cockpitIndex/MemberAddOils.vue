<template>
  <div >
    <section class="member">
      <div id="dayCharts" class="chart"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MemberAddOil',
  data () {
    return {
      monthList: [] // 最近三个月
    }
  },
  props: {
    monthRefuelDatas: Array,
    monthRefuels: Array
  },
  created () {
    var date = new Date()
    this.getDateRange(date, 30, 3, true)
  },
  mounted () {
    this.drawCharts()
  },
  methods: {
    drawCharts () {
      var barColor = ['#00A0E9', '#00FFFF', '#FF9117']
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('dayCharts'))
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
          top: '35',
          containLabel: true
        },
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: [
          {
            type: 'category', // y轴显示内容，x轴显示图表
            // data: ['2019-12', '2020-01', '2020-02'],
            data: this.monthList,
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
                fontSize: '15'
              }
            },
            data: this.monthRefuelDatas
            // data: ['10K', '9']
          }
        ],
        series: [
          {
            // color: '#FF9117', // 柱颜色
            name: '加油情况',
            type: 'bar',
            // data: ['157', '77'],
            data: this.monthRefuels,
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
            data: [1000, 1000, 1000]
          }
        ]
      })
    },
    // 获取最近三个月，dateNow当前时间，intervalDays时间天数,monthNum获取月份个数，bolPastTime过去还是未来月份
    getDateRange (dateNow, intervalDays, monthNum, bolPastTime) {
      let oneDayTime = 24 * 60 * 60 * 1000
      let list = []
      let lastDay

      if (bolPastTime === true) {
        for (var i = monthNum - 1; i >= 0; i--) {
          lastDay = new Date(dateNow.getTime() - intervalDays * i * oneDayTime)
          list.push(this.formateDate(lastDay))
        }
      } else {
        for (var j = monthNum - 1; j >= 0; j--) {
          lastDay = new Date(dateNow.getTime() + intervalDays * j * oneDayTime)
          list.push(this.formateDate(lastDay))
        }
      }
      this.monthList = list
      return list
    },
    formateDate (time) {
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()

      if (month < 10) {
        month = '0' + month
      }

      if (day < 10) {
        day = '0' + day
      }
      return year + '-' + month
      // return year + '-' + month + '-' + day + ''
    }
  },
  watch: {
    monthRefuels (val) {
      this.drawCharts()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../assets/css/mixin.styl'
  .member{
    height: vh(184);
    padding: vh(16) vw(35) 0 vw(35);
    border-left: vw(3) solid #0CEBF8;
    color: #ffffff;
    font-size: vw(15);
    .chart{
      width: 100%
      height: vh(180)
    }
  }
</style>
