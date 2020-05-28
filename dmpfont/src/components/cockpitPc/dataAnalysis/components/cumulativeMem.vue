<template>
  <div class="cumulative-wrapper">
    <div class="item-list">
      <div class="icon icon1"></div>
      <div class="content">
        <div class="member-num">会员数</div>
        <div>
          <count-num :value="memberObj.member" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item-list">
      <div class="icon icon2"></div>
      <div class="content">
        <div class="member-num">绑卡数</div>
        <div>
          <count-num :value="memberObj.tiedCard" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item-list">
      <div class="icon icon3"></div>
      <div class="content">
        <div class="member-num">真实用户数</div>
        <div>
          <count-num :value="memberObj.realUser" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item-list">
      <div class="icon icon4"></div>
      <div class="content">
        <div class="member-num">实名认证数</div>
        <div>
          <count-num :value="memberObj.verified" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item-list">
      <div class="icon icon5"></div>
      <div class="content">
        <div class="member-num">活跃用户数</div>
        <div>
          <count-num :value="memberObj.activityUser" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cumulativeMem',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      memberObj: {},
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '人', // 单位
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
    this.cumulativeMemberCountStatistics()
  },
  methods: {
    // 累计会员数统计
    cumulativeMemberCountStatistics () {
      this.memberObj = {}
      let that = this
      that.$http.get('/webapi/bdview/customerDataAnalysisBS/cumulativeMemberCountStatistics').then(res => {
        if (res.result) {
          this.memberObj = res.data
          this.isLoaded = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.cumulativeMemberCountStatistics()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
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
  .cumulative-wrapper {
    width: 100%
    height: pxtovh(472)
    margin-bottom pxtovh(15)
    padding pxtovh(49) pxtovw(30) pxtovh(0)
    background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg_12.png") no-repeat
    -webkit-background-size: 100% pxtovh(472)
    background-size: 100% pxtovh(472)
    .item-list {
      display flex
      width pxtovw(372)
      height pxtovh(69)
      background-color: #112071
      padding pxtovh(8) pxtovw(0)
      margin-bottom pxtovh(12)
      .icon {
        width: pxtovw(40)
        height: pxtovh(40)
        margin pxtovh(11) pxtovw(33) pxtovh(0) pxtovw(44)
      }
      .icon1 {
        background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/icon_43.png") no-repeat
        -webkit-background-size: 100% pxtovh(40)
        background-size: 100% pxtovh(40)
      }
      .icon2 {
        background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/icon_45.png") no-repeat
        -webkit-background-size: 100% pxtovh(40)
        background-size: 100% pxtovh(40)
      }
      .icon3 {
        background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/icon_41.png") no-repeat
        -webkit-background-size: 100% pxtovh(40)
        background-size: 100% pxtovh(40)
      }
      .icon4 {
        background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/icon_42.png") no-repeat
        -webkit-background-size: 100% pxtovh(40)
        background-size: 100% pxtovh(40)
      }
      .icon5 {
        background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/icon_44.png") no-repeat
        -webkit-background-size: 100% pxtovh(40)
        background-size: 100% pxtovh(40)
      }
      .content {
        flex 1
        color: #97a8f7
        font-size: pxtovw(12)
        font-weight:400;
        border-left 2px solid #000530
        padding-left pxtovw(48)
        /deep/ .number-item {
          display flex
          i {
            width: 210%
          }
        }
        /deep/ .unit-span {
          line-height: vh(52)!important
        }
        .number {
          font-family LcdD
          font-weight 400
          font-size: pxtovw(30)
          color: #ffffff
        }
      }
    }
  }
</style>
