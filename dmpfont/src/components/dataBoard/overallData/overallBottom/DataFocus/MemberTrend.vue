<template>
  <div class="member-trend-wrapper">
    <common-header>当月会员走势图</common-header>
    <div id="membertrend" class="member-trend"></div>
  </div>
</template>

<script>
import CommonHeader from '../CommonHeader'
export default {
  name: 'MemberTrend',
  components: {
    CommonHeader
  },
  data () {
    return {
      activeMemberCountListCount: [],
      activeMemberCountListName: [],
      transactionMemberCountListCount: [],
      uvCountList: [],
      times: 0,
      lmActiveMemberDailyAvg: '', // 活跃会员均值
      lmTransactionMemberDailyAvg: '', // 交易会员均值
      lmUVAvg: ''
    }
  },
  created () {
    this.boardDetail()
  },
  methods: {
    drawCharts () {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('membertrend'))
      // 绘制图表
      myChart.setOption({
        title: {
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        grid: {
          left: '2%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [
            // {name: '活跃会员', icon: 'rect'},
            {name: '首页访问（UA）'}
          ],
          align: 'left',
          top: 0,
          right: 20,
          itemHeight: 14,
          itemWidth: 16,
          textStyle: {
            color: '#97A8F7',
            fontSize: 12
          }
        },
        xAxis: {
          type: 'category',
          // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          data: _this.activeMemberCountListName,
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false,
            interval: 0,
            textStyle: {
              color: '#333333'
            },
            formatter (value) { // 垂直显示文字
              /* eslint-disable */
              if(value.length==3){
                value = '   '+ value;
                let str = value.replace(/[^\x00-\xff]/g, '$&\x01').replace(/.{4}\x01?/g, '$&\n').replace(/\x01/g, '')
                return str
              }else{
                let str = value.replace(/[^\x00-\xff]/g, '$&\x01').replace(/.{8}\x01?/g, '$&\n').replace(/\x01/g, '')
                return str
              }
              /* eslint-enable */
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#333333',
              width: 1
            }
          }
        },
        yAxis: {
          // name: '销量(吨)',
          type: 'value',
          // axisLabel: { // 设置y轴字体
          //   textStyle: {
          //     color: '#333333'
          //   }
          // },
          axisLine: { // 设置y轴
            lineStyle: {
              color: '#333333',
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
          },
          splitNumber: 4,
          axisLabel: {
            textStyle: {
              color: '#333333'
            }
          }
        },
        series: [
          {
            name: '首页访问（UA）',
            type: 'line',
            smooth: true, // 设置折线图平滑
            // data: [1025, 2620, 2322, 5624, 8255, 1526, 4523, 4528, 7822, 8221],
            data: _this.uvCountList,
            barGap: 0.2,
            markLine: {
              symbol: 'none',

              /* symbol:"none",               //去掉警戒线最后面的箭头
            label:{
                position:"end"   ,       //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束

            }, */
              data: [
                {
                  label: {
                    position: 'end',
                    formatter: '上月首页访问(uv)日均',
                    fontSize: '8'
                  },
                  yAxis: this.lmUVAvg // 交易会员均值线

                }
              ]
            },
            label: { /* 柱子上面的数字 */
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            symbol: 'circle', // 折点设定为实心点
            symbolSize: 5, // 设定实心点的大小
            areaStyle: {
              color: 'rgba(5,140,255, 0.2)'
            }
          }
          // {
          //   color: '#44A881',
          //   name: '活跃会员',
          //   type: 'bar',
          //   // data: [1015, 2120, 2122, 5124, 8155, 1426, 4823, 4728, 7122, 8121],
          //   data: _this.activeMemberCountListCount,
          //   markLine: {
          //     symbol: 'none',
          //     /* symbol:"none",               //去掉警戒线最后面的箭头
          //   label:{
          //       position:"end"   ,       //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束

          //   }, */
          //     data: [
          //       {
          //         label: {
          //           position: 'end',
          //           formatter: '上月活跃会员日均',
          //           fontSize: '8'
          //         },
          //         yAxis: this.lmActiveMemberDailyAvg // 活跃会员均值线

          //       }
          //     ]
          //   },
          //   label: {
          //     show: false,
          //     position: 'top',
          //     textStyle: {
          //       color: '#fff'
          //     }
          //   },
          //   barWidth: '9', // 宽度设置
          //   // 柱形图圆角，初始化效果
          //   itemStyle: {
          //     normal: {
          //       barBorderRadius: [5, 5, 0, 0],
          //       // 颜色渐变
          //       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //         offset: 0,
          //         color: '#51D7F8'
          //       }, {
          //         offset: 1,
          //         color: '#44A881'
          //       }])
          //     }
          //   }
          // }
        ]
      }
      )
    },
    boardDetail () {
      let that = this
      that.activeMemberCountListCount = []
      that.activeMemberCountListName = []
      that.transactionMemberCountListCount = []
      that.uvCountList = []
      this.$http.get('/webapi/bdview/appBusiAnalysis/boardDetail').then(res => {
        if (res.result) {
          let activeMemberCountList = res.data.activeMemberCountList
          this.lmActiveMemberDailyAvg = res.data.lmActiveMemberDailyAvg // 活跃会员均值
          this.lmTransactionMemberDailyAvg = res.data.lmTransactionMemberDailyAvg // 交易会员均值
          this.lmUVAvg = res.data.lmUVAvg // UA均值
          activeMemberCountList.filter(item => {
            that.activeMemberCountListCount.push(item.count)
            if (item.name.slice(6).replace(/^0/, '') === '1' && this.times === 0) {
              that.activeMemberCountListName.push(item.name.slice(6).replace(/^0/, '') + '上月')
              this.times = 1
            } else if (item.name.slice(6).replace(/^0/, '') === '1' && this.times === 1) {
              that.activeMemberCountListName.push(item.name.slice(6).replace(/^0/, '') + '当月')
            } else {
              that.activeMemberCountListName.push(item.name.slice(6).replace(/^0/, ''))
            }
          })
          let transactionMemberCountList = res.data.transactionMemberCountList
          transactionMemberCountList.filter(item => {
            that.transactionMemberCountListCount.push(item.count)
          })
          let uvCountList = res.data.uvCountList
          uvCountList.filter(item => {
            that.uvCountList.push(item.count)
          })
          console.log('that.transactionMemberCountListCount', that.transactionMemberCountListCount)
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.boardDetail()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
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
  @import '../../../../../assets/css/mixin.styl'
  .member-trend-wrapper {
    height: vh(252)
    padding 0 vw(15)
    margin-top vh(20)
    .member-trend {
      width: 100%
      height: 100%
      canvas {
        height: vh(135)!important
      }
    }
  }
</style>
