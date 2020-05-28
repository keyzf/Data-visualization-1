<template>
  <div class="bar-wrapper">
    <div id="payTypeChart" class="content"></div>
  </div>
</template>

<script>
export default {
  name: 'barChart',
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart2 = this.$echarts.init(document.getElementById('payTypeChart'))
      myChart2.setOption({
        color: ['#ed9d3c', '#4fd7fd'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
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
            // data: _this.dieselName,
            data: ['2月', '1月', '12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月'],
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
            name: '人数(次)',
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
            name: '加水',
            type: 'bar',
            // data: _this.gasolineCount,
            data: [3131, 3453, 4534, 1212, 2331, 2321, 1212, 2323, 1233, 2312, 1233, 1223],
            barWidth: 14,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(68,162,243,1)'
                }, {
                  offset: 1,
                  color: 'rgba(55,25,238,1)'
                }]),
                barBorderRadius: [7, 7, 0, 0]
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../../../assets/css/mixin.styl'

.bar-wrapper {
  width: 100%
  height: pxtovh(211)
  color: #97a8f7
  background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop2/qietu_17.png") no-repeat
  -webkit-background-size: 100% pxtovh(211)
  background-size: 100% pxtovh(211)
  margin-bottom vh(15)
  .content {
    width: 100%
    height 100%
  }
}
</style>
