<template>
  <div class="output-wrapper">
    <div class="content">
      <div class="table-content" v-if="isLoad">
        <ul v-for="(item, index) of rankingList" :key="index">
          <li class="index flex"><div class="com2" :class="sstt[index]">{{index + 1}}</div></li>
          <li class="place com ellipsis">{{item.name}}</li>
          <li class="finished com1">{{$util.fixedFunc(item.count)}}万吨</li>
          <li class="completion-rate">{{item.compare}}%</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'machineOutput',
  props: {
    cityCode: String
  },
  data () {
    return {
      rankingList: [],
      sstt: [
        'index_first',
        'index_second',
        'index_three'
      ],
      isLoad: false
    }
  },
  created () {
    this.cityOilMachineOutTotalAmplitudeRankTop()
  },
  methods: {
    // 机出总量同比增幅地市排名top5.
    cityOilMachineOutTotalAmplitudeRankTop () {
      // this.isLoad = false
      let that = this
      that.$http.get('/webapi/bdview/oilDataBS/cityOilMachineOutTotalAmplitudeRankTop', {
        cityCode: this.cityCode
      }).then(res => {
        if (res.result) {
          this.rankingList = res.rows
          this.isLoad = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.cityOilMachineOutTotalAmplitudeRankTop()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    clearTimeout () {
      if (this.timer) {
        window.clearTimeout(this.timer)
      }
    }
  },
  beforeDestroy () {
    this.clearTimeout()
  },
  watch: {
    cityCode (val) {
      if (this.cityCode !== '') {
        this.clearTimeout()
        this.cityOilMachineOutTotalAmplitudeRankTop()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .output-wrapper {
    height: 100%
    width: pxtovw(346)
    margin-right pxtovw(14)
    // background: url("https://img.gdoil.cn/cockpit/static/images/oilData/_20.png") no-repeat
    background: url("https://img.gdoil.cn/cockpit/static/images/oilData/icon_oildata10.png") no-repeat
    -webkit-background-size: 100% pxtovh(205)
    background-size: 100% pxtovh(205)
    padding vh(48) vw(30) vh(48) vw(54)
    // padding pxtovh(48) pxtovw(54)
    .content {
      .table-content::-webkit-scrollbar{
        width: vw(8);
      }
      .table-content::-webkit-scrollbar-track{ /*滑动条背景*/
        background: #000530;
        border-radius: vw(4);
      }
      .table-content::-webkit-scrollbar-thumb{ /*滑动条颜色*/
        background: rgba(0,35,199,0.3);
        border-radius: vw(4);
      }
      .table-content::-webkit-scrollbar-thumb:hover{
        background: rgba(0,35,199,0.5);
      }
      .table-content::-webkit-scrollbar-corner{
        background: rgba(0,35,199,0.5);
      }
      .table-content {
        height: vh(150)
        padding: vh(2) 0
        overflow-y: scroll
        border: none
        .line {
          width: 100%
          height: pxtovh(2)
          background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop/img_divider.png") no-repeat
          -webkit-background-size: 100%
          background-size: 100%
          margin pxtovh(12) pxtovw(0) pxtovh(25)
        }
        ul {
          line-height: vh(20)
          font-size: pxtovw(15)
          display flex
          margin-bottom pxtovh(10)
          li {
            color: #d8effb
            text-align center
          }
          li.completion-rate {
            width: 28%
            text-align right
            margin-right: 8%
          }
          .com {
            width: 30%
          }
          .com1 {
            flex 1
            text-align left
          }
          .com2 {
            width: vw(20)
            background-color: #1A307D
            color: #ffffff
            font-size: vw(14)
          }
          .index_first {
            background-color: #DE5656
          }
          .index_second {
            background-color: #B69B36
          }
          .index_three {
            background-color: #7e59f1
          }
          .index-last {
            background-color: #993548
          }
        }
      }
    }
  }
</style>
