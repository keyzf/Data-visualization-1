<template>
  <div class="focus-wrapper">
    <div class="item">
      <div class="inner-wrapper">
        <div>全省目标</div>
        <div class="num">
          <count-num :value="thMonthNewutlets" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item center">
      <div class="inner-wrapper">
        <div>全省已建成</div>
        <div class="num">
          <count-num :value="built" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="inner-wrapper">
        <div>全省建设中</div>
        <div class="num">
          <count-num :value="inConstruction" :setType="setType" v-if="isLoaded"></count-num>
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
  height: pxtovh(181)
  margin-bottom pxtovh(16.5)
  background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop/bg2.png") no-repeat 0px 0px
  -webkit-background-size: 100% pxtovh(181)
  background-size: 100% pxtovh(181)
  display flex
  padding pxtovh(26) pxtovw(25)
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
    margin pxtovh(0) pxtovw(35)
  }
}
  @media screen and (max-height: 1079px) {
    .focus-wrapper {
      .item {
        .num {
          /deep/ .wrapers {
            .box-item {
              li {
                span {
                  i {
                    font-size: pxtovw(54)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
