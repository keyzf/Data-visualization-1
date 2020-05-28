<template>
  <div class="map-wrapper">
    <div id="myEchart" class="content"></div>
    <div class="detail-warpper">
      <div class="num-cont">
        <ul>
          <li class="liFirst"><img src="https://img.gdoil.cn/cockpit/static/images/netDevelop2/builded_icon.png" alt="">已建成:<span class="num"> {{buildedNum}} </span>座站</li>
          <li><span class="icon icon1"></span><span>A类：{{buildedArrA.length}}座站</span></li>
          <li><span class="icon icon2"></span><span>B类：{{buildedArrB.length}}座站</span></li>
          <li><span class="icon icon3"></span><span>C类：{{buildedArrC.length}}座站</span></li>
          <li><span class="icon icon4"></span><span>D类：{{buildedArrD.length}}座站</span></li>
        </ul>
        <ul>
          <li class="liFirst"><img src="https://img.gdoil.cn/cockpit/static/images/netDevelop2/build_icon.png" alt="">建设中:<span class="num"> {{buildingNum}} </span>座站</li>
          <li><span class="icon icon4"></span><span>A类：{{buildingArrA.length}}座站</span></li>
          <li><span class="icon icon5"></span><span>B类：{{buildingArrB.length}}座站</span></li>
          <li><span class="icon icon6"></span><span>C类：{{buildingArrC.length}}座站</span></li>
          <li><span class="icon icon6"></span><span>D类：{{buildingArrD.length}}座站</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../../../node_modules/echarts/map/js/province/guangdong.js'
export default {
  name: 'mapDetail',
  data () {
    return {
      buildedNum: 0, // 已建成数
      buildingNum: 0, // 建设中数
      buildedArrA: [],
      buildedArrB: [],
      buildedArrC: [],
      buildedArrD: [],
      buildingArrA: [],
      buildingArrB: [],
      buildingArrC: [],
      buildingArrD: []
    }
  },
  mounted () {
    this.getOilStationList()
    // this.chinaConfigure()
  },
  methods: {
    // 获取全省油站数据
    getOilStationList () {
      this.$http.post('/webapi/bdview/thNetWorkDevelopmentBS/getOilStationList').then(res => {
        if (res.result === true) {
          console.log('地图', res.data)
          // let jsonData = res.data
          let buildedList = res.data.builtList
          let buildingList = res.data.inConstructionList
          this.buildedNum = buildedList.length
          this.buildingNum = buildingList.length

          this.buildingArrA = buildingList.filter(obj => {
            return obj.oilType === 'A'
          })
          this.buildingArrB = buildingList.filter(obj => {
            return obj.oilType === 'B'
          })
          this.buildingArrC = buildingList.filter(obj => {
            return obj.oilType === 'C'
          })
          this.buildingArrD = buildingList.filter(obj => {
            return obj.oilType === 'D'
          })

          this.buildedArrA = buildedList.filter(obj => {
            return obj.oilType === 'A'
          })
          this.buildedArrB = buildedList.filter(obj => {
            return obj.oilType === 'B'
          })
          this.buildedArrC = buildedList.filter(obj => {
            return obj.oilType === 'C'
          })
          this.buildedArrD = buildedList.filter(obj => {
            return obj.oilType === 'D'
          })
          this.chinaConfigure(buildedList, buildingList)
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.getOilStationList()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 地图显示油站
    chinaConfigure (buildedList, buildingList) {
      let myChart = this.$echarts.init(document.getElementById('myEchart'))
      window.onresize = myChart.resize
      myChart.setOption({ // 进行相关配置
        backgroundColor: '#000232',
        tooltip: { // 鼠标移到图里面的浮动提示框
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          showContent: true
        },
        // 定义tab显示标签(暂时隐藏)
        legend: {
          type: 'plain',
          show: false,
          orient: 'vertical',
          top: 'bottom',
          left: 'center',
          data: [
            {
              name: '已建成',
              icon: 'circle',
              textStyle: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 11
              }
            },
            {
              name: '建设中',
              icon: 'circle',
              textStyle: {
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 11
              }
            }
          ]
        },
        geo: { // 地图配置区
          map: '广东', // 地图
          roam: false, // 是否可以拖拽
          zoom: 1.2, // 设置地图大小
          aspectScale: 1, // 长宽比
          showLegendSymbol: true, // 存在legend时显示
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: { // 地图区域默认颜色
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 11
              }
            },
            emphasis: { // 鼠标滑到区域颜色
              show: true,
              textStyle: {
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: 11
              }
            }
          },
          itemStyle: {
            normal: { // 地图默认显示颜色
              borderColor: 'rgba(255, 255, 255, 0.6)',
              shadowColor: 'rgba(0, 0, 0, 0)',
              shadowBlur: 0,
              shadowOffsetX: 0,
              areaColor: '#345AC7'
            },
            emphasis: { // 鼠标滑到地图显示设置
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 0,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0)',
              areaColor: '#FFD181',
              color: '#fff'
            }
          }
        },
        series: [
          {
            name: '已建成',
            type: 'custom', // 配置显示方式为用户自定义
            coordinateSystem: 'geo',
            itemStyle: {
              normal: {
                color: '#F15051' // legend图标颜色
              }
            },
            renderItem (params, api) { // 具体实现自定义图标的方法
              return {
                type: 'image',
                style: {
                  image: 'https://img.gdoil.cn/cockpit/static/images/netDevelop2/builded_icon.png', // 三个点红绿蓝
                  width: 5,
                  x: api.coord([
                    buildedList[params.dataIndex].location[1],
                    buildedList[params.dataIndex].location[0]
                  ])[0],
                  y: api.coord([
                    buildedList[params.dataIndex].location[1],
                    buildedList[params.dataIndex].location[0]
                  ])[1]
                }
              }
            },
            data: buildedList
          },
          {
            name: '建设中',
            type: 'custom', // 配置显示方式,custom:用户自定义,effectScatter:默认
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              emphasis: {
                show: true,
                position: 'right',
                formatter: '{b}'
              }
            },
            symbolSize: 10,
            showEffectOn: 'render',
            itemStyle: {
              normal: {
                color: '#637EE8'
              }
            },
            renderItem: function (params, api) { // 具体实现自定义图标的方法
              return {
                type: 'image',
                style: {
                  image: 'https://img.gdoil.cn/cockpit/static/images/netDevelop2/build_icon.png', // 三个点绿青蓝
                  width: 5,
                  x: api.coord([
                    buildingList[params.dataIndex].location[1],
                    buildingList[params.dataIndex].location[0]
                  ])[0],
                  y: api.coord([
                    buildingList[params.dataIndex].location[1],
                    buildingList[params.dataIndex].location[0]
                  ])[1]
                }
              }
            },
            data: buildingList
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

.map-wrapper {
  text-align center
  width: 100%
  height: vh(505)
  background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop2/qietu_12.png") no-repeat
  -webkit-background-size: 100% vh(505)
  background-size: 100% vh(505)
  padding: vh(3) 0
  position relative
  .content {
    width: 95%
    height: 100%
    margin 0 auto
  }
  .detail-warpper{
    position: absolute
    bottom: 10px
    right: 20px
    text-align left
    width: vw(180)
    height: vh(220)
    border:1px solid rgba(17,32,113,1);
    display flex
    justify-content center
    align-items center
    color: #97a8f7
    font-size: vw(12)
    li {
      line-height: vh(20)
      position:relative;
      img{
        width:vw(14)
        height:vh(20)
        position:absolute;
        top:50%;
        margin-top:-7px;
        left:0;
      }
    }
    .liFirst{
      padding-left:vw(20)
    }
    .build, .building {
      display inline-block
      width: vw(14)
      height: vh(14)
      margin-right vw(14)
    }
    .build {
      background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop2/builded_icon.png") no-repeat
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
    }
    .building {
      background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop2/build_icon.png") no-repeat
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
    }
    .num {
      font-size:19px;
      font-family:Source Han Sans CN;
      font-weight:bold;
      color:rgba(255,255,255,1);
    }
    .icon {
      display inline-block
      width: vw(8)
      height: vh(8)
      border-radius vw(4)
      margin-right vw(20)
    }
    .icon1 {
      background-color: #E05C57
    }
    .icon2 {
      background-color: #44A881
    }
    .icon3 {
      background-color: #A447C6
    }
    .icon4 {
      background-color: #B69B36
    }
    .icon5 {
      background-color: #44A2F3
    }
    .icon6 {
      background-color: #7E44F3
    }
  }
}
</style>
