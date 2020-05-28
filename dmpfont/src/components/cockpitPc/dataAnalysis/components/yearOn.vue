<template>
  <div class="year-on-wrapper">
    <div id="oilSale" class="oil-sale"></div>
  </div>
</template>

<script>
export default {
  name: 'yearOn',
  data () {
    return {
      theYearDiese: [], // 柴油
      dieselName: [],
      dieselCount: [],
      dieselCountLast: [],
      theYearGasoline: [], // 汽油
      gasolineName: [],
      gasolineCount: [],
      gasolineCountLast: []
    }
  },
  mounted () {
    this.theYearOillSales()
  },
  methods: {
    drawLine () {
      let _this = this
      let myChart2 = this.$echarts.init(document.getElementById('oilSale'))
      myChart2.setOption({
        color: ['#ed9d3c', '#4fd7fd'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['今年汽油', '今年柴油', '去年汽油', '去年柴油'],
          x: 'right', // 居右显示
          padding: [0, 40, 0, 0],
          y: '20',
          textStyle: {
            fontSize: '12',
            color: '#97A8F7'
          },
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6
        },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: _this.dieselName,
            axisLabel: {
              textStyle: {
                fontSize: '12',
                color: '#97A8F7'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: { // 设置x轴
              lineStyle: {
                color: '#5C74D1',
                width: 1
              }
            }
          }
        ],
        yAxis: [
          {
            name: '销量(吨)',
            type: 'value',
            axisLabel: {
              textStyle: {
                fontSize: '12',
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
            axisTick: {
              show: false
            },
            splitLine: { // 设置网格线
              show: true,
              lineStyle: {
                color: ['rgba(92,116,209,0.25)'],
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
        series: [
          {
            name: '今年汽油',
            type: 'bar',
            data: _this.gasolineCount,
            barWidth: 14,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(245,150,49,1)'
                }, {
                  offset: 1,
                  color: 'rgba(222,61,61,1)'
                }])
              }
            }
          },
          {
            name: '今年柴油',
            type: 'bar',
            data: _this.dieselCount,
            barWidth: 14,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(81,215,248,1)'
                }, {
                  offset: 1,
                  color: 'rgba(68,168,129,1)'
                }])
              }
            }
          },
          {
            name: '去年汽油',
            type: 'line',
            data: _this.dieselCountLast,
            barWidth: 8,
            itemStyle: {
              normal: {
                color: '#1A59EC'
              }
            }
          },
          {
            name: '去年柴油',
            type: 'line',
            data: _this.gasolineCountLast,
            barWidth: 8,
            itemStyle: {
              normal: {
                color: '#F3E986'
              }
            }
          }
        ]
      })
    },
    // 今年油品销量
    theYearOillSales () {
      this.theYearDiese = [] // 柴油
      this.dieselName = []
      this.dieselCount = []
      this.dieselCountLast = []
      this.theYearGasoline = [] // 汽油
      this.gasolineName = []
      this.gasolineCount = []
      this.gasolineCountLast = []
      let that = this
      that.$http.get('/webapi/bdview/customerDataAnalysisBS/theYearOillSales').then(res => {
        if (res.result) {
          this.theYearDiese = res.data.theYearDiese
          this.theYearGasoline = res.data.theYearGasoline
          this.lastYearDiese = res.data.lastYearDiese
          this.lastYearGasoline = res.data.lastYearGasoline
          this.theYearDiese.filter(item => {
            that.dieselName.push(item.name)
            that.dieselCount.push(item.count)
          })
          this.theYearGasoline.filter(item => {
            that.gasolineCount.push(item.count)
          })
          this.lastYearDiese.filter(item => {
            that.dieselCountLast.push(item.count)
          })
          this.lastYearGasoline.filter(item => {
            that.gasolineCountLast.push(item.count)
          })
          this.drawLine()
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .year-on-wrapper {
    width: 100%
    height: pxtovh(295)
    margin-bottom pxtovh(15)
    background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg_14.png") no-repeat
    -webkit-background-size: 100% pxtovh(295)
    background-size: 100% pxtovh(295)
    .oil-sale {
      width: 100%
      height: 100%
    }
  }
</style>
