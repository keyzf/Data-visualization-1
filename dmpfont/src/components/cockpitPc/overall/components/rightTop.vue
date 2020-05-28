<template>
  <div class="rightTop">
    <div class="title">
      <!-- 累计会员数 -->
    </div>
    <div class="chartBox">
      <div class="chart-title igs-flex igs-flex2">
        <span class="month-dot"></span>累计会员
        <span class="year-dot"></span>有效会员</div>
      <div id="mainSaleChart"
           :style="{width: '100%', height: '50%'}"></div>
      <div id="mainSaleCharts"
           :style="{width: '100%', height: '50%'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rightTop',
  data () {
    return {
      memberList: [],
      validMemberList: [],
      dataName: []
    }
  },
  created () {
  },
  mounted () {
    this.memberStructureCountList()
  },
  methods: {
    //     6. 会员结构数列表
    // GET /memberStructureCountList
    memberStructureCountList () {
      this.memberList = []
      this.validMemberList = []
      this.dataName = []
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/memberStructureCountList', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var memberList = res.data.memberList
          for (var i = 0; i < memberList.length; i++) {
            this.memberList.push(memberList[i].count)
            this.dataName.push(memberList[i].name)
          }
          console.log('this.dataName' + this.dataName)
          var validMemberList = res.data.validMemberList
          for (var j = 0; j < validMemberList.length; j++) {
            this.validMemberList.push(validMemberList[j].count)
          }
          // console.log(this.validMemberList)
          this.drawChart()
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.memberStructureCountList()
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
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('mainSaleChart'))
      // 绘制图表
      myChart.setOption({
        color: { // 图表渐变色设置
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#BE7F06' // 0% 处的颜色
          }, {
            offset: 1, color: '#CDE050' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '30',
          left: '20',
          right: '20',
          bottom: '10',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.dataName.reverse(),
          // data: this.topListName,
          axisLabel: { // 设置x轴字体
            inside: false,
            textStyle: {
              color: '#97A8F7',
              fontSize: '11'
            },
            interval: 0 // 让文字垂直显示
            // formatter (value) {
            //   return value.split('').join('\n')
            // }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.5)',
              width: 1
            }
          }
        },
        yAxis: {
          name: '人数（人）',
          nameTextStyle: {
            fontSize: '11'
          },
          type: 'value',
          axisLabel: { // 设置y轴字体
            textStyle: {
              color: '#97A8F7',
              fontSize: '10'
            }
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.5)',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: true,
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.25)',
              width: 1,
              type: 'solid'
            }
          }
        },
        series: [{
          name: '累计会员',
          type: 'bar',
          data: this.memberList.reverse(),
          // data: this.topListCount,
          label: { // 设置柱状图上文字
            show: false,
            position: 'top',
            textStyle: {
              color: '#97A8F7'
            }
          },
          barWidth: '10',
          itemStyle: {
            normal: {
              barBorderRadius: [5, 5, 0, 0]
            }
          }
        }]
      })
    },
    drawCharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('mainSaleCharts'))
      // 绘制图表
      myChart.setOption({
        color: { // 图表渐变色设置
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#A447C6' // 0% 处的颜色
          }, {
            offset: 1, color: '#44A2F3' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        title: { // 顶部标题设置
          show: false,
          text: '',
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
          top: '20',
          left: '20',
          right: '20',
          bottom: '10',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['5星', '4星', '3星', '2星', '1星'],
          // data: this.topListName,
          axisLabel: { // 设置x轴字体
            show: false,
            inside: false,
            textStyle: {
              color: 'rgba(92, 116, 209, 0.5)',
              fontSize: '11'
            },
            interval: 1, // 让文字垂直显示
            formatter (value) {
              return value.split('').join('\n')
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.5)',
              width: 1
            }
          }
        },
        yAxis: {
          nameTextStyle: {
            fontSize: '11'
          },
          type: 'value',
          axisLabel: { // 设置y轴字体
            textStyle: {
              color: '#97A8F7',
              fontSize: '10'
            }
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.5)',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: true,
            lineStyle: {
              color: 'rgba(92, 116, 209, 0.25)',
              width: 1,
              type: 'solid'
            }
          },
          inverse: true // 设置图表方向
        },
        series: [{
          name: '有效会员',
          type: 'bar',
          data: this.validMemberList.reverse(),
          // data: this.topListCount,
          label: { // 设置柱状图上文字
            show: false,
            position: 'top',
            textStyle: {
              color: '#97A8F7'
            }
          },
          barWidth: '10',
          itemStyle: {
            normal: {
              barBorderRadius: [0, 0, 5, 5]
            }
          }
        }]
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
.rightTop
  text-align center
  width 100%
  // height:33%;
  height pxtovh(346)
  color #97a8f7
  background url('https://img.gdoil.cn/cockpit/static/images/overallImg/5.png') no-repeat
  -webkit-background-size 100% 100%
  background-size 100% 100%
  padding pxtovh(47) pxtovh(30) pxtovh(30) pxtovh(30)
  position relative
  .title
    width pxtovh(156)
    height pxtovh(34)
    line-height pxtovh(34)
    font-size pxtovh(20)
    font-weight 400
    color rgba(169, 184, 255, 1)
    position absolute
    top 0
    left 50%
    margin-left pxtovh(-78)
  .chartBox
    height 100%
    position relative
    .chart-title
      position absolute
      right pxtovh(10)
      overflow hidden
      .month-dot
        display inline-block
        width pxtovh(6)
        height pxtovh(6)
        background linear-gradient(180deg, rgba(204, 220, 77, 1), rgba(191, 130, 8, 1))
        border-radius 50%
        margin-right pxtovh(5)
      .year-dot
        display inline-block
        width pxtovh(6)
        height pxtovh(6)
        background linear-gradient(180deg, rgba(71, 160, 242, 1), rgba(162, 73, 199, 1))
        border-radius 50%
        margin 0 pxtovh(3) 0 pxtovh(30)
</style>
