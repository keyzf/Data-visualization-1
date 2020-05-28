<template>
  <div class="overallTopRight">
    <div class="right_top">
      <p class="right_top_title">超星会员</p>
      <div class="right_top_cont">
        <div class="right_top_cont_t igs-flex"><!--<span class="unit_span">{{$util.funUnit()}}人</span>-->
          <div class="left">
            <div class="target">
              <p><img class="target_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-membertarget.png" alt=""> 超星会员目标
              <span class="target_num"> {{$util.funNum(superStarTarget.goalmonerysum) || 0}}</span> {{$util.funUnit(superStarTarget.goalmonerysum)}}人</p>
            </div>
            <div class="dash_board igs-flex">
              <div class="nowdatabox">
                <div class="dashBoardChart" id="dashBoardChart5">

                </div>

              </div>

            <div class="dashBoardRight">
                  <div class="nowdata">
                    <div class="title_box igs-flex">
                      <p class="p1"><span class="dot" style="background:#0BC036"></span>当期完成量</p>
                      <p class="p2">当期完成率</p>
                    </div>
                    <div class="nowdata_p">
                      <p class="nowdata_span1 shuzi" style="color:#0BC036">{{$util.funNum(superStarTarget.currentcompleted) || 0}}<span class="unit_span">{{$util.funUnit(superStarTarget.currentcompleted)}}人</span></p>
                      <span class="nowdata_span2 shuzi" style="color:#0BC036">{{superStarTarget.currentcompletedPercent || 0}}%</span>
                    </div>
                  </div>
                  <div class="nowdata">
                    <div class="title_box igs-flex">
                      <p class="p1"><span class="dot"></span>当期应完成率</p>
                      <p class="p2">超欠时间进度</p>
                    </div>
                    <div class="nowdata_p">
                      <p class="nowdata_span1 shuzi" style="color:#0BC036">{{superStarTarget.shouldfinishPercent || 0}}%</p>
                      <span class="nowdata_span2 shuzi" :class="superStarTarget.overtimeSchedule>0 ?'classGreen':'classRed'">{{$util.fixedFunc2(superStarTarget.overtimeSchedule) || 0}}%</span>
                    </div>
                  </div>
                  <!-- <div class="igs-flex igs-flex2 dashBoardRight_cont_t dashBoardRight_cont">
                    <div style="width:60%;">
                      <p>同比去年</p>
                      <p style="color:rgba(251,36,36,1);"><span class="shuzi"> {{superStarTarget.goalmonerysumYoY}}</span></p>
                    </div>
                    <div style="width:40%;">
                      <p>同比增减幅</p>
                      <p><span class="shuzi">{{$util.fixedFunc1(superStarTarget.amplificationYoY) || 0}}%</span></p>
                    </div>
                  </div> -->
                </div>
            </div>
          </div>
          <div  class="right">
             <div class="target">
              <p><img class="target_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-amount.png" alt=""> 交易金额目标
              <span class="target_num"> {{$util.funNum( superStarSaleAmountTarget.goalmonerysum) || 0}}</span><span class="unit_span">{{$util.funUnit(superStarSaleAmountTarget.goalmonerysum)}}元</span></p>
            </div>
            <div class="dash_board igs-flex">
              <div class="nowdatabox">
                <div class="dashBoardChart" id="dashBoardChart6">

                </div>

              </div>

            <div class="dashBoardRight">
                  <div class="nowdata">
                    <div class="title_box igs-flex">
                      <p class="p1"><span class="dot" style="background:#0BC036"></span>当期完成量</p>
                      <p class="p2">当期完成率</p>
                    </div>
                    <div class="nowdata_p">
                      <p  class="nowdata_span1 shuzi" style="color:#0BC036"> {{$util.funNum( superStarSaleAmountTarget.currentcompleted) || 0}}<span class="unit_span">{{$util.funUnit(superStarSaleAmountTarget.currentcompleted)}}元</span></p>
                      <span  class="nowdata_span2 shuzi" style="color:#0BC036">{{superStarSaleAmountTarget.currentcompletedPercent || 0}}%</span>
                    </div>
                  </div>
                  <div class="nowdata">
                   <div class="title_box igs-flex">
                      <p class="p1"><span class="dot"></span>当期应完成率</p>
                      <p class="p2">超欠时间进度</p>
                    </div>
                    <div class="nowdata_p">
                      <p  class="nowdata_span1 shuzi" style="color:#0BC036">{{superStarSaleAmountTarget.shouldfinishPercent || 0}}%</p>
                      <span  class="nowdata_span2 shuzi" :class="superStarSaleAmountTarget.overtimeSchedule>0 ?'classGreen':'classRed'">{{$util.fixedFunc2(superStarSaleAmountTarget.overtimeSchedule) || 0}}%</span>
                    </div>
                  </div>
                  <!-- <div class="igs-flex igs-flex2 dashBoardRight_cont_t dashBoardRight_cont">
                    <div style="width:40%;">
                      <p>同比去年</p>
                      <p style="color:rgba(251,36,36,1);"><span class="shuzi"> {{ superStarSaleAmountTarget.goalmonerysumYoY}}</span>万元</p>
                    </div>
                    <div style="width:60%;">
                      <p>同比增减幅</p>
                      <p><span class="shuzi"> {{$util.fixedFunc1( superStarSaleAmountTarget.amplificationYoY) || 0}}%</span></p>
                    </div>
                  </div> -->
                </div>
            </div>
          </div>
        </div>
        <div class="right_top_cont_b">
           <div class="bottom_cont igs-flex igs-flex2">
            <div class="cont">
                <img class="member_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-superStart1.png" alt="">
                <p>超星会员数</p>
                <p class="num">{{$util.funNum(superStarMemberCount)||0}}<span class="unit_span">{{$util.funUnit(superStarMemberCount)}}人</span></p>
            </div>
            <div class="cont">
                <img class="member_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-superStart2.png" alt="">
                <p>超白金会员数</p>
                <p class="num">{{$util.funNum(superPlatinaMemberCount)|| 0}}<span class="unit_span">{{$util.funUnit(superPlatinaMemberCount)}}人</span></p>
            </div>
            <div class="cont">
                <img class="member_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-superStart3.png" alt="">
                <p>白金会员数</p>
                <p class="num">{{$util.funNum(platinaMemberCount)|| 0}}<span class="unit_span">{{$util.funUnit(platinaMemberCount)}}人</span></p>
            </div>
          </div>
            <div class="bottom_cont igs-flex igs-flex2">
            <div class="cont">
                <img class="member_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-superStart4.png" alt="">
                <p>今年累计交易会员数</p>
                <p class="num">{{$util.funNum(dealMemberCount) || 0}}<span class="unit_span">{{$util.funUnit(dealMemberCount)}}人</span></p>
            </div>
            <div class="cont">
                <img class="member_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-superStart5.png" alt="">
                <p>今年累计交易金额</p>
                <p class="num">{{$util.funNum(cumulativeTransactionAmount)|| 0}}<span class="unit_span">{{$util.funUnit(cumulativeTransactionAmount)}}元</span></p>
            </div>
            <div class="cont">
                <img class="member_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-superStart6.png" alt="">
                <p>今年累计订单数</p>
                <p class="num">{{$util.funNum(cumulativeOrderCount) || 0}}<span class="unit_span">{{$util.funUnit(cumulativeOrderCount)}}笔</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right_center">
      <p class="right_center_title">今年超星会员新增数量及会员交易趋势</p>
      <div class="cheartBox" id="chartLineBox">

      </div>
    </div>
    <div class="right_bottom">
      <p class="right_bottom_title">超星会员商品销售喜好</p>
      <ul class="right_bottom_ul" v-if="ssmProductSaleLikeList.length>0">
        <li class="right_bottom_li igs-flex igs-flex6" v-for="(item,index) in ssmProductSaleLikeList" :key="index">
          <div class="xuhao">{{index+1}}</div><div class="name">{{item.name}} </div><div class="bishu">{{$util.fixedamount(item.count) || 0}}笔</div>
        </li>
      </ul>
      <div class="right_bottom_ul" v-else>
          <p style="line-height:40px;text-align:center;">暂无数据</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'overallTopRight',
  data () {
    return {
      superStarSaleAmountTarget: {},
      superStarTarget: {},
      superStardata: {},
      superStarSaledata: {},
      cheartDeta: [],
      memberAmount: [],
      memberSum: [],
      superStarMemberCount: '',
      superPlatinaMemberCount: '',
      platinaMemberCount: '',
      dealMemberCount: '',
      cumulativeTransactionAmount: '',
      cumulativeOrderCount: '',
      ssmProductSaleLikeList: []
    }
  },
  created () {

  },
  mounted () {
    // this.dashBoardChart5()
    // this.dashBoardChart6()
    // this.chartLineBox()
    this.superStarMemberDetail()
  },
  methods: {
  //     4. 超星会员明细
  // GET /bdview/appBusiAnalysis/superStarMemberDetail
    superStarMemberDetail () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/appBusiAnalysis/superStarMemberDetail', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.superStarSaleAmountTarget = res.data.superStarSaleAmountTarget// 超星会员交易金额目标
          this.superStarTarget = res.data.superStarTarget// 超星会员目标
          // 超星会员目标
          var currentcompletedPercent = res.data.superStarTarget.currentcompletedPercent// 销售目标当前月份百分比
          var shouldfinishPercent = res.data.superStarTarget.shouldfinishPercent// 应当完成百分比
          // console.log(this.currentcompletedPercent, this.shouldfinishPercent) addMemberdata
          if (currentcompletedPercent < shouldfinishPercent) {
            this.superStardata.data1 = (currentcompletedPercent / 100).toFixed(2)
            this.superStardata.bgcolor1 = '#0BC036'
            this.superStardata.data2 = (shouldfinishPercent / 100).toFixed(2)
            this.superStardata.bgcolor2 = '#C50000'
          } else {
            this.superStardata.data1 = (shouldfinishPercent / 100).toFixed(2)
            this.superStardata.bgcolor1 = '#C50000'
            this.superStardata.data2 = (currentcompletedPercent / 100).toFixed(2)
            this.superStardata.bgcolor2 = '#0BC036'
          }
          // 超星会员销售目标
          var currentcompletedPercent1 = res.data.superStarSaleAmountTarget.currentcompletedPercent// 销售目标当前月份百分比
          var shouldfinishPercent1 = res.data.superStarSaleAmountTarget.shouldfinishPercent// 应当完成百分比
          // console.log(this.currentcompletedPercent, this.shouldfinishPercent) addMemberdata
          if (currentcompletedPercent1 < shouldfinishPercent1) {
            this.superStarSaledata.data1 = (currentcompletedPercent1 / 100).toFixed(2)
            this.superStarSaledata.bgcolor1 = '#0BC036'
            this.superStarSaledata.data2 = (shouldfinishPercent1 / 100).toFixed(2)
            this.superStarSaledata.bgcolor2 = '#C50000'
          } else {
            this.superStarSaledata.data1 = (shouldfinishPercent1 / 100).toFixed(2)
            this.superStarSaledata.bgcolor1 = '#C50000'
            this.superStarSaledata.data2 = (currentcompletedPercent1 / 100).toFixed(2)
            this.superStarSaledata.bgcolor2 = '#0BC036'
          }
          this.dashBoardChart5()
          this.dashBoardChart6()
          // 看板数据
          this.superStarMemberCount = res.data.superStarMemberCount
          this.superPlatinaMemberCount = res.data.superPlatinaMemberCount
          this.platinaMemberCount = res.data.platinaMemberCount
          this.dealMemberCount = res.data.dealMemberCount
          this.cumulativeTransactionAmount = res.data.cumulativeTransactionAmount
          this.cumulativeOrderCount = res.data.cumulativeOrderCount
          // 折线图
          var addSSMList = res.data.addSSMList // 会员数
          var ssmTransactionAmountList = res.data.ssmTransactionAmountList // 交易金额
          for (var i = 0; i < addSSMList.length; i++) {
            this.cheartDeta.push(this.formatdeta(addSSMList[i].name))
            this.memberSum.push(addSSMList[i].count)
          }
          for (var j = 0; j < ssmTransactionAmountList.length; j++) {
            this.memberAmount.push((ssmTransactionAmountList[j].count / 10000).toFixed(2))
          }
          this.chartLineBox()
          // 超星会员商品销售喜好
          var dataList = res.data.ssmProductSaleLikeList
          this.ssmProductSaleLikeList = dataList.sort(this.compare('count'))
          // 排序
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 排序
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    },
    formatdeta (str) {
      var deta = str.slice(-2)
      var detastr = ''
      if (deta.slice(0, 1) === '0') {
        detastr = deta.slice(-1)
      } else {
        detastr = deta
      }
      return detastr
    },
    dashBoardChart5 () {
      // 基于准备好的dom，初始化echarts实例
      var that = this
      console.log(that.superStardata.data1, that.superStardata.data2)

      let myChart = this.$echarts.init(document.getElementById('dashBoardChart5'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          formatter: '{c}%'
        },
        series: [
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              lineStyle: {
                color: [
                  [that.superStardata.data1, that.superStardata.bgcolor1], // 当前
                  [that.superStardata.data2, that.superStardata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                // color: that.colorArr,
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.superStardata.bgcolor1 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.superStardata.data1 * 100
            }]
          },
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              lineStyle: {
                color: [
                  [this.superStardata.data1, this.superStardata.bgcolor1], // 当前
                  [this.superStardata.data2, this.superStardata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                // color: that.colorArr,
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.superStardata.bgcolor2 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.superStardata.data2 * 100
            }]
          }
        ]
      })
    },
    dashBoardChart6 () {
      // 基于准备好的dom，初始化echarts实例
      var that = this
      console.log(that.superStarSaledata.data1, that.superStarSaledata.data2)
      let myChart = this.$echarts.init(document.getElementById('dashBoardChart6'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          formatter: '{c}%'
        },
        series: [
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              lineStyle: {
                color: [
                  [that.superStarSaledata.data1, that.superStarSaledata.bgcolor1], // 当前
                  [that.superStarSaledata.data2, that.superStarSaledata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                // color: that.colorArr,
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.superStarSaledata.bgcolor1 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.superStarSaledata.data1 * 100
            }]
          },
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              lineStyle: {
                color: [
                  [that.superStarSaledata.data1, that.superStarSaledata.bgcolor1], // 当前
                  [that.superStarSaledata.data2, that.superStarSaledata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                // color: that.colorArr,
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.superStarSaledata.bgcolor2 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.superStarSaledata.data2 * 100
            }]
          }
        ]
      })
    },
    chartLineBox () {
      let myChart = this.$echarts.init(document.getElementById('chartLineBox'))
      myChart.setOption({
        grid: {
          top: '25%',
          bottom: '18%'// 也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          data: ['交易金额', '会员数'],
          top: '15%',
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: {
          data: this.cheartDeta,
          axisLine: {
            show: true, // 隐藏X轴轴线
            lineStyle: {
              color: '#01FCE3'
            }
          },
          axisTick: {
            show: true // 隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333333' // X轴文字颜色
            }
          }

        },
        yAxis: [{
          type: 'value',
          name: '会员数（人）',
          nameTextStyle: {
            color: '#333333'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#FFFFFF'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333333'
            }
          }

        },
        {
          type: 'value',
          name: '会员交易金额（万元）',
          nameTextStyle: {
            color: '#333333'
          },
          position: 'right',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333333'
            }
          }
        },
        {
          type: 'value',
          gridIndex: 0,
          splitNumber: 8,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
            }
          }
        }
        ],
        series: [{
          name: '会员数 ',
          type: 'line',
          yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: true, // 平滑曲线显示
          showAllSymbol: true, // 显示所有图形。
          symbol: 'circle', // 标记的图形为实心圆
          symbolSize: 6, // 标记的大小
          itemStyle: {
            // 折线拐点标志的样式
            color: '#FA6400'
          },
          lineStyle: {
            color: '#FA6400'
          },
          areaStyle: {
            color: 'rgba(5,140,255, 0.2)'
          },
          data: this.memberSum
        },
        {
          name: '交易金额',
          type: 'bar',
          barWidth: 15,
          itemStyle: {
            normal: {
              barBorderRadius: [8, 8, 0, 0],
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FFFFFF'
              },
              {
                offset: 1,
                color: '#10B37E'
              }
              ])
            }
          },
          data: this.memberAmount
        }
        ]
      })
    }
  },
  components: {

  }
}
</script>
<style lang="stylus" scoped>
  @import '../../../assets/css/mixin.styl'
    .overallTopRight{
        height:vh(800);
        width:vw(1070);
        margin-left:vw(10);
         .classRed{
          color:rgba(251,36,36,1)!important;
        }
        .classGreen{
         color: #0BC036!important;
        }
        .right_top{
          height:vh(355);
          width:100%;
          background :#fff;
          border-radius:6px;
          margin-bottom:vh(10);
          padding:vh(15) vw(15);
          .right_top_title{
            font-size:vw(18);
            font-family:SourceHanSansCN-Medium,SourceHanSansCN;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:vh(30);
          }
            .right_top_cont{
              // height:vh(400);
              width:100%
            }
            .right_top_cont_b{
              height:vh(140);
            }
             .right_top_cont_b, .right_top_cont_t{
                width:100%;
                .bottom_cont{
                  height:50%;
                  .cont{
                    width:33.3%;
                    position:relative;
                    padding-left:vw(50);
                    font-size:vw(14);
                    .unit_span{
                      font-size:vw(14);
                    }
                    .num{
                      font-size:20px;
                      font-family:DINAlternate-Bold,DINAlternate;
                      font-weight:bold;
                      color:rgba(51,51,51,1);
                      line-height:24px;
                    }
                  }
                  .member_img{
                    width:vw(34);
                    position:absolute;
                    top:vh(10);
                    left:0;
                  }
                }
                .left,.right{
                    width:50%;
                    .dash_board{
                      padding-top:vh(20);
                    }
                    .dashBoardChart{
                      height:100%;
                      width:100%;
                      background #fff;
                      // padding-top:vh(20);
                    }
                    .nowdatabox{
                        width:40%;
                        position:relative;
                        .nowdata{
                          width:100%;
                          text-align:center;
                          font-size:vw(8);
                          color:#333333;
                          position:absolute;
                          bottom:vh(-20);
                          left:0;
                        }
                      }
                    .dashBoardRight{
                      height:vh(120);
                      width:60%;
                      background #fff;
                      font-size:vw(12);
                      font-family:SourceHanSansCN-Normal,SourceHanSansCN;
                      font-weight:400;
                      color:rgba(51,51,51,1);
                      line-height:vh(20);
                      padding:vh(10) vw(10);
                      .unit_span{
                        font-size:vw(12);
                      }
                      .dot{
                        display:inline-block;
                        width:6px;
                        height:6px;
                        border-radius:3px;
                        background:#C50000;
                        position:absolute;
                        top:50%;
                        margin-top:-3px;
                        left:-10px;
                      }
                      .nowdata{
                          margin-bottom:vh(5)
                          .title_box{
                          .p1{
                            width:60%
                            position:relative;
                          }
                          .p2{
                            width:40%
                          }
                        }
                       .nowdata_p{
                          display:flex;
                          line-height:vh(40);
                          .nowdata_span1{
                            display:inline-block;
                            width:60%;
                            text-align:left;
                          }
                          .nowdata_span2{
                            display:inline-block;
                             width:40%;
                            text-align:left;
                          }
                        }
                      }
                      .shuzi{
                        font-size:vw(16);
                        font-family:DINAlternate-Bold,DINAlternate;
                        font-weight:bold;
                        color:rgba(251,36,36,1);
                        line-height:vh(19);
                      }
                      .dashBoardRight_cont{
                        height:vh(40);
                      }
                      .dashBoardRight_cont_t{
                          height:vh(50);
                      }
                      .dashBoardRight_cont_b{
                        padding-top:vh(10);
                        height:vh(30);
                        line-height:vh(30);
                      }
                    }
                  .target{
                    font-size:vw(16);
                    font-family:SourceHanSansCN-Normal,SourceHanSansCN;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:vh(24);
                    padding-left:vw(40);
                    position:relative;
                    .target_img{
                      width:vw(24);
                      transform: translate(0,-50%);
                      position:absolute;
                      top:50%;
                      left:vw(10);
                    }
                    .target_num{
                      font-size:vw(20);
                      font-family:DINAlternate-Bold,DINAlternate;
                      font-weight:bold;
                      color:rgba(51,51,51,1);
                      line-height:vh(24)
                      }
                  }
                }

          }
        }
        .right_center{
          height:vh(240);
          width:100%;
          background :#fff;
          border-radius:6px;
          margin-bottom:vh(10);
          padding:vh(15) vw(15);
          .right_bottom_title{
            font-size:vw(18);
            font-family:SourceHanSansCN-Medium,SourceHanSansCN;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:vh(30);
          }
          .cheartBox{
            width:100%;
            height:vh(180);
          }
        }
        .right_bottom{
          height:vh(185);
          width:100%;
          background :#fff;
          border-radius:6px;
          padding:vh(15) vw(15);
          .right_bottom_title{
            font-size:vw(18);
            font-family:SourceHanSansCN-Medium,SourceHanSansCN;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:vh(30);
          }
          .right_bottom_ul{
            height:vh(120);
            .right_bottom_li{
              line-height:vh(40);
              font-size:vw(14);
              font-family:SourceHanSansCN-Normal,SourceHanSansCN;
              font-weight:400;
              color:rgba(51,51,51,1);
              .xuhao{
                width:vw(80);
                text-align:center;
              }
              .name{
                flex:1;
                overflow:hidden; //超出的文本隐藏
                text-overflow:ellipsis; //溢出用省略号显示
                white-space:nowrap; //溢出不换行
              }
              .bishu{
                width:vw(100);
              }
            }
          }
        }
    }
</style>
