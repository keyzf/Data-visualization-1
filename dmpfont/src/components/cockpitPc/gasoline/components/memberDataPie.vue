<template>
  <div class="pie-wrapper">
    <div id="pieWra" class="pie-wra"></div>
  </div>
</template>

<script>
export default {
  name: 'memberDataPie',
  data () {
    return {
      commonArr: [], // 普通
      diamondArr: [], // 钻石会员
      goldCardArr: [], // 金卡会员
      silverCardArr: [] // 银卡会员
    }
  },
  created () {
    this.customerDataChange()
  },
  methods: {
    drawCharts () {
      let _this = this
      var data = [{
        name: '钻石',
        value: _this.diamondArr
      }, {
        name: '金卡',
        value: _this.goldCardArr
      }, {
        name: '银卡',
        value: _this.silverCardArr
      }, {
        name: '普通',
        value: _this.commonArr
      }]
      let titleArr = []
      let seriesArr = []
      let colors = [
        ['#2D57CF', '#01A6FF'],
        ['#2D57CF', '#C3A102'],
        ['#2D57CF', '#62D8DA'],
        ['#2D57CF', '#B238CD']
      ]
      data.forEach(function (item, index) {
        titleArr.push({
          text: item.name,
          left: index * 25 + 12 + '%',
          top: '80%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '12',
            color: '#A9B8FF',
            textAlign: 'center'
          }
        })
        seriesArr.push({
          name: item.name,
          type: 'pie',
          radius: '50%',
          itemStyle: {
            normal: {
              color: colors[index][0],
              fontSize: 12,
              shadowColor: colors[index][0],
              shadowBlur: 0,
              label: {
                position: 'inner',
                show: true,
                // formatter: '{b}: \n {c} \n {d}%'
                formatter: '{c}'
              },
              labelLine: {
                show: true
              }
            }
          },
          hoverAnimation: false,
          center: [index * 25 + 12 + '%', '50%'],
          data: [{
            value: item.value[0],
            name: '无消费'
          }, {
            value: item.value[1],
            name: '有消费',
            itemStyle: {
              normal: {
                color: colors[index][1]
              },
              emphasis: {
                color: colors[index][1]
              }
            }
          }]
        })
      })
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('pieWra'))
      // 绘制图表
      myChart.setOption({
        title: titleArr,
        series: seriesArr,
        tooltip: {
          show: true,
          formatter: '{a}: <br/>{b} : {c} ({d}%)'
        }
      })
    },
    customerDataChange () {
      this.commonArr = []
      this.diamondArr = []
      this.goldCardArr = []
      this.silverCardArr = []
      let that = this
      this.$http.get('/webapi/bdview/gasolineDataBS/customerDataChange').then(res => {
        if (res.result) {
          let diamondYes = res.data.diamond.no
          let diamondNo = res.data.diamond.yes
          this.diamondArr.push(diamondYes)
          this.diamondArr.push(diamondNo)
          let goldCardYes = res.data.goldCard.no
          let goldCardNo = res.data.goldCard.yes
          this.goldCardArr.push(goldCardYes)
          this.goldCardArr.push(goldCardNo)
          let silverCardYes = res.data.silverCard.no
          let silverCardNo = res.data.silverCard.yes
          this.silverCardArr.push(silverCardYes)
          this.silverCardArr.push(silverCardNo)
          let commonYes = res.data.common.no
          let commonNo = res.data.common.yes
          this.commonArr.push(commonYes)
          this.commonArr.push(commonNo)
          this.drawCharts()
          // 是否启动轮询1
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.customerDataChange()
            }, this.$store.state.stationData.timeIntervals)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    beforeDestroy () {
      if (this.timer) {
        window.clearTimeout(this.timer)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .pie-wrapper {
    height: vh(200)
    width: vw(500)
    background url("https://img.gdoil.cn/cockpit/static/images/gasoline/qie_05.png") no-repeat
    -webkit-background-size: 100% vh(200)
    background-size: 100% vh(200)
    display flex
    justify-content center
    align-items center
    .pie-wra {
      width: 100%
      height: 100%
    }
  }
</style>
