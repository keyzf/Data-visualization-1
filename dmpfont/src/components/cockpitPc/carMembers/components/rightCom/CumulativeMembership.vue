<template>
  <div class="cumulative-wrapper">
    <div class="item-list">
      <div class="icon icon1"></div>
      <div class="content">
        <div class="member-num">年内新增有效客户</div>
        <div>
          <count-num :value="memberObj.membershipNumber" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item-list">
      <div class="icon icon2"></div>
      <div class="content">
        <div class="member-num">绑卡会员数</div>
        <div>
          <count-num :value="memberObj.bindingCard" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item-list">
      <div class="icon icon3"></div>
      <div class="content">
        <div class="member-num">绑定微信会员数</div>
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
          <count-num :value="memberObj.realName" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
    <div class="item-list">
      <div class="icon icon5"></div>
      <div class="content">
        <div class="member-num">有效客户</div>
        <div>
          <count-num :value="memberObj.effectiveUser" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CumulativeMembership',
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
    this.cumulativeMembership()
  },
  methods: {
    // 累计会员数统计
    cumulativeMembership () {
      this.memberObj = {}
      // this.isLoaded = false // 屏蔽，避免刷新时页面闪动
      this.$http.post('/webapi/bdview/gasolineDataBS/cumulativeMembership').then(res => {
        if (res.result === true) {
          this.memberObj = res.data
          this.isLoaded = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.cumulativeMembership()
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
  .cumulative-wrapper {
    width: vw(500)
    height: vh(470)
    margin-bottom vh(16)
    background: url("https://img.gdoil.cn/cockpit/static/images/carMember/right_bg2.png?1") no-repeat
    -webkit-background-size: 100% vh(470)
    background-size: 100% vh(470)
    padding-top vh(61)
    .item-list {
      display flex
      margin 0 auto
      width pxtovw(372)
      height pxtovh(69)
      background-color: #060E41
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
        /deep/ .mark-item {
          span {
            width: 30%
            font-size: vw(36)
          }
        }
        /deep/ .unit-span {
          line-height: vh(52)!important
        }
      }
    }
  }
  @media screen and (max-height: 1079px) {
    .cumulative-wrapper {
      .item-list {
        .content {
          /deep/ .number-item {
            width vw(16)
            i {
              font-size: pxtovw(25)
            }
          }
          /deep/ .unit-span {
            line-height: vh(38)!important
          }
          /deep/ .mark-item {
            width: vw(8);
            span {
              font-size: vw(30)
              width: 100%;
              bottom: 0;
              writing-mode: vertical-rl;
              margin-right: vw(0);
              margin-left: vw(6)
            }
          }
        }
      }
    }
  }
</style>
