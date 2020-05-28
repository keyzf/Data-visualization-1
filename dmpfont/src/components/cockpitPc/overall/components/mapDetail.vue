<template>
  <div class="map-center">
    <div class="dot_box">
      <p class="title">会员粘性指标</p>
      <div class="line_box_big igs-flex igs-flex2">
        <span class="line_box"></span>
        <span> >1000</span>
      </div>
      <div class="line_box_big igs-flex igs-flex2">
        <span class="line_box"
              style="background:#3D66D4"></span>
        <span>500-1000</span>
      </div>
      <div class="line_box_big igs-flex igs-flex2"
           style="margin-bottom:10px;">
        <span class="line_box"
              style="background:#5486EA"></span>
        <span> &lt; 500人 </span>
      </div>
      <div class="dots">
        <span class="dot"></span>
        <span>有效会员数</span>
      </div>
      <div class="dots">
        <span class="dot dot2"></span>
        <span>会员销量</span>
      </div>
      <div class="dots">
        <span class="dot dot3"></span>
        <span>会员粘性数</span>
      </div>
    </div>
    <div id="myEcharts"
         class="contentMap"></div>
  </div>
</template>

<script>
import '../../../../../node_modules/echarts/map/js/province/guangdong.js'
import 'echarts/lib/component/visualMap' // 引入visualMap相对应的js文件
export default {
  name: 'mapDetail',
  data () {
    return {
      ltopdata: [],
      timeTicket: null
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
          // console.log(this.ltopdata)
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
      // console.log('data' + JSON.stringify(dataChart))
      let myChart = this.$echarts.init(document.getElementById('myEcharts'))
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
        visualMap: {
          textStyle: {
            color: '#97A8F7',
            fontSize: 12
          },
          min: 0,
          right: 20,
          bottom: 90,
          align: 'left',
          showLabel: !0,
          text: ['会员粘性指标'],
          pieces: [{
            gt: 1000,
            label: '> 1000 人',
            color: '#2A53BA'
          }, {
            gte: 500,
            lte: 1000,
            label: '500 - 1000 人',
            color: '#3D66D4'
          }, {
            lt: 500,
            label: '<500人',
            color: '#5486EA'
          }
          ],
          show: false
        },
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
.map-center
  width 100%
  height pxtovh(590)
  position relative
  .dot_box
    padding pxtovh(20)
    border 1px solid rgba(17, 32, 113, 1)
    position absolute
    bottom pxtovh(20)
    right pxtovh(20)
    z-index 0
    .title
      line-height pxtovh(32)
      font-size pxtovh(14)
      font-family Source Han Sans CN
      font-weight bold
      color rgba(151, 168, 247, 1)
    .line_box_big
      margin 0
      padding 0
      height pxtovh(20)
      line-height pxtovh(20)
    .line_box
      display inline-block
      width pxtovh(6)
      height pxtovh(20)
      background #2A53BA
      margin-right pxtovh(10)
      span
        line-height pxtovh(20)
    .dots
      height pxtovh(20)
      line-height pxtovh(20)
      font-size 12px
    .dot
      display inline-block
      width pxtovh(6)
      height pxtovh(6)
      background rgba(182, 155, 54, 1)
      border-radius 50%
      margin-right pxtovh(10)
      &.dot2
        background rgba(68, 162, 243, 1)
      &.dot3
        background rgba(224, 77, 77, 1)
  .contentMap
    width 100%
    height 100%
</style>
