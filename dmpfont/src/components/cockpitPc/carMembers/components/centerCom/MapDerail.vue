<template>
  <div class="mapdetail-wrapper">
    <div id="myEcharts" class="content-map"></div>
  </div>
</template>

<script>
import '../../../../../../node_modules/echarts/map/js/province/guangdong.js'
export default {
  name: 'MapDerail',
  data () {
    return {
      ltopdata: [],
      timeTicket: null,
      mapDataArr: [],
      comprehensiveLength: 0,
      selfSupportLength: 0,
      boutiqueStationLength: 0,
      mapAllDataArr: [],
      seriesArrself: [],
      seriesArrcomprehensive: [],
      boutiqueStation: []
    }
  },
  mounted () {
    this.cityMemberDetailCount()
  },
  methods: {
    // 获取全省油站数据
    cityMemberDetailCount () {
      this.ltopdata = []
      this.mapDataArr = []
      this.mapAllDataArr = []
      this.comprehensiveLength = 0
      this.selfSupportLength = 0
      this.boutiqueStationLength = 0
      if (this.timeTicket) {
        clearInterval(this.timeTicket)
        this.timeTicket = null
      }
      this.$http.post('/webapi/bdview/gasolineDataBS/carMemberMap').then(res => {
        if (res.result === true) {
          this.mapAllDataArr = res.rows
          let xObjself = {}
          let xObjcomprehensive = {}
          res.rows.map((item, index) => {
            this.comprehensiveLength += item.comprehensiveList.length
            this.selfSupportLength += item.selfSupportList.length
            this.boutiqueStationLength += item.boutiqueStationList.length
            if (item.selfSupportList.length !== 0) {
              item.selfSupportList.map((itemList, indexs) => {
                xObjself = {
                  'value': [item.selfSupportList[indexs].longitude, item.selfSupportList[indexs].Latitude]
                }
                this.seriesArrself.push(xObjself)
              })
            }
            if (item.comprehensiveList.length !== 0) {
              item.comprehensiveList.map((itemList, indexs) => {
                xObjcomprehensive = {
                  'value': [item.comprehensiveList[indexs].longitude, item.comprehensiveList[indexs].Latitude]
                }
                this.seriesArrcomprehensive.push(xObjcomprehensive)
              })
            }
            if (item.boutiqueStationList.length !== 0) {
              item.boutiqueStationList.map((itemList, indexs) => {
                xObjcomprehensive = {
                  'value': [item.boutiqueStationList[indexs].longitude, item.boutiqueStationList[indexs].Latitude]
                }
                this.boutiqueStation.push(xObjcomprehensive)
              })
            }
          })
          let aArr = `自营洗车：${this.selfSupportLength}座站`
          let bArr = `综合汽服：${this.comprehensiveLength}座站`
          let cArr = `精品站：${this.boutiqueStationLength}座站`
          this.mapDataArr.push(aArr)
          this.mapDataArr.push(bArr)
          this.mapDataArr.push(cArr)

          for (var i = 0; i < this.mapAllDataArr.length; i++) {
            this.ltopdata.push({
              name: this.mapAllDataArr[i].name + '市',
              value: this.mapAllDataArr[i].selfSupportList,
              activeMembers: this.mapAllDataArr[i].comprehensiveList
            })
          }
          this.guandongChart(this.ltopdata)
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.cityMemberDetailCount()
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
    // 地图显示油站
    guandongChart (dataChart) {
      var that = this
      let myChart = this.$echarts.init(document.getElementById('myEcharts'))
      let option = {
        legend: {
          borderColor: '#97A8F7',
          borderWidth: 1,
          orient: 'vertical',
          bottom: '10%',
          right: '10%',
          data: that.mapDataArr,
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: '#97A8F7'
          }
        },
        geo: {
          show: true,
          roam: false, // 是否可以拖拽
          map: '广东',
          aspectScale: 1,
          zoom: 1.1, // 缩放
          showLegendSymbol: false,
          itemStyle: {
            areaColor: '#3A5CC0',
            borderColor: '#fff'
          },
          label: {
            show: true,
            color: '#fff',
            fontSize: 10
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
            name: that.mapDataArr[0],
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: that.seriesArrself,
            rippleEffect: {
              period: 4,
              scale: 1,
              brushType: 'fill'
            },
            symbolSize: 6,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color: '#fff'
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#E05C57'
              }
            }
          },
          {
            name: that.mapDataArr[1],
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: that.seriesArrcomprehensive,
            rippleEffect: {
              period: 4,
              scale: 1,
              brushType: 'fill'
            },
            symbolSize: 6,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color: '#fff'
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#44A881'
              }
            }
          },
          {
            name: that.mapDataArr[2],
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: that.boutiqueStation,
            rippleEffect: {
              period: 4,
              scale: 1,
              brushType: 'fill'
            },
            symbolSize: 6,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color: '#fff'
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#A447C6'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  beforeDestroy () {
    if (this.timer) {
      window.clearTimeout(this.timer)
    } else if (this.timeTicket) {
      clearInterval(this.timeTicket)
    }
    this.timeTicket = null
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../../assets/css/mixin.styl'
  .mapdetail-wrapper {
    width: vw(853)
    height vh(506)
    margin-bottom vh(16)
    background: url("https://img.gdoil.cn/cockpit/static/images/carMember/center_bg2.png") no-repeat
    -webkit-background-size: 100% vh(505)
    background-size: 100% vh(505)
    .content-map {
      width: 100%
      height: 100%
    }
  }
</style>
