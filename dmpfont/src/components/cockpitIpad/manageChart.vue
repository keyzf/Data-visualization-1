<template>
  <div >
    <div class="igs-flex igs-flex9 chart_list">
      <div class="chart_list_cont marbot">
        <!-- 客户分类 -->
        <section class="chart">
          <div id="memberTypeChart" :style="{width: '100%', height: '280px'}"></div>
        </section>
        <div class="line">.</div>
      </div>
      <div class="chart_list_cont marbot padleft">
        <!-- 柴油单站消费粘性 -->
        <section class="chart">
          <div id="singleStationChart" :style="{width: '100%', height: '280px'}"></div>
        </section>
        <div class="line">.</div>
      </div>
      <div class="chart_list_cont marbot padleft">
        <!-- 最近一次加油时间 -->
        <section class="chart">
          <div id="nearRefuelChart" :style="{width: '100%', height: '280px'}"></div>
        </section>
        <div class="line">.</div>
      </div>
      <div class="chart_list_cont marbot1">
        <!-- 线下兑换商品 -->
        <section class="chart">
          <div id="outlineChart" :style="{width: '100%', height: '280px'}"></div>
        </section>
      </div>
      <div class="chart_list_cont marbot1 padleft">
        <!-- 线上兑换商品 -->
        <section class="chart">
          <div id="onlineChart" :style="{width: '100%', height: '280px'}"></div>
        </section>
      </div>
      <div class="chart_list_cont marbot1 padleft">
         <!-- 支付习惯 -->
        <section class="chart">
          <div id="payStyleChart" :style="{width: '100%', height: '280px'}"></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manageChart',
  data () {
    return {
      topListCount: [], // top10数量
      topListName: [], // top10名称
      customerTypeList: [], // 客户分类数据
      customerTypeName: [], // 客户分类名
      stickinessList: [], // 消费粘性数据
      stickinessName: [], // 消费粘性名
      refuelTimeList: [], // 最近加油时间数据
      refuelTimeName: [], // 最近加油时间名
      outlineCountList: [], // 线下兑换商品列表
      outlineNameList: [], // 线下兑换商品列表名
      onlineCountList: [], // 线上兑换商品列表
      onlineNameList: [], // 线上兑换商品列表名
      payStyleList: [], // 支付习惯数据
      payStyleName: [] // 支付习惯名称
      // oilCode: '33250135'
    }
  },
  props: {
    oilCode: String
  },
  created () {
  },
  mounted () {
    // 客户分类
    this.customerTypeCountListByOilCode()
    // 柴油单站消费粘性
    this.dieselSpendStickinessListByOilCode()
    // 最近一次加油时间
    this.lastRefuelTimeListByOilCode()
    // 线下兑换商品TOP5
    this.getRedeemOfflineTopListByOilCode()
    // 线上兑换商品TOP5
    this.getRedeemOnlineTopListByOilCode()
    // 支付习惯
    this.paymentHabitsListByOilCode()
  },
  methods: {
    // 客户分类
    customerTypeCountListByOilCode () {
      let that = this
      this.$http.post('/webapi/cockpit/customerTypeCountListByOilCode', {
        oilCode: that.oilCode
      }).then(res => {
        if (res.result === true) {
          that.customerTypeList = res.rows
          that.changeCustomerTypeData(res.rows)
        } else {
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理数据
    changeCustomerTypeData (json) {
      let nameData = []
      for (var i = 0; i < json.length; i++) {
        nameData.push(json[i].name)
      }
      this.customerTypeName = nameData
      this.drawChartMemberType()
    },
    // 客户分类图表
    drawChartMemberType () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('memberTypeChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '客户分类',
          left: 'left',
          textStyle: {
            color: '#4C4948',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: { // 点击图表提示框显示设置
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          showContent: true
        },
        legend: {
          // orient: 'horizontal', // 布局朝向，horizontal和vertical
          bottom: 5,
          left: 'center',
          // data: ['流失客户', '新客户', '重要唤回客户', '重要价值客户', '预流失客户'],
          data: this.customerTypeName,
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
            name: '客户分类',
            type: 'pie',
            radius: '50%', // 设置图大小
            center: ['48%', '47%'], // 调整上下边距，x和y
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
                length: 2
              }
            },
            label: { // 以百分比显示设置
              normal: {
                show: true,
                formatter: '{d}%',
                textStyle: {
                  color: '#4C4948',
                  fontSize: 10
                }
              }
            },
            data: [ // 饼状图数据名称
              {
                value: this.customerTypeList[0].count,
                name: this.customerTypeList[0].name,
                itemStyle: {
                  color: '#21A9FF'
                }
              },
              {
                value: this.customerTypeList[1].count,
                name: this.customerTypeList[1].name,
                itemStyle: {
                  color: '#A4DA73'
                }
              },
              {
                value: this.customerTypeList[2].count,
                name: this.customerTypeList[2].name,
                itemStyle: {
                  color: '#BC89FE'
                }
              },
              {
                value: this.customerTypeList[3].count,
                name: this.customerTypeList[3].name,
                itemStyle: {
                  color: '#FF7979'
                }
              },
              {
                value: this.customerTypeList[4].count,
                name: this.customerTypeList[4].name,
                itemStyle: {
                  color: '#FFB45C'
                }
              }
            ],
            emphasis: { // 点击查看图表数据提示框阴影设置
              itemStyle: {
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0)'
              }
            }
          }
        ]
      })
    },
    // 柴油单站消费粘性
    dieselSpendStickinessListByOilCode () {
      let that = this
      this.$http.post('/webapi/cockpit/dieselSpendStickinessListByOilCode', {
        oilCode: that.oilCode
      }).then(res => {
        if (res.result === true) {
          that.stickinessList = res.rows
          that.changeStickinessData(res.rows)
        } else {
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理数据
    changeStickinessData (json) {
      let nameData = []
      for (var i = 0; i < json.length; i++) {
        nameData.push(json[i].name)
      }
      this.stickinessName = nameData
      this.drawChartSingleSation()
    },
    // 柴油单站消费粘性图表
    drawChartSingleSation () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('singleStationChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '柴油单站消费粘性',
          left: 'left',
          textStyle: {
            color: '#4C4948',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: { // 点击图表提示框显示设置
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          showContent: true
        },
        legend: {
          // orient: 'vertical', // 垂直分布
          bottom: 5,
          left: 'center',
          // data: ['无消费（0次）', '低频（0-1次）', '中频（2-4次）', '高频（5次以上）'],
          data: this.stickinessName,
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
            name: '消费粘性',
            type: 'pie',
            radius: '50%', // 设置图大小
            center: ['48%', '47%'], // 调整上下边距，x和y
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
                length: 2
              }
            },
            label: { // 以百分比显示设置
              normal: {
                show: true,
                formatter: '{d}%',
                textStyle: {
                  color: '#4C4948',
                  fontSize: 10
                }
              }
            },
            data: [ // 饼状图数据名称
              {
                value: this.stickinessList[0].count,
                name: this.stickinessList[0].name,
                itemStyle: {
                  color: '#21A9FF'
                }
              },
              {
                value: this.stickinessList[1].count,
                name: this.stickinessList[1].name,
                itemStyle: {
                  color: '#A4DA73'
                }
              },
              {
                value: this.stickinessList[2].count,
                name: this.stickinessList[2].name,
                itemStyle: {
                  color: '#FFB45C'
                }
              },
              {
                value: this.stickinessList[3].count,
                name: this.stickinessList[3].name,
                itemStyle: {
                  color: '#FF7979'
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
    },
    // 最近一次加油时间
    lastRefuelTimeListByOilCode () {
      let that = this
      this.$http.post('/webapi/cockpit/lastRefuelTimeListByOilCode', {
        oilCode: '33250135'
      }).then(res => {
        if (res.result === true) {
          that.refuelTimeList = res.rows
          that.changeRefuelTimeData(res.rows)
        } else {
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理数据
    changeRefuelTimeData (json) {
      let nameData = []
      for (var i = 0; i < json.length; i++) {
        nameData.push(json[i].name)
      }
      this.refuelTimeName = nameData
      this.drawChartNearRefuel()
    },
    // 最近一次加油时间图表
    drawChartNearRefuel () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('nearRefuelChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '最近一次加油时间',
          left: 'left',
          textStyle: {
            color: '#4C4948',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: { // 点击图表提示框显示设置
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          showContent: true
        },
        legend: {
          // orient: 'vertical', // 垂直分布
          bottom: 5,
          left: 'center',
          // data: ['30天以内', '31-61天', '61-90天', '91-180天', '180天以前'],
          data: this.refuelTimeName,
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
            name: '加油时间',
            type: 'pie',
            radius: '50%', // 设置图大小
            center: ['48%', '47%'], // 调整上下边距，x和y
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
                length: 2
              }
            },
            label: { // 以百分比显示设置
              normal: {
                show: true,
                formatter: '{d}%',
                textStyle: {
                  color: '#4C4948',
                  fontSize: 10
                }
              }
            },
            data: [ // 饼状图数据名称
              {
                value: this.refuelTimeList[0].count,
                name: this.refuelTimeList[0].name,
                itemStyle: {
                  color: '#21A9FF'
                }
              },
              {
                value: this.refuelTimeList[1].count,
                name: this.refuelTimeList[1].name,
                itemStyle: {
                  color: '#A4DA73'
                }
              },
              {
                value: this.refuelTimeList[2].count,
                name: this.refuelTimeList[2].name,
                itemStyle: {
                  color: '#BC89FE'
                }
              },
              {
                value: this.refuelTimeList[3].count,
                name: this.refuelTimeList[3].name,
                itemStyle: {
                  color: '#FF7979'
                }
              },
              {
                value: this.refuelTimeList[4].count,
                name: this.refuelTimeList[4].name,
                itemStyle: {
                  color: '#FFB45C'
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
    },
    // 线下兑换商品TOP5
    getRedeemOfflineTopListByOilCode () {
      let that = this
      this.$http.post('/webapi/cockpit/getRedeemOfflineTopListByOilCode', {
        oilCode: '33250135'
      }).then(res => {
        if (res.result === true) {
          that.changeOutlineData(res.rows)
        } else {
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理数据
    changeOutlineData (json) {
      let countData = []
      let nameData = []
      for (var i = 0; i < json.length; i++) {
        countData.push(json[i].count)
        nameData.push(json[i].name)
      }
      this.outlineCountList = countData
      this.outlineNameList = nameData
      this.drawChartOutline()
    },
    // 线下兑换商品表
    drawChartOutline () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('outlineChart'))
      // 绘制图表
      myChart.setOption({
        color: { // 图标渐变色设置
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#31C7FF' // 0% 处的颜色
          }, {
            offset: 1, color: '#1696FF' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        title: {
          text: '线下兑换商品TOP5',
          textStyle: {
            color: '#4C4948',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: {},
        grid: {
          left: '1%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // data: ['卓玛泉', '鹅露纸巾', '红牛', '牙刷', '口香糖'],
          data: this.outlineNameList,
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#4C4948'
            },
            interval: 0, // 让文字垂直显示
            formatter (value) {
              return value.split('').join('\n')
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#CDCBCB',
              width: 1
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#9FA0A0'
            }
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: '#fff',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: false
          }
        },
        series: [{
          name: '数量',
          type: 'bar',
          // data: [875, 832, 762, 627, 889],
          data: this.outlineCountList,
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff'
            }
          },
          barWidth: '12'
        }]
      })
    },
    // 线上兑换商品TOP5
    getRedeemOnlineTopListByOilCode () {
      let that = this
      this.$http.post('/webapi/cockpit/getRedeemOnlineTopListByOilCode', {
        oilCode: '33250135'
      }).then(res => {
        if (res.result === true) {
          that.changeOnlineData(res.rows)
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
      let countData = []
      let nameData = []
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
            offset: 0, color: '#81B9FF' // 0% 处的颜色
          }, {
            offset: 1, color: '#4B7FFF' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        title: {
          text: '线上兑换商品TOP5',
          textStyle: {
            color: '#4C4948',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: {},
        grid: {
          left: '1%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // data: ['卓玛泉', '鹅露纸巾', '红牛', '牙刷', '口香糖'],
          data: this.onlineNameList,
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#4C4948'
            },
            interval: 0, // 让文字垂直显示
            formatter (value) {
              return value.split('').join('\n')
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#CDCBCB',
              width: 1
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#9FA0A0'
            }
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: '#fff',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: false
          }
        },
        series: [{
          name: '数量',
          type: 'bar',
          // data: [875, 832, 762, 627, 889],
          data: this.onlineCountList,
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff'
            }
          },
          barWidth: '12'
        }]
      })
    },
    // 获取支付习惯
    paymentHabitsListByOilCode () {
      let that = this
      this.$http.post('/webapi/cockpit/paymentHabitsListByOilCode', {
        oilCode: '33250135'
      }).then(res => {
        if (res.result === true) {
          that.payStyleList = res.rows
          that.changePayStyleData(res.rows)
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
      for (var i = 0; i < json.length; i++) {
        nameData.push(json[i].name)
      }
      this.payStyleName = nameData
      this.drawChartPayStyle()
    },
    // 支付习惯图表
    drawChartPayStyle () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('payStyleChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '支付习惯',
          left: 'left',
          textStyle: {
            color: '#4C4948',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: { // 鼠标移到图里面的浮动提示框
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          showContent: true
        },
        legend: {
          // orient: 'vertical', // 垂直分布
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
            radius: '50%', // 设置图大小
            center: ['48%', '47%'], // 调整上下边距，x和y
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
                length: 2
              }
            },
            label: { // 以百分比显示设置
              normal: {
                show: true,
                formatter: '{d}%',
                textStyle: {
                  color: '#4C4948',
                  fontSize: 10
                }
              }
            },
            data: [ // 饼状图数据名称
              {
                value: this.payStyleList[0].count,
                name: this.payStyleList[0].name,
                itemStyle: {
                  color: '#FFB45C'
                }
              },
              {
                value: this.payStyleList[1].count,
                name: this.payStyleList[1].name,
                itemStyle: {
                  color: '#FF7979'
                }
              },
              {
                value: this.payStyleList[2].count,
                name: this.payStyleList[2].name,
                itemStyle: {
                  color: '#A2E466'
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
  watch: {
    oilCode (val) {
      // 油站编码改变，刷新数据
      this.customerTypeCountListByOilCode()
      this.dieselSpendStickinessListByOilCode()
      this.lastRefuelTimeListByOilCode()
      this.getRedeemOfflineTopListByOilCode()
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
        width: 33.333%;
        height: 291px;
        .chart{
          height: 280px;
          margin: 0;
          color: #ffffff;
          font-size: 14px;
          border-right: 1px solid #E5E5E5;
          margin-bottom: 10px;
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
        height: 291px;
        border-bottom: 1px solid #E5E5E5;
        padding-bottom: 15px;
        .chart{
          height: 280px;
          margin: 0;
          color: #ffffff;
          font-size: 14px;
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
        margin-bottom: 15px;
      }
      .padleft{
        padding-left: 0;
      }
    }
  }
</style>
