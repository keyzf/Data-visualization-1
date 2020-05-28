<template>
  <div >
    <div class="igs-flex igs-flex9 chart_list">
      <div class="chart_list_cont marbot1">
        <!-- 线下兑换商品 -->
        <section class="chart">
          <!-- <p class="chart-title">线下兑换商品TOP5</p> -->
          <div v-if="isHaveGoods" id="onlineChart" :style="{width: '100%', height: '330px'}"></div>
          <p v-else class="no-data">暂无兑换商品</p>
        </section>
      </div>
      <div class="chart_list_cont marbot1 padleft">
         <!-- 支付习惯 -->
        <section class="chart">
          <!-- <p class="chart-title">支付习惯</p> -->
          <div v-if="isPayStyle" id="payStyleChart" :style="{width: '100%', height: '330px'}"></div>
          <p v-else class="no-data">暂无支付习惯</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'monthlyChart',
  data () {
    return {
      isHaveGoods: true,
      isPayStyle: true,
      isNoGoods: 'none',
      widthFull: '100%',
      onlineCountList: [], // 线下兑换商品列表
      onlineNameList: [], // 线下兑换商品列表名
      payStyleList: [], // 支付习惯数据
      payStyleName: [] // 支付习惯名称
      // oilCode: '33250135'
    }
  },
  props: {
    oilCode: String,
    curItemMonth: String
  },
  created () {
  },
  mounted () {
    // 线下兑换商品TOP5
    this.getRedeemOnlineTopListByOilCode()
    // 支付习惯
    this.paymentHabitsListByOilCode()
    // this.drawChartOnline()
    // this.drawChartPayStyle()
  },
  methods: {
    // 线下兑换商品TOP5
    getRedeemOnlineTopListByOilCode () {
      let that = this
      this.$http.post('/webapi/bdview/thMobile/getRedeemOfflineTopListByOilCodeAndMonth', {
        oilCode: this.oilCode,
        month: this.curItemMonth
      }).then(res => {
        if (res.result === true) {
          if (res.rows.length === 0) {
            this.isHaveGoods = false
          } else {
            this.isHaveGoods = true
            this.$nextTick(function () {
              // 此时已经渲染完成
              that.changeOnlineData(res.rows)
            })
          }
        } else {
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理数据
    changeOnlineData (json) {
      if (json.length === 0) return
      let countData = []
      let nameData = []
      // 降序处理
      json.sort((a, b) => {
        return b.count - a.count
      })
      for (var i = 0; i < json.length; i++) {
        countData.push(json[i].count)
        nameData.push(json[i].name)
      }
      this.onlineCountList = countData
      this.onlineNameList = nameData
      this.drawChartOnline()
    },
    // 线上兑换商品表
    drawChartOnline () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('onlineChart'))
      // 绘制图表
      myChart.setOption({
        color: { // 图标渐变色设置
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(49, 199, 255, 1)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(22, 150, 255, 1)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        title: {
          show: true,
          text: '线下兑换商品TOP5',
          left: 'left',
          top: '15',
          textStyle: {
            color: '#4C4948',
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
          left: '15',
          right: '15',
          bottom: '15',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // data: ['卓玛泉', '鹅露纸巾', '红牛', '牙刷', '口香糖'],
          data: this.onlineNameList,
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#4C4948',
              fontSize: '12'
            },
            interval: 0, // 让文字全部显示
            formatter (value) { // 垂直显示文字
              /* eslint-disable */
              // 每隔4个字符换行
              let str = value.replace(/[^\x00-\xff]/g, '$&\x01').replace(/.{8}\x01?/g, '$&\n').replace(/\x01/g, '')
              /* eslint-enable */
              return str
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#CDCBCB',
              width: 1
            }
          },
          axisTick: { // 设置x轴小指针
            show: false
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          boundaryGap: [ 0.1, 0.1 ], // 网格间距
          splitNumber: 5, // 设置y轴刻度线数量
          axisLabel: {
            textStyle: {
              color: '#9FA0A0',
              fontSize: '12'
            }
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: '#fff',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: true,
            lineStyle: {
              color: 'rgba(242, 242, 242, 1)',
              width: 1,
              type: 'solid'
            }
          }
        },
        series: [{
          name: '数量',
          type: 'bar',
          // data: [875, 832, 762, 627, 889],
          data: this.onlineCountList,
          label: { // 柱狀圖數據顯示
            show: false,
            position: 'top',
            textStyle: {
              color: '#4C4948',
              fontSize: '12'
            }
          },
          barWidth: '25'
        }]
      })
    },
    // 获取支付习惯
    paymentHabitsListByOilCode () {
      let that = this
      this.$http.post('/webapi/bdview/thMobile/paymentHabitsListByOilCodeAndMonth', {
        oilCode: this.oilCode,
        month: this.curItemMonth
      }).then(res => {
        if (res.result === true) {
          that.payStyleList = res.rows
          if (res.rows.length === 0) {
            this.isPayStyle = false
          } else {
            this.isPayStyle = true
            this.$nextTick(function () {
              // 此时已经渲染完成,刷新页面
              that.changePayStyleData(res.rows)
            })
          }
        } else {
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理数据
    changePayStyleData (json) {
      let nameData = []
      // 降序处理
      json.sort((a, b) => {
        return b.count - a.count
      })
      for (var i = 0; i < json.length; i++) {
        nameData.push(json[i].name)
      }
      this.payStyleName = nameData
      this.drawChartPayStyle()
    },
    // 支付习惯图表
    drawChartPayStyle () {
      // 图表颜色，从右上角开始
      var color = ['#21A9FF', '#FFB45C', '#FF7979', '#BC89FE', '#A4DA73']
      var dataList = []
      for (var i = 0; i < this.payStyleList.length; i++) { // 循环处理图表数据
        var x = i
        if (x > color.length - 1) {
          x = color.length - 1
        }
        var data = {
          value: this.payStyleList[i].count,
          name: this.payStyleList[i].name,
          itemStyle: {
            color: color[x]
          }
        }
        dataList.push(data)
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('payStyleChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          show: true,
          text: '支付习惯',
          left: 'left',
          top: '15',
          textStyle: {
            color: '#4C4948',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: { // 鼠标移到图里面的浮动提示框
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}笔 ({d}%)',
          showContent: true
        },
        grid: {
          left: '15',
          right: '15',
          bottom: '15',
          containLabel: true
        },
        legend: {
          // orient: 'vertical', // 垂直分布
          show: false,
          bottom: 5,
          left: 'center',
          // data: ['混合', '加油卡', '微信支付'],
          data: this.payStyleName,
          textStyle: {
            color: '#4C4948',
            fontSize: 12
          },
          icon: 'circle', // 这个字段控制形状类型包括circle,rect,roundRect等
          itemWidth: 8, // 设置宽度
          itemHeight: 8 // 设置高度
        },
        series: [
          {
            left: 'left',
            name: '支付习惯',
            type: 'pie',
            radius: '55%', // 设置图大小
            center: ['50%', '55%'], // 调整上下边距，x和y
            itemStyle: { // 设置饼状图字体颜色
              normal: {
                label: {
                  textStyle: {
                    color: '#4C4948',
                    fontSize: 10
                  }
                }
              }
            },
            labelLine: { // 饼图指示线长度
              normal: {
                length: 20
              }
            },
            label: { // 以百分比显示设置
              normal: {
                show: true,
                formatter: '{d}% \n {b} \n',
                textStyle: {
                  color: '#4C4948',
                  fontSize: 10
                }
              }
            },
            // 饼状图数据名称
            data: dataList,
            // data: [ // 饼状图数据名称
            //   {
            //     value: this.payStyleList[0].count,
            //     name: this.payStyleList[0].name,
            //     itemStyle: {
            //       color: '#FFB45C'
            //     }
            //   },
            //   {
            //     value: this.payStyleList[1].count,
            //     name: this.payStyleList[1].name,
            //     itemStyle: {
            //       color: '#FF7979'
            //     }
            //   },
            //   {
            //     value: this.payStyleList[2].count,
            //     name: this.payStyleList[2].name,
            //     itemStyle: {
            //       color: '#A2E466'
            //     }
            //   }
            // ],
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
  watch: {
    oilCode (val) {
      // 油站编码改变，刷新数据
      this.getRedeemOnlineTopListByOilCode()
      this.paymentHabitsListByOilCode()
    },
    curItemMonth (val) {
      this.getRedeemOnlineTopListByOilCode()
      this.paymentHabitsListByOilCode()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @media screen and (min-width: 415px) {
    .chart_list{
      width: 100%;
      height: auto;
      .chart_list_cont{
        width: 50%;
        height: 330px;
        .chart{
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0 15px;
          color: #ffffff;
          font-size: 14px;
          border: none;
          margin-bottom: 10px;
          background: #ffffff;
          border-radius: 11px;
          .chart-title{
            text-align: left;
            line-height: 40px;
            font-size: 18px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(76,73,72,1);
          }
          .no-data{
            line-height:330px;
            text-align:center;
            color:#4c4948;
            font-size: 17px;
          }
          #outlineChart{
            border: 1px solid red;
          }
        }
      }
      .line{
        width: 82%;
        height: 1px;
        background: #E5E5E5;
        color: #ffffff;
        margin: 0 9%;
      }
      .marbot{
        margin-bottom: 13px;
      }
      .padleft{
        padding-left: 10px;
      }
    }
  }
  @media screen and (max-width: 414px) {
    .chart_list{
      width: 100%;
      height: auto;
      .chart_list_cont:last-child{
        border: none!important;
      }
      .chart_list_cont{
        width: 100%;
        height: auto;
        /* border-bottom: 1px solid #E5E5E5; */
        .chart{
          width: 100%;
          margin: 0;
          padding: 0 10px;
          color: #ffffff;
          font-size: 14px;
          background: #ffffff;
          border-radius: 4px;
          .chart-title{
            text-align:left;
            line-height: 40px;
            font-size:13px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(76,73,72,1);
          }
          .no-data{
            line-height:100px;
            text-align:center;
            color:#4c4948;
            font-size: 15px;
          }
        }
      }
      .line{
        width: 82%;
        height: 1px;
        background: #E5E5E5;
        color: #ffffff;
        margin: 0 9%;
        display: none;
      }
      .marbot ,.marbot1{
        margin-bottom: 10px;
      }
      .padleft{
        padding-left: 0;
      }
    }
  }
</style>
