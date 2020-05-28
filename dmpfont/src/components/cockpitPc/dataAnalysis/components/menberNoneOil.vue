<template>
  <div class="cumulative-wrapper">
    <div id="changchart" class="chang-chart"></div>
  </div>
</template>

<script>
export default {
  name: 'menberNoneOil',
  data () {
    return {
      theYear: [],
      lastYear: [],
      lastYearName: [],
      lastYearCount: []
    }
  },
  created () {
    this.theYearMemberNotOilConsumeCompare()
  },
  methods: {
    drawCharts () {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('changchart'))
      // 绘制图表
      myChart.setOption({
        title: {
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['今年', '去年'],
          icon: 'circle',
          align: 'left',
          right: 20,
          itemHeight: 5,
          textStyle: {
            color: '#97A8F7',
            fontSize: 12
          }
        },
        grid: {
          left: '9%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: _this.lastYearName,
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
        yAxis: {
          name: '金额(万元)',
          type: 'value',
          axisLabel: { // 设置y轴字体
            textStyle: {
              color: '#97A8F7'
            }
          },
          nameTextStyle: { // y轴标题
            color: '#5C74D1',
            fontSize: 14,
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
          }
        },
        series: [
          {
            name: '今年',
            type: 'line',
            smooth: true, // 设置折线图平滑
            data: _this.lastYearCount,
            barGap: 0.2,
            label: { /* 柱子上面的数字 */
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '10',
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                color: '#DE3D3D',
                lineStyle: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#DE3D3D'
                  }, {
                    offset: 1,
                    color: '#F59631'
                  }])
                }
              }
            }
          },
          {
            color: '#44A881',
            name: '去年',
            type: 'bar',
            data: _this.lastYearCount,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '10', // 宽度设置
            // 柱形图圆角，初始化效果
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#44A2F3'
                }, {
                  offset: 1,
                  color: '#3719EE'
                }])
              }
            }
          }
        ]
      })
    },
    // 今年会员非油品消费同比
    theYearMemberNotOilConsumeCompare () {
      this.theYear = []
      this.lastYear = []
      this.lastYearName = []
      this.lastYearCount = []
      let that = this
      that.$http.get('/webapi/bdview/customerDataAnalysisBS/theYearMemberNotOilConsumeCompare').then(res => {
        if (res.result) {
          this.theYear = res.data.lastYear
          this.lastYear = res.data.lastYear
          this.theYear.filter(item => {
            that.lastYearName.push(item.name)
            that.lastYearCount.push(item.count)
          })
          this.lastYear.filter(item => {
            that.lastYearCount.push(item.count)
          })
          this.drawCharts()
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
  .cumulative-wrapper {
    height: pxtovh(245)
    flex 1
    background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg_21.png") no-repeat
    -webkit-background-size: 100% pxtovh(245)
    background-size: 100% pxtovh(245)
    padding-top pxtovh(40)
    .chang-chart {
      width: 100%
      height: 100%
    }
  }
</style>
