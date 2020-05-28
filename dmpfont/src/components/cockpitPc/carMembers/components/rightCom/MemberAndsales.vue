<template>
  <div class="customernumber-wrapper">
    <div id="memberships" class="membership"></div>
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
      // 上下坐标对齐，y轴预留7位数空间
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
      let myChart = this.$echarts.init(document.getElementById('memberships'))
      // 绘制图表
      myChart.setOption({
        grid: {
          top: '30',
          left: '5',
          right: '10',
          bottom: '10',
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
          data: ['会员数', '销量'],
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
          name: '人数(万人)',
          axisLabel: { // 设置y轴字体
            show: true,
            formatter (params) { // 设置y轴文字一样宽度
              return alignment(params)
            },
            textStyle: {
              fontSize: 12,
              color: '#97A8F7'
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
          },
          splitNumber: 4
        },
        {
          type: 'value',
          name: '销量(吨)',
          axisLabel: { // 设置y轴字体
            textStyle: {
              fontSize: 12,
              color: '#97A8F7'
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
          type: 'bar',
          yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
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
                color: '#3719EE'
              }
              ])
            }
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
  @import '../../../../../assets/css/mixin.styl'
  .customernumber-wrapper {
    flex 1
    height: vh(240)
    padding-top: vh(40)
    background: url("https://img.gdoil.cn/cockpit/static/images/carMember/right_bg3_.png") no-repeat
    -webkit-background-size: 100% vh(240)
    background-size: 100% vh(240)
    .membership {
      width: 98%
      height: 100%
      margin: 0 1%
    }
  }
</style>
