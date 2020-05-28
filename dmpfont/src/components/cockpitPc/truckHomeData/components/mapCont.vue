<template>
  <div class="mapCont fl igs-flex">
      <div class="mapCont_l">
        <div id="mapCont"
            class="contentMap"></div>
      </div>
      <div class="mapCont_r">
            <div class="mapCont_r_t">
                <p class="title">当月柴油豆情况</p>
                <div class="cont_box">
                  <p>柴油豆产生</p>
                   <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                </div>
                 <div class="cont_box">
                  <p>柴油豆兑换</p>
                   <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                </div>
                 <div class="cont_box">
                  <p>柴油豆兑换非油及服务比例</p>
                   <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                </div>
            </div>
            <div class="divider"></div>
            <div class="mapCont_r_b">
                <p class="title">当月柴油豆情况</p>
                <div class="cont_box">
                  <p>柴油豆产生</p>
                   <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                </div>
                 <div class="cont_box">
                  <p>柴油豆兑换</p>
                   <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                </div>
                 <div class="cont_box">
                  <p>柴油豆兑换非油及服务比例</p>
                   <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import '../../../../../node_modules/echarts/map/js/province/guangdong.js'
import 'echarts/lib/component/visualMap' // 引入visualMap相对应的js文件
export default {
  name: 'mapCont',
  data () {
    return {
      ltopdata: [],
      timeTicket: null,
      isLoaded: true,
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '万人', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      }
    }
  },
  mounted () {
    this.cityMemberDetailCount()
  },
  methods: {
    // 获取全省油站数据
    cityMemberDetailCount () {
      this.ltopdata = []
      if (this.timeTicket) {
        clearInterval(this.timeTicket)
        this.timeTicket = null
      }
      this.$http.post('/webapi/bdview/thDataBS /cityMemberDetailCount').then(res => {
        if (res.result === true) {
          // console.log(res)
          var datalist = res.rows
          for (var i = 0; i < datalist.length; i++) {
            this.ltopdata.push({
              name: datalist[i].city + '市',
              value: datalist[i].memberStickiness,
              activeMembers: datalist[i].activeMembers,
              menberSales: datalist[i].menberSales
            })
          }
          console.log(this.ltopdata)
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
      let myChart = this.$echarts.init(document.getElementById('mapCont'))
      let option = {
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          trigger: 'item',
          formatter: function (item) {
            var tipHtml = ''
            for (var i = 0; i < dataChart.length; i++) {
              if (item.name.toString() === (dataChart[i].name).toString()) {
                if (item.name !== '') {
                  tipHtml = '<div style="border-radius:10px;padding:10px 20px">' +
                    '<div style="color:#fff;height:20px;font-size:14px;line-height:20px;text-align:center;">' + item.name + '</div>' +
                    '<div style="text-align:left;color:#494949;";>' + '<span style="margin-top:10px;margin-right:10px;display:inline-block;width:6px; height:6px;border-radious:50%;background:#B69B36;"></span><span style="font-size:12px;font-weight:bold;color:#61D393;">' + dataChart[i].activeMembers + ' ' + '</span>' +
                    '</div>' + '<div style="text-align:left;color:#494949;">' + '<span style="margin-top:10px;margin-right:10px;display:inline-block;width:6px; height:6px;border-radious:50%;background:#44A2F3;"></span><span style="font-size:12px;font-weight:bold;color:#61D393;">' + dataChart[i].menberSales + ' ' + '</span>' +
                    '</div>' + '<div style="text-align:left;color:#494949;">' + '<span style="margin-top:10px;margin-right:10px;display:inline-block;width:6px; height:6px;border-radious:50%;background:#E04D4D;"></span><span style="font-size:12px;font-weight:bold;color:#61D393;">' + dataChart[i].value + ' ' + '</span>' +
                    '</div>' + '</div>'
                  return tipHtml
                } else {
                  return ''
                }
              }
            }
          }
        },
        // visualMap: {
        //   textStyle: {
        //     color: '#97A8F7',
        //     fontSize: 12
        //   },
        //   min: 0,
        //   right: 20,
        //   bottom: 90,
        //   align: 'left',
        //   showLabel: !0,
        //   text: ['会员粘性指标'],
        //   pieces: [{
        //     gt: 1000,
        //     label: '> 1000 人',
        //     color: '#2A53BA'
        //   }, {
        //     gte: 500,
        //     lte: 1000,
        //     label: '500 - 1000 人',
        //     color: '#3D66D4'
        //   }, {
        //     lt: 500,
        //     label: '<500人',
        //     color: '#5486EA'
        //   }
        //   ],
        //   show: false
        // },
        geo: {
          show: true,
          roam: false, // 是否可以拖拽
          map: '广东',
          aspectScale: 1,
          zoom: 1, // 缩放
          showLegendSymbol: false,
          itemStyle: {
            areaColor: '#0E95F1',
            borderColor: '#e9e9e9',
            borderWidth: 1,
            shadowColor: '#0E95F1',
            shadowBlur: 20
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
            type: 'map',
            map: 'guangdong',
            geoIndex: 0,
            label: {
              normal: {
                show: false
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            data: dataChart
          },
          {
            type: 'custom',
            coordinateSystem: 'geo'
          }

        ]
      }

      var count = 0
      // var timeTicket = that.timeTicket
      var dataLength = option.series[0].data.length
      that.timeTicket && clearInterval(that.timeTicket)
      that.timeTicket = setInterval(function () {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0
        })
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: (count) % dataLength
        })
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: (count) % dataLength
        })
        count++
      }, 2000)
      myChart.on('mouseover', function (params) {
        clearInterval(that.timeTicket)
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0
        })
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: params.dataIndex
        })
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: params.dataIndex
        })
      })
      myChart.on('mouseout', function (params) {
        that.timeTicket && clearInterval(that.timeTicket)
        that.timeTicket = setInterval(function () {
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0
          })
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: (count) % dataLength
          })
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: (count) % dataLength
          })
          count++
        }, 2000)
      })
      myChart.setOption(option)
    }
  },
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
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
@import '../../../../assets/css/mixin.styl'
.mapCont{
  text-align center
  width vw(850)
  height vh(506)
  color #97a8f7
  margin-right:vw(15)
  margin-top:vh(15)
  .mapCont_l{
    width:vw(617)
    height:100%;
    background url('../../../../../static/images/truckHomeData/4_icon.png') no-repeat
    -webkit-background-size 100% 100%
    background-size 100% 100%
    margin-right:vw(15)
    .contentMap{
        width 100%
        height 100%
    }

  }
  .mapCont_r{
        width:vw(220)
        height:100%;
        background url('../../../../../static/images/truckHomeData/5_icon.png') no-repeat
        -webkit-background-size 100% 100%
        background-size 100% 100%
        position:relative;
        .divider {
            position:absolute;
            top:50%;
            left:50%;
            transform :translate(-50%,-50%)
            width: 100%
            height: pxtovh(2)
            background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop/img_divider.png") no-repeat
            -webkit-background-size: 100%
            background-size: 100%
        }
        .mapCont_r_t,.mapCont_r_b{
            height:50%;
            padding:vh(20) vw(20);
            .title{
                font-size:16px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(169,184,255,1);
                line-height:32px;
                text-align:left;
            }
            .cont_box{
              text-align:left
              p{
                font-size:14px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(121,136,206,1);
              }
            }
        }
    }
}
</style>
