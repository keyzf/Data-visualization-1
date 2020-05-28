<template>
  <div class="wraper">
    <div class="wrap">
      <div id="memberAddChart" class="chart"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'center1',
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.lastSixMonthDetail()
  },
  methods: {
    // 近6个月新增会员数
    lastSixMonthDetail () {
      this.$http.post('/webapi/bdview/thDataBS/lastSixMonthDetail').then(res => {
        if (res.result === true) {
          this.changeData(res.data.addMemberCountList)
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
      // 新增会员
      let nameMemberData = []
      let countMemberData = []
      // 降序处理
      // json.sort((a, b) => {
      //   return b.count - a.count
      // })
      // reverse颠倒数组顺序
      json.reverse().map((a) => {
        // 处理月份数
        let newName = parseFloat(a.name.substring(4, 6)) + '月'
        nameMemberData.push(newName)
        countMemberData.push(this.$util.fixedFunc(a.count / 10000))
      })
      this.drawMonthChart(nameMemberData, countMemberData)
      // 是否启动轮询
      if (this.$store.state.stationData.isInterval) {
        this.timer = setTimeout(() => {
          this.lastSixMonthDetail()
        }, this.$store.state.stationData.timeInterval)
      }
    },
    // nameMonthData：x轴名称，countMonthData：y轴数值
    drawMonthChart (nameMemberData, countMemberData) {
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
      let myChart = this.$echarts.init(document.getElementById('memberAddChart'))
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
          left: '5',
          right: '0',
          bottom: '10',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: nameMemberData,
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
        series: [{
          name: '新增会员数',
          type: 'bar',
          data: countMemberData,
          // data: [5553, 4050, 4812, 7300, 5300, 4300],
          symbol: 'none',
          label: { // 设置柱状图上文字
            show: true,
            position: 'top',
            textStyle: {
              color: '#97A8F7',
              fontSize: '10'
            }
          },
          barWidth: '10',
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
                  offset: 0, color: '#44A2F3' // 0% 处的颜色
                }, {
                  offset: 1, color: '#3719EE' // 100% 处的颜色
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

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .wraper {
    width: 100%
    height: 100%
    color: #97a8f7
    background: url("https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/center_bg.png?1") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    position: relative
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
