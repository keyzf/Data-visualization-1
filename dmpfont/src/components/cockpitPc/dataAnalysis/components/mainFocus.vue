<template>
  <div class="main-wrapper">
    <div class="item">
      <div class="item-title">当月发展会员 <count-num :value="monthObj.developmentMember" :setType="setType" v-if="isLoaded"></count-num>
      </div>
      <div class="item-title">今年发展会员 <count-num :value="yearObj.developmentMember" :setType="setType1" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="item">
      <div class="item-title">当月员工推荐 <count-num :value="monthObj.staffRecommendation" :setType="setType" v-if="isLoaded"></count-num>
      </div>
      <div class="item-title">今年员工推荐 <count-num :value="yearObj.staffRecommendation" :setType="setType1"></count-num>
      </div>
    </div>
    <div class="item">
      <div class="item-title">当月绑卡会员 <count-num :value="monthObj.cardTiedMembers" :setType="setType" v-if="isLoaded"></count-num>
      </div>
      <div class="item-title">今年绑卡会员 <count-num :value="yearObj.cardTiedMembers" :setType="setType1" v-if="isLoaded"></count-num>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainFocus',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: ' 人', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      setType1: {
        iscenter: 0,
        unitname: '人',
        colortype: 1
      },
      monthObj: {},
      yearObj: {},
      isLoaded: false
    }
  },
  created () {
    this.bigScreenDetails()
  },
  methods: {
    bigScreenDetails () {
      let that = this
      this.monthObj = {}
      this.yearObj = {}
      this.$http.get('/webapi/bdview/customerDataAnalysisBS/bigScreenDetails').then(res => {
        if (res.result) {
          this.monthObj = res.data.theMonth
          this.yearObj = res.data.theYear
          this.isLoaded = true
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
  .main-wrapper {
    width: 100%
    height: pxtovh(103)
    margin-bottom pxtovh(16)
    display flex
    padding pxtovh(7) pxtovw(0) pxtovh(7) pxtovw(62)
    background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg_02.png") no-repeat
    -webkit-background-size: 100% pxtovh(103)
    background-size: 100% pxtovh(103)
    .item {
      flex 1
      display: flex;
      flex-direction: column;
      justify-content: center;
      .item-title {
        color: #5c74d1
        font-size: pxtovw(15)
        font-weight: bold
        display flex
        align-items: center;
        /deep/ .wrapers {
          justify-content left
          .blue-color i {
            font-size: pxtovw(36)
            font-weight bold
            font-family LcdD
          }
          .white-color i {
            font-size: pxtovw(36)
            font-weight bold
            font-family LcdD
          }
        }
      }
    }
  }
</style>
