<template>
  <div class="structure-wrapper">
    <div class="icon"></div>
    <div id="memberStru" class="member-stru"></div>
  </div>
</template>

<script>
export default {
  name: 'memStructure',
  data () {
    return {
      memberArr: [],
      memberName: [],
      memberCount: [],
      arrMemberNew: []
    }
  },
  created () {
    this.memberStructureCount()
  },
  methods: {
    drawCharts () {
      let _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('memberStru'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false,
          orient: 'vertical',
          bottom: 'bottom',
          data: _this.memberName
        },
        series: [
          {
            type: 'pie',
            radius: '53%',
            center: ['50%', '60%'],
            data: _this.arrMemberNew,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                label: {
                  show: true,
                  formatter: '{c} \n {b}',
                  textStyle: {
                    color: '#97A8F7',
                    fontSize: 12
                  }
                },
                labelLine: {show: true}
              }
            }
          }
        ],
        color: ['#46A6F8', '#345AC8', '#81D5D9', '#BEA135']
      })
    },
    // 会员结构
    memberStructureCount () {
      this.memberArr = []
      let that = this
      that.memberName = []
      that.memberCount = []
      that.arrMemberNew = []
      that.$http.get('/webapi/bdview/customerDataAnalysisBS/memberStructureCount').then(res => {
        if (res.result) {
          this.memberArr = res.rows
          this.memberArr.filter(item => {
            that.memberName.push(item.name)
            that.memberCount.push(item.count)
          })
          for (var i = 0; i < that.memberCount.length; i++) {
            var activeSubjectsObject = {}
            for (var j = 0; j < that.memberName.length; j++) {
              if (i === j) {
                activeSubjectsObject.value = that.memberCount[i]
                activeSubjectsObject.name = that.memberName[j]
                that.arrMemberNew.push(activeSubjectsObject)
              }
            }
          }
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.memberStructureCount()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
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
  .structure-wrapper {
    width: 100%
    height: pxtovh(235)
    margin-bottom pxtovh(22)
    background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg_04.png") no-repeat
    -webkit-background-size: 100% pxtovh(235)
    background-size: 100% pxtovh(235)
    position relative
    .member-stru {
      width: 100%
      height: 100%
    }
    .icon {
      width: pxtovw(145)
      height: pxtovh(145)
      background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg-pie.png") no-repeat
      -webkit-background-size: 100% pxtovh(145)
      background-size: 100% pxtovh(145)
      position absolute
      top: 50%
      left 50%
      transform translate(-50%, -33%)
    }
  }
</style>
