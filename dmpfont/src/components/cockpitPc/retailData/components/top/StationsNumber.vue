<template>
  <div class="stations-number igs-flex">
    <div class="left_cont">
      <p class="chartTitle">当日自营机出在营站数</p>
      <div class="oilStation" id="oilStation"></div>
    </div>
    <div class="divider"></div>
    <div class="right_cont">
      <p class="title_right">当日自营机出日均同比增减站数</p>
      <div class="chartBox">
        <div class="chart igs-flex">
          <div class="chartCont">
            <div class="pieChart1" id="pieChart1"></div>
            <span>增量站数</span>
          </div>
          <div class="chartCont">
             <div class="pieChart2" id="pieChart2"></div>
              <span>减量站数</span>
          </div>
          <div class="chartCont">
             <div class="pieChart3" id="pieChart3"></div>
             <span>停业站数</span>
          </div>
        </div>
        <div class="typeBox igs-flex">
          <div class="dot_box1"><span class="dot1"></span> 汽油站数</div>
          <div class="dot_box2"><span class="dot2"></span>柴油站数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StationsNumber',
  data () {
    return {
      allvalue: '',
      inConstructionvalue: '',
      builtvalue: ''
    }
  },
  mounted () {
    this.getNewRefuelUserInfo()
    this.pieChart1()
    this.pieChart2()
    this.pieChart3()
  },
  methods: {
    // 5. 网点建设占比
    getNewRefuelUserInfo () {
      this.allvalue = ''
      this.inConstructionvalue = ''
      this.builtvalue = ''
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thNetWorkDevelopmentBS/stationConstructionProportion', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.allvalue = res.data.thMonthNewutlets
          this.inConstructionvalue = res.data.inConstruction
          this.builtvalue = res.data.built
          this.doughnutChart()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.getNewRefuelUserInfo()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    doughnutChart () {
      this.chartBar = this.$echarts.init(document.getElementById('oilStation'))
      let option = {
        tooltip: { // 悬停指示
          trigger: 'item',
          formatter: '{c} ({d}%)'
        },
        legend: {
          show: true,
          icon: 'circle',
          data: ['累计规划', '建设中', '已建成'],
          orient: 'vertical', // 垂直显示
          y: 'bottom', // 延Y轴居中
          x: 'right', // 居右显示
          align: 'left',
          padding: [0, 0, 0, 20],
          textStyle: {
            color: '#97A8F7',
            fontSize: 14
          }
        },
        series: [
          {
            name: '中心饼图',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '40%'],
            hoverAnimation: false,
            selectedOffset: 0,
            center: ['40%', '55%'],
            label: { // 饼图图形上的文本标签
              show: true,
              normal: {
                position: 'center', // 标签的位置
                textStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: '#fff' // 文字的字体大小
                },
                formatter: '{c}'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 1823, name: '累计规划'}
            ],
            color: ['#5C74D1']
          }, {
            name: '环形图',
            type: 'pie',
            radius: ['50%', '75%'],
            center: ['40%', '55%'],
            data: [{
              value: this.inConstructionvalue,
              name: '建设中',
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#348fe6'
                }, {
                  offset: 1,
                  color: '#625bef'
                }])
              },
              label: {
                color: 'rgba(255,255,255,.45)',
                formatter: '{c}',
                textStyle: {
                  color: '#fff',
                  fontSize: 18
                }
              }
            },
            {
              value: this.builtvalue,
              name: '',
              itemStyle: {
                color: 'transparent'
              }
            }
            ]
          },
          {
            name: '环形图',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['40%', '55%'],
            data: [{
              value: this.inConstructionvalue,
              name: '',
              itemStyle: {
                color: 'transparent'
              }
            },
            {
              value: this.builtvalue,
              name: '已建成',
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#CB3E48'
                }, {
                  offset: 1,
                  color: '#FE7881'
                }])
              },
              label: {
                color: 'rgba(255,255,255,.45)',
                formatter: '{c}',
                textStyle: {
                  color: '#fff',
                  fontSize: 18
                }
              }
            }
            ]
          }
        ]
      }
      this.chartBar.setOption(option)
    },
    pieChart1 () {
      this.chartBar = this.$echarts.init(document.getElementById('pieChart1'))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#C3A102', '#2D57CF'],
        series: [
          {
            name: '签到比例分析',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: [
              {value: 335, name: '汽油站数'},
              {value: 310, name: '柴油站数'}
            ]
          }
        ]
      }
      this.chartBar.setOption(option)
    },
    pieChart2 () {
      this.chartBar = this.$echarts.init(document.getElementById('pieChart2'))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#C3A102', '#2D57CF'],
        series: [
          {
            name: '签到比例分析',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: [
              {value: 335, name: '汽油站数'},
              {value: 310, name: '柴油站数'}
            ]
          }
        ]
      }
      this.chartBar.setOption(option)
    },
    pieChart3 () {
      this.chartBar = this.$echarts.init(document.getElementById('pieChart3'))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#C3A102', '#2D57CF'],
        series: [
          {
            name: '签到比例分析',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: [
              {value: 335, name: '汽油站数'},
              {value: 310, name: '柴油站数'}
            ]
          }
        ]
      }
      this.chartBar.setOption(option)
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
  .stations-number {
    height: vh(201)
    width: vw(703)
    background: url("../../../../../../static/images/retail/stations-number.png") no-repeat
    -webkit-background-size: 100% vh(201)
    background-size: 100% vh(201)
    padding:vh(15) vw(15);
    .left_cont{
      width:vw(317)
      height:100%;
      position:relative;
      .chartTitle{
        font-size:16px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(169,184,255,1);
        position:absolute;
        top:0
        left:0
      }
      .oilStation{
        width:100%;
        height:100%;
      }
    }
    .divider {
      height: 100%
      width: pxtovh(2)
      background: url("../../../../../../static/images/retail/img_divider.png") no-repeat
      -webkit-background-size: 100%
      background-size: 100%
      margin pxtovh(0) pxtovw(5) pxtovh(0) pxtovw(5)
    }
    .right_cont{
      flex:1;
      height:100%;
      .title_right{
        font-size:16px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(169,184,255,1);
        line-height:40px;
      }
      .chartBox{
        height:vh(130)
        .chart{
          height:vh(100)
        }
        .typeBox{
          font-size:12px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(151,168,247,1);
          height:vh(30)
          line-height :vh(30)
          text-align:center;
          .dot_box1{
            width:50%;
            text-align:right
            padding-right:vw(8)
            .dot1{
              display:inline-block;
              width:8px;
              height:8px;
              border-radius:4px;
              background #01A6FF
              margin-right:vw(8)
            }
          }
          .dot_box2{
            width:50%;
            text-align:left
            padding-left:vw(8)
            .dot2{
              display:inline-block;
              width:8px;
              height:8px;
              border-radius:4px;
              background #C3A102
              margin-right:vw(8)
            }
          }
        }
      }
      .chartCont{
        flex:1;
         position:relative;
          span{
            position:absolute;
            bottom:0;
            left:50%;
            transform :translate(-50%,0)
          }
        .pieChart1,.pieChart2,.pieChart3{
          height:100%;
          width:100%;

        }
      }
    }

  }
</style>
