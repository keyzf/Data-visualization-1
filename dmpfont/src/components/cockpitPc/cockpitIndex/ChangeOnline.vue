<template>
  <div >
    <section class="member">
      <div id="onlineChart" class="chart"></div>
      <!-- <div id="onlineChart" :style="{width: '100%', height: '350px'}"></div> -->
    </section>
  </div>
</template>

<script>
export default {
  name: 'ChangeOnline',
  data () {
    return {
      topListCount: [], // top10数量
      topListName: [] // top10名称
    }
  },
  created () {
  },
  mounted () {
    this.getRedeemOnlineTopList()
    // this.drawCharts()
  },
  methods: {
    drawCharts () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('onlineChart'))
      // 绘制图表
      myChart.setOption({
        color: '#00A0E9',
        title: {
          text: '当月线上兑换商品TOP10',
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: {},
        grid: {
          left: '10',
          right: '20',
          bottom: '5',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // data: ['卓玛泉', '燃油宝', '长白山', '雀巢咖啡', '红牛', '牙刷', '口香糖', '棒棒糖'],
          data: this.topListName,
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#fff'
            },
            interval: 0, // 让文字全部显示不间隔
            formatter (value) {
              return value.split('').join('\n')
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#fff',
              width: 1
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: '#fff',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: false
          }
        },
        series: [{
          name: '数量',
          type: 'bar',
          // data: [553, 450, 412, 300, 300, 300, 300, 289],
          data: this.topListCount,
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff'
            }
          },
          barWidth: '12'
        }]
      })
    },
    getRedeemOnlineTopList () {
      this.$http.post('/webapi/cockpit/getRedeemOnlineTopList').then(res => {
        if (res.result === true) {
          this.changeData(res.rows)
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理数据
    changeData (json) {
      let countData = []
      let nameData = []
      for (var i = 0; i < json.length; i++) {
        countData.push(json[i].count)
        nameData.push(json[i].name)
      }
      this.topListCount = countData
      this.topListName = nameData
      this.drawCharts()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../assets/css/mixin.styl'
  .member{
    height: vh(392);
    padding: vh(16) vw(15) 0 vw(15);
    border-left: 3px solid #0CEBF8;
    color: #ffffff;
    font-size: vw(14);
    .chart{
      width: 100%
      height: vh(360)
    }
  }
</style>
