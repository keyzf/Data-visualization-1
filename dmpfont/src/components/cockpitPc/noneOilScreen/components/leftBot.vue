<template>
  <div class="wraper">
    <div class="chart-title"><span class="month-dot">.</span>当月 <span class="year-dot">.</span>今年累计</div>
    <div class="wrap">
      <div id="mainSaleChart" class="chart"></div>
    </div>
    <div class="wraps">
      <div id="mainSaleCharts" class="charts"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftBot',
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.theMonthCoreCommoditySales()
  },
  methods: {
    // 当月全口径核心商品销售情况
    theMonthCoreCommoditySales () {
      this.$http.post('/webapi/bdview/notOilDataBS/theMonthCoreCommoditySales').then(res => {
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
      // 当月
      let nameMonthData = []
      let countMonthData = []
      // 降序处理
      json.theMonth.sort((a, b) => {
        return b.count - a.count
      })
      json.theMonth.map((a) => {
        a.count = this.$util.fixedFunc(a.count) // 金额小数点处理
        if (a.name.length > 6) { // 名称过长截取
          let newName = a.name.substring(0, 6)
          nameMonthData.push(newName)
        } else {
          nameMonthData.push(a.name)
        }
        countMonthData.push(a.count)
      })
      // 当年
      let nameYearData = []
      let countYearData = []
      // 降序处理
      json.theYearTotal.sort((a, b) => {
        return b.count - a.count
      })
      json.theYearTotal.map((a) => {
        a.count = this.$util.fixedFunc(a.count) // 金额小数点处理
        if (a.name.length > 6) { // 名称过长截取
          let newName = a.name.substring(0, 6)
          nameYearData.push(newName)
        } else {
          nameYearData.push(a.name)
        }
        countYearData.push(a.count)
      })
      if (nameMonthData.length !== 0) {
        this.drawMonthChart(nameMonthData, countMonthData)
      }
      if (nameYearData.length !== 0) {
        this.drawYearChart(nameYearData, countYearData)
      }
      // 是否启动轮询
      if (this.$store.state.stationData.isInterval) {
        this.timer = setTimeout(() => {
          this.theMonthCoreCommoditySales()
        }, this.$store.state.stationData.timeInterval)
      }
    },
    drawMonthChart (nameMonthData, countMonthData) {
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
      let myChart = this.$echarts.init(document.getElementById('mainSaleChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          position: 'inside',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line'// 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{a} <br/>{b} : {c}'
        },
        grid: {
          top: '30',
          left: '10',
          right: '0',
          bottom: '0',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: nameMonthData,
          axisLabel: { // 设置x轴字体
            inside: false,
            textStyle: {
              align: 'center',
              color: '#97A8F7',
              fontSize: '11'
            },
            interval: 0, // 让文字垂直显示
            formatter (value) {
              /* eslint-disable */
              // 每隔4个字符换行
              let str = value.replace(/[^\x00-\xff]/g, '$&\x01').replace(/.{4}\x01?/g, '$&\n').replace(/\x01/g, '')
              /* eslint-enable */
              return str
              // return value.split('').join('\n')
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.5)',
              width: 1
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
          splitNumber: 5, // 设置y轴刻度线数量
          nameTextStyle: {
            fontSize: '11',
            align: 'right'
          },
          type: 'value',
          axisLabel: { // 设置y轴字体
            show: true,
            formatter: function (params) { // 设置y轴文字一样宽度
              return alignment(params)
            },
            textStyle: {
              color: '#97A8F7',
              fontSize: '10'
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
          },
          axisTick: { // 设置y轴小指针
            show: false
          }
        },
        series: [{
          name: '当月',
          type: 'bar',
          data: countMonthData,
          label: { // 设置柱状图上文字
            show: true,
            position: 'top',
            textStyle: {
              color: '#97A8F7',
              fontSize: '10'
            }
          },
          barWidth: '9',
          itemStyle: {
            normal: {
              barBorderRadius: [5, 5, 0, 0],
              color: { // 图表渐变色设置
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0, // 1渐变从左向右，0渐变从上向下
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#CDE050' // 0% 处的颜色
                }, {
                  offset: 1, color: '#BE7F06' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          }
        }]
      })
    },
    drawYearChart (nameYearData, countYearData) {
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
      let myChart = this.$echarts.init(document.getElementById('mainSaleCharts'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          position: ['30%', '20%'],
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line'// 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{a} <br/>{b} : {c}'
        },
        grid: {
          top: '5',
          left: '10',
          right: '0',
          bottom: '12',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // data: ['卓玛泉', '燃油宝', '长白山', '雀巢咖啡', '红牛', '牙刷', '口香糖', '棒棒糖'],
          data: nameYearData,
          axisLabel: { // 设置x轴字体
            show: false,
            inside: false,
            textStyle: {
              color: 'rgba(92, 116, 209, 0.5)',
              fontSize: '11'
            },
            interval: 1, // 让文字垂直显示
            formatter (value) {
              return value.split('').join('3\n')
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.5)',
              width: 1
            }
          },
          axisTick: { // 设置x轴小指针
            show: false
          }
        },
        yAxis: {
          min: 0,
          boundaryGap: [ 0.1, 0 ], // 网格间距
          splitNumber: 5, // 设置y轴刻度线数量
          nameTextStyle: {
            fontSize: '11'
          },
          type: 'value',
          axisLabel: { // 设置y轴字体
            formatter: function (params) { // 设置y轴文字一样宽度
              return alignment(params)
            },
            textStyle: {
              color: '#97A8F7',
              fontSize: '10'
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
          },
          axisTick: { // 设置y轴小指针
            show: false
          },
          inverse: true // 设置图表方向
        },
        series: [{
          name: '今年累计',
          type: 'bar',
          // data: [553, 450, 412, 300, 300, 300, 300, 289],
          data: countYearData,
          label: { // 设置柱状图上文字
            show: true,
            position: 'bottom',
            textStyle: {
              color: '#97A8F7',
              fontSize: '10'
            }
          },
          barWidth: '9',
          itemStyle: {
            normal: {
              barBorderRadius: [0, 0, 5, 5],
              color: { // 图表渐变色设置
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#44A2F3' // 0% 处的颜色
                }, {
                  offset: 1, color: '#A447C6' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          }
        }]
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
<!-- https://img.gdoil.cn/cockpit -->
<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .wraper {
    width: 100%
    height: 100%
    color: #97a8f7
    background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_left_b1.png") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    position: relative
    .chart-title{
      line-height: vh(20)
      padding-top: vh(60)
      display: flex
      align-items: center
      font-size: vw(11)
      color: #97A8F7
      justify-content: flex-end
      padding-right: vw(50)
      overflow: hidden
      .month-dot{
        width: vw(6)
        height: vw(6)
        background:linear-gradient(180deg,rgba(204,220,77,1),rgba(191,130,8,1));
        border-radius:50%;
        margin-right: vw(4)
      }
      .year-dot{
        width: vw(6);
        height: vw(6);
        background:linear-gradient(180deg,rgba(71,160,242,1),rgba(162,73,199,1));
        border-radius:50%;
        margin: 0 vw(3) 0 vw(30)
      }
    }
    .wrap{
      width: 100%
      height: vh(220)
      margin-bottom: vh(10)
      padding: 0 vw(20) 0 vw(5)
      .chart{
        width: 100%
        height: 100%
        overflow: hidden
      }
    }
    .wraps{
      width: 100%
      height: vh(125)
      padding: 0 vw(20) 0 vw(5)
      .charts{
        width: 100%
        height: 100%
        overflow: hidden
      }
    }
  }
</style>
