<template>
  <div class="rightBottom">
    <div class="title">
      <!-- 兑换商品top5 -->
    </div>
    <div class="rightBottom_b"
         v-if="proportionlist.length > 0">
      <div class="item-wrapper">
        <div class="cont_title">{{proportionlist[0].name}}</div>
        <div class="content">
          <el-progress :text-inside="false"
                       :stroke-width="12"
                       :percentage="proportionlist[0].proportion"></el-progress>
          <span class="bishu">{{ proportionlist[0].count}}笔</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="cont_title">{{proportionlist[1].name}}</div>
        <div class="content content2">
          <el-progress :text-inside="false"
                       :stroke-width="12"
                       :percentage="proportionlist[1].proportion"></el-progress>
          <span class="bishu"> {{proportionlist[1].count}}笔</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="cont_title">{{proportionlist[2].name}}</div>
        <div class="content content3">
          <el-progress :text-inside="false"
                       :stroke-width="12"
                       :percentage="proportionlist[2].proportion"></el-progress>
          <span class="bishu">{{proportionlist[2].count}}笔</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="cont_title">{{proportionlist[3].name}}</div>
        <div class="content content4">
          <el-progress :text-inside="false"
                       :stroke-width="12"
                       :percentage="proportionlist[3].proportion"></el-progress>
          <span class="bishu">{{proportionlist[3].count}}笔</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="cont_title">{{proportionlist[4].name}}</div>
        <div class="content content5">
          <el-progress :text-inside="false"
                       :stroke-width="12"
                       :percentage="proportionlist[4].proportion"></el-progress>
          <span class="bishu">{{proportionlist[4].count}}笔</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rightBottom',
  data () {
    return {
      proportionlist: []
    }
  },
  created () {
  },
  mounted () {
    this.redeemTopList()
  },
  methods: {
    //     8. 兑换商品top5
    // GET /redeemTopList
    redeemTopList () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/redeemTopList', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          // console.log(res)
          this.proportionlist = res.rows.sort(that.compare('proportion'))
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.redeemTopList()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 排序
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
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
.rightBottom
  text-align center
  width 100%
  height pxtovh(272)
  background url('https://img.gdoil.cn/cockpit/static/images/overallImg/7.png') no-repeat
  -webkit-background-size 100% 100%
  background-size 100% 100%
  padding pxtovh(34) pxtovh(20) 0 pxtovh(20)
  position relative
  margin-top pxtovh(14)
  .title
    width pxtovh(266)
    height pxtovh(34)
    line-height pxtovh(34)
    font-size pxtovh(20)
    font-weight 400
    color rgba(169, 184, 255, 1)
    position absolute
    top 0
    left 50%
    margin-left pxtovh(-133)
  .rightBottom_b
    height 100%
    .item-wrapper
      margin-bottom pxtovh(9)
      font-size pxtovh(10)
      .cont_title
        text-align left
        font-size pxtovh(12)
        color #ffffff
        margin-bottom pxtovh(6)
      .bishu
        color #fff
      .content
        display flex
        /deep/ .el-progress
          flex 1
          margin-right pxtovw(23.9)
          line-height vh(12)
          .el-progress-bar
            margin-right 0
            .el-progress-bar__outer
              background-color #0D1A56
              width 120%
              .el-progress-bar__inner
                background linear-gradient(90deg, rgba(190, 161, 53, 1) 0%, rgba(177, 227, 98, 0.19) 100%)
          .el-progress__text
            position absolute
            right 5px
            font-size pxtovw(10) !important
            line-height 12px
            font-weight 400 !important
            color rgba(255, 255, 255, 1) !important
        span
          font-size pxtovw(12)
          font-weight 400
          color rgba(255, 255, 255, 1)
        &.content2
          /deep/ .el-progress
            flex 1
            margin-right pxtovw(23.9)
            .el-progress-bar__outer
              background-color #0D1A56
              .el-progress-bar__inner
                background linear-gradient(90deg, rgba(74, 106, 227, 1) 0%, rgba(135, 74, 227, 0.19) 100%)
        &.content3
          /deep/ .el-progress
            flex 1
            margin-right pxtovw(23.9)
            .el-progress-bar__outer
              background-color #0D1A56
              .el-progress-bar__inner
                background linear-gradient(90deg, rgba(60, 171, 226, 1) 0%, rgba(60, 225, 227, 0.19) 100%)
        &.content4
          /deep/ .el-progress
            flex 1
            margin-right pxtovw(23.9)
            .el-progress-bar__outer
              background-color #0D1A56
              .el-progress-bar__inner
                background linear-gradient(90deg, rgba(190, 161, 53, 1) 0%, rgba(177, 227, 98, 0.19) 100%)
        &.content5
          /deep/ .el-progress
            flex 1
            margin-right pxtovw(23.9)
            .el-progress-bar__outer
              background-color #0D1A56
              .el-progress-bar__inner
                background linear-gradient(90deg, rgba(74, 106, 227, 1) 0%, rgba(135, 74, 227, 0.19) 100%)
</style>
