<template>
  <div class="integral-exchange-wrapper">
    <common-header>积分兑换</common-header>
    <div class="item-wrapper">
      <div class="item">
        <div class="today">
          <div class="icon icon-class">
            <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-produce.png" alt="">
          </div>
          <div class="detail-wrapper">
            <span class="title">产生积分价值</span>
            <span class="detail">{{$util.fixedamount(produceCost)}}元</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="today">
          <div class="icon self-support">
            <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-value.png" alt="">
          </div>
          <div class="detail-wrapper">
            <span class="title">兑换积分价值</span>
            <span class="detail">{{$util.fixedamount(redeemCost)}}元</span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="today">
          <div class="icon self-support">
            <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-proportion.png" alt="">
          </div>
          <div class="detail-wrapper">
            <span class="title">占比(%)</span>
            <span class="detail">{{ratio}}</span>
          </div>
        </div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="item-wrapper2">
      <div class="item">
        <div class="title">其中会员积分价值</div>
        <div class="value-wrapper">
          <div class="value-left">
            <div class="value">
              <div class="icon icon-class">
                <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-member-value.png" alt="">
              </div>
              <div class="detail-wrapper">
                <span class="titles">会员积分兑换价值</span>
                <span class="details">{{$util.fixedamount(integralredeemCost)}}元</span>
              </div>
            </div>
          </div>
          <div class="value-right">
            <p class="titles">占比(%)</p>
            <p class="details">{{integralredeemRatio}}</p>
          </div>
        </div>
        <div class="chart-wrapper">
          <div class="charts">
            <el-progress type="dashboard"
                         :percentage="onlinePercentage"
                         :color="colors1"
                         :show-text="false"
                         :stroke-width="15"
            ></el-progress>
            <div class="info">
              <p><span class="money">{{$util.fixedamount(integralonlineShare)}}元</span> </p>
              <p>其中线上兑换</p>
            </div>
          </div>
          <div class="charts2">
            <el-progress type="dashboard"
                         :percentage="offlinePercentage"
                         :color="colors2"
                         :show-text="false"
                         :stroke-width="15"
            ></el-progress>
            <div class="info">
              <p><span class="money">{{$util.fixedamount(integralofflineShare)}}元</span> </p>
              <p>其中线下兑换</p>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">其中柴油豆</div>
        <div class="value-wrapper">
          <div class="value-left">
            <div class="value">
              <div class="icon icon-class">
                <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon_chaiyoudou.png" alt="">
              </div>
              <div class="detail-wrapper">
                <span class="titles">柴油豆兑换价值</span>
                <span class="details">{{$util.fixedamount(dieselredeemCost)}}元</span>
              </div>
            </div>
          </div>
          <div class="value-right">
            <p class="titles">占比(%)</p>
            <p class="details">{{dieselredeemRatio}}</p>
          </div>
        </div>
        <div class="chart-wrapper">
          <div class="charts">
            <el-progress type="dashboard"
                         :percentage="onlineSharePercentage"
                         :color="colors1"
                         :show-text="false"
                         :stroke-width="15"
            ></el-progress>
            <div class="info">
              <p><span class="money">{{$util.fixedamount(dieselonlineShare)}}元</span> </p>
              <p>其中线上兑换</p>
            </div>
          </div>
          <div class="charts2">
            <el-progress type="dashboard"
                         :percentage="offlineSharePercentage"
                         :color="colors2"
                         :show-text="false"
                         :stroke-width="15"
            ></el-progress>
            <div class="info">
              <p><span class="money">{{$util.fixedamount(dieselofflineShare)}}元</span></p>
              <p>其中线下兑换</p>
            </div>
          </div>
        </div>
      </div>
      <div class="item-right">
        <div class="title">其中金豆兑换</div>
        <div class="value-wrapper value-wrapper-top">
          <div class="value-left">
            <div class="value">
              <div class="icon icon-class">
                <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-Golden-beans.png" alt="">
              </div>
              <div class="detail-wrapper">
                <span class="titles">金豆兑换价值</span>
                <span class="details">{{$util.fixedamount(goldredeemCostgold)}}元</span>
              </div>
            </div>
          </div>
        </div>
        <div class="value-wrapper">
          <div class="value-left">
            <div class="value">
              <div class="icon icon-class">
                <img src="https://img.gdoil.cn/cockpit/static/images/overallData/icon-Proportionss.png" alt="">
              </div>
              <div class="detail-wrapper">
                <span class="titles">占比(%)</span>
                <span class="details">{{goldredeemRatiogold}}</span>
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
  name: 'IntegralExchange',
  components: {
    CommonHeader
  },
  data () {
    return {
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
      produceCost: 0,
      ratio: 0,
      redeemCost: 0,
      dieselBeansCost: {},
      goldBeansCost: {},
      goldredeemCost: 0,
      redeemRatio: 0,
      integralCost: {},
      dieselofflineShare: 0,
      dieselonlineShare: 0,
      dieselredeemCost: 0,
      dieselredeemRatio: 0,
      onlineSharePercentage: 0,
      offlineSharePercentage: 0,
      goldredeemCostgold: 0,
      goldredeemRatiogold: 0,
      integralofflineShare: 0,
      integralonlineShare: 0,
      integralredeemCost: 0,
      integralredeemRatio: 0,
      onlinePercentage: 0,
      offlinePercentage: 0
    }
  },
  created () {
    this.redeemCondition()
  },
  methods: {
    redeemCondition () {
      let that = this
      this.$http.get('/webapi/bdview/appBusiAnalysis/redeemCondition').then(res => {
        if (res.result) {
          this.produceCost = res.data.produceCost
          this.ratio = `${res.data.ratio * 100}%`
          this.redeemCost = res.data.redeemCost
          // 柴油豆
          this.dieselBeansCost = res.data.dieselBeansCost
          this.dieselofflineShare = this.dieselBeansCost.offlineShare
          this.dieselonlineShare = this.dieselBeansCost.onlineShare
          this.dieselredeemCost = this.dieselBeansCost.redeemCost
          this.dieselredeemRatio = `${this.dieselBeansCost.redeemRatio * 100}%`
          this.onlineSharePercentage = (this.dieselonlineShare / this.dieselredeemCost) * 100
          this.offlineSharePercentage = (this.dieselofflineShare / this.dieselredeemCost) * 100
          // 金豆
          this.goldBeansCost = res.data.goldBeansCost
          this.goldredeemCostgold = this.goldBeansCost.redeemCost
          this.goldredeemRatiogold = `${(this.goldBeansCost.redeemRatio * 100)}%`
          // 积分价值
          this.integralCost = res.data.integralCost
          this.integralofflineShare = this.integralCost.offlineShare
          this.integralonlineShare = this.integralCost.onlineShare
          this.integralredeemCost = this.integralCost.produceCost
          this.integralredeemRatio = `${this.integralCost.redeemRatio * 100}%`
          this.onlinePercentage = (this.integralonlineShare / this.integralredeemCost) * 100
          this.offlinePercentage = (this.integralofflineShare / this.integralredeemCost) * 100
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.redeemCondition()
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
  .integral-exchange-wrapper {
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
        .value-wrapper {
          display flex
          border-radius: 4px;
          border: 1px solid rgba(221,221,221,1);
          padding 12px vw(22)
          margin-bottom 15px
          .value-left {
            width:30%;
            .value {
              display flex
              align-items center
              justify-content center
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
                .titles {
                  color: #333
                  font-size: vw(16)
                }
                .details {
                  color: #333333
                  font-size: vw(20)
                  font-weight bold
                  line-height: 24px
                }
              }
            }
          }
          .value-right {
            border-left 1px solid #979797
            padding-left vw(40)
            width: 70%;
            display flex
            flex-direction column
            justify-content center
            .titles {
              color: #333
              font-size: vw(16)
            }
            .details {
              color: #333333
              font-size: vw(20)
              font-weight bold
              line-height: 24px
            }
          }
        }
      }
      .item:nth-child(even) {
        margin 0 vw(30)
      }
      .item-right {
        height: 215px
        border-radius:6px;
        border:1px solid rgba(221,221,221,1);
        padding 20px vw(20)
        .title {
          color: #333333
          font-size: vw(16)
          line-height: 24px
          font-weight: bold
        }
        .value-wrapper {
          display flex
          border-radius: 4px;
          border: 1px solid rgba(221,221,221,1);
          padding 12px vw(22)
          .value-left {
            flex 1
            .value {
              display flex
              align-items center
              justify-content center
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
                .titles {
                  color: #333
                  font-size: vw(16)
                }
                .details {
                  color: #333333
                  font-size: vw(20)
                  font-weight bold
                  line-height: 24px
                }
              }
            }
          }
          .value-right {
            border-left 1px solid #979797
            padding-left vw(20)
            display flex
            flex-direction column
            justify-content center
            .titles {
              color: #333
              font-size: vw(16)
            }
            .details {
              color: #333333
              font-size: vw(20)
              font-weight bold
              line-height: 24px
            }
          }
        }
        .value-wrapper-top {
          margin-bottom 10px
        }
      }
      .chart-wrapper {
        display flex
        text-align center
        .charts, .charts2 {
          flex 1
          display flex
          justify-content center
          align-items center
        }
        .info {
          color: #333333
          font-size: vw(12)
          margin-left vw(20)
          .money {
            font-size: vw(22)
            font-weight: bold
          }
        }
        .charts {
          /deep/ .el-progress-circle {
            width: 80px!important
            height: 85px!important
          }
          >>> svg path:first-child {
            stroke: #FCE8B2
          }
        }
        .charts2 {
          /deep/ .el-progress-circle {
            width: 80px!important
            height: 85px!important
          }
          >>> svg path:first-child {
            stroke: #C1EDFF
          }
        }
      }
    }
  }
/*  @media screen and (max-width: 1439px) {
    .integral-exchange-wrapper {
      .item-wrapper2 {
        margin-top vh(0)
        .item {
          padding vh(10) vw(20)
          .value-wrapper {
            padding vh(6) vw(22)
            margin-bottom vh(0)
          }
        }
        .item:nth-child(even) {
          margin 0 vw(25)
        }
        .item-right {
          padding vh(10) vw(20)
          .value-wrapper {
            padding vh(6) vw(22)
          }
          .value-wrapper-top {
            margin-bottom vh(5)
          }
        }
        .chart-wrapper {
          .charts {
            /deep/ .el-progress-circle {
              width: vw(70)!important
              height: vh(85)!important
            }
          }
          .charts2 {
            /deep/ .el-progress-circle {
              width: vw(70)!important
              height: vh(85)!important
            }
          }
        }
      }
    }
  }
  @media screen and (min-height: 625px) {
    .integral-exchange-wrapper {
      .item-wrapper2 {
        .item-right {
          .value-wrapper-top {
            margin-bottom vh(10)
          }
        }
        .chart-wrapper {
          margin-top vh(10)!important
          .charts {
            /deep/ .el-progress-circle {
              width: vw(95)!important
            }
          }
          .charts2 {
            /deep/ .el-progress-circle {
              width: vw(95)!important
            }
          }
        }
      }
    }
  }
  @media screen and (min-height: 1009px){
    .integral-exchange-wrapper {
      .item-wrapper2 {
        margin-top vh(5)
        .item {
          padding vh(5) vw(20)
          .value-wrapper {
            margin-bottom vh(5)!important
          }
          .chart-wrapper {
            margin-top vh(0)!important
            .charts {
              /deep/ .el-progress-circle {
                width: vw(80)!important
              }
            }
            .charts2 {
              /deep/ .el-progress-circle {
                width: vw(80)!important
              }
            }
          }
        }
        .item-right {
          padding vh(5) vw(20)
          .value-wrapper-top {
            margin-bottom vh(8)
          }
        }
      }
    }
  }
  @media screen and (min-height: 1010px){
    .integral-exchange-wrapper {
      .item-wrapper2 {
        margin-top vh(10)
        .item {
          padding vh(5) vw(20)
          .value-wrapper {
            margin-bottom vh(5)!important
          }
          .chart-wrapper {
            margin-top vh(10)!important
            .charts {
              /deep/ .el-progress-circle {
                width: vw(95)!important
              }
            }
            .charts2 {
              /deep/ .el-progress-circle {
                width: vw(95)!important
              }
            }
          }
        }
        .item-right {
          padding vh(5) vw(20)
          .value-wrapper-top {
            margin-bottom vh(15)
          }
        }
      }
    }
  }*/
</style>
