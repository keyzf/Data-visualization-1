<template>
  <div class="loyalcustomers-wrapper">
    <div class="item loyal">
      <div class="img-loyal"></div>
      <div class="content">
        <div class="content-item">
          <div class="title">新增忠诚</div>
          <div class="detail">{{(loyalCustomer.newCustomers / 10000).toFixed(0)}} <span>万</span></div>
        </div>
        <div class="content-item">
          <div class="title">一般忠诚</div>
          <div class="detail">{{(loyalCustomer.generalLoyalty / 10000).toFixed(0)}} <span>万</span></div>
        </div>
        <div class="content-item">
          <div class="title">高忠诚</div>
          <div class="detail">{{(loyalCustomer.gaoZhong / 10000).toFixed(0)}} <span>万</span></div>
        </div>
        <div class="content-item">
          <div class="title">流失忠诚</div>
          <div class="detail">{{(loyalCustomer.loyaltyWalk / 10000).toFixed(0)}} <span>万</span></div>
        </div>
      </div>
    </div>
    <div class="item effective">
      <div class="img-effective"></div>
      <div class="content">
        <div class="content-item">
          <div class="title">长期有效</div>
          <div class="detail">{{(effectiveCustomers.longTerm / 10000).toFixed(0)}} <span>万</span></div>
        </div>
        <div class="content-item">
          <div class="title">年内新增有效</div>
          <div class="detail">{{(effectiveCustomers.yearAdded / 10000).toFixed(0)}} <span>万</span></div>
        </div>
        <div class="content-item">
          <div class="title">流失有效</div>
          <div class="detail" v-if="effectiveCustomers.lossEffective">{{(effectiveCustomers.lossEffective / 10000).toFixed(0)}} <span>万</span></div>
          <div class="detail" v-else>{{effectiveCustomers.lossEffective}}</div>
        </div>
        <div class="content-item">
          <div class="title">潜在客户</div>
          <div class="detail">{{(effectiveCustomers.potentialCustomers / 10000).toFixed(0)}} <span>万</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoyalCustomers',
  data () {
    return {
      effectiveCustomers: [], // 有效客户集合
      loyalCustomer: [] // 忠诚客户集合
    }
  },
  created () {
    this.effectiveCustomer()
  },
  methods: {
    effectiveCustomer () {
      this.$http.post('/webapi/bdview/gasolineDataBS/effectiveCustomer').then(res => {
        if (res.result === true) {
          this.effectiveCustomers = res.data.effectiveCustomers[0]
          this.loyalCustomer = res.data.loyalCustomer[0]
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.effectiveCustomer()
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
  .loyalcustomers-wrapper {
    width: vw(500)
    height: vh(238)
    margin-bottom vh(16)
    display flex
    flex-direction column
    background: url("https://img.gdoil.cn/cockpit/static/images/carMember/right_bg3.png") no-repeat
    -webkit-background-size: 100% vh(238)
    background-size: 100% vh(238)
    .item {
      flex 1
    }
    .loyal {
      .img-loyal {
        margin vh(17) auto vh(10)
        width: vw(420)
        height: vh(31)
        background: url("https://img.gdoil.cn/cockpit/static/images/carMember/title-loyal.png") no-repeat
        -webkit-background-size: 100% vh(31)
        background-size: 100% vh(31)
      }
    }
    .effective {
      .img-effective {
        margin vh(10) auto vh(10)
        width: vw(402)
        height: vh(31)
        background: url("https://img.gdoil.cn/cockpit/static/images/carMember/title_effective.png") no-repeat
        -webkit-background-size: 100% vh(31)
        background-size: 100% vh(31)
      }
    }
    .content {
      display flex
      text-align center
      .content-item {
        flex 1
        display flex
        flex-direction column
        .title{
          flex 1
          font-size: vw(12)
          line-height: vh(20)
        }
        .detail{
          flex 1
          font-size:vw(28)
          color: #ffffff
          span {
            font-size:vw(20)
          }
        }
      }
    }
  }
</style>
