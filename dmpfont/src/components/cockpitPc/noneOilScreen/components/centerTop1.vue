<template>
  <div class="wraper">
    <div class="wrap">
      <div id="saleLineCharts" class="chart"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'centerTop1',
  data () {
    return {
      timer: '',
      nowDay: '', // 当前日期
      monthDay: '', // 当前月天数
      month: '' // 当前月
    }
  },
  mounted () {
    this.nowDay = this.$util.getDate()
    this.monthDay = this.$util.getDaysOfMonth(this.$util.isLeapYear(), this.$util.getMonth())
    this.month = this.$util.getMonth()
    this.basicCategoryDailyTurnover()
  },
  methods: {
    // 基础品类日营业额
    basicCategoryDailyTurnover () {
      this.$http.post('/webapi/bdview/notOilDataBS/basicCategoryDailyTurnover').then(res => {
        if (res.result === true) {
          this.changeData(res.data)
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理数据
    changeData (json) {
      // 今年
      let nameTheYearData = []
      let countTheYearData = []
      json.theYearList.map((a) => {
        // 处理未到的销售日期数据为空
        if (a.name > this.nowDay) {
          nameTheYearData.push(a.name + '号')
        } else {
          nameTheYearData.push(a.name + '号')
          countTheYearData.push(this.$util.fixedFunc(a.count))
        }
      })
      // 去年
      let nameLastYearData = []
      let countLastYearData = []
      json.lastYearList.map((a) => {
        // 处理每月当中多余的日期数据为空，如2月有29天，29往后的数据处理为空
        if (a.name <= this.monthDay) {
          nameLastYearData.push(a.name + '号')
          countLastYearData.push(this.$util.fixedFunc(a.count))
        }
      })
      this.drawChart(nameLastYearData, countTheYearData, countLastYearData)
      // 是否启动轮询1
      if (this.$store.state.stationData.isInterval) {
        this.timer = setTimeout(() => {
          this.basicCategoryDailyTurnover()
        }, this.$store.state.stationData.timeInterval)
      }
    },
    drawChart (nameLastYearData, countTheYearData, countLastYearData) {
      // 上下坐标对齐，y轴预留6位数空间
      function yk (val) {
        return 8 - val.toString().length
      }
      function alignment (val) {
        let val1 = val.toString()
        if (val1 != null) {
          let len = yk(val1)
          return String.fromCharCode(8194).repeat(len) + val1
        }
      }
      var charts = {
        names: ['今年' + this.month + '月', '去年' + this.month + '月'],
        lineX: nameLastYearData, // x轴数据
        value: [ // 今年和去年数据
          countTheYearData,
          countLastYearData
        ]
        // lineX: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
        // value: [
        //   [550051, 558, 533, 534, 555, 536, 517, 528, 559, 551, 531, 542, 553, 524, 565, 536, 527, 528, 529, 530, 551, 531, 552, 553, 524, 565, 536, 527, 528, 529, 765],
        //   [765000, 745, 780, 792, 730, 780, 792, 780, 750, 753, 752, 728, 725, 745, 765, 725, 768, 708, 753, 798, 780, 792, 780, 750, 753, 752, 728, 725, 755, 765, 965]
        // ]
      }
      var color = ['rgba(183, 148, 17', 'rgba(29, 94, 243']
      var lineY = []

      for (var i = 0; i < charts.names.length; i++) { // 循环处理图表数据
        var x = i
        if (x > color.length - 1) {
          x = color.length - 1
        }
        var data = {
          name: charts.names[i],
          type: 'line',
          color: color[x] + ')',
          smooth: true,
          areaStyle: {
            normal: {
              color: { // 折线阴影渐变
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: color[x] + ', 0.5)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: color[x] + ', 0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          symbol: 'none', // 取消折点圆圈
          symbolSize: 5,
          data: charts.value[i]
        }
        lineY.push(data)
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('saleLineCharts'))
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#000530',
        tooltip: {
          // position: ['45%', '20%'],
          trigger: 'axis'
        },
        legend: {
          data: charts.names,
          textStyle: {
            fontSize: 12,
            color: 'rgba(151, 168, 247, 1)'
          },
          itemGap: 50,
          right: 40,
          top: 0,
          icon: 'circle', // 这个字段控制形状类型包括circle,rect,roundRect等
          itemWidth: 6, // 设置宽度
          itemHeight: 6, // 设置高度
          align: 'left'
        },
        grid: { // 图表间距
          top: '30',
          left: '5',
          right: '10',
          bottom: '10',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: charts.lineX,
          axisLabel: { // 设置x轴文字
            inside: false,
            interval: 0,
            textStyle: {
              fontSize: 12,
              color: '#97A8F7'
            },
            formatter (value) {
              return value.slice(0, 2) // 显示日期，去掉“号”
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.5)'
            }
          },
          axisTick: { // 设置x轴小指针
            show: false
          }
        },
        yAxis: {
          name: '金额(万元)',
          min: 0,
          boundaryGap: [ 0.1, 0 ], // 网格间距
          splitNumber: 4, // 设置y轴刻度线数量
          axisLabel: { // 设置y轴文字
            show: true,
            formatter (params) { // 设置y轴文字一样宽度
              return alignment(params)
            },
            // formatter: '{value}',
            textStyle: {
              fontSize: 12,
              color: '#97A8F7'
            }
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.5)'
            }
          },
          splitLine: { // 设置网格线
            show: true,
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.25)',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: { // 设置x轴小指针
            show: false
          },
          nameTextStyle: { // 设置y轴标题
            color: '#5C74D1',
            fontSize: 12,
            align: 'right'
          }
        },
        series: lineY
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
  .wraper {
    width: 100%
    height: 100%
    color: #97a8f7
    background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_center_t.png") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    positin: relative
    .wrap{
      width: 98%
      margin: 0 1%
      padding: vh(40) vw(30) vh(0) vw(1)
      .chart{
        width: 100%
        height: vh(200)
      }
    }
  }
</style>
