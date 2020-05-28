<template>
  <div class="bg">
    <section class="title">
        驾驶舱实时看板<span> {{currentTime}}</span>
    </section>
    <section class="content">
        <el-col :span="7" class="left">
            <div class="left-t marbot bgcolors">
                <!-- 累计会员数 -->
               <member-total :memberTotal="memberTotal" ></member-total>
            </div>
            <div class="left-c marbot bgcolor">
                <!-- 会员月度加油情况 -->
               <member-add-oil :monthRefuel="monthRefuel" :monthRefuelData="monthRefuelData"></member-add-oil>
            </div>
             <div class="left-c1 marbot bgcolor">
                <!-- 会员月度加油情况 -->
               <member-add-oils :monthRefuels="monthRefuels" :monthRefuelDatas="monthRefuelDatas"></member-add-oils>
            </div>
            <div class="left-b bgcolor">
                <!-- 支付方式会员数分析 -->
               <member-pay-type></member-pay-type>
            </div>
        </el-col>
        <el-col :span="17" class="right">
            <el-row :gutter="15" class="right-top">
                <el-col :span="12">
                    <div class="right-top-t marbot bgcolor1">
                        <!-- 最新客户加油信息 -->
                        <info-add-oil></info-add-oil>
                    </div>
                    <div class="right-top-b marbot bgcolor1">
                        <!-- 会员柴油豆当日生产情况 -->
                        <bean-make :beanMake="beanMake"></bean-make>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="right-top-t marbot bgcolor1">
                        <!-- 当日发展会员客户信息 -->
                        <info-new-member></info-new-member>
                    </div>
                    <div class="right-top-b marbot bgcolor1">
                        <!-- 会员柴油豆当日使用情况 -->
                        <bean-use :beanUse="beanUse"></bean-use>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="15" class="right-bottom">
                <el-col :span="8">
                    <div class="right-bottom-wrap bgcolor1">
                        <!-- 会员复购情况 -->
                        <member-rebuy></member-rebuy>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="right-bottom-wrap bgcolor1">
                        <!-- 当月线上兑换商品 -->
                        <change-online></change-online>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="right-bottom-wrap bgcolor1">
                        <!-- 当月线下兑换商品 -->
                        <change-outline></change-outline>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    MemberTotal: require('@/components/cockpitPc/cockpitIndex/MemberTotal.vue').default,
    MemberAddOil: require('@/components/cockpitPc/cockpitIndex/MemberAddOil.vue').default,
    MemberAddOils: require('@/components/cockpitPc/cockpitIndex/MemberAddOils.vue').default,
    MemberPayType: require('@/components/cockpitPc/cockpitIndex/MemberPayType.vue').default,
    InfoAddOil: require('@/components/cockpitPc/cockpitIndex/InfoAddOil.vue').default,
    InfoNewMember: require('@/components/cockpitPc/cockpitIndex/InfoNewMember.vue').default,
    BeanMake: require('@/components/cockpitPc/cockpitIndex/BeanMake.vue').default,
    BeanUse: require('@/components/cockpitPc/cockpitIndex/BeanUse.vue').default,
    MemberRebuy: require('@/components/cockpitPc/cockpitIndex/MemberRebuy.vue').default,
    ChangeOnline: require('@/components/cockpitPc/cockpitIndex/ChangeOnline.vue').default,
    ChangeOutline: require('@/components/cockpitPc/cockpitIndex/ChangeOutline.vue').default
  },
  data () {
    return {
      cockPitData: '', // 驾驶舱详细信息
      memberTotal: { // 会员累计信息
        cumulativeMemberCount: '',
        cmcComparedYesterday: '',
        theDayMemberCount: '',
        tdmcComparedMonthlyMean: '',
        theMonthMemberCount: '',
        tmmcMoMlastMonth: ''
      },
      beanMake: { // 柴油豆生产情况
        dieselBeanActivityProportion: '',
        dieselBeanProductionCount: '',
        dieselBeanProductionDealCount: '',
        involveRefuelLiter: ''
      },
      beanUse: { // 柴油豆使用情况
        OfflineUseDieselBean: '',
        dieselBeanUseCount: '',
        dieselBeanUseDealCount: '',
        onlineUseDieselBean: ''
      },
      currentTime: '',
      monthRefuelData: [], // 会员月度加油
      monthRefuelDatas: [], // 会员月度加油
      monthRefuel: [], // 会员月度加油（过滤K）
      monthRefuels: [] // 会员月度加油（过滤K）
    }
  },
  created () {
    window.document.title = '驾驶舱实时看板'
    this.getCockpitDetail()
    this.setInterval()
  },
  methods: {
    // 驾驶舱信息
    getCockpitDetail () {
      this.$dialog.loading.open('加载中')
      this.$http.post('/webapi/cockpit/getCockpitDetail').then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.cockPitData = res.data
          this.memberTotal = res.data.memberSituation
          this.beanMake = res.data.memberDieselBeanProductionSituation
          this.beanUse = res.data.memberDieselBeanUseSituation
          let refuel = res.data.memberMonthRefuelSituation
          this.chageData(refuel)
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理会员月度加油情况信息
    chageData (json) {
      let refuelDataOld = [] // 未处理
      let refuelDataOlds = []
      let refuelData = [] // 处理后
      let refuelDatas = []
      // 返回数据带K，过滤掉
      for (var i = 0; i < 3; i++) {
        if (i === 0) {
          let daySale = json.theDaySalesMonthlyAverage
          let daySales = daySale.substring(0, daySale.length - 1)
          let monthSale = json.lastTwoMonthSales
          let monthSales = monthSale.substring(0, monthSale.length - 1)
          refuelDataOld.push(daySale)
          refuelDataOlds.push(monthSale)
          refuelData.push(daySales)
          refuelDatas.push(monthSales)
        }
        if (i === 1) {
          let daySale = json.theDaySales
          let daySales = daySale.substring(0, daySale.length - 1)
          let monthSale = json.lastMonthSales
          let monthSales = monthSale.substring(0, monthSale.length - 1)
          refuelDataOld.push(daySale)
          refuelDataOlds.push(monthSale)
          refuelData.push(daySales)
          refuelDatas.push(monthSales)
        }
        if (i === 2) {
          let monthSale = json.theMonthSales
          let monthSales = monthSale.substring(0, monthSale.length - 1)
          refuelDataOlds.push(monthSale)
          refuelDatas.push(monthSales)
        }
      }
      this.monthRefuelData = refuelDataOld
      this.monthRefuelDatas = refuelDataOlds
      this.monthRefuel = refuelData
      this.monthRefuels = refuelDatas
    },
    // 获取实时时间
    setInterval () {
      this.timer = setInterval(() => {
        this.formatTime(new Date())
      }, 1000)
    },
    // 标准时间转一般时间
    formatTime (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()

      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      this.currentTime = [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
    },
    formatNumber (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 销毁定时器
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '../../../assets/css/mixin.styl'
  .bg{
    width: 100%
    height: 100vh
    overflow: hidden;
    padding: vh(20) vw(40);
    background: url("https://img.gdoil.cn/cockpit/static/images/bg.png");
    background-size: 100% auto;
    .bgcolors{
      background-color: rgba(96,25,134,0.7);
    }
    .bgcolor{
      background-color: rgba(95,82,160,0.7);
    }
    .bgcolor1{
      background-color: rgba(95,82,160,0.3);
    }
    .marbot{
      margin-bottom: vh(12);
    }
    .title{
      line-height: vh(90);
      color: #ffffff;
      font-size: vw(48);
      text-align: center;
      border-bottom: vh(2) solid #FFE6CD;
      font-family:Source Han Sans CN;
      span{
        font-size: vw(24);
      }
    }
    .content{
      padding: vh(20) 0 0 0;
      overflow: hidden;
      background-color: rgba(0,0,0,0);
    }
  }
  .left{
    background-color: rgba(0,0,0,0);
  }
  .right{
    padding-left: vw(15);
  }
  .left-t{
    width: 100%;
    height: vh(168);
    border-radius: vw(6);
  }
  .left-c{
    width: 100%;
    height: vh(120);
    border-radius: vw(5);
  }
  .left-c1{
    width: 100%;
    height: vh(184);
    border-radius: vw(5);
  }
  .left-b{
    width: 100%;
    height: vh(392);
    border-radius: vw(5);
  }
  .right-top-t{
    width: 100%;
    height: vh(303);
    border-radius: vw(5);
  }
  .right-top-b{
    width: 100%;
    height: vh(183);
    border-radius: vw(5);
  }
  .right-bottom-wrap{
    width: 100%;
    height: vh(392);
    border-radius: vw(5);
  }
</style>
