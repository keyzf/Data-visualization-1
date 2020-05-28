<template>
  <div class="test-wrapper">
    <!--<div class="item">
      <div class="list">
        <div id="diesel" class="diesel"></div>
      </div>
      <div class="list">
        <div id="diese2" class="diese2"></div>
      </div>
    </div>
    <div class="item">
      <div class="list">
        <div id="diese3" class="diese3"></div>
      </div>
      <div class="list">
        <div id="diese4" class="diese4"></div>
      </div>
    </div>
    <div class="item">
      <div class="list">
        <div id="diese5" class="diese5"></div>
      </div>
      <div class="list">
        <div id="diese6" class="diese6"></div>
      </div>
    </div>-->
    <img src="https://img.gdoil.cn/cockpit/static/images/test/testimg.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BigTestPage'
  // mounted () {
  //   this.drawCharts()
  //   this.drawChartsA()
  //   this.drawChartsA2()
  //   this.drawChartsA3()
  //   this.drawChartsA4()
  //   this.drawChartsA5()
  // },
  // methods: {
  //   drawCharts () {
  //     // 基于准备好的dom，初始化echarts实例
  //     let myChart = this.$echarts.init(document.getElementById('diesel'))
  //     // 绘制图表
  //     myChart.setOption({
  //       title: {
  //         text: 'ECharts 入门示例'
  //       },
  //       tooltip: {},
  //       xAxis: {
  //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  //       },
  //       yAxis: {},
  //       series: [{
  //         name: '销量',
  //         type: 'bar',
  //         data: [5, 20, 36, 10, 10, 20]
  //       }]
  //     })
  //   },
  //   drawChartsA () {
  //     // 基于准备好的dom，初始化echarts实例
  //     let myChart = this.$echarts.init(document.getElementById('diese2'))
  //     // 绘制图表
  //     myChart.setOption({
  //       title: {
  //         text: '堆叠区域图'
  //       },
  //       tooltip: {
  //         trigger: 'axis',
  //         axisPointer: {
  //           type: 'cross',
  //           label: {
  //             backgroundColor: '#6a7985'
  //           }
  //         }
  //       },
  //       legend: {
  //         data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  //       },
  //       toolbox: {
  //         feature: {
  //           saveAsImage: {}
  //         }
  //       },
  //       grid: {
  //         left: '3%',
  //         right: '4%',
  //         bottom: '3%',
  //         containLabel: true
  //       },
  //       xAxis: [
  //         {
  //           type: 'category',
  //           boundaryGap: false,
  //           data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  //         }
  //       ],
  //       yAxis: [
  //         {
  //           type: 'value'
  //         }
  //       ],
  //       series: [
  //         {
  //           name: '邮件营销',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [120, 132, 101, 134, 90, 230, 210]
  //         },
  //         {
  //           name: '联盟广告',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [220, 182, 191, 234, 290, 330, 310]
  //         },
  //         {
  //           name: '视频广告',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [150, 232, 201, 154, 190, 330, 410]
  //         },
  //         {
  //           name: '直接访问',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [320, 332, 301, 334, 390, 330, 320]
  //         },
  //         {
  //           name: '搜索引擎',
  //           type: 'line',
  //           stack: '总量',
  //           label: {
  //             normal: {
  //               show: true,
  //               position: 'top'
  //             }
  //           },
  //           areaStyle: {},
  //           data: [820, 932, 901, 934, 1290, 1330, 1320]
  //         }
  //       ]
  //     })
  //   },
  //   drawChartsA2 () {
  //     // 基于准备好的dom，初始化echarts实例
  //     let myChart = this.$echarts.init(document.getElementById('diese3'))
  //     // 绘制图表
  //     myChart.setOption({
  //       xAxis: {
  //         type: 'category',
  //         boundaryGap: false
  //       },
  //       yAxis: {
  //         type: 'value',
  //         boundaryGap: [0, '30%']
  //       },
  //       visualMap: {
  //         type: 'piecewise',
  //         show: false,
  //         dimension: 0,
  //         seriesIndex: 0,
  //         pieces: [{
  //           gt: 1,
  //           lt: 3,
  //           color: 'rgba(0, 180, 0, 0.5)'
  //         }, {
  //           gt: 5,
  //           lt: 7,
  //           color: 'rgba(0, 180, 0, 0.5)'
  //         }]
  //       },
  //       series: [
  //         {
  //           type: 'line',
  //           smooth: 0.6,
  //           symbol: 'none',
  //           lineStyle: {
  //             color: 'green',
  //             width: 5
  //           },
  //           markLine: {
  //             symbol: ['none', 'none'],
  //             label: {show: false},
  //             data: [
  //               {xAxis: 1},
  //               {xAxis: 3},
  //               {xAxis: 5},
  //               {xAxis: 7}
  //             ]
  //           },
  //           areaStyle: {},
  //           data: [
  //             ['2019-10-10', 200],
  //             ['2019-10-11', 400],
  //             ['2019-10-12', 650],
  //             ['2019-10-13', 500],
  //             ['2019-10-14', 250],
  //             ['2019-10-15', 300],
  //             ['2019-10-16', 450],
  //             ['2019-10-17', 300],
  //             ['2019-10-18', 100]
  //           ]
  //         }
  //       ]
  //     })
  //   },
  //   drawChartsA3 () {
  //     // 基于准备好的dom，初始化echarts实例
  //     let myChart = this.$echarts.init(document.getElementById('diese4'))
  //     // 绘制图表
  //     myChart.setOption({
  //       title: {
  //         text: '堆叠区域图'
  //       },
  //       tooltip: {
  //         trigger: 'axis',
  //         axisPointer: {
  //           type: 'cross',
  //           label: {
  //             backgroundColor: '#6a7985'
  //           }
  //         }
  //       },
  //       legend: {
  //         data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  //       },
  //       toolbox: {
  //         feature: {
  //           saveAsImage: {}
  //         }
  //       },
  //       grid: {
  //         left: '3%',
  //         right: '4%',
  //         bottom: '3%',
  //         containLabel: true
  //       },
  //       xAxis: [
  //         {
  //           type: 'category',
  //           boundaryGap: false,
  //           data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  //         }
  //       ],
  //       yAxis: [
  //         {
  //           type: 'value'
  //         }
  //       ],
  //       series: [
  //         {
  //           name: '邮件营销',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [120, 132, 101, 134, 90, 230, 210]
  //         },
  //         {
  //           name: '联盟广告',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [220, 182, 191, 234, 290, 330, 310]
  //         },
  //         {
  //           name: '视频广告',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [150, 232, 201, 154, 190, 330, 410]
  //         },
  //         {
  //           name: '直接访问',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [320, 332, 301, 334, 390, 330, 320]
  //         },
  //         {
  //           name: '搜索引擎',
  //           type: 'line',
  //           stack: '总量',
  //           label: {
  //             normal: {
  //               show: true,
  //               position: 'top'
  //             }
  //           },
  //           areaStyle: {},
  //           data: [820, 932, 901, 934, 1290, 1330, 1320]
  //         }
  //       ]
  //     })
  //   },
  //   drawChartsA4 () {
  //     var xAxisData = []
  //     var data1 = []
  //     var data2 = []
  //     for (var i = 0; i < 100; i++) {
  //       xAxisData.push('类目' + i)
  //       data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
  //       data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
  //     }
  //     // 基于准备好的dom，初始化echarts实例
  //     let myChart = this.$echarts.init(document.getElementById('diese5'))
  //     // 绘制图表
  //     myChart.setOption({
  //       title: {
  //         text: '柱状图动画延迟'
  //       },
  //       legend: {
  //         data: ['bar', 'bar2']
  //       },
  //       toolbox: {
  //         // y: 'bottom',
  //         feature: {
  //           magicType: {
  //             type: ['stack', 'tiled']
  //           },
  //           dataView: {},
  //           saveAsImage: {
  //             pixelRatio: 2
  //           }
  //         }
  //       },
  //       tooltip: {},
  //       xAxis: {
  //         data: xAxisData,
  //         splitLine: {
  //           show: false
  //         }
  //       },
  //       yAxis: {
  //       },
  //       series: [{
  //         name: 'bar',
  //         type: 'bar',
  //         data: data1,
  //         animationDelay: function (idx) {
  //           return idx * 10
  //         }
  //       }, {
  //         name: 'bar2',
  //         type: 'bar',
  //         data: data2,
  //         animationDelay: function (idx) {
  //           return idx * 10 + 100
  //         }
  //       }],
  //       animationEasing: 'elasticOut',
  //       animationDelayUpdate: function (idx) {
  //         return idx * 5
  //       }
  //     })
  //   },
  //   drawChartsA5 () {
  //     console.log('111111')
  //     // 基于准备好的dom，初始化echarts实例
  //     let myChart = this.$echarts.init(document.getElementById('diese6'))
  //     // 绘制图表
  //     myChart.setOption({
  //       title: {
  //         text: '堆叠区域图'
  //       },
  //       tooltip: {
  //         trigger: 'axis',
  //         axisPointer: {
  //           type: 'cross',
  //           label: {
  //             backgroundColor: '#6a7985'
  //           }
  //         }
  //       },
  //       legend: {
  //         data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  //       },
  //       toolbox: {
  //         feature: {
  //           saveAsImage: {}
  //         }
  //       },
  //       grid: {
  //         left: '3%',
  //         right: '4%',
  //         bottom: '3%',
  //         containLabel: true
  //       },
  //       xAxis: [
  //         {
  //           type: 'category',
  //           boundaryGap: false,
  //           data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  //         }
  //       ],
  //       yAxis: [
  //         {
  //           type: 'value'
  //         }
  //       ],
  //       series: [
  //         {
  //           name: '邮件营销',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [120, 132, 101, 134, 90, 230, 210]
  //         },
  //         {
  //           name: '联盟广告',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [220, 182, 191, 234, 290, 330, 310]
  //         },
  //         {
  //           name: '视频广告',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [150, 232, 201, 154, 190, 330, 410]
  //         },
  //         {
  //           name: '直接访问',
  //           type: 'line',
  //           stack: '总量',
  //           areaStyle: {},
  //           data: [320, 332, 301, 334, 390, 330, 320]
  //         },
  //         {
  //           name: '搜索引擎',
  //           type: 'line',
  //           stack: '总量',
  //           label: {
  //             normal: {
  //               show: true,
  //               position: 'top'
  //             }
  //           },
  //           areaStyle: {},
  //           data: [820, 932, 901, 934, 1290, 1330, 1320]
  //         }
  //       ]
  //     })
  //   }
  // }
}
</script>

<style scoped lang="stylus">
@import "../assets/css/mixin.styl"
  .test-wrapper {
    display flex
    width: vw(15360)
    height: vh(2160)
    overflow:scroll;
    .item {
      flex 1
      display flex
      flex-direction column
      .list {
        flex 1
        .diesel {
          width: 50%
          height: 50%
        }
        .diese2, .diese3, .diese4, .diese5, .diese6 {
          width: 50%
          height: 50%
        }
      }
    }
  }
</style>
