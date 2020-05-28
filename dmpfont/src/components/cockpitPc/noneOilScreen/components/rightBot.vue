<template>
  <div class="wraper">
    <div class="wrap">
      <!--<div class="buy-title">千人购买率</div>
      <div id="likeGoodsCharts" class="chart"></div> -->
      <div class="rank-cont-list">
        <ul class="list-title">
          <li class="igs-flex igs-flex10 blue-color">
            <div class="list-number flex"><p>商品名称</p></div>
            <div class="list-name flex1">商品编码</div>
            <div class="list-price flex1">千人购买率</div>
          </li>
        </ul>
        <ul>
          <li class="igs-flex igs-flex10" v-for="(item, index) in goodsList" :key="index">
            <div class="list-numbers flex">
             <p class="list-num">{{item.name}}</p>
            </div>
            <div class="list-name flex1"><span>{{item.no}}</span></div>
            <div class="list-price flex1">
              <p class="textright1">{{item.buypercent}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rightBot',
  data () {
    return {
      goodsList: [],
      trancetotal: 0, // 交易总数
      buypercent: 0 // 千人购买率
    }
  },
  mounted () {
    this.shopInRateStatistics()
  },
  methods: {
    // 当月交易总数
    shopInRateStatistics () {
      this.$http.post('/webapi/bdview/notOilDataBS/shopInRateStatistics').then(res => {
        if (res.result === true) {
          let rs = res.data
          this.trancetotal = rs.theMonthConvenienceStoreTransactions || 0
          // this.trancetotal = this.$util.fixedFunc(val2)
          this.customerMostLikeProductTop()
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 客户最喜欢商品TOP10
    customerMostLikeProductTop () {
      this.$http.post('/webapi/bdview/notOilDataBS/customerMostLikeProductTop').then(res => {
        if (res.result === true) {
          let json = res.rows
          // 数据超出10条，取前10
          if (json.length > 10) {
            json = json.splice(0, 10)
          }
          json.map((a) => {
            if (!Number.isInteger(a.count)) { // 判断非整数，就保留2位小数
              a.count = Number(a.count).toFixed(2)
            }
            if (a.name.length > 8) { // 名称过长处理
              a.name = a.name.substring(0, 8) + '..'
            }
            // 千人购买率:商品的订单数/总订单数*1000
            a.buypercent = parseInt(a.count / (this.trancetotal * 10))
          })
          // 排序处理（降序）
          json.sort((a, b) => {
            return b.buypercent - a.buypercent
          })
          this.goodsList = json
          // this.changeData(json)
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理数据
    changeData (json) {
      let dataList = [] // 数值
      let yDataList = [] // y轴名称
      let yDataList1 = [] // y轴右边数值
      let maxDataList = [] // 柱状图最大值
      json.map((a) => {
        if (!Number.isInteger(a.count)) { // 判断非整数，就保留2位小数
          a.count = Number(a.count).toFixed(2)
        }
        if (a.name.length > 8) { // 名称过长处理
          a.name = a.name.substring(0, 8) + '..'
        }
        // 千人购买率:商品的订单数/总订单数*1000
        let buypercent = parseInt(a.count.toFixed(2) / (this.trancetotal * 10)) || 0
        dataList.push(a.count)
        yDataList.push(a.name)
        yDataList1.push(buypercent)
      })
      json.map(() => {
        // 取最大值加上最大值的10%为基准
        maxDataList.push((Number(dataList[json.length - 1]) + Number(dataList[json.length - 1]) * 0.1).toFixed(2))
      })
      this.drawChart(dataList, yDataList, yDataList1, maxDataList)
      // 是否启动轮询
      if (this.$store.state.stationData.isInterval) {
        this.timer = setTimeout(() => {
          this.shopInRateStatistics()
        }, this.$store.state.stationData.timeInterval)
      }
    },
    // dataList:柱状图数值, yDataListy:轴显示名称, yDataList1:y轴后面数值, maxDataList最大值
    drawChart (dataList, yDataList, yDataList1, maxDataList) {
      // 0%处颜色(列表颜色从底往上)
      var barColor0 = ['rgba(135,74,227,0.19)', 'rgba(135,74,227,0.19)', 'rgba(60,225,227,0.19)', 'rgba(60,225,227,0.19)', 'rgba(60,225,227,0.19)', 'rgba(60,225,227,0.19)', 'rgba(60,225,227,0.19)', 'rgba(177,227,98,0.19)', 'rgba(177,227,98,0.19)', 'rgba(177,227,98,0.19)']
      // 100%处颜色
      var barColor1 = ['rgba(74,106,227,1)', 'rgba(74,106,227,1)', 'rgba(60,171,226,1)', 'rgba(60,171,226,1)', 'rgba(60,171,226,1)', 'rgba(60,171,226,1)', 'rgba(60,171,226,1)', 'rgba(190,161,53,1)', 'rgba(190,161,53,1)', 'rgba(190,161,53,1)']
      // var dataList = ['386', '453', '485', '513', '523', '623', '768', '789', '1023', '1123']
      // var yDataList = ['卓玛泉', '燃油宝', '长白山', '雀巢咖啡', '口香糖', '欧露纸', '红牛', '牙刷', '香槟', '棒棒糖']
      // var yDataList1 = ['386笔', '453笔', '485笔', '513笔', '523笔', '623笔', '768笔', '789笔', '1023笔', '1123笔']
      // 柱状图数值
      var seriesData = {
        name: '最喜欢商品TOP10',
        type: 'bar',
        data: dataList,
        label: {
          show: false, // 是否显示数值
          position: 'right',
          textStyle: {
            color: '#fff'
          }
        },
        barWidth: '10',
        itemStyle: {
          normal: {
            barBorderRadius: 6,
            color: function (params) {
              return { // 图表渐变色设置
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1, // 1渐变从左向右，0渐变从上向下
                y2: 0,
                colorStops: [{ // 0% 处的颜色
                  offset: 0, color: barColor0[params.dataIndex]
                }, { // 100% 处的颜色
                  offset: 1, color: barColor1[params.dataIndex]
                }],
                globalCoord: true // 缺省为 false
              }
            }
          }
        }
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('likeGoodsCharts'))
      // 绘制图表
      myChart.setOption({
        title: {},
        tooltip: {
          // position: ['30%', '20%'],
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line'// 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{a} <br/>{b} : {c}',
          showContent: true
        },
        grid: {
          // left: '100',
          left: '0',
          right: '0',
          bottom: '5',
          top: '1',
          containLabel: true // 是否包含坐标轴刻度标签
        },
        xAxis: {
          show: false, // 是否显示x轴
          inside: false
        },
        yAxis: [
          {
            type: 'category', // y轴显示内容，x轴显示图表
            data: yDataList,
            axisLabel: { // 设置y轴字体
              // margin: 100,
              textStyle: {
                // align: 'left',
                align: 'right',
                color: '#D8EFFB',
                fontSize: 11
              }
            },
            axisLine: { // 设置y轴
              lineStyle: {
                color: 'rgba(95, 82, 160, 0)',
                width: 0
              }
            }
          },
          // 显示在图表后面数据
          {
            axisTick: 'none',
            axisLine: 'none',
            axisLabel: {
              textStyle: {
                // align: 'right',
                align: 'left',
                color: '#D8EFFB',
                fontSize: 11
              }
            },
            data: yDataList1
          }
        ],
        series: [ // 设置柱状图最大值
          seriesData,
          {
            name: '外框',
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: 6,
                color: 'rgba(0, 5, 48, 1)'
              }
            },
            barGap: '-100%',
            z: 0,
            barWidth: 11,
            data: maxDataList
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
  .wraper {
    width: 100%
    height: 100%
    color: #97a8f7
    background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_right_b.png") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    font-family: Source Han Sans CN
    font-weight: 400
    position: relative
    .wrap{
      width: 100%
      height: 100%
      padding: vh(42) vw(35) vh(0) vw(35)
      .buy-title{
        font-size: vw(16)
        color: rgba(81,215,248,1)
        line-height: vh(38)
        text-align: right
        span{
          margin-left: vw(5)
        }
      }
      .chart{
        width: 100%
        height: 100%
      }
      .rank-cont-list{
        height: auto
        max-height: vh(320)
        overflow: auto
        padding: 0
        margin: 0
        .list-title{
          padding: vh(3) 0
          div{
            height: vh(25)
            line-height: vh(25)
            overflow: hidden
            font-size: vw(12)!important
          }
        }
        ul{
          height: auto
          .list-bg{
            background: #060E41
          }
          li{
            height: vh(28)
            color: #D8EFFB
            list-style: none
            font-size: vw(14)
            padding: 0
            overflow: hidden
            .list-number{
              text-align: left!important
            }
            .list-numbers{
              text-align: left!important
            }
            .list-num{
              line-height: vw(20)
              text-align: left
            }
            .list-name{
              text-align: center
              height: vh(25)
              line-height: vh(25)
              overflow: hidden
            }
            .list-price{
              height: vh(25)
              line-height: vh(25)
              overflow: hidden
              display: flex
              justify-content: flex-end
            }
            .ranknum0{
              background: #DE5656
            }
            .ranknum1{
              background: #B69B36
            }
            .ranknum2{
              background: #7E59F1
            }
            .red-bg{
              background: #993548
            }
          }
          .list-img{
            line-height: vh(2)!important
            margin-bottom: vh(8)
            img{
              width: 100%!important
              height: vh(2)
            }
          }
        }
      }
      .blue-color{
        color: #5C74D1!important
        font-size: vw(12)!important
      }
      .flex{
        width: 44%
      }
      .flex1{
        width: 27%
      }
      .textleft{
        text-align: left!important
      }
      .textright1{
        width: auto
        text-align: right!important
        padding-right: vw(30)
      }
    }
  }
</style>
