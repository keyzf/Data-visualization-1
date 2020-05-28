<template>
  <div class="merchant-ranking-wrapper">
    <common-header>当月商户排名</common-header>
    <div class="ranking-wrapper">
      <div class="table-wrapper table-left-wrapper">
        <div class="top-title">
          <div class="title">交易金额排名</div>
          <div class="item-right">
            <span class="trade-count" @click="cur=0" :class="{tradeNum:cur===0}">交易金额</span>
            <span @click="cur=1" :class="{tradeNum:cur===1}">交易笔数</span>
          </div>
        </div>
        <div class="table-content">
          <div v-show="cur===0">
            <ul class="ul-list">
              <li class="ranking li-center li-color">排名</li>
              <li class="name li-center li-color">商户名称</li>
              <li class="li-list li-center li-color">交易金额</li>
              <li class="li-list li-center li-color">其中现金支付</li>
              <li class="li-list li-center li-color">其中券支付</li>
              <li class="li-list li-center li-color">其中积分支付</li>
            </ul>
            <ul class="ul-list" v-for="(item, index) of merDealAmountlist" :key="index">
              <li class="ranking li-center li-color">{{index +1}}</li>
              <li class="name li-color">{{item.name}}</li>
              <li class="li-list li-center">{{$util.fixedamount(item.money)}}元</li>
              <li class="li-list li-center">{{$util.fixedamount(item.cash)}}元</li>
              <li class="li-list li-center">{{$util.fixedamount(item.coupon)}}元</li>
              <li class="li-list li-center">{{$util.fixedamount(item.integral)}}元</li>
            </ul>
          </div>
          <div v-show="cur===1">
            <ul class="ul-list">
              <li class="ranking li-center li-color">排名</li>
              <li class="name li-center li-color">商户名称</li>
              <li class="li-list li-center li-color">交易笔数</li>
              <li class="li-list li-center li-color">其中现金支付</li>
              <li class="li-list li-center li-color">其中券支付</li>
              <li class="li-list li-center li-color">其中积分支付</li>
            </ul>
            <ul class="ul-list" v-for="(item, index) of merDealCountlist" :key="index">
              <li class="ranking li-center li-color">{{index + 1}}</li>
              <li class="name li-color">{{item.name}}</li>
              <li class="li-list li-center">{{$util.fixedamount(item.money)}}笔</li>
              <li class="li-list li-center">{{$util.fixedamount(item.cash)}}笔</li>
              <li class="li-list li-center">{{$util.fixedamount(item.coupon)}}笔</li>
              <li class="li-list li-center">{{$util.fixedamount(item.integral)}}笔</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="table-wrapper table-right-wrapper">
        <div class="top-title">
          <div class="title">商品排名</div>
          <div class="item-right">
            <span class="trade-count" @click="cur1=0" :class="{tradeNum:cur1===0}">交易金额</span>
            <span class="trade-num" @click="cur1=1" :class="{tradeNum:cur1===1}">交易笔数</span>
          </div>
        </div>
        <div class="table-content">
          <div v-show="cur1===0">
            <ul class="ul-list">
              <li class="ranking li-center li-color">排名</li>
              <li class="name li-center li-color">商户名称</li>
              <li class="name li-center li-color">商品名称</li>
              <li class="li-list li-center li-color">交易金额</li>
            </ul>
            <ul class="ul-list" v-for="(item, index) of proDealAmountlist" :key="index">
              <li class="ranking li-center li-color">{{index + 1}}</li>
              <li class="name li-color">{{item.mchName}}</li>
              <li class="name li-color">{{item.productName}}</li>
              <li class="li-list li-center">{{$util.fixedamount(item.money)}}元</li>
            </ul>
          </div>
          <div v-show="cur1===1">
            <ul class="ul-list">
              <li class="ranking li-center li-color">排名</li>
              <li class="name li-center li-color">商户名称</li>
               <li class="name li-center li-color">商品名称</li>
              <li class="li-list li-center li-color">交易笔数(笔)</li>
            </ul>
            <ul class="ul-list" v-for="(item, index) of proDealCountlist" :key="index">
              <li class="ranking li-center li-color">{{index + 1}}</li>
              <li class="name li-color">{{item.mchName}}</li>
              <li class="name li-color">{{item.productName}}</li>
              <li class="li-list li-center">{{$util.fixedamount(item.money)}}笔</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from './CommonHeader'
export default {
  name: 'MerchantRanking',
  components: {
    CommonHeader
  },
  data () {
    return {
      cur: 0,
      cur1: 0,
      merDealAmountlist: [],
      merDealCountlist: [],
      proDealAmountlist: [],
      proDealCountlist: []
    }
  },
  created () {
    this.topTenRank()
  },
  methods: {
    // 排序
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    },
    topTenRank () {
      let that = this
      that.merDealAmountlist = []
      that.merDealCountlist = []
      that.proDealAmountlist = []
      that.proDealCountlist = []
      this.$http.get('/webapi/bdview/appBusiAnalysis/topTenRank').then(res => {
        if (res.result) {
          this.merDealAmountlist = res.data.merDealAmountlist.sort(that.compare('money'))
          this.merDealCountlist = res.data.merDealCountlist.sort(that.compare('money'))
          console.log(this.merDealCountlist)
          this.proDealAmountlist = res.data.proDealAmountlist.sort(that.compare('money'))
          this.proDealCountlist = res.data.proDealCountlist.sort(that.compare('money'))
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.topTenRank()
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
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .merchant-ranking-wrapper {
    height: vh(592)
    margin-bottom vh(10)
    border-radius: 6px;
    background-color: #FFFFFF
    padding vh(15) vw(15) vh(0)
    .ranking-wrapper {
      display flex
      margin-top vh(15)
      border-top 1px solid #DDDDDD
      padding-top vh(14)
      .table-wrapper {
        flex 1
        .top-title {
          display flex
          color: #333333
          .title {
            flex 1
            font-size: vw(18)
            line-height: vh(27)
          }
          .item-right {
            flex 1
            text-align right
            font-size: vw(14)
            span {
              display inline-block
              padding 0 vw(21)
            }
            .trade-count {
              border-right 1px solid #999999
            }
            .tradeNum {
              color: #2062e6
            }
          }
        }
        .table-content {
          .ul-list {
            display flex
            .li-color {
              color: #333333
            }
            li {
              border-bottom 1px solid #DDDDDD
              line-height: vh(43)
              font-size: vw(14)
            }
            .ranking {
              width: 10%
            }
            .name {
              width: 32%
              white-space: nowrap
              text-overflow:ellipsis; overflow:hidden;
            }
            .li-list {
              flex 1
            }
            .li-center {
              text-align center
            }
          }
        }
      }
      .table-left-wrapper {
        margin-right vw(40)
      }
    }
  }
</style>
