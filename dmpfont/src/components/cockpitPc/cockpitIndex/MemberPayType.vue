<template>
  <div >
    <section class="member">
      <div id="payTypeChart" class="chart"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MemberAddOil',
  data () {
    return {
      theMonth: [], // 当月
      lastMonth: [] // 上月
    }
  },
  created () {
  },
  mounted () {
    this.getPayChannelCountList()
    // this.drawCharts()
  },
  methods: {
    drawCharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('payTypeChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '支付方式会员数分析',
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: {},
        legend: {
          data: ['当月', '上月'],
          right: '0',
          textStyle: {
            color: '#fff'
          },
          icon: 'circle', // 这个字段控制形状类型包括circle,rect,roundRect等
          itemWidth: 8, // 设置宽度
          itemHeight: 8 // 设置高度
        },
        grid: {
          left: '10',
          right: '20',
          bottom: '10',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['加油卡', '闪付', '自助终端', '柜台支付'],
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#fff',
              width: 1
            }
          }
        },
        yAxis: {
          name: '人数',
          type: 'value',
          axisLabel: { // 设置y轴字体
            textStyle: {
              color: '#fff'
            }
          },
          nameTextStyle: { // y轴标题
            color: '#fff'
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: '#fff',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: false
          }
        },
        series: [
          {
            color: '#FF00FF',
            name: '当月',
            type: 'bar',
            // data: [1550, 1880, 1360, 1980, 1720, 1130],
            data: this.theMonth,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            // barCategoryGap: '20',
            barWidth: '16'
          },
          {
            color: '#00A0E9',
            name: '上月',
            type: 'bar',
            // data: [1950, 3030, 505, 709, 805, 1030],
            data: this.lastMonth,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '16' // 宽度设置
          }
        ]
      })
    },
    getPayChannelCountList () {
      this.$http.post('/webapi/cockpit/getPayChannelCountList').then(res => {
        if (res.result === true) {
          this.changeData(res.rows)
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
      let theMonthData = []
      let lastMonthData = []
      for (var i = 0; i < json.length; i++) {
        if (i === 0) {
          theMonthData.push(json[i].refuelCard.theMonth)
          lastMonthData.push(json[i].refuelCard.lastMonth)
        }
        if (i === 1) {
          theMonthData.push(json[i].flashPay.theMonth)
          lastMonthData.push(json[i].flashPay.lastMonth)
        }
        if (i === 2) {
          theMonthData.push(json[i].buffetTerminal.theMonth)
          lastMonthData.push(json[i].buffetTerminal.lastMonth)
        }
        if (i === 3) {
          theMonthData.push(json[i].counterPay.theMonth)
          lastMonthData.push(json[i].counterPay.lastMonth)
        }
      }
      this.theMonth = theMonthData
      this.lastMonth = lastMonthData
      this.drawCharts()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../assets/css/mixin.styl'
  .member{
    height: vh(392);
    padding: vh(16) vw(15) 0 vw(15);
    border-left: vw(3) solid #0CEBF8;
    color: #ffffff;
    font-size: vw(14);
    .chart{
      width: 100%
      height: vh(360)
    }
  }
</style>
