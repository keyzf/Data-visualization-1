<template>
  <div class="overallTopCenter">
      <div class="top">
        <div class="top_cont">
          <p class="time">截止时间： {{currentTime}}</p>
          <div class=" member_num igs-flex igs-flex6 igs-flex2">
            <p>同时在线会员数</p>
            <p>{{onlineMember || 0}}</p>
            <!-- <div class="info" style="width:50%" ><count-num :value="onlineMember" :setType="setType" v-if="isLoaded"></count-num></div> -->
          </div>
        </div>
        <div class="bottom_cont igs-flex igs-flex2">
          <div class="cont">
              <img class="member_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-all.png" alt="">
              <p>累计会员数</p>
              <p class="num">{{$util.funNum(memberTotal) || 0}}<span class="unit_span">{{$util.funUnit(memberTotal)}}人</span> </p>
          </div>
          <div class="cont">
              <img class="member_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-active.png" alt="">
              <p>当月活跃会员数</p>
              <p class="num">{{$util.funNum(theMonthActiveMemberCount) || 0 }}<span class="unit_span">{{$util.funUnit(theMonthActiveMemberCount)}}人</span></p>
          </div>
          <div class="cont">
              <img class="member_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-add.png" alt="">
              <p>当月新增会员数</p>
              <p class="num">{{$util.funNum(theMonthAddMemberCount) || 0}}<span class="unit_span">{{$util.funUnit(theMonthAddMemberCount)}}人</span></p>
          </div>
        </div>
      </div>
      <div class="mapBox">
        <div class="map" id="chartsMap">

        </div>
        <div class="maptarget ">
          <p><span class="dot"></span>会员活跃比例</p>
          <p><span  class="dot" style="background:rgba(255,180,87,1)"></span>会员比例前三名</p>
          <p><span  class="dot" style="background:rgba(255,101,101,1)"></span>会员比例后三名</p>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom_title">
          <p class="titile">过去12小时会员实时概况</p>
          <div v-if="!isshow" class="target">
             <p><img class="target_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-Insurancetarget.png" alt=""> 活跃会员数
             <span class="target_num">{{$util.funNum(todayActiveMemberCount)}}</span>{{$util.funUnit(todayActiveMemberCount)}}人</p>
          </div>
        </div>
        <div v-if="!isshow"  id="chartLine" class="chartLine"></div>
        <div class="right_bottom_ul" v-else>
            <p style="line-height:40px;text-align:center;">暂无数据</p>
        </div>
      </div>
  </div>
</template>
<script>
import '../../../../node_modules/echarts/map/js/province/guangdong.js'
import 'echarts/lib/component/visualMap' // 引入visualMap相对应的js文件
export default {
  name: 'overallTopCenter',
  data () {
    return {
      onlineMember: '',
      memberTotal: '',
      theMonthActiveMemberCount: '',
      theMonthAddMemberCount: '',
      todayActiveMemberCount: '',
      ltopdata: [],
      topthree: '',
      afterthree: '',
      timeLine: [],
      dataLine: [],
      isshow: true,
      activeMapData: [],
      currentTime: '',
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      isLoaded: false
    }
  },
  created () {

  },
  mounted () {
    this.setInterval()
    this.onlineMemberCount()
    this.memberDetail()
  },
  methods: {
    // 获取实时时间
    setInterval () {
      this.timer = setInterval(() => {
        this.formatTime(new Date())
      }, 1000)
    },
    // 标准时间转一般时间
    formatTime (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()

      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      this.currentTime = [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
    },
    formatNumber (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    //      2. 在线会员数
    // GET /bdview/appBusiAnalysis/onlineMemberCount
    onlineMemberCount () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/appBusiAnalysis/onlineMemberCount', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.onlineMember = res.data
          this.isLoaded = true
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    //     3. 会员明细
    // GET /bdview/appBusiAnalysis/memberDetail
    memberDetail () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/appBusiAnalysis/memberDetail', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          console.log(res.data)
          this.memberTotal = res.data.memberTotal
          this.theMonthActiveMemberCount = res.data.theMonthActiveMemberCount
          this.theMonthAddMemberCount = res.data.theMonthAddMemberCount
          this.todayActiveMemberCount = res.data.todayActiveMemberCount

          var appActiveMemberList = res.data.appActiveMemberList
          if (appActiveMemberList.length > 0) {
            for (var j = 0; j < appActiveMemberList.length; j++) {
              this.timeLine.push(appActiveMemberList[j].name + ':00')
              this.dataLine.push(appActiveMemberList[j].count)
            }
            this.isshow = false
            this.$nextTick(function () {
              // 此时已经渲染完成,刷新页面
              this.drawCharts()
            })
          } else {
            this.isshow = true
          }

          var activeMemberRateList = res.data.activeMemberRateList
          for (var i = 0; i < activeMemberRateList.length; i++) {
            this.ltopdata.push({
              name: activeMemberRateList[i].name + '市',
              value: activeMemberRateList[i].rate
            })
          }
          var dataList = this.ltopdata.sort(this.compare('value'))
          // 前三第三名
          this.topthree = dataList[3].value
          this.afterthree = dataList[17].value
          console.log(this.topthree, this.afterthree)
          this.guandongChart(this.ltopdata)
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
    guandongChart (dataChart) {
      var that = this
      // console.log('data' + JSON.stringify(dataChart))
      let myChart = this.$echarts.init(document.getElementById('chartsMap'))
      let option = {
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          trigger: 'item',
          formatter: function (params) {
            if (typeof (params.value)[2] === 'undefined') {
              	return params.name + ' : ' + params.value // eslint-disable-line
            } else {
              	return params.name + ' : ' + params.value[2]// eslint-disable-line
            }
          }
        },
        //  visualMap: {
        //   textStyle: {
        //     color: '#97A8F7',
        //     fontSize: 12
        //   },
        //   min: 0,
        //   right: 20,
        //   bottom: 90,
        //   align: 'left',
        //   showLabel: false,
        //   text: ['会员比例前三名'],
        //   pieces: [{
        //     gt: that.topthree,
        //     label: '会员比例前三名',
        //     color: '#FFB457'
        //   }, {
        //     gte: that.afterthree,
        //     lte: that.topthree,
        //     label: '非',
        //     color: '#DCE8FE'
        //   }, {
        //     lt: that.afterthree,
        //     label: '会员比例后三名',
        //     color: '#FF6565'
        //   }
        //   ],
        //   show: false
        // },
        visualMap: {
          show: false,
          min: 0,
          left: 'left',
          top: 'bottom',
          seriesIndex: [1],
          pieces: [{
            gt: that.topthree,
            label: '会员比例前三名',
            color: '#FFB457'
          }, {
            gte: that.afterthree,
            lte: that.topthree,
            label: '非',
            color: '#DCE8FE'
          }, {
            lt: that.afterthree,
            label: '会员比例后三名',
            color: '#FF6565'
          }
          ]
        },
        geo: {
          show: true,
          map: '广东',
          label: {
            normal: {
              show: true,
              fontSize: 8,
              color: '#333333'
            },
            emphasis: {
              show: true
            }
          },
          aspectScale: 1,
          roam: false,
          zoom: 1.2, // 缩放
          showLegendSymbol: false,
          itemStyle: {
            areaColor: '#DCE8FE',
            borderColor: '#fff',
            borderWidth: 1,
            shadowColor: '#DCE8FE',
            shadowBlur: 10
          },
          emphasis: {
            label: {
              show: true,
              color: '#fff',
              fontSize: 10
            },
            itemStyle: {
              areaColor: '#FFD181',
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        },
        series: [
          {
            name: 'light',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: that.convertData(dataChart),
            symbolSize: function (val) {
              return val[2] / 10
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#F4E925'
              }
            }
          },
          {
            type: 'map',
            map: 'guangdong',
            geoIndex: 0,
            aspectScale: 0.75, // 长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#FFFFFF'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: dataChart
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: that.convertData(dataChart),
            symbolSize: function (val) {
              return val[2] / 10
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#335AC7',
                shadowBlur: 10,
                shadowColor: '#05C3F9'
              }
            },
            zlevel: 1
          }

        ]
      }
      myChart.setOption(option)
    },
    convertData (data) {
      var geoCoordMap = {
        '汕尾市': ['115.38', '22.88'],
        '湛江市': ['110.36', '21.37'],
        '广州市': [ '113.24', '23.26' ],
        '汕头市': [ '116.69', '23.49' ],
        '茂名市': [ '110.88', '21.78' ],
        '佛山市': [ '113.11', '23.15' ],
        '江门市': [ '113.06', '22.71' ],
        '深圳市': [ '114.07', '22.72' ],
        '珠海市': [ '113.52', '22.4' ],
        '韶关市': [ '113.62', '24.94' ],
        '清远市': [ '113.01', '23.8' ],
        '惠州市': [ '114.4', '23.19' ],
        '河源市': [ '114.68', '23.83' ],
        '东莞市': [ '113.75', '23.14' ],
        '梅州市': [ '116.1', '24.65' ],
        '潮州市': [ '116.63', '23.78' ],
        '揭阳市': [ '116.35', '23.65' ],
        '中山市': [ '113.38', '22.62' ],
        '阳江市': [ '111.95', '21.95' ],
        '肇庆市': [ '112.44', '23.15' ],
        '云浮市': [ '112.02', '22.99' ]
      }
      var res = []

      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    },
    drawCharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('chartLine'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 0,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.timeLine,
          axisTick: {
            show: false
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#333333',
              width: 1
            }
          }
        },
        yAxis: {
          show: false,
          type: 'value',
          splitNumber: 4,
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DDD'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          nameTextStyle: {
            color: '#999'
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            name: '活跃会员',
            type: 'line',
            smooth: true, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'circle', // 标记的图形为实心圆
            symbolSize: 6, // 标记的大小
            data: this.dataLine,
            itemStyle: {
              // 折线拐点标志的样式
              color: '#1C58FF'
            },
            areaStyle: {
              color: 'rgba(5,140,255, 0.2)'
            }
          }
        ]
      })
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer) // 销毁定时器
      }
    }
  },
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  }
}
</script>
<style lang="stylus" scoped>
  @import '../../../assets/css/mixin.styl'
    .overallTopCenter{
        height:vh(800);
        width:vw(1072);
         .info{
            /deep/ .wrapers{
                    height: vh(30)
                    margin-top:vh(6)
                  .box-item{
                    font-size: pxtovh(30)!important
                    .number-item{
                      width: vw(40)
                      margin:0 vw(5)
                      background:#5974D7;
                      i{
                        left:50%!important;
                        // transform :translate(-68%,0)
                      }
                    }
                  }
                  .unit-span{
                    font-size :pxtovh(12);
                  }
              }
            width:25%;
            text-align :center;
            p{
              line-height :pxtovh(40);
              font-size :pxtovh(12);
              font-family:Source Han Sans CN;
              font-weight:bold;
              color:rgba(92,116,209,1);
              .num{
                font-size:pxtovh(30);
                font-family:LcdD;
                font-weight:bold;
                color:rgba(129,213,217,1);
              }
            }
          }
        .top{
          width:100%;
          height:vh(190);
          background :#fff;
          border-radius:6px;
          padding:vh(15) vw(15);
          margin-bottom:vh(10);
          .top_cont{
              height:vh(95);
              border-bottom:1px solid #DDDDDD
              .time{
                font-size:vw(14);
                font-family:SourceHanSansCN-Normal,SourceHanSansCN;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:vh(21);
              }
              .member_num{
                font-size:vw(18);
                font-family:SourceHanSansCN-Normal,SourceHanSansCN;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:vh(80);
              }
          }
          .bottom_cont{
            height:vh(65);
            .cont{
              width:33.3%;
              font-size:vw(14);
              line-height:vh(22);
              position:relative;
              padding-left:vw(50);
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
              width:vw(44);
              position:absolute;
              top:vh(10);
              left:0;
            }
          }
        }
        .mapBox{
          position:relative;
          .map{
            width:100%;
            height:vh(365);
            background :#fff;
            margin-bottom:vh(10);
            border-radius:6px;
          }
          .maptarget{
            position:absolute;
            bottom:vh(20);
            right:vw(20);
            z-index:1000;
              p{
                font-size:12px;
                font-family:SourceHanSansCN-Normal,SourceHanSansCN;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:24px;
                .dot{
                  display:inline-block;
                  width:vw(12);
                  height:vh(12)
                  radius:6px;
                  margin-right:10px;
                  background:rgba(51,90,199,1);
                  border-radius:6px;
                }
              }
          }
        }
        .bottom{
          width:100%;
          height:vh(225);
          background :#fff;
          border-radius:6px;
          padding:vh(15) vw(15);
          margin-top:vh(10);
          .chartLine{
            width:100%;
            height:vh(130)
          }
          .bottom_title{
            height:vh(60);
            width:100%;
            .titile{
              font-size:vw(18);
              font-family:SourceHanSansCN-Medium,SourceHanSansCN;
              font-weight:500;
              color:rgba(51,51,51,1);
              line-height:vh(27);
            }
            .target{
            font-size:vw(16);
            font-family:SourceHanSansCN-Normal,SourceHanSansCN;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:vh(24);
            padding-left:vh(40);
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
              line-height:vh(24);}
          }
          }
        }
    }
</style>
