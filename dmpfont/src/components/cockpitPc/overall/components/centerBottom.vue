<template>
  <div class="centerBottom igs-flex">
    <div class="centerBottom_content">
      <div class="title title_l">
        <!-- 会员柴油加油量今年+同比 -->
      </div>
      <div class="centerBottom_b">
        <div id="oilchart"
             :style="{width: '100%', height: '100%'}"></div>
      </div>
    </div>
    <div class="centerBottom_content centerBottom_content_right">
      <div class="title">
        <!-- 过去12个月柴油豆兑换和产生 -->
      </div>
      <div class="centerBottom_b">
        <div id="changchart"
             :style="{width: '100%', height: '100%'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'centerBottom',
  data () {
    return {
      leftDeta: [],
      theYear: [],
      lastYear: [],
      produceList: [],
      pastTwelveMonthList: [],
      rightDeta: []
    }
  },
  mounted () {
    this.theYearMemberDieselRefuelCompare()
    this.dieselBeanProduceAndRedeemCountListByLastYear()
  },
  methods: {
    //    4. 今年会员柴油加油量同比
    // GET /theYearMemberDieselRefuelCompare
    theYearMemberDieselRefuelCompare () {
      this.leftDeta = []
      this.lastYear = []
      this.theYear = []
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/theYearMemberDieselRefuelCompare', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          // 今年
          var theYear = res.data.theYear
          // 去年
          var lastYear = res.data.lastYear

          for (var i = 0; i < lastYear.length; i++) {
            this.leftDeta.push(
              this.formattDeta(lastYear[i].name)
            )
            this.lastYear.push(
              this.format(lastYear[i].count)
            )
          }

          for (var j = 0; j < theYear.length; j++) {
            this.theYear.push(
              this.format(theYear[j].count)
            )
          }
          this.drawChartsLeft()
          // // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.theYearMemberDieselRefuelCompare()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    format (val) {
      if (Number(val) === 0) {
        var str = ''
      } else {
        str = val
      }
      return str
    },
    formattDeta (val) {
      var deta = val.slice(-2)
      var str = ''
      if (deta.slice(0, 1) === '0') {
        str = deta.slice(-1) + '月'
      } else {
        str = deta
      }

      return str
    },
    //    5. 过去12个月柴油豆兑换与产生
    // GET /dieselBeanProduceAndRedeemCountListByLastYear
    dieselBeanProduceAndRedeemCountListByLastYear () {
      this.produceList = []
      this.rightDeta = []
      this.pastTwelveMonthList = []
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/dieselBeanProduceAndRedeemCountListByLastYear', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          // 生产
          // this.produceList
          var produceList = res.data.produceList
          for (var i = 0; i < produceList.length; i++) {
            this.produceList.push(
              this.format(produceList[i].count)
            )
            this.rightDeta.push(
              this.formattDeta(produceList[i].name)
            )
          }
          // 兑换
          // this.pastTwelveMonthList
          var pastTwelveMonthList = res.data.pastTwelveMonthList
          for (var j = 0; j < pastTwelveMonthList.length; j++) {
            this.pastTwelveMonthList.push(
              this.format(pastTwelveMonthList[j].count)
            )
          }
          this.drawCharts()
          // 是否启动轮询
          // if (this.$store.state.stationData.isInterval) {
          //   this.timer = setTimeout(() => {
          //     this.dieselBeanProduceAndRedeemCountListByLastYear()
          //   }, this.$store.state.stationData.timeInterval)
          // }
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 今年
    drawChartsLeft () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('oilchart'))
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
        grid: {
          left: '10%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['今年', '去年'],
          icon: 'circle',
          align: 'left',
          right: 20,
          itemHeight: 5,
          textStyle: {
            color: '#8AB5EA',
            fontSize: 18
          }
        },
        xAxis: {
          type: 'category',
          data: this.leftDeta.reverse(),
          // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false,
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
            // color: '#3719EE',
            name: '今年',
            type: 'bar',
            data: this.theYear.reverse(),
            // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            barGap: 0,
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
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#44A881'
                }, {
                  offset: 1,
                  color: '#51D7F8'
                }])
              }
            }
          },
          {
            color: '#44A881',
            name: '去年',
            type: 'line',
            data: this.lastYear.reverse(),
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
                  color: '#371CEE'
                }, {
                  offset: 1,
                  color: '#44A1F3'
                }])
              }
            }
          }
        ]
      })
    },
    // 去年
    drawCharts () {
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
          data: ['生产', '兑换'],
          icon: 'circle',
          align: 'left',
          right: 20,
          itemHeight: 5,
          textStyle: {
            color: '#8AB5EA',
            fontSize: 18
          }
        },
        grid: {
          left: '10%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.rightDeta.reverse(),
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false,
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
          name: '销量(个)',
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
            // color: '#3719EE',
            name: '生产',
            type: 'line',
            data: this.produceList.reverse(),
            barGap: 0,
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
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#3719EE'
                }, {
                  offset: 1,
                  color: '#44A2F3'
                }])
              }
            }
          },
          {
            color: '#44A881',
            name: '兑换',
            type: 'bar',
            data: this.pastTwelveMonthList.reverse(),
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
                  color: '#DE3D3D'
                }, {
                  offset: 1,
                  color: '#F59631'
                }])
              }
            }
          }
        ]
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
.centerBottom
  height pxtovh(272)
  .centerBottom_content
    text-align center
    width 50%
    height 100%
    background url('https://img.gdoil.cn/cockpit/static/images/overallImg/3.png') no-repeat
    -webkit-background-size 100% 100%
    background-size 100% 100%
    padding pxtovh(47) pxtovh(16) pxtovh(16) pxtovh(16)
    position relative
    .title
      width pxtovh(256)
      height pxtovh(34)
      line-height pxtovh(34)
      font-size pxtovh(20)
      font-weight 400
      color rgba(169, 184, 255, 1)
      position absolute
      top 0
      left 50%
      margin-left pxtovh(-128)
    .title_l
      width pxtovh(286)
      margin-left pxtovh(-143)
    .centerBottom_b
      height 100%
  .centerBottom_content_right
    text-align center
    width 50%
    height 100%
    background url('https://img.gdoil.cn/cockpit/static/images/overallImg/4.png') no-repeat
    -webkit-background-size 100% 100%
    background-size 100% 100%
    padding pxtovh(47) pxtovh(16) pxtovh(16) pxtovh(16)
    position relative
    margin-left pxtovh(14)
    .title
      width pxtovh(256)
      height pxtovh(34)
      line-height pxtovh(34)
      font-size pxtovh(20)
      font-weight 400
      color rgba(169, 184, 255, 1)
      position absolute
      top 0
      left 50%
      margin-left pxtovh(-128)
    .title_l
      width pxtovh(286)
      margin-left pxtovh(-143)
    .centerBottom_b
      height 100%
</style>
