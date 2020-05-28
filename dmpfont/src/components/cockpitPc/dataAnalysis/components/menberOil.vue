<template>
  <div class="cumulative-wrapper">
    <div id="changchart1" class="chang-chart1"></div>
  </div>
</template>

<script>
export default {
  name: 'menberOil',
  data () {
    return {
      lastYear: [],
      theYear: [],
      theYearName: [],
      lastYearCount: [],
      theYearCount: []
    }
  },
  created () {
    this.theYearMemberRefuelCountCompare()
  },
  methods: {
    drawCharts () {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('changchart1'))
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
          left: '6%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: _this.theYearName,
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
          name: '销量(吨)',
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
            data: _this.theYearCount,
            barGap: 0.2,
            label: { /* 柱子上面的数字 */
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: '9',
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
            barWidth: '9', // 宽度设置
            // 柱形图圆角，初始化效果
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#51D7F8'
                }, {
                  offset: 1,
                  color: '#44A881'
                }])
              }
            }
          }
        ]
      })
    },
    // 今年会员加油量同比
    theYearMemberRefuelCountCompare () {
      this.lastYear = []
      this.theYear = []
      this.theYearName = []
      this.lastYearCount = []
      this.theYearCount = []
      let that = this
      that.$http.get('/webapi/bdview/customerDataAnalysisBS/theYearMemberRefuelCountCompare').then(res => {
        if (res.result) {
          this.lastYear = res.data.lastYear
          this.theYear = res.data.theYear
          this.lastYear.filter(item => {
            that.lastYearCount.push(item.count)
          })
          this.theYear.filter(item => {
            that.theYearName.push(item.name)
            that.theYearCount.push(item.count)
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
    height: 100%
    flex 1
    background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg_19.png") no-repeat
    -webkit-background-size: 100% pxtovh(245)
    background-size: 100% pxtovh(245)
    margin-right pxtovw(15)
    padding-top pxtovh(40)
    .chang-chart1 {
      width: 100%
      height: 100%
    }
  }
</style>
