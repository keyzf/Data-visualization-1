changeData<template>
  <div class="wraper">
    <div class="wrap">
      <div id="memberSaleCharts" class="chart"></div>
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
      monthDay: '' // 当前月天数
    }
  },
  mounted () {
    this.lastSixMonthDetail()
  },
  methods: {
    // 近6个月会员消费量
    lastSixMonthDetail () {
      this.$http.post('/webapi/bdview/thDataBS/lastSixMonthDetail').then(res => {
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
      let nameConsumData = []
      let counConsumData = []
      // 消费会员
      json.memberConsumption.map((a) => {
        // 处理月份数
        let newName = parseFloat(a.name.substring(4, 6)) + '月'
        nameConsumData.push(newName)
        counConsumData.push(this.$util.fixedFunc(a.count / 10000))
      })
      // 有消费
      let nameConsumHaveData = []
      let countConsumHaveData = []
      json.haveConsumptionList.map((a) => {
        let newName = parseFloat(a.name.substring(4, 6)) + '月'
        nameConsumHaveData.push(newName)
        countConsumHaveData.push(this.$util.fixedFunc(a.count / 10000))
      })
      // 无消费
      let nameConsumNoData = []
      let countConsumNoData = []
      json.noConsumptionList.map((a) => {
        let newName = parseFloat(a.name.substring(4, 6)) + '月'
        nameConsumNoData.push(newName)
        countConsumNoData.push(this.$util.fixedFunc(a.count / 10000))
      })
      if (nameConsumData.length !== 0) {
        this.drawChart(nameConsumHaveData, counConsumData, countConsumHaveData, countConsumNoData)
      }
      // 是否启动轮询1
      if (this.$store.state.stationData.isInterval) {
        this.timer = setTimeout(() => {
          this.lastSixMonthDetail()
        }, this.$store.state.stationData.timeInterval)
      }
    },
    drawChart (nameConsumHaveData, counConsumData, countConsumHaveData, countConsumNoData) {
      var charts = {
        names: ['有消费', '无消费'], // 消费会员
        lineX: nameConsumHaveData, // x轴数据
        value: [ // 今年和去年数据
          // counConsumData,
          countConsumHaveData,
          countConsumNoData
        ]
      }
      var color = [
        // {
        //   color0: '#C8DA35',
        //   color1: '#C8DA35'
        // },
        {
          color0: '#5149FA',
          color1: '#B838E8'
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
        // if (x === 0) {
        //   data = {
        //     name: charts.names[i],
        //     type: 'line',
        //     color: color[x].color0,
        //     smooth: true,
        //     symbol: 'circle', // 曲线折点设置
        //     symbolSize: 5,
        //     showAllSymbol: true,
        //     data: charts.value[i]
        //   }
        // } else {
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
          barWidth: '10',
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
        // }
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
      let myChart = this.$echarts.init(document.getElementById('memberSaleCharts'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['有消费', '无消费'], // 消费会员
          right: '0',
          textStyle: {
            color: '#97A8F7'
          },
          itemGap: 20,
          icon: 'circle', // 这个字段控制形状类型包括circle,rect,roundRect等
          itemWidth: 6, // 设置宽度
          itemHeight: 6 // 设置高度
        },
        grid: {
          top: '30',
          left: '5',
          right: '0',
          bottom: '10',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: nameConsumHaveData,
          // data: ['2月', '1月', '12月', '11月', '10月', '9月'],
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
        yAxis: {
          name: '人数(万人)',
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
    background: url("https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/center_bg2.png?1") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    positin: relative
    .wrap{
      width: 100%
      height: 100%
      padding: vh(48) vw(30) 0 vw(5)
      .chart{
        width: 100%
        height: 100%
      }
    }
  }
</style>
