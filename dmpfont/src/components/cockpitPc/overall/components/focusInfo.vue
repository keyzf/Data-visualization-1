<template>
  <div class="focus-wrapper igs-flex">
    <div class="info_box">
      <p class="igs-flex">当月发展会员  <count-num :value="addMember" :setType="setType" v-if="isLoaded"></count-num></p>
      <p class="igs-flex" >今年新增会员 <count-num :value="addMember1" :setType="setType" v-if="isLoaded"></count-num></p>
    </div>
    <div class="info_box">
      <p class="igs-flex">当月会员销量  <count-num :value="memberDieselSales" :setType="setType2" v-if="isLoaded"></count-num></p>
      <p class="igs-flex">今年会员销量  <count-num :value="memberDieselSales1" :setType="setType2" v-if="isLoaded"></count-num></p>
    </div>
    <div class="info_box">
      <p class="igs-flex">当月生产柴油豆  <count-num :value="produceDieselBeanCount" :setType="setType" v-if="isLoaded"></count-num></p>
      <p class="igs-flex">今年生产柴油豆  <count-num :value="produceDieselBeanCount1" :setType="setType" v-if="isLoaded"></count-num></p>
    </div>
    <div class="info_box">
      <p class="igs-flex">当月兑换柴油豆  <count-num :value="redeemDieselBeanCount" :setType="setType" v-if="isLoaded"></count-num></p>
      <p class="igs-flex">今年兑换柴油豆  <count-num :value="redeemDieselBeanCount1" :setType="setType" v-if="isLoaded"></count-num></p>
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
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '人', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      setType2: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '升', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      setType1: {
        iscenter: 0,
        unitname: '万元',
        colortype: 1
      },
      isLoaded: false, // 数据是否请求完
      thMonthDetail: '',
      thYearDetail: '',
      addMember: '',
      memberDieselSales: '',
      produceDieselBeanCount: '',
      redeemDieselBeanCount: '',
      addMember1: '',
      memberDieselSales1: '',
      produceDieselBeanCount1: '',
      redeemDieselBeanCount1: ''
    }
  },
  created () {
    this.bigScreenDetails()
  },
  mounted () {

  },
  methods: {
    // 1. 数据大屏明细
    // GET /bigScreenDetails
    bigScreenDetails () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/bigScreenDetails', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          // console.log(res)
          this.thMonthDetail = res.data.thMonthDetail
          this.thYearDetail = res.data.thYearDetail
          this.addMember = res.data.thMonthDetail.addMember
          this.memberDieselSales = res.data.thMonthDetail.memberDieselSales
          this.produceDieselBeanCount = res.data.thMonthDetail.produceDieselBeanCount
          this.redeemDieselBeanCount = res.data.thMonthDetail.redeemDieselBeanCount

          this.addMember1 = res.data.thYearDetail.addMember
          this.memberDieselSales1 = res.data.thYearDetail.memberDieselSales
          this.produceDieselBeanCount1 = res.data.thYearDetail.produceDieselBeanCount
          this.redeemDieselBeanCount1 = res.data.thYearDetail.redeemDieselBeanCount
          this.isLoaded = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.bigScreenDetails()
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
  text-align center
  width: 100%
  height: pxtovh(103)
  margin-bottom:pxtovh(12)
  padding:pxtovh(10) pxtovh(40)
  border:1px solid rgba(26,50,180,1);
  background:linear-gradient(0deg,rgba(0,5,48,1) 0%,rgba(0,7,65,1) 100%)
  .info_box{
    /deep/ .wrapers{
            height: vh(30)
            margin-top:vh(6)
          .box-item{
            font-size: pxtovh(30)!important
             .number-item{
              width: vw(18)
              i{
                left:50%!important;
                transform :translate(-52%,0)
              }
            }
          }
          .unit-span{
            font-size :pxtovh(12);
            margin-left:pxtovh(5);
          }
      }
    width:25%;
    text-align :center;
    p{
      line-height :pxtovh(40);
      font-size :pxtovh(12);
      font-family:Source Han Sans CN;
      font-weight:bold;
      color:rgba(92,116,209,1);
      .num{
        font-size:pxtovh(30);
        font-family:LcdD;
        font-weight:bold;
        color:rgba(129,213,217,1);
      }
    }
  }

}
</style>
