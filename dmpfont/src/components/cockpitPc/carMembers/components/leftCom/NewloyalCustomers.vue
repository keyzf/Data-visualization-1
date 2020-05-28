<template>
  <div class="newLoyal-wrapper">
    <div class="content">
      <div class="table-head">
        <ul>
          <li>排名</li>
          <li class="place1">地市</li>
          <li class="finished flex-li">新增忠诚客户数</li>
          <li class="completion-rate flex-li">新增忠诚客户数占比</li>
        </ul>
      </div>
      <div class="table-content">
        <ul v-for="(item, index) of topTenList" :key="index">
          <li class="index index-first" :class="sstt[index]">{{index + 1}}</li>
          <li class="place">{{cutFun(item.name)}}</li>
          <li class="finished flex-li">{{item.count}}</li>
          <li class="completion-rate flex-li">{{item.proportion}}%</li>
        </ul>
        <div class="line"></div>
        <ul v-for="(item, index) of lastThreeList" :key="index + 19">
          <li class="index index-last">{{index + 19}}</li>
          <li class="place">{{cutFun(item.name)}}</li>
          <li class="finished flex-li">{{item.count}}</li>
          <li class="completion-rate flex-li">{{item.proportion}}%</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewLoyalCustomers',
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
    this.loyalCustomers()
  },
  methods: {
    // 切割字符串
    cutFun (value) {
      let a = value.indexOf('石油')
      return value.substring(0, a)
    },
    // 排序
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    },
    loyalCustomers () {
      // this.topTenList = []
      // this.lastThreeList = []
      let that = this
      this.$http.post('/webapi/bdview/gasolineDataBS/loyalCustomers').then(res => {
        if (res.result === true) {
          let topTen = res.data.slice(0, 10)
          let lastThree = res.data.sort(that.compare('constructionCompletionRate')).slice(18, 21)
          this.topTenList = topTen
          this.lastThreeList = lastThree
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.loyalCustomers()
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
  .newLoyal-wrapper {
    width: vw(500)
    height: vh(465)
    margin-bottom vh(16)
    //  background: url("https://img.gdoil.cn/cockpit/static/images/carMember/left_bg2.png") no-repeat
    background: url("https://img.gdoil.cn/cockpit/static/images/carMember/left_bg2.png") no-repeat
    -webkit-background-size: 100% vh(465)
    background-size: 100% vh(465)
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
          .place1 {
            padding-left vw(8)
            width: 20%
          }
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
          margin pxtovh(5) pxtovw(0) pxtovh(8)
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
          .place {
            width: 18%
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
