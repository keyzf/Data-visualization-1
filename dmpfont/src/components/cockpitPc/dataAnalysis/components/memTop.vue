<template>
  <div class="mem-wrapper">
    <div class="content">
      <div class="table-head">
        <ul>
          <li class="index1">排名</li>
          <li class="place1 flex-li">地市</li>
          <li class="finished flex-li">有效会员数</li>
          <li class="completion-rate flex-li">有效会员占比</li>
        </ul>
      </div>
      <div class="table-content">
        <ul v-for="(item, index) of topTenList" :key="index">
          <li class="index index-first" :class="sstt[index]">{{index + 1}}</li>
          <li class="place flex-li">{{item.city}}</li>
          <li class="finished flex-li">{{item.activeMembers}}</li>
          <li class="completion-rate flex-li">{{item.activeMembersProportion}}%</li>
        </ul>
        <div class="line"></div>
        <ul v-for="(item, index) of lastThreeList" :key="index + 19">
          <li class="index index-last">{{index + 19}}</li>
          <li class="place flex-li">{{item.city}}</li>
          <li class="finished flex-li">{{item.activeMembers}}</li>
          <li class="completion-rate flex-li">{{item.activeMembersProportion}}%</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'memTop',
  data () {
    return {
      topTenList: [],
      lastThreeList: [],
      sstt: [
        'index_first',
        'index_second',
        'index_three'
      ]
    }
  },
  created () {
    this.theYearCityActiveMemberProportionRank()
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
    theYearCityActiveMemberProportionRank () {
      let that = this
      that.topTenList = []
      that.lastThreeList = []
      that.$http.get('/webapi/bdview/customerDataAnalysisBS/theYearCityActiveMemberProportionRank').then(res => {
        if (res.result) {
          let cityArr = res.rows.sort(that.compare('activeMembersProportion'))
          let topTen = cityArr.slice(0, 10)
          let lastThree = cityArr.slice(18, 21)
          this.topTenList = topTen
          this.lastThreeList = lastThree
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
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
  .mem-wrapper {
    height: pxtovh(492)
    width: 100%
    margin-bottom pxtovh(16)
    background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg_03.png") no-repeat
    -webkit-background-size: 100% pxtovh(492)
    background-size: 100% pxtovh(492)
    padding pxtovh(48) pxtovw(31) pxtovh(22)
    .content {
      .table-head {
        margin-bottom pxtovh(18)
        font-size: pxtovw(15)
        color: #5C74D1
        ul {
          display flex
          justify-content space-between
          text-align center
          .flex-li {
            flex 1
          }
        }
      }
      .table-content {
        .line {
          width: 100%
          height: pxtovh(2)
          background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop/img_divider.png") no-repeat
          -webkit-background-size: 100%
          background-size: 100%
          margin pxtovh(12) pxtovw(0) pxtovh(25)
        }
        ul {
          font-size: pxtovw(15)
          color: #d8effb
          display flex
          li {
            text-align center
            line-height pxtovh(20)
            margin-bottom pxtovh(7)
          }
          .flex-li {
            flex 1
          }
        }
      }
      .index {
        width: pxtovw(32)
        background-color: #1A307D
        margin-left pxtovw(2)
      }
      .place {
        margin-left pxtovw(4)
      }
      .index_first {
        background-color: #DE5656
      }
      .index_second {
        background-color: #B69B36
      }
      .index_three {
        background-color: #7e59f1
      }
      .index-last {
        background-color: #993548
      }
    }
  }
</style>
