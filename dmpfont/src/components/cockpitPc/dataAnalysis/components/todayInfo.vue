<template>
  <div class="today-wrapper">
    <div class="content-wrapper">
      <div class="item-wrapper item-wrapper1">
        <div class="item item1">
          <div class="icon icon1"></div>
          <div class="info">
            <div class="item-title">今日发展会员</div>
            <div>
              <count-num :value="developmentMember" :setType="setType" v-if="isLoaded"></count-num>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="icon icon2"></div>
          <div class="info">
            <div class="item-title">今日绑卡会员</div>
            <div>
              <count-num :value="cardTiedMembers" :setType="setType" v-if="isLoaded"></count-num>
            </div>
          </div>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="item item1">
          <div class="icon icon3"></div>
          <div class="info">
            <div class="item-title">今日员工推荐</div>
            <div>
              <count-num :value="staffRecommendation" :setType="setType" v-if="isLoaded"></count-num>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="icon icon4"></div>
          <div class="info">
            <div class="item-title">今日交易会员</div>
            <div>
              <count-num :value="tradingMember" :setType="setType" v-if="isLoaded"></count-num>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todayInfo',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      setType: {
        isLoaded: false,
        staffRecommendation: 0,
        cardTiedMembers: 0,
        developmentMember: 0,
        tradingMember: 0,
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '人', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      setType1: {
        iscenter: 0,
        unitname: '万元',
        colortype: 1
      },
      isLoaded: false
    }
  },
  created () {
    this.bigScreenDetails()
  },
  methods: {
    bigScreenDetails () {
      this.cardTiedMembers = 0
      this.developmentMember = 0
      this.tradingMember = 0
      let that = this
      this.$http.get('/webapi/bdview/customerDataAnalysisBS/bigScreenDetails').then(res => {
        if (res.result) {
          this.staffRecommendation = res.data.today.staffRecommendation === '' ? '0' : res.data.today.staffRecommendation
          this.cardTiedMembers = res.data.today.cardTiedMembers === '' ? '0' : res.data.today.cardTiedMembers
          this.developmentMember = res.data.today.developmentMember === '' ? '0' : res.data.today.developmentMember
          this.tradingMember = res.data.today.tradingMember === '' ? '0' : res.data.today.tradingMember
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
  .today-wrapper {
    width: 100%
    height: pxtovh(164)
    margin-bottom pxtovh(16)
    background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg_01.png") no-repeat
    -webkit-background-size: 100% pxtovh(164)
    background-size: 100% pxtovh(164)
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-wrapper {
    display flex
    .item {
      flex 1
      display flex
      align-items center
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex 1
        /deep/ .number-item {
          display flex
          i {
            width: 210%
          }
        }
/*        /deep/ .unit-span {
          line-height: vh(45)
        }*/
        .item-title {
          color: #5C74D1
          font-size: pxtovw(12)
          font-weight: bold;
        }
        .number {
          font-family: LcdD;
          font-size: pxtovw(30)
          font-weight: bold;
          color: #ffffff
        }
        .unit {
          color: #5C74D1
          font-size: pxtovw(15)
          font-weight: bold;
        }
      }
      .icon {
        width: pxtovw(45)
        height: pxtovh(45)
        margin-right pxtovw(7)
      }
      .icon1 {
        background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/icon.png") no-repeat
        -webkit-background-size: 100% pxtovh(45)
        background-size: 100% pxtovh(45)
      }
      .icon2 {
        background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/icon_69.png") no-repeat
        -webkit-background-size: 100% pxtovh(45)
        background-size: 100% pxtovh(45)
      }
      .icon3 {
        background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/icon_95.png") no-repeat
        -webkit-background-size: 100% pxtovh(45)
        background-size: 100% pxtovh(45)
      }
      .icon4 {
        background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/icon_14.png") no-repeat
        -webkit-background-size: 100% pxtovh(45)
        background-size: 100% pxtovh(45)
      }
    }
    .item1 {
      margin-right vw(15)
    }
  }
  .item-wrapper1 {
    margin-bottom vh(10)
  }
</style>
