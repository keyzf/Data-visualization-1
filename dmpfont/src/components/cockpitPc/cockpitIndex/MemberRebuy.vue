<template>
  <div >
    <section class="member">
      <div id="rebuyChart" class="chart"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MemberRebuy',
  data () {
    return {
      theMonth: [],
      lastMonth: []
    }
  },
  created () {
  },
  mounted () {
    this.getRepeatedlyBuyList()
    // this.drawCharts()
  },
  methods: {
    drawCharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('rebuyChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '会员复购情况',
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: {
        },
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
          show: true,
          type: 'value',
          boundaryGap: [0, 0.01],
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
          },
          splitLine: { // 设置网格线
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: ['2次以下', '2-4次', '4-6次', '6-8次', '8-10次', '10次以上'],
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: '#fff',
              width: 1
            }
          }
        },
        series: [
          {
            color: '#FF9117',
            name: '当月',
            type: 'bar',
            // data: [1, 2, 4, 6, 9, 11],
            data: this.theMonth,
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '8'
          },
          {
            color: '#00FFFF',
            name: '上月',
            type: 'bar',
            // data: [1, 3, 5, 7, 8, 13],
            data: this.lastMonth,
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '8'
          }
        ]
      })
    },
    getRepeatedlyBuyList () {
      this.$http.post('/webapi/cockpit/getRepeatedlyBuyList').then(res => {
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
          theMonthData.push(json[i].lessThanTwice.theMonth)
          lastMonthData.push(json[i].lessThanTwice.lastMonth)
        }
        if (i === 1) {
          theMonthData.push(json[i].twoToFourTimes.theMonth)
          lastMonthData.push(json[i].twoToFourTimes.lastMonth)
        }
        if (i === 2) {
          theMonthData.push(json[i].fourToSixTimes.theMonth)
          lastMonthData.push(json[i].fourToSixTimes.lastMonth)
        }
        if (i === 3) {
          theMonthData.push(json[i].sixToEightTimes.theMonth)
          lastMonthData.push(json[i].sixToEightTimes.lastMonth)
        }
        if (i === 4) {
          theMonthData.push(json[i].eightToTenTimes.theMonth)
          lastMonthData.push(json[i].eightToTenTimes.lastMonth)
        }
        if (i === 5) {
          theMonthData.push(json[i].moreThanTenTimes.theMonth)
          lastMonthData.push(json[i].moreThanTenTimes.lastMonth)
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
