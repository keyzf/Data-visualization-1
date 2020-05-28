<template>
  <div class="wraper">
    <div class="wrap igs-flex igs-flex10">
      <div class="wrap-left">
        <img class="icon-img1" src="https://img.gdoil.cn/cockpit/static/images/noneOilScreen/right_center_icon1.png">
      </div>
      <div class="wrap-right">
        <p class="martop">今日消费会员数</p>
        <!-- 数字滚动 -->
        <count-num :value="todayConsumerMemberCount" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="wrap igs-flex igs-flex10">
      <div class="wrap-left">
        <img class="icon-img2" src="https://img.gdoil.cn/cockpit/static/images/noneOilScreen/right_center_icon2.png">
      </div>
      <div class="wrap-right">
        <p class="martop">当月累计消费会员数</p>
        <count-num :value="theMonthConsumerMemberTotal" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="wrap igs-flex igs-flex10">
      <div class="wrap-left">
        <img class="icon-img3" src="https://img.gdoil.cn/cockpit/static/images/noneOilScreen/right_center_icon3.png">
      </div>
      <div class="wrap-right">
        <p class="martop">当月客单价</p>
        <count-num :value="theMonthCustomerPrice" :setType="setType1" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="wrap igs-flex igs-flex10">
      <div class="wrap-left">
        <img class="icon-img4" src="https://img.gdoil.cn/cockpit/static/images/noneOilScreen/right_center_icon4.png">
      </div>
      <div class="wrap-right">
        <p class="martop">当月人均消费金额</p>
        <count-num :value="averageAmount" :setType="setType1" v-if="isLoaded"></count-num>
        <!-- <p class="martop">当前有效会员数</p>
        <count-num :value="theMonthActiveMemberCount" :setType="setType" v-if="isLoaded"></count-num> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rightCenter',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      averageAmount: 0, // 人均消费金额
      basicCategoryRetailTurnover: 0, // 基础品类零售
      todayConsumerMemberCount: 0, // 今日消费会员数
      theMonthConsumerMemberTotal: 0, // 当月累计消费会员数
      theMonthCustomerPrice: 0, // 当月客单价
      theMonthActiveMemberCount: 0, // 当月有效会员数
      isLoaded: false, // 数据是否请求完
      setType: {
        iscenter: 0, // 文字是否居中，1居中，0不居中，默认居中
        unitname: '人' // 单位
      },
      setType1: {
        iscenter: 0,
        unitname: '元'
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
        this.bigScreenDetails()
      },
      deep: true
    }
  },
  // watch: {
  //   cityCode (val) {
  //     if (this.cityCode !== '') {
  //       this.clearTimeout()
  //       this.bigScreenDetails()
  //     }
  //   }
  // },
  created () {
    this.bigScreenDetails()
  },
  methods: {
    // 获取数据大屏明细
    bigScreenDetails () {
      this.$http.post('/webapi/bdview/municipalCompany/bigScreenDetails', {cityCode: this.cityCode}).then(res => {
        if (res.result === true) {
          let rs = res.data.thMonthDetail
          this.basicCategoryRetailTurnover = rs.basicCategoryRetailTurnover || 0
          this.cumulativeMemberCount()
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 累计会员数
    cumulativeMemberCount () {
      this.$http.post('/webapi/bdview/municipalCompany/cumulativeMemberCount', {cityCode: this.cityCode}).then(res => {
        if (res.result === true) {
          let rs = res.data
          this.todayConsumerMemberCount = rs.todayConsumerMemberCount || 0
          this.theMonthConsumerMemberTotal = rs.theMonthConsumerMemberTotal || 0
          this.theMonthCustomerPrice = Number(rs.theMonthCustomerPrice).toFixed(2) || 0
          this.theMonthActiveMemberCount = rs.theMonthActiveMemberCount || 0
          this.averageAmount = Number(this.basicCategoryRetailTurnover / rs.theMonthConsumerMemberTotal * 1000).toFixed(2) || 0

          this.isLoaded = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.cumulativeMemberCount()
            }, this.$store.state.stationData.timeIntervals)
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
<!-- https://img.gdoil.cn/cockpit -->
<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .wraper {
    width: 100%
    height: 100%
    background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_right_c1.png") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    padding: vh(50) vw(25) 0 vw(25)
    color: #97A8F7
    font-size: vw(12)
    .wrap{
      width: 100%
      height: vh(70)
      background: rgba(6, 14, 65, 1)
      margin-bottom: vh(12)
      text-align: center
      span{
        color: #ffffff
        font-size: vw(30)
        font-family: LcdD
        font-weight: 400
      }
      .wrap-left{
        width: vw(108)
        height: vh(54)
        border-right: vw(2) solid #000530
        display: flex
        align-items: center
        justify-content: center
        .icon-img1{
          width: vw(30)
          height: auto
        }
        .icon-img2{
          width: vw(24)
          height: auto
        }
        .icon-img3{
          width: vw(38)
          height: auto
        }
        .icon-img4{
          width: vw(36)
          height: auto
        }
      }
      .wrap-right{
        flex: 1
        text-align: left
        padding-left: vw(50)
        .martop{
          margin-top: vh(10)
        }
        /deep/ .wrapers {
          ul.box-item {
            width: auto
            font-size: vw(30)
            /* 默认逗号设置 */
            .mark-item {
              width: vw(4)
              margin-left: vw(6)
              font-size: vw(30);
            }
            .number-item {
              width: vw(18)
            }
          }
          .unit-span {
            display: flex
            align-items: flex-end
            margin-left: vw(3)
          }
        }
      }
    }
  }
</style>
