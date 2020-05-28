<template>
  <div class="wraper igs-flex">
    <div class="wrapers">
      <div class="igs-flex wrap-cont">
        <div class="text-right">进店消费率</div>
        <!-- 数字滚动 -->
        <count-num :value="shopInRate" :setType="setType" v-if="isLoaded"></count-num>
      </div>
      <div class="igs-flex wrap-cont">
        <div class="text-right">当月提枪数</div>
        <count-num :value="theMonthgunsCount" :setType="setType1" v-if="isLoaded"></count-num>
      </div>
      <div class="igs-flex wrap-cont">
        <div class="text-right">当月便利店交易笔数</div>
        <count-num :value="theMonthConvenienceStoreTransactions" :setType="setType2" v-if="isLoaded"></count-num>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rightTop',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      shopInRate: 0, // 进店率
      theMonthgunsCount: 0, // 当月提枪数
      theMonthConvenienceStoreTransactions: 0, // 交易笔数
      isLoaded: false, // 数据是否请求完
      setType: {
        iscenter: 0, // 文字是否居中，1居中，0不居中，默认居中
        unitname: '%' // 单位
      },
      setType1: {
        iscenter: 0,
        unitname: '万次'
      },
      setType2: {
        iscenter: 0,
        unitname: '万笔'
      }
    }
  },
  props: ['cityCode'],
  watch: {
    cityCode: {
      handler (newValue, oldValue) {
        this.cityCode = newValue
        this.clearTimeout()
        console.log('clearTimeout' + this.cityCode)
        this.shopInRateStatistics()
      },
      deep: true
    }
  },
  // watch: {
  //   cityCode (val) {
  //     if (this.cityCode !== '') {
  //       this.clearTimeout()
  //       this.shopInRateStatistics()
  //     }
  //   }
  // },
  created () {
    this.shopInRateStatistics()
  },
  methods: {
    // 进店统计率
    shopInRateStatistics () {
      this.$http.post('/webapi/bdview/municipalCompany/shopInRateStatistics', {cityCode: this.cityCode}).then(res => {
        if (res.result === true) {
          let rs = res.data
          let val = rs.shopInRate || 0
          this.shopInRate = this.$util.fixedFunc(val)
          let val1 = rs.theMonthgunsCount || 0
          this.theMonthgunsCount = this.$util.fixedFunc(val1)
          let val2 = rs.theMonthConvenienceStoreTransactions || 0
          this.theMonthConvenienceStoreTransactions = this.$util.fixedFunc(val2)
          this.$store.state.stationData.tranceTotal = this.theMonthConvenienceStoreTransactions

          this.isLoaded = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.shopInRateStatistics()
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
    background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_right_t.png") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    color: #5C74D1
    font-size: vw(15)
    padding-top: vh(50)
    .wrapers{
      flex: 1
      padding-top: vh(1)
      span{
        font-size: vw(36)
        font-family: LcdD
        font-weight: bold
        color: #ffffff
      }
      .wrap-cont{
        line-height: vh(42)
        /* align-items: flex-end */
        .text-right{
          width: 50%
          text-align: right
          margin-right: vw(8)
        }
      }
    }
  }
</style>
