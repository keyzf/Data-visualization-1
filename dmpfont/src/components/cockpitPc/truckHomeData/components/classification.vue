<template>
  <div class="classification">
      <div class="doughnutChart" id="doughnutChart" >

      </div>
  </div>
</template>

<script>
export default {
  name: 'classification',
  data () {
    return {
      memberList: [],
      validMemberList: [],
      dataName: []
    }
  },
  created () {
  },
  mounted () {
    // this.memberStructureCountList()
    this.doughnutChart()
  },
  methods: {
    //     6. 会员结构数列表
    // GET /memberStructureCountList
    memberStructureCountList () {
      this.memberList = []
      this.validMemberList = []
      this.dataName = []
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/memberStructureCountList', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var memberList = res.data.memberList
          for (var i = 0; i < memberList.length; i++) {
            this.memberList.push(memberList[i].count)
            this.dataName.push(memberList[i].name)
          }
          console.log('this.dataName' + this.dataName)
          var validMemberList = res.data.validMemberList
          for (var j = 0; j < validMemberList.length; j++) {
            this.validMemberList.push(validMemberList[j].count)
          }
          // console.log(this.validMemberList)
          this.drawChart()
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.memberStructureCountList()
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
    doughnutChart () {
      let color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0']
      let echartData = [{
        name: 'A类',
        value: '100'
      },
      {
        name: 'B类',
        value: '100'
      },
      {
        name: 'C类',
        value: '100'
      },
      {
        name: 'D类',
        value: '100'
      }
      ]

      let formatNumber = function (num) {
        let reg = /(?=(\B)(\d{3})+$)/g
        return num.toString().replace(reg, ',')
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('doughnutChart'))
      // 绘制图表
      myChart.setOption({
        color: color,
        legend: {
          orient: 'vertical',
          icon: 'circle',
          x: '90%',
          y: 'center',
          itemWidth: 12,
          itemHeight: 12,
          align: 'left',
          textStyle: {
            rich: {
              name: {
                fontSize: 12,
                color: '#5C74D1'
              }
            }
          },
          formatter: function (name) {
            return '{name|' + name + '}'
          }
        // data: legendName
        },
        series: [{
          type: 'pie',
          radius: ['50%', '75%'],
          center: ['50%', '50%'],
          data: echartData,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              borderWidth: 2
            }
          },
          labelLine: {
            normal: {
              length: 20,
              length2: 100,
              lineStyle: {
                color: '#5C74D1'
              }
            }
          },
          label: {
            normal: {
              formatter: params => {
                return (
                  '{name|' + params.name + '}{value|' +
                        formatNumber(params.value) + '}'
                )
              },
              padding: [0, -100, 25, -100],
              rich: {
                icon: {
                  fontSize: 16
                },
                name: {
                  fontSize: 14,
                  padding: [0, 10, 0, 4],
                  color: '#5C74D1'
                },
                value: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#5C74D1'
                }
              }
            }
          }
        }]
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
.classification{
  text-align center
  width vw(500)
  height vh(220)
  color #97a8f7
  background url('../../../../../static/images/truckHomeData/1_icon.png') no-repeat
  -webkit-background-size 100% 100%
  background-size 100% 100%
  padding pxtovh(47) pxtovw(10) pxtovh(15) pxtovw(15)
  position relative
  margin-right:vw(15)
  // float left
  margin-bottom:vh(15)
  .doughnutChart{
    width:100%;
    height:100%;
  }
}
</style>
