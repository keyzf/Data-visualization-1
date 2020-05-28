<template>
  <div class="integral-wrapper">
    <div id="doughnutChart" class="doughnut-chart"></div>
  </div>
</template>

<script>
export default {
  name: 'UsingIntegral',
  data () {
    return {
      allPoints: '', // 全部积分兑换
      offlineExchange: '',
      onlineExchange: ''
    }
  },
  created () {
    this.integralCondition()
  },
  methods: {
    integralCondition () {
      this.$http.post('/webapi/bdview/gasolineDataBS/integralCondition').then(res => {
        if (res.result === true) {
          this.allPoints = parseInt(res.data.allPoints / 10000)
          this.offlineExchange = parseInt(res.data.offlineExchange / 10000)
          this.onlineExchange = parseInt(res.data.onlineExchange / 10000)
          console.log('this.onlineExchange', parseInt(res.data.allPoints))
          this.doughnutChart()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.integralCondition()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    doughnutChart () {
      let _this = this
      this.chartBar = this.$echarts.init(document.getElementById('doughnutChart'))
      let option = {
        tooltip: { // 悬停指示
          trigger: 'item',
          formatter: '{c} ({d}%)'
        },
        legend: {
          show: true,
          icon: 'circle',
          data: ['全部积分兑换(万)', '线上兑换(万)', '线下兑换(万)'],
          orient: 'vertical', // 垂直显示
          y: 'bottom', // 延Y轴居中
          x: 'right', // 居右显示
          align: 'left',
          itemWidth: 8,
          itemHeight: 8,
          padding: [0, 20, 20, 0],
          textStyle: {
            color: '#97A8F7',
            fontSize: 12
          }
        },
        series: [
          {
            name: '中心饼图',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '35%'],
            hoverAnimation: false,
            selectedOffset: 0,
            center: ['48%', '60%'],
            label: { // 饼图图形上的文本标签
              show: true,
              normal: {
                position: 'center', // 标签的位置
                textStyle: {
                  fontSize: 18,
                  color: '#fff' // 文字的字体大小
                },
                formatter: '{c}'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: _this.allPoints,
                name: '全部积分兑换(万)'
              }
            ],
            color: ['#5C74D1']
          }, {
            name: '环形图',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['48%', '60%'],
            data: [{
              value: _this.onlineExchange,
              name: '线上兑换(万)',
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#348fe6'
                }, {
                  offset: 1,
                  color: '#625bef'
                }])
              },
              label: {
                color: 'rgba(255,255,255,.45)',
                formatter: '{c}',
                textStyle: {
                  color: '#fff',
                  fontSize: 18
                }
              }
            },
            {
              value: _this.offlineExchange,
              name: '',
              itemStyle: {
                color: 'transparent'
              }
            }
            ]
          },
          {
            name: '环形图',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['48%', '60%'],
            data: [{
              value: _this.onlineExchange,
              name: '',
              itemStyle: {
                color: 'transparent'
              }
            },
            {
              value: _this.offlineExchange,
              name: '线下兑换(万)',
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#CB3E48'
                }, {
                  offset: 1,
                  color: '#FE7881'
                }])
              },
              label: {
                color: 'rgba(255,255,255,.45)',
                formatter: '{c}',
                textStyle: {
                  color: '#fff',
                  fontSize: 18
                }
              }
            }
            ]
          }
        ]
      }
      this.chartBar.setOption(option)
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
  .integral-wrapper {
    width: vw(500)
    height: vh(215)
    margin-bottom vh(16)
    background: url("https://img.gdoil.cn/cockpit/static/images/carMember/right_bg1.png") no-repeat
    -webkit-background-size: 100% vh(215)
    background-size: 100% vh(215)
    .doughnut-chart{
      width:100%;
      height:100%;
    }
  }
</style>
