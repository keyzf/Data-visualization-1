<template>
  <div class="value-model-wrapper">
    <div class="icon"></div>
    <div id="valuemodel" class="value-model"></div>
  </div>
</template>

<script>
export default {
  name: 'valueModel',
  data () {
    return {
      valueModelArr: [],
      valueModelName: [],
      valueModelCount: [],
      arrMemberNew: []
    }
  },
  created () {
    this.valueModelForRFM()
  },
  mounted () {
  },
  methods: {
    drawCharts () {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('valuemodel'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b} : <br/>{c} ({d}%)'
        },
        legend: {
          show: true,
          orient: 'vertical', // 垂直显示
          align: 'left',
          y: 'center', // 延Y轴居中
          x: 'right', // 居右显示
          padding: [0, 20, 0, 0],
          data: _this.valueModelName,
          textStyle: { // 图例文字的样式
            color: '#97A8F7',
            fontSize: 12
          },
          icon: 'circle'
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        series: [
          {
            type: 'pie',
            radius: [30, 60],
            center: ['35%', '60%'],
            roseType: 'area',
            data: _this.arrMemberNew,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    ['#197ADE', '#00C1B0'],
                    ['#C47900', '#C8DA35'],
                    ['#BA6EF9', '#4A20CE'],
                    ['#A6FFCB', '#1FA2FF'],
                    ['#20BDFF', '#5433FF'],
                    ['#38EF7D', '#11998E'],
                    ['#F12711', '#F5AF19'],
                    ['#E17C38', '#C71F2B']
                  ]
                  var index = params.dataIndex
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length
                  }
                  return new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [
                      {offset: 0, color: colorList[index][0]},
                      {offset: 1, color: colorList[index][1]}
                    ])
                },
                label: {
                  show: true,
                  formatter: '{c}',
                  textStyle: {
                    color: '#fff',
                    fontSize: 15
                  }
                }
              }
            }
          }
        ]
      })
    },
    // RFM价值模型
    valueModelForRFM () {
      this.valueModelArr = []
      this.valueModelName = []
      this.valueModelCount = []
      this.arrMemberNew = []
      let that = this
      that.$http.get('/webapi/bdview/customerDataAnalysisBS/valueModelForRFM').then(res => {
        if (res.result) {
          this.valueModelArr = res.rows
          this.valueModelArr.filter(item => {
            that.valueModelName.push(item.name)
            that.valueModelCount.push(item.count)
          })
          for (var i = 0; i < that.valueModelCount.length; i++) {
            var activeSubjectsObject = {}
            for (var j = 0; j < that.valueModelName.length; j++) {
              if (i === j) {
                activeSubjectsObject.value = that.valueModelCount[i]
                activeSubjectsObject.name = that.valueModelName[j]
                that.arrMemberNew.push(activeSubjectsObject)
              }
            }
          }
          this.drawCharts()
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .value-model-wrapper {
    width: 100%
    height: pxtovh(245)
    background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg_22.png") no-repeat
    -webkit-background-size: 100% pxtovh(245)
    background-size: 100% pxtovh(245)
    margin-right pxtovw(15)
    position relative
    .value-model {
      width: 100%
      height: 100%
    }
    .icon {
      width: pxtovw(150)
      height: pxtovh(154)
      background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/RFM.png") no-repeat
      -webkit-background-size: 100% pxtovh(153)
      background-size: 100% pxtovh(153)
      position absolute
      top: 50%
      left 50%
      transform translate(-93%, -32%)
    }
  }
</style>
