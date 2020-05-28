<template>
  <div class="wraper">
    <div class="page-title">
      <!-- <page-title1 :titleInfo="titleInfo"></page-title1> -->
    </div>
    <div class=" igs-flex igs-flex10">
      <div class="wraper-cont" style="width: 32%">
        <div class="igs-flex wrap-cont">
          <span>基础品类零售</span>
          <count-num :value="basicCategoryRetailTurnover" :setType="setType" v-if="isLoaded"></count-num>
          <!-- <span>基础品类</span>
          <count-num :value="fullCaliberTurnover" :setType="setType" v-if="isLoaded"></count-num> -->
        </div>
        <div class="igs-flex wrap-cont">
          <span>用券金额</span>
          <count-num :value="couponAmount" :setType="setType1" v-if="isLoaded"></count-num>
        </div>
      </div>
      <div class="wraper-cont" style="width: 36%">
        <div class="igs-flex wrap-cont">
          <span>基础品类团购</span>
          <count-num :value="basicCategorGroupBuyTurnover" :setType="setType" v-if="isLoaded"></count-num>
         <!--  <span>基础品类零售</span>
          <count-num :value="basicCategoryRetailTurnover" :setType="setType" v-if="isLoaded"></count-num> -->
        </div>
        <div class="igs-flex wrap-cont">
          <span>全口径毛利额</span>
          <count-num :value="fullCaliberGrossProfit" :setType="setType1" v-if="isLoaded"></count-num>
        </div>
      </div>
      <div class="wraper-cont" style="width: 32%">
        <div class="igs-flex wrap-cont">
          <span>服务类</span>
          <count-num :value="tmServiceClassTurnover" :setType="setType" v-if="isLoaded"></count-num>
          <!--  <span>基础品类团购</span>
          <count-num :value="basicCategorGroupBuyTurnover" :setType="setType" v-if="isLoaded"></count-num> -->
        </div>
        <div class="igs-flex wrap-cont">
          <span>净毛利额</span>
          <count-num :value="netGrossProfit" :setType="setType1" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'centerTop',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default,
    pageTitle1: require('@/components/cockpitPc/common/pageTitle1.vue').default
  },
  data () {
    return {
      titleInfo: {
        titleName: '当月营业额',
        titleColor: 'rgba(219,225,255,1)',
        titleColor1: 'rgba(219,225,255,1)'
      },
      fullCaliberTurnover: 0,
      couponAmount: 0,
      basicCategoryRetailTurnover: 0,
      fullCaliberGrossProfit: 0,
      basicCategorGroupBuyTurnover: 0,
      tmServiceClassTurnover: 0,
      netGrossProfit: 0,
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '万元', // 单位
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
    this.bigScreenDetails()
  },
  methods: {
    // 获取数据大屏明细
    bigScreenDetails () {
      this.$http.post('/webapi/bdview/notOilDataBS/bigScreenDetails').then(res => {
        if (res.result === true) {
          let rs = res.data.thMonthDetail
          // this.fullCaliberTurnover = rs.fullCaliberTurnover || 0
          let val = Number(rs.basicCategoryRetailTurnover) + Number(rs.basicCategorGroupBuyTurnover)
          this.fullCaliberTurnover = this.$util.fixedFunc(val)
          let val1 = rs.couponAmount || 0
          this.couponAmount = this.$util.fixedFunc(val1)
          let val2 = rs.basicCategoryRetailTurnover || 0
          this.basicCategoryRetailTurnover = this.$util.fixedFunc(val2)
          let val3 = rs.fullCaliberGrossProfit || 0
          this.fullCaliberGrossProfit = this.$util.fixedFunc(val3)
          let val4 = rs.basicCategorGroupBuyTurnover || 0
          this.basicCategorGroupBuyTurnover = this.$util.fixedFunc(val4)
          let val5 = rs.netGrossProfit || 0
          this.netGrossProfit = this.$util.fixedFunc(val5)
          let val6 = rs.tmServiceClassTurnover || 0
          this.tmServiceClassTurnover = this.$util.fixedFunc(val6)

          this.isLoaded = true
          // 是否启动轮询1
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.bigScreenDetails()
            }, this.$store.state.stationData.timeIntervals)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
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
  .ellipsis{
    display:inline-block;white-space:nowrap;
    overflow:hidden;text-overflow: ellipsis;
  }
  .wraper {
    width: 100%
    height: 100%
    background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_center_t1.png") no-repeat
    // background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_center_t11.png") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    color: #5C74D1
    font-size: vw(15)
    padding: vh(0) vw(35) 0 vw(45)
    // padding: vh(30) vw(35) 0 vw(45)
    .page-title{
      height: vh(48);
    }
    .wraper-cont{
      /* flex: 1 */
      text-align: left
      .wrap-cont{
        line-height: vh(40)
        /* align-items: flex-end */
        span{
          margin-right: vw(10)
        }
        /deep/ .wrapers {
          ul.box-item {
            width: auto
            /* 默认逗号设置 */
            .mark-item {
              width: vw(4)
              margin-left: vw(6)
            }
            .number-item {
              width: vw(20)
            }
          }
          .unit-span {
            display: flex
            align-items: flex-end
            margin-left: vw(6)
          }
        }
      }
      .lineh{
        line-height: vh(40)
      }
    }
  }
</style>
