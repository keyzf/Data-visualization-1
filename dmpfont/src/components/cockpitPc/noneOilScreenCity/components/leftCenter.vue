<template>
  <div class="wraper">
    <div class="wrap">
      <div class="chart-bg"></div>
      <div id="monthSaleChart1" class="chart"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftCenter',
  data () {
    return {
    }
  },
  props: ['cityCode'],
  watch: {
    cityCode: {
      handler (newValue, oldValue) {
        this.cityCode = newValue
        this.clearTimeout()
        console.log('clearTimeout' + this.cityCode)
        this.theMonthBasicCategorySales()
      },
      deep: true
    }
  },
  // watch: {
  //   cityCode (val) {
  //     if (this.cityCode !== '') {
  //       this.clearTimeout()
  //       this.theMonthBasicCategorySales()
  //     }
  //   }
  // },
  mounted () {
    console.log('left-top' + this.cityCode)
    this.theMonthBasicCategorySales()
  },
  methods: {
    // 获取月销售基础品类
    theMonthBasicCategorySales () {
      this.$http.post('/webapi/bdview/municipalCompany/theMonthBasicCategorySales', {cityCode: this.cityCode}).then(res => {
        if (res.result === true) {
          this.changeSaleStyleData(res.rows)
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理数据
    changeSaleStyleData (json) {
      let saleStyleData = []
      // 饼状图颜色
      let barColor = ['#345AC8', '#BEA135', '#81D5D9', '#D98181', '#46F8A2', '#46A6F8', '#35BE62', '#C84B4B', '#44A881', '#AFC84B', '#35BB88', '#C68B4B', '#468F81', '#AFHG8B', '#397HK8']
      // 降序处理
      json.sort((a, b) => {
        return b.count - a.count
      })
      // 循环push饼状图数据
      for (var i = 0; i < json.length; i++) {
        let item = {
          value: this.$util.fixedFunc(json[i].count),
          name: json[i].name,
          itemStyle: {
            color: barColor[i]
          }
        }
        saleStyleData.push(item)
      }
      this.drawChartMonthSale(saleStyleData)
      // 是否启动轮询
      if (this.$store.state.stationData.isInterval) {
        this.timer = setTimeout(() => {
          this.theMonthBasicCategorySales()
        }, this.$store.state.stationData.timeInterval)
      }
    },
    // 图表
    drawChartMonthSale (saleStyleData) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('monthSaleChart1'))
      myChart.setOption({
        title: { // 顶部标题设置
          show: false,
          text: '月销售基础品类',
          left: 'center',
          top: '10',
          textStyle: {
            color: '#4C4948',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: { // 鼠标移到图里面的浮动提示框
          position: 'inside', // 提示框位置
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          showContent: true
        },
        legend: {
          // orient: 'vertical', // 垂直分布
          bottom: 1,
          left: 'center',
          textStyle: {
            color: '#A9B8FF',
            fontSize: 12
          },
          itemGap: 7, // 间距
          icon: 'circle', // 这个字段控制形状类型包括circle,rect,roundRect等
          itemWidth: 6, // 设置宽度
          itemHeight: 6 // 设置高度
        },
        series: [
          {
            left: 'left',
            name: '月销售基础品类',
            type: 'pie',
            radius: '45%', // 设置图大小
            center: ['50%', '50%'], // 调整上下边距，x和y
            itemStyle: { // 设置饼状图字体颜色
              normal: {
                label: {
                  textStyle: {
                    color: '#ffffff',
                    fontSize: 15
                  }
                }
              }
            },
            labelLine: { // 饼图指示线长度
              normal: {
                length: 8
              }
            },
            label: { // 以百分比显示设置
              normal: {
                show: true,
                // formatter: '{b} , {c} , {d}%',
                formatter: '{c}',
                textStyle: {
                  color: '#ffffff',
                  fontSize: 12
                }
              }
            },
            data: saleStyleData,
            // data: [ // 饼状图数据名称
            //   {
            //     value: 355,
            //     name: '烟草',
            //     itemStyle: {
            //       color: '#BEA135'
            //     }
            //   },
            // ],
            emphasis: {
              itemStyle: {
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0)'
              }
            }
          }
        ]
      })
    },
    clearTimeout () {
      if (this.timer) {
        window.clearTimeout(this.timer)
        console.log('clearTimeout')
      }
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
  .wraper {
    width: 100%
    height: 100%
    color: #97a8f7
    background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_left_t.png") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    position relative
    .wrap{
      width: 100%
      padding: 0 vw(20)
      .chart{
        width: 100%
        height: vh(340)
        overflow: hidden
      }
    }
    .chart-bgs{
      width: vw(180)
      height: vw(180)
      background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/circle_icon.png") no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
      position absolute
      top: 48%
      left 50%
      transform translate(-50%, -50%)
    }
  }
</style>
