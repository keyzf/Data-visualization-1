<template>
  <div class="consumption-proportion-wrapper">
    <div id="consumptionProportion" class="consumption-proportion"></div>
  </div>
</template>

<script>
export default {
  name: 'leftCenter',
  data () {
    return {
      memberInfo: '', // 会员信息
      common: '', // 普通会员
      silverMedal: '', // 银牌会员
      goldMedal: '' // 金牌会员
    }
  },
  mounted () {
    this.memberSpendingRatio()
    // this.drawCharts()
  },
  methods: {
    // 当月全省消费比例
    memberSpendingRatio () {
      this.$http.post('/webapi/bdview/thDataBS/memberSpendingRatio').then(res => {
        if (res.result === true) {
          this.memberInfo = res.data
          this.drawCharts()
          // 是否启动轮询1
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.memberSpendingRatio()
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
    drawCharts () {
      let _this = this
      var color = ['rgba(189,160,53,1)', 'rgba(189,160,53,.8)', 'rgba(74,106,227,1)', 'rgba(74,106,227,.8)', 'rgba(60,172,226,1)', 'rgba(60,172,226,.8)']
      var placeHolderStyle = {
        normal: {
          color: '#0D1A56',
          label: {
            show: true
          },
          labelLine: {
            show: true
          }
        },
        emphasis: {
          color: '#393d50'
        }
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('consumptionProportion'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          show: true,
          formatter: '{b} : <br/>{d}%',
          backgroundColor: 'rgba(0,0,0,0.7)', // 背景
          padding: [8, 10], // 内边距
          extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);' // 添加阴影
        },
        legend: {
          icon: 'circle',
          orient: 'vertical',
          align: 'left',
          y: 'bottom', // 延Y轴居中
          x: 'right', // 居右显示
          padding: [0, 20, 25, 0],
          itemGap: 14,
          data: ['金牌会员', '银牌会员', '普通会员', '04', '05', '06'],
          textStyle: {
            color: '#97A8F7',
            fontSize: 12
          },
          itemWidth: 6, // 设置宽度
          itemHeight: 6 // 设置高度
        },
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            radius: ['20%', '26%'], // 环形大小
            center: ['49%', '54%'], // 环形位置
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{c}',
                  textStyle: {
                    color: '#fff',
                    fontSize: 15
                  }
                }
              }
            },
            clockWise: false, // 是否顺时加载
            hoverAnimation: false,
            startAngle: -90,
            // label: {
            //   borderRadius: '10'
            // },
            data: [{
              value: this.$util.fixedFunc(this.memberInfo.goldMedal.yes / 10000),
              name: '金牌会员',
              itemStyle: {
                normal: {
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: color[0]
                  }, {
                    offset: 1,
                    color: color[1]
                  }])
                }
              },
              labelLine: { // 指示线长度
                normal: {
                  length: '14%',
                  length2: 10,
                  lineStyle: {
                    color: '#BDA035'
                  }
                }
              },
              label: { // 显示设置
                normal: {
                  show: true,
                  // formatter: '{b} {c} ',
                  formatter: '有消费(万人) {c} ',
                  textStyle: {
                    color: '#BDA035',
                    fontSize: 12
                  },
                  smooth: 0.2,
                  length: 1000 / 50,
                  length2: 1000 / 100
                }
              }
            },
            {
              // value: 5867,
              value: this.$util.fixedFunc(this.memberInfo.goldMedalsum.yes / 10000),
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle,
              labelLine: { // 指示线长度
                normal: {
                  length: '14%',
                  length2: 10,
                  lineStyle: {
                    color: '#BDA035'
                  }
                }
              },
              label: { // 显示设置
                normal: {
                  show: true,
                  // formatter: '{b} {c} ',
                  formatter: '无消费(万人) {c} ',
                  textStyle: {
                    color: '#BDA035',
                    fontSize: 12
                  }
                }
              }
            }
            ]
          },
          {
            name: 'Line 2',
            type: 'pie',
            radius: ['40%', '46%'],
            center: ['49%', '54%'],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{c}',
                  textStyle: {
                    color: '#fff',
                    fontSize: 15
                  }
                }
              }
            },
            clockWise: false, // 是否顺时加载
            hoverAnimation: false,
            startAngle: 10,
            data: [{
              // value: 5678,
              value: this.$util.fixedFunc(this.memberInfo.silverMedal.yes / 10000),
              name: '银牌会员',
              itemStyle: {
                normal: {
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: color[4]
                  }, {
                    offset: 1,
                    color: color[5]
                  }])
                }
              },
              labelLine: { // 指示线长度
                normal: {
                  length: '11%',
                  length2: 10,
                  lineStyle: {
                    color: '#3CACE2'
                  }
                }
              },
              label: { // 显示设置
                normal: {
                  show: true,
                  formatter: '有消费(万人) {c} ',
                  textStyle: {
                    color: '#3CACE2',
                    fontSize: 12
                  }
                }
              }
            },
            {
              // value: 5867,
              value: this.$util.fixedFunc(this.memberInfo.silverMedalsum.yes / 10000),
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle,
              labelLine: { // 指示线长度
                normal: {
                  length: '11%',
                  length2: 10,
                  lineStyle: {
                    color: '#3CACE2'
                  }
                }
              },
              label: { // 显示设置
                normal: {
                  show: true,
                  formatter: '无消费(万人) {c} ',
                  textStyle: {
                    color: '#3CACE2',
                    fontSize: 12
                  }
                }
              }
            }
            ]
          },
          {
            name: 'Line 3',
            type: 'pie',
            radius: ['59%', '65%'],
            center: ['49%', '54%'],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{c}',
                  textStyle: {
                    color: '#fff',
                    fontSize: 15
                  }
                }
              }
            },
            clockWise: false, // 是否顺时加载
            hoverAnimation: false,
            startAngle: 130,
            data: [{
              // value: 5678,
              value: this.$util.fixedFunc(this.memberInfo.common.yes / 10000),
              name: '普通会员',
              itemStyle: {
                normal: {
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: color[2]
                  }, {
                    offset: 1,
                    color: color[3]
                  }])
                }
              },
              labelLine: { // 指示线长度
                normal: {
                  length: '7%',
                  length2: 10,
                  lineStyle: {
                    color: '#4A6AE3'
                  }
                }
              },
              label: { // 显示设置
                normal: {
                  show: true,
                  formatter: '有消费(万人) {c} ',
                  textStyle: {
                    color: '#4A6AE3',
                    fontSize: 12
                  }
                }
              }
            },
            {
              // value: 5867,
              value: this.$util.fixedFunc(this.memberInfo.commonsum.yes / 10000),
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle,
              labelLine: { // 指示线长度
                normal: {
                  length: '7%',
                  length2: 10,
                  lineStyle: {
                    color: '#4A6AE3'
                  }
                }
              },
              label: { // 显示设置
                normal: {
                  show: true,
                  formatter: '无消费(万人) {c} ',
                  textStyle: {
                    color: '#4A6AE3',
                    fontSize: 12
                  }
                }
              }
            }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .consumption-proportion-wrapper {
    width: 100%
    height: 100%
    color: #97a8f7
    background: url("https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/top_bg1.png?1") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    padding-top vh(10)
    .consumption-proportion {
      width: 100%
      height: 100%
    }
  }
</style>
