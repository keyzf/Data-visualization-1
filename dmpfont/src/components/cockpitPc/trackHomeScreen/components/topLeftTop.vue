<template>
  <div class="wraper">
    <div class="page-title">
      <!-- <page-title1 :titleInfo="titleInfo"></page-title1> -->
    </div>
    <div class="igs-flex igs-flex10">
      <div class="wraper-cont igs-flex igs-flex3">
        <div>
          <p>当前有效会员</p>
          <!-- 数字滚动 -->
          <count-num :value="tmActiveMember" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
      <div class="wraper-cont igs-flex igs-flex3">
        <div>
          <p>当前活跃会员</p>
          <count-num :value="tmLivelyMember" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
      <div class="wraper-cont igs-flex igs-flex3">
        <div>
          <p>本年度潜在有效客户</p>
          <count-num :value="tmLostMember" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
      <div class="wraper-cont igs-flex igs-flex3">
        <div>
          <p>当前忠诚会员</p>
          <count-num :value="tmLoyalMember" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
      <div class="wraper-cont igs-flex igs-flex3">
        <div>
          <p>年内新增有效</p>
          <count-num :value="yearActiveMember" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
      <div class="wraper-cont igs-flex igs-flex3">
        <div>
          <p>会员粘性指数</p>
          <count-num :value="memberStickinessIndex" :setType="setType1" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'centerTop',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
    // pageTitle1: require('@/components/cockpitPc/common/pageTitle1.vue').default
  },
  data () {
    return {
      titleInfo: {
        titleName: '会员概况',
        titleColor: 'rgba(169,184,255,1)',
        titleColor1: 'rgba(169,184,255,1)'
      },
      tmActiveMember: 0, // 本月有效会员
      tmLivelyMember: 0, // 本月活跃会员
      tmLostMember: 0, // 本月流失会员
      tmLoyalMember: 0, // 本月忠诚会员
      yearActiveMember: 0, // 年度有效会员
      memberStickinessIndex: 0, // 会员粘性指数
      setType: {
        iscenter: 1, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '万人', // 单位
        colortype: 1 // 文字颜色，1蓝色，0白色，默认白色
      },
      setType1: {
        iscenter: 1,
        unitname: '',
        colortype: 1
      },
      isLoaded: false // 数据是否请求完
    }
  },
  created () {
    this.memberProfile()
  },
  methods: {
    // 获取会员概况
    memberProfile () {
      if (!this.timer) {
        this.$dialog.loading.open('加载中')
      }
      this.$http.post('/webapi/bdview/thDataBS/memberProfile').then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          let rs = res.data
          this.tmActiveMember = this.$util.fixedFunc(rs.tmActiveMember / 10000) || 0
          this.tmLivelyMember = this.$util.fixedFunc(rs.tmLivelyMember / 10000) || 0
          this.tmLostMember = this.$util.fixedFunc(rs.tmLostMember / 10000) || 0
          this.tmLoyalMember = this.$util.fixedFunc(rs.tmLoyalMember / 10000) || 0
          this.yearActiveMember = this.$util.fixedFunc(rs.yearActiveMember / 10000) || 0
          this.memberStickinessIndex = rs.memberStickinessIndex || 0

          this.isLoaded = true
          // 是否启动轮询1
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.memberProfile()
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
    background: url("https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/top_bg.png?1") no-repeat
    // background: url("https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/top_bg_test.png") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    color: #A9B8FF
    font-size: vw(18)
    padding: vh(0) vw(35) 0 vw(45)
    // padding: vh(30) vw(35) 0 vw(35)
    .page-title{
      height: vh(48);
    }
    .wraper-cont{
      flex: 1
      text-align: left
      background: rgba(26, 50, 180, 0.14)
      margin: 0 vw(10)
      height: vh(111)
      line-height: vh(40)
      /deep/ .wrapers {
        ul.box-item {
          width: auto
          font-size: vw(40)
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
          font-size: vw(18)
          line-height: vh(22)
        }
      }
      .lineh{
        line-height: vh(40)
      }
    }
  }
</style>
