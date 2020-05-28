<template>
  <div class="profile-wrapper">
    <div class="item mar-right">
      <div class="title">忠诚客户</div>
      <div class="detail">
        <count-num :value="loyalCustomers" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="item mar-right">
      <div class="title">有效客户</div>
      <div class="detail">
        <count-num :value="effectiveCustomer" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="item mar-right">
      <div class="title">活跃客户</div>
      <div class="detail">
        <count-num :value="activeCustomers" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="item">
      <div class="title">潜在客户</div>
      <div class="detail">
        <count-num :value="potentialCustomers" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MembershipProfile',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      built: '',
      activeCustomers: '',
      effectiveCustomer: '',
      loyalCustomers: '',
      potentialCustomers: '',
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
    this.getOilStationList()
  },
  methods: {
    getOilStationList () {
      this.$http.post('/webapi/bdview/gasolineDataBS/membershipProfile').then(res => {
        if (res.result === true) {
          this.activeCustomers = res.data.activeCustomers
          this.effectiveCustomer = res.data.effectiveCustomer
          this.loyalCustomers = res.data.loyalCustomers
          this.potentialCustomers = res.data.potentialCustomers
          this.isLoaded = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.getOilStationList()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../../assets/css/mixin.styl'
  .profile-wrapper {
    width: vw(853)
    height vh(179)
    margin-bottom vh(16)
    background: url("https://img.gdoil.cn/cockpit/static/images/carMember/center_bg1.png") no-repeat
    -webkit-background-size: 100% vh(179)
    background-size: 100% vh(179)
    display flex
    text-align center
    padding-top vh(65)
    padding-left vw(20)
    padding-right vw(20)
    padding-bottom vh(15)
    .mar-right{
      margin-right vw(20)
    }
    .item {
      flex 1
      background:rgba(26,50,180,.14)
      display flex
      flex-direction column
      justify-content center
      align-items center
      padding-top 2%
      .title {
        font-size: vw(18)
        margin-bottom vh(3)
      }
      .detail {
        flex 1
        width: 100%
        height: 100%
        /deep/ .wrapers {
          display: flex;
          justify-content: center!important
          align-items: center;
          .box-item {
            width: 100%
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .mark-item {
              width: vw(12);
              height: vh(55);
              font-size: vw(55);
            }
          }
        }
      }
    }
  }
  @media screen and (max-height: 1079px) {
    .profile-wrapper {
      .item {
        padding-top 1%
      }
    }
  }
</style>
