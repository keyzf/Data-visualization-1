<template>
  <div class="sell-retail-wrapper">
    <div class="item">
      <div class="inner-wrapper">
        <div class="item-title">油品合计（吨）</div>
        <div class="num">
          <count-num :value="oilTotal" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item center">
      <div class="inner-wrapper">
        <div class="item-title">汽油合计（吨）</div>
        <div class="num">
          <count-num :value="gasolineTotal" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="inner-wrapper">
        <div class="item-title">柴油合计（吨）</div>
        <div class="num">
          <!-- 数字滚动 -->
          <count-num :value="dieselTotal" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'sellRetail',
  props: {
    cityCode: String
  },
  components: {
    countTo,
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      startVal: 0,
      dieselTotal: 0,
      gasolineTotal: 0,
      oilTotal: 0,
      isLoaded: false, // 数据是否请求完
      setType: {
        iscenter: 1, // 文字是否居中，1居中，0不居中，默认居中
        unitname: '', // 单位
        colortype: 1
      }
    }
  },
  created () {
    this.bigScreenDetails()
  },
  methods: {
    // 大屏明细数
    bigScreenDetails () {
      // this.isLoaded = false
      this.dataObj = {}
      let that = this
      that.$http.get('/webapi/bdview/oilDataBS/bigScreenDetails', {
        cityCode: this.cityCode
      }).then(res => {
        if (res.result) {
          that.dataObj = res.data
          this.dieselTotal = parseInt(that.dataObj.dieselTotal)
          this.gasolineTotal = parseInt(that.dataObj.gasolineTotal)
          this.oilTotal = parseInt(that.dataObj.oilTotal)
          this.isLoaded = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.bigScreenDetails()
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
    cityCode: {
      handler (newValue, oldValue) {
        this.cityCode = newValue
        this.clearTimeout()
        console.log('clearTimeout' + this.cityCode)
        this.bigScreenDetails()
      },
      deep: true
    }
  }
  // watch: {
  //   cityCode (val) {
  //     if (this.cityCode !== '') {
  //       this.clearTimeout()
  //       this.bigScreenDetails()
  //     }
  //   }
  // }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .sell-retail-wrapper {
    height: pxtovh(200)
    width: pxtovw(854)
    margin-right pxtovw(15)
    // background: url("https://img.gdoil.cn/cockpit/static/images/oilData/qietu_06.png") no-repeat
    background: url("https://img.gdoil.cn/cockpit/static/images/oilData/icon_oildata2.png") no-repeat
    -webkit-background-size: 100% pxtovh(200)
    background-size: 100% pxtovh(200)
    display flex
    padding pxtovh(54) pxtovw(20) pxtovh(19)
    .item {
      flex 1
      text-align center
      background-color: rgba(26,50,180,.14)
      display: flex;
      justify-content: center;
      align-items: center;
      .inner-wrapper {
        width: 100%
        align-items center
        .item-title {
          font-size: pxtovw(18)
          font-weight: bold;
          color: rgba(169,184,255,1);
        }
        .num {
          height: pxtovh(60)
          /deep/ .wrapers {
            line-height: 0
            height: vh(60)
            ul.box-item {
              height: 100%
              width: 100%
              display flex
              flex-direction column
              justify-content center
              li {
                height: 100%
                width vw(30)
                span {
                  width: 122%
                  i {
                    font-size: pxtovw(66)
                    font-family: LcdD;
                    font-weight: bold;
                  }
                }
              }
              .mark-item {
                span {
                  line-height: vh(10)
                  margin-left vw(-35)
                  font-size: pxtovw(66)
                  font-family: LcdD;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
    .center {
      margin 0 pxtovw(25)
    }
  }
</style>
