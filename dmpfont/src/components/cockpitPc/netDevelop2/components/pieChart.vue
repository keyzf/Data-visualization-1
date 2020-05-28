<template><!--饼状图-->
  <div class="pie-wrapper">
    <div id="doughnutChart" class="doughnut-chart"></div>
  </div>
</template>

<script>
export default {
  name: 'pieChart',
  data () {
    return {
      allvalue: '',
      inConstructionvalue: '',
      builtvalue: ''
    }
  },
  mounted () {
    this.getNewRefuelUserInfo()
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
      this.chartBar = this.$echarts.init(document.getElementById('doughnutChart'))
      let option = {
        tooltip: { // 悬停指示
          trigger: 'item',
          formatter: '{a}: </br> {c} ({d}%)'
        },
        color: ['#2445AB', '#FD6868', '#5C74D1'],
        legend: {
          show: true,
          icon: 'circle',
          data: [ '累计规划', '已建成', '建设中' ],
          orient: 'vertical', // 垂直显示
          y: 'center', // 延Y轴居中
          x: 'right', // 居右显示
          align: 'left',
          padding: [0, 30, 0, 0],
          textStyle: {
            color: '#97A8F7',
            fontSize: 18
          }
        },
        series: [
          {
            name: '累计规划',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '38%'],
            hoverAnimation: false,
            selectedOffset: 0,
            center: ['40%', '50%'],
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
          },
          {
            name: '已建成',
            type: 'pie',
            radius: ['50%', '75%'],
            center: ['40%', '50%'],
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
            name: '建设中',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['40%', '50%'],
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
.pie-wrapper {
  text-align center
  width: 100%
  height: pxtovh(201)
  margin-bottom pxtovh(16)
  background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop2/qietu_03.png") no-repeat
  -webkit-background-size: 100% pxtovh(201)
  background-size: 100% pxtovh(201)
  padding-top: pxtovh(47)
  .doughnut-chart{
    width:100%;
    height:100%;
  }
}
</style>
