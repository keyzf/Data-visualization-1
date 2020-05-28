<template>
  <div class="leftBottom">
    <div class="title">
      <!-- 柴油复购率当月(会员人数) -->
    </div>
    <div class="leftBottom_b">
      <div id="payStyleChart"
           :style="{width: '100%', height: '100%'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftBottom',
  data () {
    return {
      dataList: []
    }
  },
  created () {
  },
  mounted () {
    this.theMonthMemberDieselRepurchaseRate()
  },
  methods: {
    //    3. 当月柴油复购率（会员人数）
    // GET /theMonthMemberDieselRepurchaseRate
    theMonthMemberDieselRepurchaseRate () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/theMonthMemberDieselRepurchaseRate', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          // console.log(res)
          this.dataList = res.rows
          this.drawChartPayStyle()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.theMonthMemberDieselRepurchaseRate()
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
    // 支付习惯图表
    drawChartPayStyle () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('payStyleChart'))
      // var colors = ["#C84B4B", "#44A881", "blue", "orange", "greenyellow"]
      // 绘制图表
      myChart.setOption({
        title: {
          show: false
        },
        grid: {
          containLabel: true
        },
        tooltip: { // 鼠标移到图里面的浮动提示框
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
          showContent: true
        },
        series: [
          {
            left: 'left',
            name: '',
            type: 'pie',
            radius: '80%', // 设置图大小
            center: ['50%', '54%'], // 调整上下边距，x和y
            itemStyle: { // 设置饼状图字体颜色
              normal: {
                label: {
                  textStyle: {
                    color: '#4C4948',
                    fontSize: 15
                  }
                }
              }
            },
            label: { // 以百分比显示设置
              normal: {
                show: true,
                formatter: '{c|{c}} \n {b|{b}} \n',
                rich: {
                  c: {
                    color: '#fff',
                    fontSize: 12,
                    lineHeight: 12,
                    fontWeight: 'bold'
                  },
                  b: {
                    fontSize: 10,
                    fontWeight: 400,
                    lineHeight: 10,
                    color: 'rgba(151,168,247,1)'
                  }
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: '#44A881'
                },
                length: 20,
                length2: 40
              }
            },
            data: [ // 饼状图数据名称
              {
                value: this.dataList[0].count,
                name: this.dataList[0].name,
                itemStyle: {
                  color: '#C84B4B'
                }
              },
              {
                value: this.dataList[1].count,
                name: this.dataList[1].name,
                itemStyle: {
                  color: '#44A881'
                }
              },
              {
                value: this.dataList[2].count,
                name: this.dataList[2].name,
                itemStyle: {
                  color: '#345AC8'
                }
              },
              {
                value: this.dataList[3].count,
                name: this.dataList[3].name,
                itemStyle: {
                  color: '#BEA135'
                }
              },
              {
                value: this.dataList[4].count,
                name: this.dataList[4].name,
                itemStyle: {
                  color: '#81D5D9'
                }
              }, {
                value: this.dataList[5].count,
                name: this.dataList[5].name,
                itemStyle: {
                  color: '#46A6F8'
                }
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0)'
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
.leftBottom
  text-align center
  width 100%
  height 30%
  height pxtovh(272)
  background url('https://img.gdoil.cn/cockpit/static/images/overallImg/2.png') no-repeat
  -webkit-background-size 100% 100%
  background-size 100% 100%
  margin-top pxtovh(14)
  padding pxtovh(47) pxtovh(30) pxtovh(10) pxtovh(30)
  position relative
  .title
    width pxtovh(266)
    height pxtovh(34)
    line-height pxtovh(34)
    font-size pxtovh(20)
    font-weight 400
    color rgba(169, 184, 255, 1)
    position absolute
    top 0
    left 50%
    margin-left pxtovh(-133)
  .leftBottom_b
    height 100%
</style>
