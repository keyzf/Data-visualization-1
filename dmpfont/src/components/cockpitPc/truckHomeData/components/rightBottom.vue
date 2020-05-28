<template>
    <div class="right_b fr">
        <div class="right_bt">
            <div class="cont_box igs-flex igs-flex4">
                <div class="cont  igs-flex igs-flex4">
                  <img src="../../../../../static/images/truckHomeData/icon_1.png" alt="">
                  <div>
                    <p>签到次数</p>
                    <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                  </div>
                </div>
                <div  class="cont igs-flex igs-flex4">
                   <img src="../../../../../static/images/truckHomeData/icon_2.png" alt="">
                   <div>
                    <p>打卡次数</p>
                    <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                  </div>
                </div>
            </div>
            <div class="cont_box igs-flex igs-flex4">
                <div  class="cont igs-flex igs-flex4">
                   <img src="../../../../../static/images/truckHomeData/icon_3.png" alt="">
                   <div>
                    <p>导航次数</p>
                    <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                  </div>
                </div>
                <div  class="cont igs-flex igs-flex4">
                   <img src="../../../../../static/images/truckHomeData/icon_4.png" alt="">
                   <div>
                    <p>问卷调查人数</p>
                    <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                  </div>
                </div>
            </div>
             <div class="cont_box igs-flex igs-flex4" style="margin-bottom:0;">
                <div  class="cont igs-flex igs-flex4">
                   <img src="../../../../../static/images/truckHomeData/icon_5.png" alt="">
                   <div>
                    <p>实名认证人数</p>
                    <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                  </div>
                </div>
                <div  class="cont igs-flex igs-flex4">
                  <img src="../../../../../static/images/truckHomeData/icon_6.png" alt="">
                  <div>
                    <p>抽奖人数次数</p>
                    <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                  </div>
                </div>
            </div>
        </div>
        <div class="right_bc">
             <div id="numUsechart"
             :style="{width: '100%', height: '100%'}"></div>
        </div>
        <div class="right_bb">
             <div id="changechart"
             :style="{width: '100%', height: '100%'}"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'rightBottom',
  data () {
    return {
      isLoaded: true,
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '万人', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      leftDeta: [],
      theYear: [],
      lastYear: []
    }
  },
  created () {
  },
  mounted () {
    this.theYearMemberDieselRefuelCompare()
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
          this.changetop()
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
    // 使用次数
    drawChartsLeft () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('numUsechart'))
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
          left: '3%',
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
    // 兑换top
    changetop () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('changechart'))
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
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          show: false,
          data: ['今年'],
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
          }
        ]
      })
    }
  },
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
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
  .right_b{
      width:vw(500)
      height:vh(780)
      margin-top:vh(15)
      .right_bt{
        width:100%;
        height:vh(290);
        background url('../../../../../static/images/truckHomeData/6_icon.png') no-repeat
        -webkit-background-size 100% 100%
        background-size 100% 100%
        margin-bottom:vw(15)
        padding pxtovh(47) pxtovw(15) pxtovh(15) pxtovw(15)
        .cont_box{
           height:vh(70);
           width:100%;
           margin-bottom:vh(12);

           .cont{
                height 100%;
                width:vw(225);
                background #060E41
                padding:vh(15) vw(15)
                p{
                  text-align:left
                  font-size:16px;
                  font-family:Source Han Sans CN;
                  font-weight:bold;
                  color:rgba(169,184,255,1);
                  line-height :vh(24);
                }
                img{
                  width:vw(40);
                  height:vh(40)
                }

           }
        }
      }
      .right_bc{
        width:100%;
        height:vh(230);
        background url('../../../../../static/images/truckHomeData/7_icon.png') no-repeat
        -webkit-background-size 100% 100%
        background-size 100% 100%
        margin-bottom:vw(15)
        padding pxtovh(47) pxtovw(15) pxtovh(15) pxtovw(15)
      }
      .right_bb{
        width:100%;
        height:100%;
        height:vh(230);
        background url('../../../../../static/images/truckHomeData/10_icon.png') no-repeat
        -webkit-background-size 100% 100%
        background-size 100% 100%
        padding pxtovh(47) pxtovw(15) pxtovh(15) pxtovw(15)
      }
    }
</style>
