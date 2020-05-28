<template>
  <div class="focus-wrapper">
    <div class="item">
      <div class="inner-wrapper">
        <div>当月新建成网点</div>
        <div class="num">
          <count-num :value="thMonthNewutlets" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item center">
      <div class="inner-wrapper">
        <div>建设中网点</div>
        <div class="num">
          <count-num :value="inConstruction" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="inner-wrapper">
        <div>累计建成网点</div>
        <div class="num">
          <count-num :value="built" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'focusInfo',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      built: '',
      inConstruction: '',
      thMonthNewutlets: '',
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      setType1: {
        iscenter: 0,
        unitname: '万元',
        colortype: 1
      },
      isLoaded: false // 数据是否请求完
    }
  },
  created () {
    this.stationConstructionProportion()
  },
  methods: {
    // 网点建设占比
    stationConstructionProportion () {
      this.isLoaded = false
      // this.built = 0
      // this.inConstruction = 0
      // this.thMonthNewutlets = 0
      let that = this
      that.$http.get('/webapi/bdview/thNetWorkDevelopmentBS/stationConstructionProportion').then(res => {
        if (res.result) {
          this.built = res.data.built
          this.inConstruction = res.data.inConstruction
          this.thMonthNewutlets = res.data.thMonthNewutlets
          this.isLoaded = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.stationConstructionProportion()
            }, this.$store.state.stationData.timeIntervals)
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
.focus-wrapper {
  width: 100%
  height: pxtovh(161)
  margin-bottom pxtovh(15)
  background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop2/qietu_06.png") no-repeat 0px 0px
  -webkit-background-size: 100% pxtovh(161)
  background-size: 100% pxtovh(161)
  display flex
  padding pxtovh(20) pxtovw(20)
  .item {
    flex 1
    color: #a9b8ff
    font-size: pxtovw(18)
    background-color: rgba(26,50,180,.14)
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner-wrapper {
      width: 100%
      display flex
      flex-direction column
      align-items center
    }
    .num {
      width: 100%
      height: vh(57)
      /deep/ .wrapers {
        line-height: 0
        height: vh(60)
        .box-item {
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
                font-family: LcdD;
                font-size: pxtovw(66)
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
  .center {
    margin pxtovh(0) pxtovw(20)
  }
}
</style>
