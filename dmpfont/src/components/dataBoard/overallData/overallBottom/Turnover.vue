<template>
  <div class="turnover-wrapper">
    <common-header>当月商品营业额</common-header>
    <div class="item-wrapper">
      <div class="item">
        <div class="today">
          <div class="icon icon-class">
            <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-class-goods.png" alt="">
          </div>
          <div class="detail-wrapper">
            <span class="title">商品类</span>
            <span class="detail" v-if="isLoad">{{$util.fixedamount(goodsMoneryNum)}}元</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="today">
          <div class="icon self-support">
            <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-self-support.png" alt="">
          </div>
          <div class="detail-wrapper">
            <span class="title">自营</span>
            <span class="detail" v-if="isLoad">{{$util.fixedamount(selfSupportMoneryNum)}}元</span>
          </div>
        </div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div><div>
    <div class="item-wrapper2">
      <div class="item">
        <div class="title">其中易捷遥买</div>
        <div class="detail-wrapper">
          <div class="detail-item detail-item-left">
            <div class="list-wrapper list-wrapper1">
              <div class="icon icon-turnover">
                <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-turnover.png" alt="">
              </div>
              <div class="detail-item-wrapper">
                <span class="title">营业额</span>
                <span class="detail" v-if="isLoad">{{$util.fixedamount(yijieturnover)}}元</span>
              </div>
            </div>
            <div class="list-wrapper">
              <div class="icon icon-transaction">
                <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-transaction.png" alt="">
              </div>
              <div class="detail-item-wrapper">
                <span class="title">交易笔数</span>
                <span class="detail">{{$util.fixedamount(yijiepaycount)}}笔</span>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-item-right">
          <div class="cash-ratio-wrapper">
            <div class="dashboard">
              <el-progress type="dashboard"
                           :percentage="percentageCash"
                           :color="colors1"
                           :show-text="false"
                           :stroke-width="15"
              ></el-progress>
            </div>
            <div class="info">
              <p><span class="money" v-if="isLoad">{{$util.fixedamount(yijiecash)}}元</span> </p>
              <p>其中现金</p>
            </div>
          </div>
          <div class="cash-ratio-wrapper">
            <div class="dashboard dashboard2">
              <el-progress type="dashboard"
                           :percentage="percentageIntegral"
                           :color="colors2"
                           :show-text="false"
                           :stroke-width="15"
              ></el-progress>
            </div>
            <div class="info">
              <p><span class="money" v-if="isLoad">{{$util.fixedamount(yijieintegral)}}元</span> </p>
              <p>其中积分</p>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">其中京东特供</div>
        <div class="detail-wrapper">
          <div class="detail-item detail-item-left">
            <div class="list-wrapper list-wrapper1">
              <div class="icon icon-turnover">
                <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-turnover.png" alt="">
              </div>
              <div class="detail-item-wrapper">
                <span class="title">营业额</span>
                <span class="detail" v-if="isLoad">{{$util.fixedamount(jingdongturnover)}}元</span>
              </div>
            </div>
            <div class="list-wrapper">
              <div class="icon icon-transaction">
                <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-transaction.png" alt="">
              </div>
              <div class="detail-item-wrapper">
                <span class="title">交易笔数</span>
                <span class="detail">{{$util.fixedamount(jingdongpaycount)}}笔</span>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-item-right">
          <div class="cash-ratio-wrapper">
            <div class="dashboard">
              <el-progress type="dashboard"
                           :percentage="jingdongcashPercentage"
                           :color="colors1"
                           :show-text="false"
                           :stroke-width="15"
              ></el-progress>
            </div>
            <div class="info">
              <p><span class="money" v-if="isLoad">{{$util.fixedamount(jingdongcash)}}元</span></p>
              <p>其中现金</p>
            </div>
          </div>
          <div class="cash-ratio-wrapper">
            <div class="dashboard dashboard2">
              <el-progress type="dashboard"
                           :percentage="jingdongintegralPercentage"
                           :color="colors2"
                           :show-text="false"
                           :stroke-width="15"
              ></el-progress>
            </div>
            <div class="info">
              <p><span class="money" v-if="isLoad">{{$util.fixedamount(jingdongintegral)}}元</span></p>
              <p>其中积分</p>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">其中第三方</div>
        <div class="detail-wrapper">
          <div class="detail-item detail-item-left">
            <div class="list-wrapper list-wrapper1">
              <div class="icon icon-turnover">
                <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-turnover.png" alt="">
              </div>
              <div class="detail-item-wrapper">
                <span class="title">营业额</span>
                <span class="detail" v-if="isLoad">{{$util.fixedamount(otherturnover)}}元</span>
              </div>
            </div>
            <div class="list-wrapper">
              <div class="icon icon-transaction">
                <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-transaction.png" alt="">
              </div>
              <div class="detail-item-wrapper">
                <span class="title">交易笔数</span>
                <span class="detail">{{$util.fixedamount(otherpaycount)}}笔</span>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-item-right">
          <div class="cash-ratio-wrapper">
            <div class="dashboard">
              <el-progress type="dashboard"
                           :percentage="othercashPercentage"
                           :color="colors1"
                           :show-text="false"
                           :stroke-width="15"
              ></el-progress>
            </div>
            <div class="info">
              <p><span class="money" v-if="isLoad">{{$util.fixedamount(othercash)}}元</span></p>
              <p>其中现金</p>
            </div>
          </div>
          <div class="cash-ratio-wrapper">
            <div class="dashboard dashboard2">
              <el-progress type="dashboard"
                           :percentage="otherintegralPercentage"
                           :color="colors2"
                           :show-text="false"
                           :stroke-width="15"
              ></el-progress>
            </div>
            <div class="info">
              <p><span class="money" v-if="isLoad">{{$util.fixedamount(otherintegral)}}元</span></p>
              <p>其中积分</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from './CommonHeader'
export default {
  name: 'Turnover',
  components: {
    CommonHeader
  },
  data () {
    return {
      percentageCash: 0,
      percentageIntegral: 0,
      jingdongcashPercentage: 0,
      jingdongintegralPercentage: 0,
      othercashPercentage: 0,
      otherintegralPercentage: 0,
      colors1: [
        {color: 'rgba(247,181,0,.1)', percentage1: 20},
        {color: 'rgba(247,181,0,.3)', percentage1: 40},
        {color: 'rgba(247,181,0,.5)', percentage1: 60},
        {color: 'rgba(247,181,0,.7)', percentage1: 80},
        {color: 'rgba(247,181,0,1)', percentage1: 100}
      ],
      colors2: [
        {color: 'rgba(24,157,255,.7)', percentage1: 20},
        {color: 'rgba(24,157,255,.7)', percentage1: 40},
        {color: 'rgba(24,157,255,.7)', percentage1: 60},
        {color: 'rgba(24,157,255,.7)', percentage1: 80},
        {color: 'rgba(24,157,255,.7)', percentage1: 100}
      ],
      goodsMoneryNum: '',
      selfSupportMoneryNum: '',
      yijiecash: '',
      yijieintegral: '',
      yijiepaycount: '',
      yijieturnover: '',
      jingdongcash: '',
      jingdongintegral: '',
      jingdongpaycount: '',
      jingdongturnover: '',
      othercash: '',
      otherintegral: '',
      otherpaycount: '',
      otherturnover: '',
      isLoad: false
    }
  },
  created () {
    this.monthGoodsTurnover()
  },
  methods: {
    monthGoodsTurnover () {
      let that = this
      that.isLoad = false
      this.$http.get('/webapi/bdview/appBusiAnalysis/monthGoodsTurnover').then(res => {
        if (res.result) {
          this.goodsMoneryNum = res.data.goodsMoneryNum
          this.selfSupportMoneryNum = res.data.selfSupportMoneryNum
          // 易捷
          this.yijiecash = res.data.yijielist.cash
          this.yijieintegral = res.data.yijielist.integral
          this.yijiepaycount = res.data.yijielist.paycount
          this.yijieturnover = res.data.yijielist.turnover
          this.percentageCash = (this.yijiecash / this.yijieturnover) * 100
          this.percentageIntegral = (this.yijieintegral / this.yijieturnover) * 100
          // 京东
          this.jingdongcash = res.data.jingdonglist.cash
          this.jingdongintegral = res.data.jingdonglist.integral
          this.jingdongpaycount = res.data.jingdonglist.paycount
          this.jingdongturnover = res.data.jingdonglist.turnover
          this.jingdongcashPercentage = (this.jingdongcash / this.jingdongturnover) * 100
          this.jingdongintegralPercentage = (this.jingdongintegral / this.jingdongturnover) * 100
          // 其他
          this.othercash = res.data.otherlist.cash
          this.otherintegral = res.data.otherlist.integral
          this.otherpaycount = res.data.otherlist.paycount
          this.otherturnover = res.data.otherlist.turnover
          this.othercashPercentage = (this.othercash / this.otherturnover) * 100
          this.otherintegralPercentage = (this.otherintegral / this.otherturnover) * 100
          that.isLoad = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.monthGoodsTurnover()
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
  @import '../../../../assets/css/mixin.styl'
  .turnover-wrapper {
    height: 342px
    margin-bottom 10px
    border-radius: 6px;
    background-color: #FFFFFF
    padding 15px vw(15) 0
    .item-wrapper {
      display flex
      flex 1
      margin-top 8px
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
            .detail-item {
              display flex
            }
            .title {
              color: #333333
              font-size: vw(16)
            }
            .detail {
              color: #333333
              font-size: vw(20)
              font-weight bold
              line-height: 24px
            }
          }
        }
      }
    }
    .item-wrapper2 {
      display flex
      margin-top 15px
      .item {
        flex 1
        height: 215px
        border-radius:6px;
        border:1px solid rgba(221,221,221,1);
        padding 20px vw(20)
        position relative
        .title {
          color: #333333
          font-size: vw(16)
          line-height: 24px
          font-weight: bold
        }
        .detail-wrapper {
          display flex
          .detail-item {
            width: 50%
            .list-wrapper {
              display flex
              align-items center
              .icon {
                img {
                  width: vw(46)
                  height: auto
                }
                margin-right vw(11)
              }
              .detail-item-wrapper {
                display flex
                flex-direction column
                .title {
                  color: #333333
                  font-size: vw(16);
                  font-weight: normal
                }
                .detail {
                  font-weight: bold
                  font-size: vw(20)
                }
              }
            }
            .list-wrapper1 {
              margin 29px 0
            }
          }
          .detail-item-left {
            display flex
            flex-direction column
          }
        }
        .detail-item-right {
          position absolute
          right vw(65)
          top: 12%
          display flex
          flex-direction column
          .cash-ratio-wrapper {
            display flex
            align-items center
            .dashboard {
              margin-right vw(20)
              /deep/ .el-progress-circle {
                width: 80px!important
                height: 85px!important
              }
              >>> svg path:first-child {
                stroke: #FCE8B2
              }
            }
            .dashboard2 {
              >>> svg path:first-child {
                stroke: #C1EDFF
              }
            }
            .info {
              color: #333333
              font-size: vw(12)
              .money {
                font-size: vw(22)
                font-weight: bold
              }
            }
          }
        }
      }
      .item:nth-child(even) {
        margin 0 vw(30)
      }
  }
  }
 /* @media screen and (max-width: 1439px) {
    .turnover-wrapper {
      .item-wrapper2 {
        margin-top vh(5)
        .item {
          .detail-wrapper {
            .detail-item {
              .list-wrapper1 {
                margin vh(18) 0
              }
            }
          }
          .detail-item-right {
            .cash-ratio-wrapper {
              .dashboard {
                /deep/ .el-progress-circle {
                  width: vw(80)!important
                  height: vh(45)!important
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and (min-height: 625px) {
    .turnover-wrapper {
      .item-wrapper2 {
        .item {
          .detail-item-right {
            top: 10%
            .cash-ratio-wrapper {
              .dashboard {
                /deep/ .el-progress-circle {
                  width: vw(95)!important
                  height: vh(45)!important
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and (min-height: 1009px) {
    .turnover-wrapper {
      .item-wrapper2 {
        .item {
          .detail-wrapper {
            .detail-item {
              .list-wrapper1 {
                margin vh(12) 0
              }
            }
          }
          .detail-item-right {
            top: 10%
            .cash-ratio-wrapper {
              .dashboard {
                /deep/ .el-progress-circle {
                  width: vw(80)!important
                  height: vh(80)!important
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and (min-height: 1010px) {
    .turnover-wrapper {
      .item-wrapper2 {
        .item {
          .detail-wrapper {
            .detail-item {
              .list-wrapper1 {
                margin vh(16) 0
              }
            }
          }
          .detail-item-right {
            top: 10%
            .cash-ratio-wrapper {
              .dashboard {
                /deep/ .el-progress-circle {
                  width: vw(95)!important
                  height: vh(95)!important
                }
              }
            }
          }
        }
      }
    }
  }*/
</style>
