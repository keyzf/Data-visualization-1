<template>
  <div class="foucus-wrapper">
    <div class="item">
      <div class="title">当月新增汽油会员(人)</div>
      <div class="num">
        <count-num :value="tmLivelyMember" :setType="setType"></count-num>
      </div>
    </div>
    <div class="item item1">
      <div class="title">当月活跃会员(人)</div>
      <div class="num">
        <count-num :value="tmActiveMember" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="item item2">
      <div class="title">年度有效会员数(人)</div>
      <div class="num">
        <count-num :value="yearActiveMember" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="item">
      <div class="title">当月流失汽油会员(人)</div>
      <div class="num">
        <count-num :value="tmLostMember" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="item item1">
      <div class="title">最新忠诚会员数(人)</div>
      <div class="num">
        <count-num :value="tmLoyalMember" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="item">
      <div class="title">汽油会员粘性指数</div>
      <div class="num">
        <count-num :value="memberStickinessIndex" :setType="setType1" v-if="isLoaded"></count-num>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'foucusData',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '', // 单位
        colortype: 1 // 文字颜色，1蓝色，0白色，默认白色
      },
      setType1: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '', // 单位
        colortype: 1 // 文字颜色，1蓝色，0白色，默认白色
      },
      isLoaded: false, // 数据是否请求完
      memberStickinessIndex: 0,
      tmActiveMember: 0,
      tmLivelyMember: 0,
      tmLostMember: 0,
      tmLoyalMember: 0,
      yearActiveMember: 0
    }
  },
  created () {
    this.memberProfile()
  },
  methods: {
    memberProfile () {
      let that = this
      this.monthObj = {}
      this.yearObj = {}
      this.$http.get('/webapi/bdview/gasolineDataBS/memberProfile').then(res => {
        if (res.result) {
          this.memberStickinessIndex = res.data.memberStickinessIndex
          this.tmActiveMember = res.data.tmActiveMember
          this.tmLivelyMember = res.data.tmLivelyMember
          this.tmLostMember = res.data.tmLostMember
          this.tmLoyalMember = res.data.tmLoyalMember
          this.yearActiveMember = res.data.yearActiveMember
          this.isLoaded = true
          // 是否启动轮询1
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.memberProfile()
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
  .foucus-wrapper {
    height: vh(200)
    width: vw(1369)
    margin-right vw(19)
    display flex
    justify-content center
    align-items center
    padding vh(35) vw(20) vh(0)
    background url("https://img.gdoil.cn/cockpit/static/images/gasoline/qie_03.png") no-repeat
    -webkit-background-size: 100% vh(200)
    background-size: 100% vh(200)
    .item {
      flex 1
      height: vh(127)
      background:rgba(26,50,180,.14);
      display flex
      justify-content center
      align-items center
      flex-direction column
      .title {
        margin-bottom vh(5)
        font-size: vw(18)
      }
      /deep/ .unit-span {
        padding-top vh(5)
      }
      .num {
        width: vw(200)
        /deep/ .flex-start {
          display flex
          .box-item {
            width: 100%
            height: auto
            font-size: vw(40)
            display flex
            justify-content center
            align-items center
            flex-direction column
            padding 0
          }
          .unit-span {
            padding-right vw(5)
            padding-top vh(10)
          }
        }
      }
    }
    .item1 {
      margin 0 vw(26)
    }
    .item2 {
      margin-right vw(26)
    }
  }
</style>
