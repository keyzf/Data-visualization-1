<template>
  <div class="eyes-datas-wrapper">
    <div class="item-wrapper">
      <!-- <div class="item">
        <div class="today">
          <div class="icon icon-active">
            <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-active.png" alt="">
          </div>
          <div class="detail-wrapper">
            <span class="title">当日活跃会员数</span>
            <span class="detail" v-if="isLoad">{{$util.fixedamount(activeMemberCount[0])}}人</span>
          </div>
        </div>
        <div class="yesterday">昨日全天 <span :class="parseInt(positiveNumber) > 0 ? 'positive-number': 'negative-number'"> {{$util.fixedamount(positiveNumber)}}人</span></div>
      </div> -->
      <div class="item">
        <div class="today">
          <div class="icon icon-trademember">
            <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-trademember.png" alt="">
          </div>
          <div class="detail-wrapper">
            <span class="title">当日线上交易会员数</span>
            <span class="detail" v-if="isLoad">{{$util.fixedamount(transactionMemberCount[0])}}人</span>
          </div>
        </div>
        <div class="yesterday">昨日全天 <span :class="parseInt(positiveNumbertrademember) > 0 ? 'positive-number': 'negative-number'"> {{$util.fixedamount(positiveNumbertrademember)}}人</span></div>
      </div>
      <div class="item">
        <div class="today">
          <div class="icon icon-pay">
            <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-pay.png" alt="">
          </div>
          <div class="detail-wrapper">
            <span class="title">当日线上支付金额</span>
            <span class="detail" v-if="isLoad">{{$util.fixedamount(payAmount[0])}}元</span>
          </div>
        </div>
        <div class="yesterday">昨日全天 <span :class="parseInt(positiveNumberpay) > 0 ? 'positive-number': 'negative-number'">{{$util.fixedamount(positiveNumberpay)}}元</span></div>
      </div>
      <div class="item">
        <div class="today">
          <div class="icon icon-tradeorder">
            <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-tradeorder.png" alt="">
          </div>
          <div class="detail-wrapper">
            <span class="title">当日线上交易订单数</span>
            <span class="detail" v-if="isLoad"> {{$util.fixedamount(cumulativeOrderCount[0])}} 笔</span>
          </div>
        </div>
        <div class="yesterday">昨日全天 <span :class="parseInt(positiveNumbertradeorder) > 0 ? 'positive-number': 'negative-number'"> {{$util.fixedamount(positiveNumbertradeorder)}}笔</span></div>
      </div>
      <div class="item">
        <div class="today">
          <div class="icon icon-visit">
            <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-visit.png" alt="">
          </div>
          <div class="detail-wrapper">
            <span class="title">当日首页访问(PV)</span>
            <span class="detail" v-if="isLoad">{{$util.fixedamount(homePageVisitPV[0])}}次</span>
          </div>
        </div>
        <div class="yesterday">昨日全天 <span :class="parseInt(positiveNumbervisitPV) > 0 ? 'positive-number': 'negative-number'"> {{$util.fixedamount(positiveNumbervisitPV)}}次</span></div>
      </div>
      <div class="item">
        <div class="today">
          <div class="icon icon-visit">
            <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-visitUV.png" alt="">
          </div>
          <div class="detail-wrapper">
            <span class="title">当日首页访问(UV)</span>
            <span class="detail" v-if="isLoad">{{$util.fixedamount(homePageVisitUV[0])}}次</span>
          </div>
        </div>
        <div class="yesterday">昨日全天 <span :class="parseInt(positiveNumbervisitUV) > 0 ? 'positive-number': 'negative-number'"> {{$util.fixedamount(positiveNumbervisitUV)}}次</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EyesDatas',
  data () {
    return {
      activeMemberCount: [],
      positiveNumber: 0,
      transactionMemberCount: [],
      positiveNumbertrademember: 0,
      payAmount: [],
      positiveNumberpay: 0,
      cumulativeOrderCount: [],
      positiveNumbertradeorder: 0,
      homePageVisitPV: [],
      homePageVisitUV: [],
      positiveNumbervisitPV: 0,
      positiveNumbervisitUV: 0,
      isLoad: false
    }
  },
  created () {
    this.boardDetail()
  },
  methods: {
    boardDetail () {
      let that = this
      that.isLoad = false
      that.theMonth = []
      that.nameArr = []
      that.lastMonth = []
      this.$http.get('/webapi/bdview/appBusiAnalysis/boardDetail').then(res => {
        if (res.result) {
          // 当日活跃会员数
          this.activeMemberCount = res.data.activeMemberCount
          this.positiveNumber = this.activeMemberCount[1]
          // 当日交易会员数
          this.transactionMemberCount = res.data.transactionMemberCount
          this.positiveNumbertrademember = this.transactionMemberCount[1]
          // 当日支付金额(万元)
          this.payAmount = res.data.payAmount
          this.positiveNumberpay = (this.payAmount[1]).toFixed(2)
          // 当日交易订单数
          this.cumulativeOrderCount = res.data.cumulativeOrderCount
          this.positiveNumbertradeorder = this.cumulativeOrderCount[1]
          // 当日首页访问
          this.homePageVisitPV = res.data.homePageVisitPV
          this.homePageVisitUV = res.data.homePageVisitUV
          this.positiveNumbervisitPV = this.homePageVisitPV[1]
          this.positiveNumbervisitUV = this.homePageVisitUV[1]
          that.isLoad = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.boardDetail()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
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
  @import '../../../../../assets/css/mixin.styl'
  .eyes-datas-wrapper {
    height: vh(91)
    border-bottom 1px solid #DDDDDD
    margin 0 vw(15)
    display flex
    justify-content center
    align-items center
    .item-wrapper {
      display flex
      flex 1
      .item {
        flex 1
        height: 100%
        .today {
          display flex
          align-items center
          .icon {
            img {
              width: vw(46)
              height: auto
            }
            margin-right vw(10)
          }
          .detail-wrapper {
            flex 1
            display flex
            flex-direction column
            .title {
              color: #333333
              font-size: vw(16)
            }
            .detail {
              color: #333333
              font-size: vw(20)
              font-weight bold
              line-height: vh(24)
            }
          }
        }
        .yesterday {
          color: #999999
          font-size: vw(12)
          line-height: vh(18)
          margin-left vw(56)
          .positive-number {
            color: #2e7d32
          }
          .negative-number {
            color: #b71c1c
          }
        }
      }
    }
  }
</style>
